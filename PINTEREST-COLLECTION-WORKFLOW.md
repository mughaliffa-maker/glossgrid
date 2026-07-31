# Pinterest → Collection → Design Workflow

## The visitor journey

1. Publish a Pinterest Pin showing one design or a small collage.
2. Add a clear overlay such as: **See the full 50-design collection free**.
3. Link the Pin to a collection page, not the homepage.
4. The visitor lands on a large visual collection containing 50–100 relevant designs.
5. The visitor can search, filter and save designs inside the collection.
6. Selecting any design opens the existing detailed design page with its salon brief, specifications and similar ideas.

## Example destination links

- `/collection/pink-minimal-nails/`
- `/collection/summer-nails/`
- `/collection/breezy-nails/`
- `/collection/minimal-nails/`
- `/collection/autumn-nails/`
- `/collection/winter-nails/`
- `/collection/french-nails/`
- `/collection/vacation-nails/`

Use the full domain in Pinterest, for example:

`https://YOUR-PROJECT.pages.dev/collection/pink-minimal-nails/`

## Do not duplicate the same design

One design record may contain several values:

```js
{
  slug: "pink-micro-french-short-nails",
  title: "Pink Micro-French Short Nails",
  image: "/images/designs/pink-micro-french-short-nails.webp",
  color: ["Pink", "White"],
  shape: ["Round", "Squoval"],
  length: ["Short"],
  season: ["Spring", "Summer"],
  occasion: ["Everyday", "Vacation", "Office"],
  style: ["Minimal", "French"],
  finish: ["Glossy"],
  difficulty: "Intermediate",
  maintenance: "Low",
  summary: "A sheer pink short manicure with an ultra-thin white tip.",
  salonBrief: "Ask for short softly rounded nails with a sheer blush base and an ultra-thin white micro-French line.",
  why: "The narrow tip preserves the visible nail bed and keeps shorter nails looking elongated.",
  credit: "Your brand / Original design",
  source: "https://YOUR-WEBSITE/"
}
```

That single design can automatically appear in:

- Pink Minimal Nails
- Summer Nails
- Short Nails
- French Nails
- Vacation Nails
- Minimal Nails

It still has only one detail page.

## How collection membership works

Collections are defined at the bottom of `assets/data.js` in `window.GLOSSGRID_COLLECTIONS`.

Example:

```js
{
  slug: "pink-minimal-nails",
  title: "Pink Minimal Nail Ideas",
  filters: {
    color: ["Pink"],
    style: ["Minimal", "Elegant", "Romantic"]
  },
  matchMode: "all"
}
```

This means a design must be pink and must match at least one of the accepted styles.

Use `matchMode: "any"` when matching any accepted category is enough.

## Recommended collection size

- Launch a collection after it has at least 20 strong designs.
- Pinterest landing collections should ideally contain 50–100 designs.
- The page initially displays 24 designs for speed.
- A **Show more designs** button reveals the next 24.
- Do not load all 100 full-resolution images above the fold.

## Recommended Pinterest overlay text

- See the full collection free
- Browse all 50 nail ideas
- See 75 more designs
- Open the complete summer edit
- Save the full pink minimal collection
- Find your exact salon reference

## Linking rules

- One-design Pin → relevant collection page when the promise is “see more like this.”
- Multi-design collage Pin → exact collection page.
- Detailed tutorial Pin → individual design page.
- Broad “find your nails” Pin → Nail Finder.

## Adding your real images

1. Create `images/designs/` in the repository.
2. Upload optimized `.webp` images there.
3. Add one design record for every image in `assets/data.js`.
4. Assign accurate color, shape, length, season, occasion, style and finish values.
5. The design will automatically enter matching collections.
6. Commit the changes to GitHub. Cloudflare redeploys automatically.

Use only images you generated, photographed, licensed or have permission to publish.
