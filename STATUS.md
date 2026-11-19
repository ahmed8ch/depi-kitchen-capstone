# Project Status & Session Handoff (`STATUS.md`)

> **Last Updated:** 2026-11-19 (`P2-1` Live Site Audited — **12 Visual & Functional Fixes Queued in `LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md`** + New Repo `P0-4` Approved!)  
> **Deadline:** 2026-12-12 (**23 days remaining**)  
> **Current Phase:** **Sprint 1 (`P2-1`) Live-Fix Pass -> Commit Clean New GitHub Repo (`P0-4`), Copy 8 Food Photos, Fix Brand Separation / Drawer / Menu / AsciiFooter Section-by-Section!**

---

## 1. Read First on Every New Session (Zero Context Loss!)
1. `STATUS.md` (this file)
2. **`02-design-vision/LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md`** *(IMMEDIATE ACTION SPEC — read every word before touching `src/`!)*
3. `PARTNER-PROFILE.md` (exact human taste, likes/dislikes, original easter eggs, naming vetoes, tool budget)
4. `DECISIONS.md` (hard constraints `C-01`–`C-08` & locked decisions `L-01`–`L-07`)
5. `02-design-vision/UX-FEEDBACK-AND-DESIGN-BRIEF.md` & `02-design-vision/references/SYNTHESIS.md` (`CoolDock`, `Google Playground`, `Stitch Loop`, `Dreambeans` craft DNA)
6. `TRACKER.md` & `WORKSPACE-MAP.md` (status board & authoritative file map)

---

## 2. What Happened & Where We Stand Right Now
- **CRITICAL LESSON LEARNED:** We wasted time faking UI in vanilla HTML (`prototype/index.html`) and `pen.dev` (`250 degree.pen`) using muddy beige (`#F4F0E8`) + orange — which looked like generic AI slop and NOTHING like real `shadcn/ui` `base-luma`! **Both drafts are now marked `[DEPRECATED]` — DO NOT copy their beige colors or generic layouts!**
- **NEW DIRECTION (LOCKED):** **Design-as-Code directly in Vite 8 + React 19 + TypeScript + Tailwind v4 + real `npx shadcn@latest init` (`Base UI` + `Luma` style)** on a **PURE CRISP WHITE (`#FFFFFF`)** neutral canvas (Notion / Apple / Zomato / real `base-luma` restraint).
- **ALREADY VERIFIED & READY ON DISK:**
  - [x] **Clean Folder:** `/Users/apple/Downloads/dev/antigravity/250-degree-Kitchen` (old chat was stuck on pre-rename CWD with trailing space; **this fresh chat runs terminal commands cleanly!**).
  - [x] **User's Custom `FlameLink` SVG Logo (`assets/logos/`):** `flamefire finale v1.svg` (vivid `#FF0055`→`#E50953` kinetic flame + speed-line "F" on pure white), `.png`, and white-on-crimson badge variant!
  - [x] **Official `shadcn` MCP & Agent Skill INSTALLED:** Added `"shadcn"` (`npx -y shadcn@latest mcp`) to `~/.gemini/config/mcp_config.json` (with Kite, Paper, Pencil disabled) and installed the verbatim official `shadcn-ui/ui` skill + Base-vs-Radix/Composition/Forms/Icons/Styling rules into `.agents/skills/shadcn/`!
  - [x] **Global Skills Cleaned & `AGENTS.md` Updated:** `AGENTS.md` updated with user approval; `better-accessibility`, `better-layout`, `unslop-ui`, and `.agents/skills/shadcn/` are ready; Prep Pack `03` (`Pure White base-luma` + all 2026 primitives) & Prep Pack `12` (Design-as-Code schedule) synced!
  - [x] **Natural Cairo Arabic & 20-Dish Seed Data Audited (`P1-8`):** Prep Packs `07` & `14` have 20 balanced dishes (`ReadonlyArray<T>`), **0** `"ع"` shorthand (always full `على`), zero cringe translations, zero login strings (`C-08`), zero UI em-dashes, unified `Road 9, Maadi, Cairo`.
  - [x] **14 Build-Ready Prep Packs (`04-prep-packs/`):** Convex schema, integer-piaster TDD split engine, Pure White `base-luma` + `Hugeicons` playbook (`03`), TanStack Router/Form, `@nkzw/oxlint-config` + `tsrs` + `fast-check`, state machines, QA gate.
  - [x] **`P2-1` Pure White `shadcn base-luma` Real Scaffold Verified:** Vite `8.3.8` + React `19.3.1` + TypeScript `7.0.2` (zero `baseUrl`) + Tailwind CSS v4 + `shadcn@4.23.0` (`style: "base-luma"`, `base: "base"`, `iconLibrary: "hugeicons"`, `rtl: true`, `pointer`, all 28+ primitives) + `@tanstack/react-router` + `convex` + `motion` + `@kitlangton/rolling-number` + `@nkzw/oxlint-config@3.0.0` (`tsrs@0.25.0-ts7.1.0-beta`) + `vitest@5.1.1` + `fast-check` + user's `FlameLink` SVGs wired in `public/logos/` & `src/assets/logos/`. Automated `lint` (0 errors/0 warnings), `typecheck`, `test` (5/5), `build` (510ms), and live Desktop (`1440x900`) + Mobile (`390x844`) browser verification all passed (`0` console/page errors, `0` failed assets, `0` horizontal overflow). Note: `tsrs` uses `0.25.0-ts7.1.0-beta` to satisfy `@nkzw/oxlint-config@3.0.0` peer dependency.

---

## 3. Immediate Next Action (Section-by-Section Visual Fix + `P0-4` + `P2-2`)
1. **Create Brand-New GitHub Repo (`P0-4` / `depi-kitchen-capstone`):** Initialize fresh repo (NEVER connect legacy `depi_Capstone`) and make Commit #1 for the clean `P2-1` scaffold baseline.
2. **Copy All 8 Sunlit Studio Food Photos into `public/images/`** (exact `cp` commands in `02-design-vision/LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md` §0B) and install selective skills (`emilkowalski/skills`: `emil-design-eng`, `apple-design`, `gestures`, `mobile-native`) + `lintapple` dev linter.
3. **Execute `LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md` Section-by-Section (Kamran Ahmed Method — NEVER dump an entire page in 1 shot!):**
   - Fix brand separation (`FlameLink` ONLY in footer `"Powered by FlameLink"` + `/kds`; default storefront accent = warm Coral; remove `Rose|Coral` dev switcher from guest navbar; fix `flamelink-badge.svg` square padding + white text contrast on dark CTAs).
   - Constrain `DrawerContent` to compact floating phone-width (`max-w-[400px]–[420px] rounded-[32px]`) with `motion/react` + `ResizeObserver` height morphing.
   - Rebuild `/` section-by-section (Hero w/ photo -> CSS-3D SVG iPhone Showcase -> Photo Fire Stations -> Grok-Bot Obsidian KDS Band -> Visit/Maadi Live Cairo Clock Strip -> Tall 75vh Interactive `AsciiFooter` + Daylight Joke Ripple/Popover).
   - Make `/menu` live with 20 dishes + real photos + clickable Floating Dish Drawer + Share Dish + Spicy CSS cursor + Floating Cart Dock + Cart Side Sheet (fix modifier subtotal math!).
   - Upgrade `/table` (Bayer 4×4 SVG `<DitherGlow />` check-in panel — zero login `C-08`! + high-contrast active pills + Serrated Paper Receipt + Swipe-to-Send slider), `/kds` (Grok Bot Obsidian multi-ticket board), `/track`, and creative bilingual `404s.design` `RouteNotFound`.
4. **Proceed to `P2-2` (`bill-engine` & `modifier-pricing` 45-case TDD) & `P2-3` Convex real-time schema.**
