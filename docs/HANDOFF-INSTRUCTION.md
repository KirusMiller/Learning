# Kickoff instruction — paste into a fresh Fable 5 session

Start a fresh **Fable 5** (Claude Code) session with access to the
**`KirusMiller/Learning`** repo (branch `claude/ppc-portfolio-website-plan-qgs83f`),
then paste the block below. Fable's first response should be an implementation
**plan for your approval — not code.**

Have ready (or let Fable use `TODO(kiryl)` placeholders): **repo name**, **domain**,
**contact details** (email / WhatsApp / LinkedIn), **which tool first + its export/URL**.

---

```
You are taking over the build of "Kiryl" — an Amazon PPC specialist personal-brand
portfolio. Everything you need is committed in the repo KirusMiller/Learning, branch
claude/ppc-portfolio-website-plan-qgs83f, under docs/.

START HERE:
1. Read docs/fable5-handoff.md in full and follow its §0a "First actions" in order.
   That file is the entry point; it links the full brief (docs/ppc-portfolio-plan.md)
   and the self-contained brand kit (docs/brand/).
2. Then read docs/ppc-portfolio-plan.md (esp. §9a design system) and open
   docs/brand/identity-reference.html — that render is the visual target; match it,
   and reuse the tokens, fonts, and mark from docs/brand/ (do NOT fetch fonts from a CDN).
3. Try add_repo kirusmiller/bb (the Next.js reference architecture to mirror). If you
   can't access it, use the cheat-sheet in handoff §17 — don't block on it.

YOUR FIRST DELIVERABLE is a detailed, page-by-page implementation plan that mirrors
bb's conventions (handoff §12 tree), honors the data contracts (§13) and the
per-phase Definition of Done (§14), and proposes the EN-only MVP (§10). Present that
plan for my approval BEFORE scaffolding any code.

CHALLENGE THE BRIEF — don't just comply. Before accepting the plan as written, flag
anything you'd architect differently, and propose the distribution/content strategy
that the brief is missing (see handoff §9.1–§9.2). I want your independent judgment.

RULES:
- Treat handoff §3 (locked decisions) and the docs/brand/ identity as settled — reuse
  them, don't re-derive them.
- Never invent domains, contact details, or metrics — use TODO(kiryl) placeholders
  and list what you need from me (handoff §8).
- Surface the risks in handoff §9 in your plan rather than papering over them.

Do not create the new site repo or write site code until I approve the plan and give
you the repo name.
```

---

### Why hand off (vs. starting from scratch)

Reuse, don't recreate: the **brand identity** (in `docs/brand/`) took several rounds
of the owner's own taste calls and is endorsed — recreating it costs your time and
risks a worse result. Same for the **locked decisions** and the **`bb` architecture
reuse**. The implementation plan and code are still Fable's to produce and you to
approve, so a fresh model keeps full engineering latitude — and the "challenge the
brief" line makes sure you get independent judgment on the plan and on the strategy
gap (distribution + content) that the brief is weakest on.
