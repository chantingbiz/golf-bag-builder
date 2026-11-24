# Architecture

Product reference: [Golf Bag Builder Master Plan](https://chatgpt.com/library?file_id=libfile_be17fab958648191acbb78b8de4c6de0).

- **Web.** Use responsive Next.js, React, and TypeScript for the site. Render public gallery and build pages so visitors can browse without an account. Keep curated builds as structured records with stable slugs, render images, item details, and verified product URLs.
- **Source.** `app/` holds the App Router layout, homepage, and global styles. `components/` holds the header, hero, and featured-build UI. `lib/builds.ts` holds the homepage build records and image paths. `public/images/` holds the final logo, hero bag, and featured bag PNGs, plus the original placeholders used as fallbacks.
- **Data.** Supabase is planned for authentication, Postgres, and private upload storage. Use development and production environments. Commit schema changes under `supabase/migrations/` and track generated TypeScript types once the database exists.
- **Rendering.** Analyze the screenshot, resolve exact product references where available, normalize alternate views, and confirm inventory before generation. Generate server-side from a versioned prompt and check the result against the inventory. Cap retries. Keep prior prompt versions reproducible.
- **Regression coverage.** Retain the master plan's burgundy, Titleist, and green setups as reference cases. Confirm three headcovers remain three even when reference images show multiple angles. Check club type, selected variant, and putter orientation.
- **Credits.** When implemented, reserve and refund credits transactionally, enforce server-side limits, and record cost and QA outcomes. Stripe is planned for paid packs. Keep free allowances configurable.
