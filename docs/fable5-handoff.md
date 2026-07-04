# Handoff brief — Kiryl PPC portfolio → Fable 5

> Paste this into a fresh Fable 5 (Claude Code) session to produce the detailed
> build plan and then scaffold the site. It is self-contained, but points to the
> full spec and a working design reference so you don't start cold.

---

## 0. Your mission

Produce a **detailed, phased implementation plan** for the *Kiryl* Amazon-PPC
personal-brand portfolio — reusing the `kirusmiller/bb` (Alina) Next.js
architecture and the **locked brand identity** — then, on approval, **scaffold
Phase 1**. Treat the decisions below as settled; don't re-open them. Where you
need a call the user must make, list it, don't guess.

**Primary deliverable:** a page-by-page plan with concrete file paths that mirror
`bb`'s conventions, plus a task breakdown per phase.

---

## 1. Read these first (sources of truth)

1. **`docs/ppc-portfolio-plan.md`** (this repo, branch
   `claude/ppc-portfolio-website-plan-qgs83f`) — the full brief: positioning,
   audiences, IA, reuse map, tools, and the design system in **§9a**. Read it whole.
2. **`docs/brand/kiryl-mark.svg`** — the brand mark (K-in-ring + area-chart ascent).
3. **Working design reference (lift code from it):**
   `https://claude.ai/code/artifact/028a5270-92e9-4561-8e45-4d4d5fdadfbc`
   — WebFetch it. It's production-ready HTML/CSS/SVG with the **embedded fonts**,
   the exact **color tokens**, the **mark** (as an inline `<symbol>`), and the
   **area-chart motif**. Reuse these verbatim rather than re-designing.
4. **Reference codebase:** `kirusmiller/bb` (aka `lashwarszawa-pl`) — the Next.js
   16 static-export multilingual site whose architecture we mirror. Add it with
   `add_repo` if it isn't in your session; read its `CLAUDE.md`.

---

## 2. What we're building (one paragraph)

A personal-brand portfolio for **Kiryl**, an Amazon PPC specialist whose wedge is
**helping brands win on Amazon's European marketplaces**. Goal: build **name
awareness** across Polish specialists/agencies, Polish English-speaking business,
European & American brands selling into the EU, and Russian-speaking sellers — and
convert it into inbound messages. **Trilingual EN/RU/PL. Fully static.** Sections:
Home, Cases, Tools (4 client-side calculators), Blog ("Log"), About, Contact.

---

## 3. Locked decisions (do not re-litigate)

- **Audience/positioning:** personal brand "Kiryl"; wedge = *Amazon EU*.
- **Languages:** EN / RU / PL; **default `/` → `/en/`** (drop Alina's Ukrainian).
- **Hosting/stack:** Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript ·
  **static export (`output: 'export'`) → Vercel** (account connected).
- **Tools:** 4 — search-term, dayparting, ASIN-comparison, reports (weekly/monthly/
  YoY). All process the user's CSV **client-side**; **no AI/server** → site stays
  fully static. Migrate **one at a time**, from Lovable (Vite/React/Tailwind/shadcn)
  and Google AI Studio (React) — rebuild as needed.
- **Lead flow:** "message me" — **email · WhatsApp · LinkedIn**; persistent floating
  button + contact page (reuse `bb`'s `CTALinks`/`FloatingButtons`/`lib/links.ts`).
- **Cases:** real results, **anonymized** ("a DE supplement brand"). Markdown
  frontmatter with before/after ACOS/TACOS/ROAS → auto-rendered metric cards +
  before/after + chart.
- **Domain:** one canonical domain + hreflang (no multi-domain SEO). Recommended
  `kirylppc.com`; `Kiryl.pl` owned → 301 to canonical. *Purchase pending user.*
- **Design:** "Bold Editorial", **Balanced register** — see §5 + plan §9a.
- **New repo** for the site, scaffolded from `bb`'s skeleton (not a fork of lash content).

---

## 4. Architecture to reuse (mirror `bb`'s conventions)

- `app/[lang]/…` static locale routing; `generateStaticParams()` exports en/ru/pl;
  `vercel.json` HTTP redirect for bare `/` → `/en/`.
- **Single sources of truth:** `lib/config.ts` (brand/contact/flags),
  `lib/text.ts` + `lib/locales/{en,ru,pl}.ts` (typed copy — a missing key **fails
  the build**).
- **Content pipeline:** markdown in `content/{lang}/**` via `lib/blog.ts`
  (gray-matter + marked); drafts + `scripts/publish-post.mjs` + `validate-content.mjs`.
- **SEO/infra:** `lib/schema.ts` JSON-LD (swap `BeautySalon` → **`Person` /
  `ProfessionalService`** + `Article`), `app/sitemap.ts`, `app/robots.ts`,
  hreflang, analytics (GTM), cookie consent.
- New surfaces to add: `/tools` hub + 4 tool routes, `/cases` index + `[slug]`,
  a `MetricCard`/results grid, CSV upload/parse UI, the area-chart component.

---

## 5. Design system (summary — full spec in plan §9a, code in the artifact)

- **Register:** modern **but moneyed** — reads as *serious money* to PL/EU/US.
  Navy anchor = cross-market finance trust; a signal-blue trendline is the motif.
- **Color tokens (light):** `--paper #EFEEEA`, `--surface #FBFAF6`, `--ink #191B22`,
  `--muted #62636B`, `--navy #22407A` (brand), `--signal #2E6BE6` (trendline/accent),
  `--good #2F6B4E` (data only), `--brand-line #DEDBD2`. Dark variants in §9a.
  Theme-aware via `prefers-color-scheme` + `data-theme` overrides.
- **Type (embed as `@font-face` data URIs — CSP blocks font CDNs; pull via
  `@fontsource` on npm, the CDN is egress-blocked):** Display/wordmark =
  **Bricolage Grotesque** (700/800); Editorial/metrics/serif-K = **Fraunces**
  (400/600/900 + italic); Figures = mono, tabular; **Anton** reserved.
- **Mark:** serif **K in a ring** (status) whose upper arm is a small **area chart
  breaking through the ring** (growth). Navy ring/K, **navy tonal gradient fill,
  signal-blue rising line + endpoint point**. Variants: primary / reversed / mono /
  flat; **≤16px drops the gradient** for a clean favicon. The mark *is* the motif.
- **Motif:** the same area chart (line + gradient fill + endpoint) as keyword
  underlines, metric cells, dividers. Never a bare squiggle.
- **⚠️ Build gotcha:** drive SVG gradient stops from **`currentColor`**, not a CSS
  `var()` — inside an SVG `<use>` shadow tree, `var()` on `stop-color` falls back
  to black. (Cost us a round; the artifact already uses the fix.)
- **Layout:** confident hero → serif, rule-lined, tabular-number proof. One accent,
  used sparingly. Semantic green stays separate from the brand.
- **Optional add-ons** (not core): gold "audited results" **seal** on case studies;
  a metrics **ticker** homepage band.

---

## 6. Information architecture

```
/[lang]/                      Home — hero + results bar + featured cases + tool teasers + CTA
/[lang]/cases/                Case-study index (filter by marketplace/niche/result)
/[lang]/cases/[slug]/         Case study (before→after metrics + chart)
/[lang]/tools/                Tools hub
/[lang]/tools/search-terms/   Search-term analysis        (client-side CSV)
/[lang]/tools/dayparting/     Dayparting analysis          (client-side CSV)
/[lang]/tools/asin-compare/   ASIN comparison              (client-side CSV)
/[lang]/tools/reports/        Reports — weekly/monthly/YoY (client-side CSV)
/[lang]/blog/                 The "Log" — index
/[lang]/blog/[slug]/          Post
/[lang]/about/                About Kiryl
/[lang]/contact/              Contact — email · WhatsApp · LinkedIn
```

---

## 7. Suggested phasing (expand into concrete tasks)

- **P1 Scaffold:** new repo from `bb` skeleton; en/ru/pl; layout shell + nav with
  the mark; brand tokens + embedded fonts; favicon set; deploy to a Vercel preview.
- **P2 Content spine:** Home (hero + results bar + CTA), About, Contact; blog
  pipeline live with 1–2 seed posts.
- **P3 Cases:** frontmatter data model + 2–3 anonymized cases + before/after chart.
- **P4 Tools:** migrate one-by-one from Lovable/AI Studio; `/tools` hub + inline
  lead capture; all client-side.
- **P5 Polish/SEO:** hreflang, JSON-LD (Person), sitemap, OG images, analytics,
  consent, performance; domain + redirects.

---

## 8. Inputs still needed from Kiryl (list, don't invent)

- **Domain:** confirm/purchase `kirylppc.com` (+ optional `kiryl.pro`).
- **Contact details:** real email, WhatsApp number, LinkedIn URL for `lib/config.ts`.
- **Tool order:** which of the 4 tools to migrate first.
- **Tool source:** GitHub-export/URLs for the Lovable + AI Studio tools when ready.
