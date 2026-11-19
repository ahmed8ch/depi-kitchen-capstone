# Project Agent Instructions (`AGENTS.md`)

> **Date Anchor:** November 2026 (Capstone Deadline: **December 12, 2026**). **ALWAYS assume your training knowledge is outdated.** Before inventing custom solutions or writing code for any tool, library, version, skill, or design pattern, **search the web, GitHub, and `skills.sh` first** and check Context7 MCP / official docs / `shadcn` MCP.

## 0. Human-Approval Lock Policy (Read-Only Rulebook for Coding Workers)
- **This file is LOCKED against autonomous edits by coding/worker sessions.** Treat `AGENTS.md` like `.github/workflows/`: workers must NEVER silently rewrite, append to, or relax rules here.
- Only the human partner (or explicitly pre-authorized Lead Architect updates) may modify `AGENTS.md`. Workers routinely update only `STATUS.md`, `TRACKER.md`, and `DECISIONS.md` (after user sign-off).

## 1. Read First on Every New Session (Anti-Pollution Protocol)
1. Read `STATUS.md` (live handoff state & exact next step).
2. Read `02-design-vision/LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md` while executing active UI overhaul/fix sprints.
3. Read `PARTNER-PROFILE.md` (human partner tastes, pure-white `base-luma` vision, easter eggs, vetoes, Opus credit rules).
4. Read `DECISIONS.md` (hard constraints `C-01`–`C-08` & locked decisions `L-01`–`L-07`).
5. Read `02-design-vision/UX-FEEDBACK-AND-DESIGN-BRIEF.md` & `02-design-vision/references/SYNTHESIS.md` before building ANY UI screen.
6. Check `WORKSPACE-MAP.md` and load `04-prep-packs/` specs **strictly on demand**.

## 2. Source-of-Truth Hierarchy & First-Principles Discipline
1. **Current conversation with the user** (highest authority).
2. **`DECISIONS.md`, `STATUS.md`, `PARTNER-PROFILE.md`, `LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md`, and `UX-FEEDBACK-AND-DESIGN-BRIEF.md`**.
3. **Active Prep Packs** in `04-prep-packs/` (ignoring any `[DEPRECATED]` beige/canvas drafts listed in `WORKSPACE-MAP.md`).
4. **Legacy repo (`/Users/apple/Desktop/Projects/depi_Capstone`)**: Untrusted historical reference only. **Never** reuse legacy `DESIGN-SYSTEM.md` tokens or connect to the old GitHub repo (`C-07`).
- **First-Principles Root-Cause & Anti-Bloat Rules:** Analyze related files first before editing; fix fundamental root causes (not symptoms); watch bundle size and second-order effects; turn recurring preventable bugs into project rules/skills; and strictly obey: **"Tautological labels, tests, and UI components are considered harmful."** (Zero subtitles restating headings, zero pointless wrappers, zero tests re-asserting constants.)

## 3. Coding, Linting & TypeScript Guardrails
- **Latest-first versioning:** React `19.3.1`, Vite `8.3.8`, Convex `1.51.0`, Tailwind CSS v4 (`@tailwindcss/vite`), `shadcn/ui` v4 (`style: "base-luma"`, `@base-ui/react`), `Hugeicons`, TanStack Router & Form, Zod v4, TS 7 (TS 6 fallback if needed).
- **Linter Lock (`@nkzw/oxlint-config@3.0.0` + `tsrs`):** Primary linter with `"Error, Never Warn"` + bundled `quality/*` anti-slop rules. Overrides strictly limited to: `@nkzw/ensure-relay-types: 'off'`, `@nkzw/no-instanceof: 'off'` (keep `unicorn/no-instanceof-array` ON), `no-console: 'off'` only in `convex/seed.ts` & `scripts/**`, skip `/with-sorting`, ignore `convex/_generated/**` & `src/routeTree.gen.ts`. (`oxlint-tsgolint` fallback if `tsrs` glitches on macOS.)
- **Explicit Generic Arrays:** Always write **`Array<T>`** and **`ReadonlyArray<T>`** (never shorthand `T[]` or `readonly T[]`). Run `npx oxlint --fix` after adding any `shadcn` component.

## 4. Design-as-Code, Pure White `shadcn base-luma`, Brand Separation & Anti-Slop Rules
- **Design-as-Code & Section-by-Section Craft (Kamran Ahmed Method):** Build directly in real Vite + React + **`shadcn/ui` (`base-luma` on `@base-ui/react`)** using the official **`shadcn` MCP** and `.agents/skills/shadcn/SKILL.md`. **Build and visually verify ONE section at a time** — NEVER dump an entire unreviewed multi-section page in a single blind shot! Never hand-roll divs where real `shadcn` components exist (`Drawer`, `Sheet`, `Popover`, `Empty`, `Item`, `Field`, `InputGroup`, `ButtonGroup`, `ToggleGroup`, `InputOTP`, `Switch`, `Tabs`, `Card`, `Badge`, `Separator`, `Skeleton`, `Spinner`, `Direction`, Base UI `toast`). Use Base UI `render` (never Radix `asChild`).
- **Strict Brand Separation & Pure Crisp White Surface (`C-05`, `C-06`, `L-07`):**
  - Default canvas is **pure crisp white `#FFFFFF`** (`oklch(1 0 0)`) with clean neutral `base-luma` surfaces (`#FAFAFA` / `#F5F5F5`, hairline neutral borders, `#09090B` ink). **Muddy beige (`#F4F0E8`) and heavy dark burgundy (`Palette C`) are REJECTED.**
  - **`FlameLink` (`assets/logos/flamefire finale v1.svg` / padded square `flamelink-badge.svg`) is STRICTLY the tech platform** (`"Powered by FlameLink"` in footer + `/kds` Kitchen Pass + dark KDS showcase band) — **NEVER the main restaurant logo in the top-left storefront navbar!**
  - Default storefront `--primary` is **warm appetizing Coral-Orange (`oklch(0.575 0.195 35)`)** with `#FFFFFF` white button text (including inside `[data-surface="dark-pass"]`!). NEVER expose dev accent switchers (`Rose | Coral`) in guest navigation chrome.
- **Spatial & Drawer Geometry Rules:**
  - **Floating Phone-Width Bottom Sheets:** Desktop vertical `Drawer` sheets MUST be compact, centered, and floating (**`max-w-[400px]–[420px] rounded-[32px] bottom-4 mx-auto`**) with `motion/react` + `ResizeObserver` height morphing — **NEVER full 1440px viewport width!**
  - **Multi-Page Purity:** `/` = pure storytelling (NO menu grid, NO cart dock/test widget; Live Cairo Clock lives right **above the footer**, NOT in the Hero!). `/menu` = 20 dishes w/ real photos (ZERO permanent `<Skeleton>` boxes!), Floating Drawer, Share Dish, scoped menu CSS SVG cursors (`pointer: fine` only — never replacing global cursor on forms/KDS), Floating Cart Dock & Side Sheet. `/table` = Bayer 4×4 `<DitherGlow />` Check-In (**ZERO login `C-08`!**) + Serrated Paper Receipt + Slide-to-Send (`WCAG 2.5.7` click/keyboard fallback). `/kds` = Grok-Bot Obsidian `#09090B` pass w/ luminous rims & translucent tinted status pills.
  - **Signature Footer:** Tall (`75vh+`) 60fps glyph-atlas **`AsciiFooter`** (restaurant wordmark, hover scramble, 4-layer progressive blur) + **Open-Kitchen Daylight Joke Toggle** (fires accent ASCII ripple, shakes back to Sun, opens anchored `shadcn Popover` with `Open Kitchen Pass ->`).
- **Copy & Bilingual RTL Rules:** Zero eyebrows (`01 //`), zero subtitles restating headings, zero em-dashes (`—`) in UI copy, zero `"Demo"`/`"Test"` leaked into guest UI, verb-first 1–3 word CTAs, zero login/accounts (`C-08`). Natural Cairo Arabic (`ar-EG`): **NEVER abbreviate `على` as `"ع"`** (always full `على`), zero literal cringe, `[dir="rtl"] { letter-spacing: 0; }`, optical font-size parity (`IBM Plex Sans Arabic`), `<bdi dir="ltr">` around mixed numerals, persist `locale` in `localStorage`.
- **Lean Skills & Automated UI Linter Stack:** `.agents/skills/shadcn/` + 4 selective `emilkowalski/skills` (`emil-design-eng`, `apple-design`, `gestures`, `mobile-native`) while building → `felipebasurto/unslop-ui` before freezing `ar.json` → `better-accessibility` + `better-layout` + deterministic **`lintapple`** (`npm run lint:ui` / Playwright `expectUI`) as final QA gate. Save `cloudflare/security-audit-skill` for Deploy Week (`Dec 8–10`).

## 5. Verification Discipline ("A Claim Is Not Evidence")
- **Real Taste + Technical Proof Required:** Never mark UI "done" just because checkboxes pass! Visually inspect real desktop (`1440×900`) and mobile (`390×844`) browser screenshots (EN + `ar-EG` RTL) after EACH section against genuine **`shadcn base-luma` / CoolDock / Google Playground / Notion / Apple** restraint — reject any generic AI look immediately.
- **Automated Gate:** `tsc --noEmit`, `oxlint`, `vitest` (including `fast-check` property tests on integer-piaster split math), `lintapple`, Playwright E2E, WCAG AA contrast, and zero console errors.
- **3-Strike Rule & Consent Gates:** Escalate after 3 failed fix attempts; never weaken/skip QA tests; ask before `git commit`, `git push`, heavy installs, or GitHub repo/issue mutations.
