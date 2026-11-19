# Workspace File Map (`WORKSPACE-MAP.md`)

> **Why This Exists:** Quick 1-page directory index so any brand-new agent (or you!) instantly knows what is authoritative, where real brand assets live, and what old drafts to ignore — zero confusion, zero reading 20 files blindly.

---

## Tier 1 — Always Read First (Core Control Files in Repo Root)
1. **[STATUS.md](./STATUS.md)** — Live session handoff & exact next command to run right now.
2. **[PARTNER-PROFILE.md](./PARTNER-PROFILE.md)** — Human partner's exact tastes, pure-white `base-luma` vision, original easter eggs, naming vetoes & model/MCP budget.
3. **[DECISIONS.md](./DECISIONS.md)** — Hard constraints (`C-01`–`C-08`) & locked decisions (`L-01`–`L-07`).
4. **[TRACKER.md](./TRACKER.md)** — Living single-source status board across all phases.
5. **[AGENTS.md](./AGENTS.md)** *(HUMAN-LOCKED — updated Nov 19)* — Coding, Design-as-Code, Pure White `base-luma`, `@nkzw/oxlint-config` + `tsrs` + `Array<T>`, anti-slop, RTL, and visual taste verification rules.
6. **[.agents/skills/shadcn/SKILL.md](./.agents/skills/shadcn/SKILL.md)** *(AUTO-DISCOVERED WORKSPACE SKILL!)* — Official `shadcn/ui` Base UI skill + `base-vs-radix`, `composition`, `forms`, `icons`, `styling`, `mcp`, and `customization` rulebooks.

---

## Tier 2 — Real Brand Assets & Authoritative UX Spec
- **[02-design-vision/LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md](./02-design-vision/LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md)** *(ACTIVE FIX SPEC — READ IMMEDIATELY!)* — Complete live audit of `http://localhost:5173/`, exact `cp` command for all 8 studio food photos, Brand Separation (`FlameLink` = platform/KDS only!), Phone-Width Floating Animated Drawer (`max-w-[420px]`), Tall Interactive `AsciiFooter`, Bayer 4×4 `<DitherGlow />`, Grok Bot Obsidian `/kds`, Serrated Paper Receipt, Share Dish, Swipe-to-Send, Spicy CSS Cursor, Creative 404, and Section-by-Section workflow!
- **`assets/logos/`** *(USER-BUILT — `[APPROVED_VERIFIED]`!)*
  - **[flamefire finale v1.svg](./assets/logos/flamefire%20finale%20v1.svg)** & **[flamefire finale v1.png](./assets/logos/flamefire%20finale%20v1.png)** + white-on-crimson badge SVG — User's real **`FlameLink`** platform mark (`#FF0055` → `#E50953` on pure white)!
- **[02-design-vision/UX-FEEDBACK-AND-DESIGN-BRIEF.md](./02-design-vision/UX-FEEDBACK-AND-DESIGN-BRIEF.md)** *(AUTHORITATIVE UX & CREATIVE BRIEF!)* — Pure white `shadcn base-luma` palette, multi-page routes, Apple Bottom Sheet / Side Sheet grammar, **Cue interactive halftone `<canvas>` footer (`75–85vh`)**, dark-mode shake-popover Easter egg, Cairo live clock, CSS-3D interactive SVG iPhone frame, Notion peeking doodles, Arabic rules, and complete brainstorm/veto archive!
- **[02-design-vision/CREATIVE-TOOLBOX-AND-LAYERS.md](./02-design-vision/CREATIVE-TOOLBOX-AND-LAYERS.md)** & **[ASSET-STRATEGY.md](./02-design-vision/ASSET-STRATEGY.md)** — 3-Layer Cake system, creative tools audit & asset formats.
- **[02-design-vision/BRAND-IDENTITY-AND-LOGO-RESEARCH.md](./02-design-vision/BRAND-IDENTITY-AND-LOGO-RESEARCH.md)** — KSA/UAE & Global F&B branding research.
- **`02-design-vision/references/`** — `SYNTHESIS.md` + 5 site teardowns + screenshots (`CoolDock`, `Dreambeans`, `Playground`, `Stitch Loop`, `Firecrawl`).

---

## Tier 3 — Build-Ready Engineering & Product Prep Packs (`04-prep-packs/`)
Load ONLY the specific pack needed for the sprint you are building:
- **Engineering (`04-prep-packs/engineering/`):**
  - `01-convex-schema-and-realtime-architecture.md` — Convex 1.51 schema & `<300ms` sync contracts
  - `02-pure-domain-engines-and-tdd-spec.md` — Integer-piaster `bill-engine`, `modifier-pricing`, 45-case Vitest TDD matrix
  - `03-shadcn-base-luma-hugeicons-playbook.md` — Real `shadcn base-luma` (`@base-ui/react`), `Drawer`/`Sheet`/`Popover`, `Hugeicons` `<AppIcon />`, OKLCH CSS *(override background tokens to pure white `#FFFFFF` per `C-05`!)*
  - `04-tanstack-router-forms-and-react19-patterns.md` — Vite 8, TS 7/6, multi-page TanStack Router, TanStack Form, Zod v4
  - `05-quality-gates-oxlint-testing-cloudflare.md` — `@nkzw/oxlint-config` + `tsrs` + `Array<T>`, `fast-check`, Vitest, Playwright, Cloudflare CI
  - `06-tier2-modules-auth-stripe-rtl-blueprints.md` — Bilingual `ar-EG` RTL + Stripe Sandbox *(ignore Staff Auth/Login section — permanently vetoed by `C-08`!)*
  - `13-interactive-component-architecture-and-state-machines.md` — 4 state machines & 15 custom React hooks
- **Product, Copy & QA (`04-prep-packs/product-and-design/`):**
  - `07-curated-16-dish-menu-and-modifiers.md` — Expanded **20-dish** Open-Fire menu (5×4 balanced) + 19 modifier groups + audited Cairo Arabic
  - `09-delight-microinteractions-and-footer-spec.md` — `rolling-number`, **Cue interactive halftone `<canvas>` footer**, shake-popover daylight switch, KDS chime
  - `10-depi-evaluator-defense-and-demo-script.md` — DEPI rubric mapping & 5-minute dual-screen demo script
  - `11-real-qa-and-anti-slop-verification-gate.md` — Unalterable binary `APPROVE / BLOCK` QA scorecard
  - `12-23-day-solo-execution-schedule.md` — 23-day solo build calendar (2.5–3.5 hr/day)
  - `14-ready-seed-data-and-i18n-dictionaries.md` — Copy-ready `en.json`, audited `ar.json` (**0** `"ع"` shorthand!), and `convex/seedData.ts`
- **Reference Audits:** `00-workflow/ANTIGRAVITY-PLAYBOOK.md` · `01-audit/LEGACY-AUDIT.md` · `01-audit/TECH-FACT-CHECK-2026-11-19.md` · `03-decisions/SIX-DECISIONS-ROADMAP.md`

---

## Tier 4 — `[DEPRECATED]` Drafts (DO NOT Copy Tokens or Layouts!)
- ~~`02-design-vision/prototype/index.html`~~ — Old 1-page vanilla HTML tester (beige/fake UI)
- ~~`250 degree.pen`~~ — Rejected `pen.dev` beige/orange fake-`shadcn` screens
- ~~`02-design-vision/logos/concept-1..3*.svg`~~ — Old bare vector logo drafts
- ~~`02-design-vision/VISUAL-DIRECTION.md`~~ — Contains superseded warm-linen `#F4F0E8` / `250°` tokens (superseded by **pure white `#FFFFFF` + `UX-FEEDBACK-AND-DESIGN-BRIEF.md`**!)
- ~~`04-prep-packs/product-and-design/08-paper-mcp-budgeted-wireframe-blueprint.md`~~ — Superseded by **Design-as-Code** (`L-06`)
