# Project Decision Register (`DECISIONS.md`)

> **Rule:** Only decisions explicitly confirmed by the user belong under **Locked Decisions**. Never silently reverse a locked decision; if new evidence challenges one, log a proposed amendment and ask the user first.

---

## Hard Project Constraints (Non-Negotiable)

| ID | Constraint | Source |
| :--- | :--- | :--- |
| **C-01** | **Frontend Framework:** React + TypeScript (mandatory for DEPI Egypt React Front-End Internship). | User (2026-11-19) |
| **C-02** | **Grading Focus:** 100% graded on **Frontend Architecture, UI/UX Polish, and Code Quality** (backend is glue for velocity & live interactivity). | User (2026-11-19) |
| **C-03** | **Budget:** Free tier only for all hosting, database, and tooling. | User (2026-11-19) |
| **C-04** | **Deadline:** **December 12, 2026** (solo builder + AI agents, alongside a second concurrent course). | User (2026-11-19) |
| **C-05** | **Theme Polarity & Surface:** **Crisp Pure WHITE (`#FFFFFF`) light-mode default** with clean neutral `shadcn base-luma` surfaces (`#FAFAFA` / `#F4F4F5` / `#09090B` ink). **Muddy beige/cream (`#F4F0E8`) REJECTED.** Selective dark contrast only where earned (Floating Cart Dock on `/menu`, `/kds`, one showcase contrast band on `/`). | User (2026-11-19) |
| **C-06** | **Color Territory, Brand Separation & User Logo:** Swappable `oklch()` semantic tokens. **Strict Brand Separation:** **`FlameLink`** (`assets/logos/flamefire finale v1.svg` & padded square `flamelink-badge.svg`: vivid `#FF0055` → `#E50953`) is **STRICTLY the platform/KDS brand** (`"Powered by FlameLink"` footer + `/kds` + dark KDS band) — **NEVER the main restaurant brand in the storefront navbar!** Default restaurant storefront `--primary` is **warm appetizing Coral-Orange (`oklch(0.575 0.195 35)`)** on `#FFFFFF` with white text. Heavy dark burgundy (`Palette C`) & muddy beige (`#F4F0E8`) explicitly **REJECTED**. Zero legacy `DESIGN-SYSTEM.md` values. | User (2026-11-19) |
| **C-07** | **Legacy Isolation:** `/Users/apple/Desktop/Projects/depi_Capstone` is untrusted legacy material; start a **brand-new GitHub repository** (e.g., `depi-kitchen-capstone`) — never connect to legacy repo. | User (2026-11-19) |
| **C-08** | **Zero Login / Zero Accounts:** **NO login, NO signup, NO user accounts anywhere in the app.** Guest table joining uses frictionless 4-digit Table PIN + display name only. | User (2026-11-19) |

---

## Locked Decisions (User Confirmed)

| ID | Decision | Locked Choice | Date |
| :--- | :--- | :--- | :--- |
| **L-01** | **Core Stack & Latest-First Policy** | React `19.3.1`, Vite `8.3.8`, TypeScript `7.0.2` (TS 6 fallback if needed), **real `shadcn/ui` `base-luma`** (`@base-ui/react` + Tailwind CSS v4 `oklch()`), `Hugeicons` (`<AppIcon color="currentColor" />`), TanStack Router & Form, Zod v4, Convex `1.51.0`, Cloudflare Workers Static Assets. | 2026-11-19 |
| **L-02** | **Linter, Type Style & Verification** | **`@nkzw/oxlint-config@3.0.0` + `tsrs`** (4 safe Convex/React overrides, skip `/with-sorting`, `oxlint-tsgolint` 30s fallback), explicit **`Array<T>` / `ReadonlyArray<T>`**, Vitest + `convex-test` + **`fast-check` property-based tests**, Playwright E2E, human-locked `AGENTS.md`. | 2026-11-19 |
| **L-03** | **Design Skills & UI Linter Stack (Lean & Verified)** | Official `.agents/skills/shadcn/` + **4 selective `emilkowalski/skills`** (`emil-design-eng`, `apple-design`, `gestures`, `mobile-native`) + **`felipebasurto/unslop-ui`** (run pre-`ar.json` freeze) + **`better-accessibility` & `better-layout`** (`jakubkrehel/skills`) + deterministic **`gholtzap/lintapple`** (`npm i -D lintapple` / Playwright `expectUI`). Defer `cloudflare/security-audit-skill` to Deploy Week (`Dec 8–10`). Skip `ui-skills.com`, `agent-browser`, `senior-frontend`, `asciify.org`, `loading.dev`. | 2026-11-19 |
| **L-04** | **Culinary Identity & Expanded Menu** | **Modern Cairo Open-Fire Kitchen** (Cast-Iron Smash + Stone-Deck Pizza + Oak Charcoal Grill) with **20 balanced dishes** (5 categories × 4 dishes), natural Egyptian Arabic (`ar-EG`, full **`على`** — never `"ع"`, zero cringe translations). | 2026-11-19 |
| **L-05** | **Tier 2 Feature Priority Order** | **#1 Bilingual EN ↔ Natural Cairo Egyptian Arabic (`ar-EG` RTL + optical font-size parity + `localStorage` persistence)** → **#2 Stripe Sandbox Checkout** (test cards only, built after core app works) → **#3 Optional QR Table Card Generator** (strictly later if time allows). *Zero login/accounts (C-08).* | 2026-11-19 |
| **L-06** | **Design-as-Code, Section-by-Section Craft & Apple Sheet Grammar** | **STOP fake canvas wireframes (`pen.dev`/Kite/Paper) & stop bulk 1-shot page dumps!** Build **Design-as-Code ONE section at a time (Kamran Ahmed method)** in Vite + React + real `shadcn base-luma` (`shadcn MCP`). Multi-page routes (`/` pure storytelling w/ NO menu/cart widget; Live Cairo Clock right **above footer**); Dish Customizer = **Phone-Width Floating Animated `Drawer` (`max-w-[420px] rounded-[32px]`, `@base-ui/react` + `motion/react` + `ResizeObserver`)** with `− 1 +` stepper & Share Dish (`/menu?dish=<slug>`); Cart = **Trailing Side `Sheet`**; **Tall (`75vh+`) 60fps Glyph-Atlas `AsciiFooter`** + Daylight Joke ripple/shake/Popover (`Open Kitchen Pass ->`); **Bayer 4×4 `<DitherGlow />`** side panel on `/table` (zero login!); **Grok-Bot Obsidian `/kds`**; **Serrated Paper Receipt**; **Slide-to-Send (`WCAG 2.5.7` fallback)**; **CSS-3D SVG iPhone Pro** (NO Three.js!); scoped **menu CSS SVG cursors** (`pointer: fine`); bilingual **`404s.design` 404**. | 2026-11-19 |
| **L-07** | **Strict Brand Separation (`FlameLink` Platform vs. Restaurant)** | User's bespoke SVG (`assets/logos/flamefire finale v1.svg` + padded square `flamelink-badge.svg`) is **STRICTLY for `"Powered by FlameLink"` in the footer, `/kds` Kitchen Pass header, and dark KDS showcase band** — NEVER the main restaurant brand in the storefront navbar! | 2026-11-19 |

---

## Remaining Open Decisions (Final 1 Lock + 1-Line Swappable Accent)

| ID | Decision Area | Notes & Vetoes | Status |
| :--- | :--- | :--- | :--- |
| **D-01** | **Final Restaurant Name & Restaurant Brand Mark** | **Platform Name:** `FlameLink` (logo already made in `assets/logos/`!).<br>**Restaurant Candidates:** `KRAVE`, `KAIRO`, `BRIK`, `360°` (or fresh pick). Stored in single `src/config/brand.ts` constant so swapping updates Navbar, Hero & `AsciiFooter` in 1 line!<br>**VETOED (NEVER suggest again):** `Jamr` (Hajj), `Dakka` (koshary), `Char`, `Sear`, `Sizzle`, `Area 20`, standalone `250°`, `Firepass`. | **Open — 1-line swap in `src/config/brand.ts`** |
| **D-02** | **Primary Restaurant Accent Color on Pure White `#FFFFFF`** | Default storefront accent set to **Warm Coral-Orange (`oklch(0.575 0.195 35)`)** on `#FFFFFF` (`>= 4.5:1` AA w/ crisp white text across all button sizes!). `FlameLink` Rose-Crimson (`#FF0055` / `#E50953`) stays scoped to `FlameLink` badges & `/kds`. Zero dev color switcher exposed in guest navbar! | **Default Locked (1-line OKLCH tweakable)** |
