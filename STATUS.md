# Project Status & Session Handoff (`STATUS.md`)

> **Last Updated:** 2026-11-19 (Flagship **`Krave` (`كريف`)** Storefront + Menu + Table + Track + Obsidian KDS Overhaul Complete; Running Live Visual Verification & Final Polish!)  
> **Deadline:** 2026-12-12 (**23 days remaining**)  
> **Current Phase:** **Live Visual Audit & Polish (`P2-3`–`P2-6`) → Convex Live Real-Time Backend (`P2-7`) & Stripe Sandbox (`P3-2`)**

---

## 1. Read First on Every New Session (Zero Context Loss!)
1. `STATUS.md` (this file)
2. `DECISIONS.md` (hard constraints `C-01`–`C-08` & locked decisions `L-01`–`L-08`, including locked brand **`Krave` / `كريف`**!)
3. `PARTNER-PROFILE.md` (exact human taste, likes/dislikes, easter eggs, naming vetoes, tool budget)
4. `02-design-vision/UX-FEEDBACK-AND-DESIGN-BRIEF.md` & `02-design-vision/references/SYNTHESIS.md` (`CoolDock`, `Google Playground`, `Stitch Loop`, `Dreambeans` craft DNA)
5. `TRACKER.md` & `WORKSPACE-MAP.md` (status board & authoritative file map)

---

## 2. What Is Built & Verified Live in Code (`src/`)
- **Brand & Surface System Locked (`L-07`, `L-08`):**
  - **Restaurant Brand:** **`Krave` (`كريف`)** (`src/config/brand.ts`) with Warm Coral-Flame (`oklch(0.575 0.195 35)`) on Pure Crisp White `#FFFFFF`.
  - **Platform Brand:** **`FlameLink`** (`src/assets/logos/flamelink-mark.svg` & padded `flamelink-badge.svg`) strictly scoped to `"Powered by FlameLink"` in `AsciiFooter`, the single Obsidian KDS showcase band on `/`, and `/kds`.
  - **`lintapple` Policy Configured:** `ui-policy.json` created at repo root + `"lint:ui": "lintapple http://localhost:5173"` added to `package.json`.
  - **7 Zero-Text Studio Photos Wired:** `/images/hero-hearth-table.jpg`, `dish-smoked-smash.jpg`, `dish-hot-honey-pizza.jpg`, `dish-charcoal-kofta.jpg`, `dish-loaded-fries.jpg`, `dish-turnover-pie.jpg`, `dish-lemon-mint.jpg` (`brand-packaging.jpg` excluded because it carried legacy `"250°"` print).
- **Complete Interactive Multi-Page Experience:**
  - **`/` (Pure Storytelling Home):** CoolDock frosted pill navbar (`Krave` mark, zero dev switcher) → Editorial Hero + rounded 32px hero spread + floating dark Table Preview bar → Google Playground 3-tab switcher + spring CSS-3D iPhone 16 Pro w/ live interactive split-bill & Notion peeking eyes → 3 shadowless real-photo Fire Station spotlight cards → 3-photo Sides/Pies/Drinks strip → Grok-Bot Obsidian KDS band → Live Cairo (`Africa/Cairo`) Hours strip → Tall `72vh+` 60fps glyph-atlas **`KRAVE` `AsciiFooter`** w/ hover scramble, 4-layer progressive blur & Daylight Joke ripple/shake/Popover (`Open Kitchen Pass ->`).
  - **`/menu` (All 20 Bilingual Dishes):** High-contrast category pills (`All`, `Burgers`, `Pizza`, `Grill`, `Sides`, `Drinks & Pies`) + `Spicy`/`Vegetarian` quick toggles + instant search + deep-links (`/menu?category=...&dish=...`) + scoped `pointer: fine` custom SVG cursors (Fork / Chili / Charcoal) + `<ShareDishButton />` + real-time `86 · Sold out` sync + **Floating Phone-Width Height-Morphing `DishCustomizerDrawer` (`max-w-[420px] rounded-[32px]`)** (`Customize` ↔ `Ingredients & Info` + `− qty +` + live `<RollingNumber>`) + CoolDock Floating Dark Cart Dock + **Trailing Side `TableCartSheet`** with exact integer-piaster totals.
  - **`/table` & `/table/$tableNumber`:** **Side-Split Bayer 4×4 `<DitherGlow />` Table Check-In** (ZERO login `C-08`!) + **Serrated Thermal `<PaperReceiptCard>`** showing full itemized table check, 3-way split (`Pay Full` / `My Items` / `Split Equally` `÷ 2–5` via integer-piaster `splitEquallyPiasters`), and tactile **`<SlideToConfirm>`** (`WCAG 2.5.7` click/keyboard fallback + `loading.dev`-inspired `<KitchenLoader />`) firing real orders live to `/kds` & `/track/$orderId`!
  - **`/track` & `/track/$orderId`:** Active orders directory + ID lookup + live 3-stage progress bar synced with `/kds` + serrated thermal order receipt.
  - **`/kds` (Grok-Bot Obsidian Kitchen Pass):** Multi-ticket glare-free dark board, station filter pills, ticking elapsed timers w/ auto `12m+` crimson Overdue alerts, Web Audio pass chime toggle, single-tap status transitions (`Start Firing` → `Mark Ready` → `Bump Served`), and searchable full 20-dish `86 · Stock` live switches!
  - **`404` (`RouteNotFound`):** Creative bilingual `404s.design`-inspired hospitality error page.

---

## 3. Immediate Next Action (After Visual Audit Sign-Off)
1. Run verification & commit from the clean workspace root (`/Users/apple/Downloads/dev/antigravity/250-degree-Kitchen`):
   `npm run lint && npm run typecheck && npm run test && npm run build && npm run lint:ui`
2. Expand `src/domain/` 45-case `fast-check` + Vitest matrix (`bill-engine` & `modifier-pricing`) (`P2-2`).
3. Wire live Convex real-time tables/orders/86 sync (`P2-7`) replacing `localStorage` persistence, then Stripe Sandbox Checkout (`P3-2`) & Cloudflare Workers deployment (`P3-4`).
