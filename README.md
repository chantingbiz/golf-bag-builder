# Golf Bag Builder

A mobile-first website for browsing shoppable golf bag builds and previewing how selected gear looks together.

This checkpoint contains the project foundation. The first website milestone is the curated gallery.

## Open in Cursor

Extract the starter ZIP, including its Git metadata, and open the `golf-bag-builder` folder in Cursor. Run `git status` and `git log -1 --oneline` to confirm the checkout. Start each task with the project status and approved design reference.

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Shared working rules for Cursor and Codex |
| `docs/PROJECT_STATE.md` | Current milestone, open decisions, and next task |
| `docs/ARCHITECTURE.md` | Technical boundaries and source locations |
| `docs/DECISIONS.md` | Agreed directions and rationale |
| `prompts/bag-render/v1.md` | Initial version of the master plan's rendering prompt |

## Git backup and releases

Create an empty private GitHub repository named `golf-bag-builder`, then connect the extracted checkout.

```sh
git remote add origin YOUR_PRIVATE_REPOSITORY_URL
git push -u origin main
git push origin v0.0.1
```

Keep `main` usable. Use a short branch for a redesign or larger experiment. Review the diff and verify the feature before merging. Push completed commits to GitHub and tag meaningful milestones. Revert a bad shared commit with `git revert <commit>`. Once hosting is connected, record which Git revision was deployed so a known-good release can be redeployed.

Git backs up source, docs, approved assets checked into the repo, prompts, and database migrations. Once Supabase is connected, back up live records, stored media, and deployment secrets separately. Keep secrets in the provider's environment settings or a password manager.
