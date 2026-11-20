# Master Project Control Board (`TRACKER.md`)

> **Purpose:** One living, zero-bloat status board so neither you nor any AI agent ever forgets what comes next or lets files go stale.  
> **Strict Maintenance Rule:** Always **edit status tags and notes in place** (keep this file **<= 120 lines** — NEVER append diary logs!).

## Allowed State Tags
`[PLANNED]` · `[IN_PROGRESS]` · `[DRAFT_V1]` · `[NEEDS_FIX]` · `[READY_FOR_REVIEW]` · `[APPROVED_VERIFIED]` · `[DEPRECATED]`

---

## Phase 0 — Foundation, Workspace Hygiene & Tooling

| ID | Item | Status | Owner / File | Notes / Next Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **P0-1** | Clean folder rename (`250-degree-Kitchen`) | `[APPROVED_VERIFIED]` | Repo root | Trailing space removed cleanly on disk. Open a **fresh chat** here for terminal commands! |
| **P0-2** | Anti-pollution docs (`AGENTS.md`, `PARTNER-PROFILE.md`, `STATUS.md`, `DECISIONS.md`, `WORKSPACE-MAP.md`, `UX-FEEDBACK-AND-DESIGN-BRIEF.md`) | `[APPROVED_VERIFIED]` | Root + `02-design-vision/` | 100% synced (including `AGENTS.md` updated w/ user approval) to Pure White `shadcn base-luma` Design-as-Code! |
| **P0-3** | Skills, MCP & UI Linter (`shadcn` MCP + `.agents/skills/shadcn/` + 4 selective `emilkowalski/skills` + `unslop-ui` + `better-accessibility` + `better-layout` + `lintapple`) | `[APPROVED_VERIFIED]` | `~/.gemini/config/mcp_config.json` & `.agents/skills/` | All 4 selective Emil skills (`apple-design`, `emil-design-eng`, `gestures`, `mobile-native`) + `lintapple` devDependency installed! |
| **P0-4** | New clean GitHub repo (`depi-kitchen-capstone`) | `[APPROVED_VERIFIED]` | `ahmed8ch/depi-kitchen-capstone` | Fresh repo created & Commit #1 (`8430912`) pushed (`C-07` — isolated from legacy `depi_Capstone`). |
| **P0-5** | Linter lock (`@nkzw/oxlint-config@3.0.0` + `tsrs` + `Array<T>` + `fast-check`) | `[APPROVED_VERIFIED]` | `04-prep-packs/engineering/05-*.md` | Locked as primary config; `oxlint-tsgolint` kept as 30s fallback. |

---

## Phase 1 — Brand Assets, Arabic Copy & Design-as-Code Pivot

| ID | Item | Status | Owner / File | Notes / Next Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **P1-1** | **User's Custom `FlameLink` Platform Logo** | `[APPROVED_VERIFIED]` | `assets/logos/flamefire finale v1.svg` (+ `.png` & white-on-crimson SVG) | Kinetic flame + speed-line "F" (`#FF0055`→`#E50953` on pure white). Wire straight into footer & KDS! |
| **P1-2** | Final Restaurant Name (**`Krave` / `كريف`**) & Warm Coral Storefront Accent | `[APPROVED_VERIFIED]` | `src/config/brand.ts` & `DECISIONS.md` (`L-08`) | Locked **`Krave` (`كريف`)** + Warm Coral default (`oklch(0.575 0.195 35)`), strictly separated from `FlameLink` platform! |
| **P1-3** | Natural Cairo Arabic & 20-Dish Sync Audit | `[APPROVED_VERIFIED]` | Prep Packs `07` & `14` | **0** `"ع"` shorthand left (always full `على`), 20 dishes 1:1 synced (`ReadonlyArray<T>`), zero login strings, 241-key parity! |
| **P1-4** | Unified Sunlit Studio Photography (20 dishes) | `[DRAFT_V1]` | Artifact dir (`8` initial `.jpg`s) | Shoot remaining dishes cleanly via Google Flow (`pure white / bright surface pop`) when ready. |
| **P1-X** | Legacy Canvas Drafts (`prototype/index.html`, `250 degree.pen`, old `logos/*.svg`, Paper v1.1) | `[DEPRECATED]` | Superseded drafts | **DO NOT COPY!** Rejected muddy beige (`#F4F0E8`) & fake drawn boxes — replaced 100% by **real `shadcn base-luma` Design-as-Code** (`P2-1`)! |

---

## Phase 2 — Real `shadcn base-luma` Design-as-Code + Convex Build (START HERE!)

| ID | Item | Status | Owner / File | Notes / Next Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **P2-1** | **Day-1 Real Scaffold:** Vite 8 + React 19 + TS + Tailwind v4 + **real `npx shadcn@latest init` (`Base UI` + `Luma` style)** + official `shadcn MCP` + `Hugeicons` + TanStack Router + Convex 1.51 + `@nkzw/oxlint-config` + `ui-policy.json` (`lintapple`) | `[APPROVED_VERIFIED]` | Repo root + `src/` + `ui-policy.json` | Clean scaffold + `lintapple` policy (`npm run lint:ui`) + all 12 visual audit fixes resolved in `Krave` overhaul! |
| **P2-2** | Pure Domain Engines + Vitest + `fast-check` Property Tests (`bill-engine`, `modifier-pricing`) | `[IN_PROGRESS]` | `src/domain/money.ts` + Prep Pack `02` | `splitEquallyPiasters` + `formatEgp` + 5 `fast-check` tests green; expand full `bill-engine` & `modifier-pricing` 45-case matrix next. |
| **P2-3** | **Real `/` Storytelling Home (Pure White `base-luma`):** Scroll-compacting nav + Hero w/ real food photo + **CSS-3D-tilted Interactive SVG iPhone Pro** (NO Three.js!) + Photo Fire Stations + Grok-style Obsidian KDS Band + Visit/Cairo Clock Strip (above footer) + **Tall Interactive `KRAVE` `AsciiFooter` (`72vh+`)** | `[APPROVED_VERIFIED]` | `src/routes/index.tsx`, `InteractivePhoneShowcase.tsx`, `AsciiFooter.tsx` | Visually verified across Desktop `1440×900`, Mobile `390×844`, and `ar-EG` RTL (`0` console/network/overflow errors)! |
| **P2-4** | **`/menu` (20 Dishes)** + **Phone-Width Floating Animated `Drawer` (`max-w-[420px]`)** + Share Dish + Spicy/Charcoal CSS Cursors + Floating Cart Dock + Trailing Side `Sheet` | `[APPROVED_VERIFIED]` | `src/routes/menu.tsx`, `DishCustomizerDrawer.tsx`, `TableCartSheet.tsx` | Visually verified: 20/20 photos loaded, `420px` desktop / `358px` mobile height-morphing drawer, exact piaster math, floating cart dock, live 86 sync! |
| **P2-5** | **`/table` QR/PIN Join (ZERO Login!)** w/ **Bayer 4×4 `<DitherGlow />` Side Panel** + **Serrated Paper Receipt** + **Swipe-to-Send Slider** + **`/track` & `/track/$orderId`** + **Creative Bilingual 404** | `[APPROVED_VERIFIED]` | `TableShellView.tsx`, `track.index.tsx`, `track.$orderId.tsx`, `RouteNotFound.tsx` | Visually verified EN + mirrored `ar-EG` RTL: Bayer dither panel, unified numerals, end-to-end order firing to `/track/$orderId` & `/kds`! |
| **P2-6** | **`/kds` Grok-Bot Obsidian Kitchen Pass** + Multi-Ticket Board + Translucent Status Pills + Overdue `12m+` Alerts + Live `86 · Stock Manager` (20 dishes) + Web Audio Chime | `[APPROVED_VERIFIED]` | `src/routes/kds.tsx` | Visually verified: Obsidian pass board, overdue `12m+` crimson alerts, live timers, ticket bumping, 20-dish 86 switch sync to `/menu`! |

---

## Phase 3 — Tier 2, Optional Opus 5.5 Craft Pass, QA & DEPI Defense (Dec 4 – Dec 12)

| ID | Item | Status | Owner / File | Notes / Next Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **P3-1** | **Tier 2 #1:** Bilingual EN ↔ Natural Cairo Arabic (`ar-EG` RTL + optical size parity) | `[PLANNED]` | Prep Packs `06`, `14` | Run `unslop-ui` BEFORE freezing `ar.json`; `[dir="rtl"] { letter-spacing: 0 }`. |
| **P3-2** | **Tier 2 #2:** Stripe Sandbox Checkout (test cards only) | `[PLANNED]` | Prep Pack `06` | Only after `P2-5` works end-to-end. |
| **P3-3** | **Layer 3 Delight + Optional Targeted Opus 5.5 Polish Pass:** Notion-style peeking micro-doodles + fine typography/spacing polish | `[PLANNED]` | Real GitHub repo | Use limited Opus 5.5 credits ONLY here on real working `shadcn` code! |
| **P3-4** | Final QA Gate (`unslop-ui` + `better-accessibility` + `better-layout` + `lintapple` + `cloudflare/security-audit-skill` + Playwright E2E + Lighthouse) & **Cloudflare Deploy** | `[PLANNED]` | Prep Pack `11` | Run `cloudflare/security-audit-skill` + re-enable Cloudflare MCP ONLY here (Dec 8–10). Hard freeze Dec 9–11! |
| **P3-5** | DEPI Pitch Deck (3D Figma/Unblast phone renders for slides ONLY), `README.md` & 5-Min Dual-Screen Demo | `[PLANNED]` | Prep Pack `10` | Hard Deadline: **December 12, 2026**. |
