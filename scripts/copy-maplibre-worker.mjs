/**
 * Serves MapLibre's tile worker out of `public/`.
 *
 * MapLibre parses vector tiles in a worker, and it works out that worker's URL
 * from `import.meta.url` — which inside a bundle is *our* chunk, not MapLibre's.
 * The result is a plausible-looking but non-existent
 * `/_next/static/chunks/maplibre-gl-worker.mjs`, and because that string is
 * non-empty, MapLibre's own unpkg fallback never fires. The map then starts a
 * worker from a 404, never parses a tile, and renders blank.
 *
 * Turbopack's `new URL(..., import.meta.url)` is no escape: it copies the worker
 * verbatim under a hashed name and leaves the worker's relative
 * `import "./maplibre-gl-shared.mjs"` pointing at nothing.
 *
 * So we copy both files to stable paths ourselves, and we serve them as `.js`
 * rather than `.mjs`: MapLibre 6 starts a *module* worker, and browsers reject a
 * module script whose response is not a JavaScript MIME type. Several hosts
 * (Hostinger's included) have no mapping for `.mjs` and answer with
 * `text/plain`, which leaves the map blank. Every host knows `.js`.
 *
 * The worker imports its shared chunk by name, so the copy has its import
 * rewritten to match the `.js` file sitting beside it.
 * `components/ui/map.tsx` points at the result.
 *
 * Runs before `dev` and `build`, so the copies always match the installed
 * version. The output is generated, hence gitignored.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const source = join(root, "node_modules/maplibre-gl/dist")
const target = join(root, "public/maplibre")

await mkdir(target, { recursive: true })

// An earlier build shipped these as `.mjs`; drop them so a redeploy cannot keep
// serving a worker the browser refuses.
await Promise.all(
  ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"].map((file) =>
    rm(join(target, file), { force: true })
  )
)

const worker = await readFile(join(source, "maplibre-gl-worker.mjs"), "utf8")

// The source maps are not copied, and a dangling `sourceMappingURL` only earns a
// 404 in devtools.
const stripSourceMap = (code) =>
  code.replace(/^\/\/# sourceMappingURL=.*$/gm, "")

// The worker is the only file that imports anything, and only the shared chunk.
await writeFile(
  join(target, "maplibre-gl-worker.js"),
  stripSourceMap(
    worker.replaceAll("./maplibre-gl-shared.mjs", "./maplibre-gl-shared.js")
  )
)
await writeFile(
  join(target, "maplibre-gl-shared.js"),
  stripSourceMap(await readFile(join(source, "maplibre-gl-shared.mjs"), "utf8"))
)
