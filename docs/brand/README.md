# Kiryl brand assets

Self-contained brand kit for the PPC portfolio, so the build depends on **nothing
ephemeral** (no external CDN, no private artifact). Everything the design needs is
committed here. Full spec: [`../ppc-portfolio-plan.md`](../ppc-portfolio-plan.md) §9a.

## Files

| File | What it is |
|---|---|
| `kiryl-mark.svg` | The brand mark — serif K in a ring with a breakthrough area-chart ascent. Navy ring/K, navy tonal gradient fill, signal-blue rising line + point. (The `K` is `<text>` in Fraunces — **outline it to a `<path>` for production** so it renders without the font.) |
| `tokens.css` | Brand design tokens (colors + font stacks), theme-aware (light/dark via `prefers-color-scheme` + `data-theme`). |
| `fonts/faces.css` | All 7 faces embedded as **data URIs** — drop-in, self-contained, no network. |
| `fonts/fonts.css` | Same faces via `@font-face` referencing the local `.woff2` files — production. |
| `fonts/*.woff2` | The raw latin-subset font files (Bricolage Grotesque 700/800, Fraunces 400/600/900/italic-500, Anton 400). SIL OFL. |
| `identity-reference.html` | A **complete working reference** — the whole identity rendered on the page (logo lockup, mark variants, favicon sizes, a homepage mock, palette + type). Open it in a browser to see the target. Lift tokens, the mark `<symbol>`, and component CSS from it. |

## Usage

```html
<link rel="stylesheet" href="fonts/faces.css">   <!-- or fonts/fonts.css -->
<link rel="stylesheet" href="tokens.css">
```

Then style through the tokens: `color:var(--ink)`, `background:var(--paper)`,
brand `var(--navy)`, trendline `var(--signal)`, data `var(--good)`; type
`var(--font-display)` / `var(--font-serif)` / `var(--font-mono)`.

## Fonts — provenance / how to regenerate

Pulled from `@fontsource` via the **npm registry** (the jsDelivr CDN is
egress-blocked in this environment; npm is allowed):

```
npm pack @fontsource/fraunces @fontsource/bricolage-grotesque @fontsource/anton
# extract files/*-latin-<weight>-<style>.woff2 from each tarball
```

## Gotchas (learned the hard way)

- **SVG gradient stops must use `currentColor`, not `var(--x)`.** Inside an SVG
  `<use>` shadow tree, `var()` on `stop-color` silently falls back to **black**.
  Drive the gradient via the element's `color` and use `stop-color:currentColor`.
- **Favicon ≤16px:** drop the gradient fill (a `flat`/`simple` variant of the mark)
  so the tab icon stays crisp.
- **Outline the `K`** in `kiryl-mark.svg` to a path before shipping, so the mark
  doesn't depend on Fraunces being loaded where the SVG is used.
