<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Testing is the operator's job

Never drive the browser to check this app — not with the `browser-use` skill, not with
Playwright/Puppeteer, not with any other CDP or headless-browser tooling, and not by opening
tabs in the operator's Chrome. Do not start a dev server to inspect the result either.

This applies even when the change is visual and a screenshot would be the obvious proof.

Instead: run `bun run typecheck`, `bun run lint` and `bun run build`, report exactly what you
changed and what you could not verify, and leave the running app alone. The operator will test
it themselves.
