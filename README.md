# tierdeck

Slidev demo: a drag-and-drop tier list hub that links out to per-feature detail slides with live iframes and video fallbacks.

## Run

```sh
npm install
npm run dev        # http://localhost:3030
```

- `T` jumps back to the tier list from any slide.
- Drag chips between tiers, then click a chip to open its slide. Visited chips are dimmed with a check mark.
- Rankings persist in `localStorage`. Use **Reset** to clear them.
- `npm run dev` passes `--remote`, so a phone or second screen on the same network can open `/presenter`.

## Files

| File | Purpose |
| --- | --- |
| `slides.md` | Deck content. Each concept slide uses `layout: concept` and a `routeAlias` matching an id in `store.ts`. |
| `store.ts` | Concept list (`CONCEPTS`) plus the shared tier state. |
| `components/TierList.vue` | Drag/drop tier list built with `vuedraggable`. |
| `components/LiveDemo.vue` | Iframe with a live/video toggle and an "open in new tab" link. |
| `layouts/concept.vue` | Detail slide frame: back button, title, current tier badge. |
| `setup/shortcuts.ts` | The `T` hotkey. |
| `public/demo-app/` | Stand-in for your real app. Replace the `LiveDemo` `src` values with your app's URL. |

## Adding a concept

1. Add `{ id, title, emoji }` to `CONCEPTS` in `store.ts`.
2. Add a slide in `slides.md` with `layout: concept` and `routeAlias: <id>`.

## Deploy

```sh
npm run build      # static output in dist/
```

`dist/` is a static SPA, so any static host works (Cloudflare Pages, Netlify, GitHub Pages). Slidev emits `_redirects` and `404.html` for SPA routing. For a GitHub Pages project path, build with `npx slidev build --base /<repo>/`.

Your app must allow framing from the deck's origin. Check that it doesn't send `X-Frame-Options: DENY`, and that any CSP `frame-ancestors` includes the deck's domain.

`vite.config.ts` switches CSS minification to esbuild, which works around a Slidev 53 build failure in lightningcss.
