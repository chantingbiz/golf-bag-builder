# Golf Bag Builder working rules

- Before editing, run `git status --short` and read `docs/PROJECT_STATE.md` plus the relevant sections of `docs/ARCHITECTURE.md` and `docs/DECISIONS.md`. Preserve the user's in-progress changes.
- Scope each change to the requested feature. Preserve the approved mobile and desktop layouts, navigation, copy, and shared visual styles outside that scope. Reuse shared UI components and design tokens. Ask before a broader redesign or product-direction change.
- Check the affected flow on mobile and desktop for visible changes. Run the relevant build and tests once those commands exist. Record verification gaps in the handoff.
- Update `docs/PROJECT_STATE.md` when milestones or the next priority change. Update the architecture or decision log in the same change when you alter an integration, data contract, or agreed product direction. Change this file when the working rules themselves change.
- Keep database changes in reviewed SQL migrations under `supabase/migrations/` once Supabase is initialized. Test locally or against development, regenerate database types for schema changes, and get explicit approval before applying production migrations.
- Keep AI keys and private cart screenshots server-side and out of Git. Use confirmed inventory before spending credits, cap retries and spend, and record the prompt version and QA result with each generation once generation is implemented.
- Review the diff before committing. Use descriptive commits for completed pieces of work and push them to the private remote when configured.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
