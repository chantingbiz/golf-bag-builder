# Project state

## 2026-11-26 checkpoint

The Dream Golf Bag homepage is the review checkpoint on `feature/builder-import`. The `/build` import prototype is still only in the local worktree.

Desktop, from 960px up: the Dream Golf Bag logo sits at the upper left beside “Your golf bag deserves to look cool.”, and “look cool” is blue. `herodesktopv7.mp4` loops muted in a 16:9 frame flush under the 74px header. Reduced motion or a failed play shows the white bag still. Build My Bag opens `/build`. Browse Bag Combos scrolls to `#builds`. Curated cards move as a ticker at about 25 pixels per second, pause on hover or keyboard focus, and stay hand-scrollable when motion is reduced.

Mobile, below 960px: the same logo and a wrapping headline sit above `heromobilev2.mp4`, which fills the viewport width at 1550×1080. Reduced motion or a failed play shows `heromobilev2-still.jpg`. The blush panel, OR, and sky-blue panel stack in that order. Cards swipe with scroll snap, one full card and a peek of the next.

Checks: `npx tsc --noEmit` and `npm run lint` passed. The homepage was checked in the browser at 320, 390, 430, 959, and 960 pixels, and on a 1200px desktop load. Browse Bag Combos scrolled to the cards, Build My Bag opened `/build`, and widening to 960 restored the desktop video and side-by-side panels. At 320, 390, and 959 the mobile hero met both edges with no horizontal scroll.

## Current checkpoint

- `v0.1.0` tags the approved homepage on `main` at `35c4d43`.
- `feature/builder-import` keeps that homepage and opens a local import prototype from “Preview My Bag.”
- The desktop homepage banner is the Dream Golf Bag logo beside “Your golf bag deserves to look cool.” Explore Builds and My Builds are hidden there for now. The Dream Golf Bag logo and “Your golf bag deserves to look cool.” sit at the upper left, in line with the page gutter and about 20 pixels apart. The headline sits about 12 pixels above the logo’s center, and “look cool” is the logo’s blue. The logo is up to about 147 pixels wide, starts 12 pixels from the top of the header, and hangs over the video. `herodesktopv7.mp4` sits flush under the banner, up to about 1,000 pixels wide, and loops muted. The blue trapezoid sits 14 pixels below the video and flush on the tiles. The blush trapezoid overlaps the video by 20 pixels and leaves 8 pixels above the tiles. “Shop a curated setup” is solid sky blue and widens toward the tiles, with Browse Bag Combos at the bottom. “Preview your own setup” is solid blush pink, full width at the top and narrower at the bottom, with Build My Bag above the heading. They stay centered on a circled OR in the white gap. Browse Bag Combos scrolls to the curated tiles. Build My Bag is outlined and opens `/build`. The tiles follow that row without the “Find your next build” heading. On desktop they form a slow horizontal ticker, about 25 pixels per second, starting with The Outlaw fully visible and looping seamlessly. The ticker pauses while the pointer is over it or keyboard focus is inside a card, then resumes from that position. Reduced motion keeps a still row that can be scrolled by hand, and the desktop video falls back to the static white bag. Below 960 pixels the homepage shows the Dream Golf Bag logo beside the wrapping headline, plays `heromobilev2.mp4` edge to edge at its native 1550×1080 size, and stacks the blush panel, OR, and sky-blue panel above a swipeable card row with one full card and a peek of the next. Reduced motion or a failed play there uses a still from that video. Only the video for the active breakpoint loads. `/build` keeps the Bag Envy logo.
- `/build` is a three-step generator titled “Custom Bag Image Generator.” Step 1 is cart screenshots, step 2 is the headcover checklist, and step 3 reviews the setup before generating. Driver, 3-wood, and Putter start selected. Mini driver, 5-wood, Hybrid 1, Hybrid 2, and Iron covers are optional. Mini driver is its own driver-style cover, placed just under the driver when both are selected. Irons stay exposed unless Iron covers is selected. Product links stay in a collapsed section under the checklist. The step 3 button says “Review before generating.” A pinned phone button repeats that action. Detection and image generation are pending. The button that starts rendering will be labeled “Generate image” once that is connected. The page does not spend a credit.
- Accounts, AI rendering, Supabase, and hosting are still pending.

## Design references

- The attached homepage desktop and mobile mockups are the layout baseline for this pass.
- [Colorful Golf Bag Gallery Redesign](https://chatgpt.com/library?file_id=libfile_b73922c5381081918a8076f383b907f1)
- [Rainbow Golf Bag Builder Logo](https://chatgpt.com/library?file_id=libfile_79abe52f241c8191b4053f6b0351d7e7)

## Open decisions

- Verified item lists and retailer links for each curated bag.
- Hosting provider, free generation allowance, and credit pricing.

## Next

- Review the import prototype on `feature/builder-import` before merging.
- Connect real screenshot and link extraction so lookup can supply titles, thumbnails, and headcover-set contents. Flag unmatched or ambiguous slots from that extraction, and let people fix them or continue with a plain cover. Generate from the render configuration after that.
- Confirm catalog details, then add shoppable build pages.
