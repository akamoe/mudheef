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
 * So we copy both files to stable paths ourselves. The worker imports the shared
 * chunk relatively, so they must sit side by side and keep their original names.
 * `components/ui/map.tsx` points at the result.
 *
 * Runs before `dev` and `build`, so the copies always match the installed
 * version. The output is generated, hence gitignored.
 */
import { copyFile, mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const source = join(root, "node_modules/maplibre-gl/dist")
const target = join(root, "public/maplibre")

const files = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]

await mkdir(target, { recursive: true })
await Promise.all(
  files.map((file) => copyFile(join(source, file), join(target, file))),
)
