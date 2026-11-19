# Partner Profile (`PARTNER-PROFILE.md`)

> **Purpose:** Captures the **human partner** behind this capstone — taste, learning style, creative instincts, original ideas, and exact likes/dislikes — so any fresh session immediately matches their vision without re-explaining. (`AGENTS.md` holds locked technical rules; zero duplication.)  
> **Maintenance Rule:** Keep concise (~75 lines max). Edit in place only when learning durable preferences.

## 1. Context & Working Style
- **Solo Builder:** DEPI Egypt React Front-End Internship Capstone (**hard deadline: December 12, 2026**; 3 inactive teammates; concurrent 2nd course → ~2.5–3.5 focused hours/day).
- **Learning Hands-On:** Actively learning TypeScript, modern React, and design systems — wants to *understand* architectural trade-offs, not accept black boxes. Prefers explicit **`Array<T>` / `ReadonlyArray<T>`** over `T[]`.
- **Past Frustrations (Never Repeat!):**
  1. Wasted 5 days with earlier agents generating sterile variable dumps (`DESIGN-SYSTEM.md`) and zero real code.
  2. Hated AI agents drawing fake `shadcn` boxes in `pen.dev` / vanilla HTML on muddy beige (`#F4F0E8`) with generic icons instead of installing **real `shadcn/ui` (`base-luma`)** directly in code!
  3. Hates when agents validate only "zero clipping / checkboxes ticked" while delivering generic AI-slop visuals and forgetting key chat details (like the real Cue halftone footer).
- **Expectations of AI Partner:** Brutal honesty, evidence over stale training data (live web search + Context7 + community feedback), plain-English jargon explanations, zero rushing, and **real visual taste validation** — not rubber-stamping subagent output.

## 2. Exact Visual Taste & Brand Instincts
- **Canvas & Surfaces — PURE CRISP WHITE (`#FFFFFF`):** Loves crisp, airy **pure white** (`#FFFFFF` / neutral `#FAFAFA` surfaces, razor-sharp `#09090B` ink, subtle hairline borders) like real **`shadcn/ui` `base-luma`**, **Notion**, **Zomato**, and **Apple/Linear light mode**. **Explicitly REJECTS** muddy beige/cream (`#F4F0E8`), heavy dark red (Palette C), and generic orange-square Lucide logos!
- **User's Own Custom Platform Logo (ALREADY BUILT!):** Created a kinetic flame + speed-line **"F" FlameLink** logo at `assets/logos/flamefire finale v1.svg` (vivid `#FF0055` → `#DA074D`/`#F50757` on pure white, plus a white-on-crimson badge variant in the same folder!).
- **Design Inspirations Loved:**
  - **Real `shadcn/ui` `base-luma` (Base UI):** Soft macOS Tahoe-inspired geometry, authentic drawers/sheets/popovers — wants **Design-as-Code** directly in React, NOT fake vector approximations in `pen.dev`/Kite or outdated Figma Radix v1 kits.
  - **Notion:** Crisp pure white + cheeky minimal line-art characters peeking over frames/cards.
  - **Zomato:** Pure white background letting vibrant food photography pop cleanly.
  - **CoolDock (`cooldock.app`) & Google Labs (`Dreambeans`, `Playground`, `Stitch Loop`):** Airy whitespace, frosted floating pill navbar/dock, calm hierarchy.
  - **Cue Design (`cuedesign.space`) & Imgrain (`Tiptoe`):** Tall closing footer (`75–85vh`) with an **interactive cursor-reactive halftone dot-matrix `<canvas>`** (NOT flat static grey text!).
  - **Apple iOS/macOS Spatial Grammar:** Multi-page routes (zero menu/cart on `/`), Dish Customizer = **Bottom Sheet (`shadcn Drawer`)** with `− 1 +` qty stepper, Cart = **Trailing Side Sheet (`shadcn Sheet`)**.
  - **KSA/UAE & Global F&B Craft:** Authentic brand presence (`Half Million ½M`, `Section-B`, `BRGR`, `Salt`, `3Fils`, `800°`, `400 Gradi`).

## 3. Original Ideas, Micro-Interactions & Easter Eggs (MUST Keep!)
- **Tall Interactive 60fps `AsciiFooter` (`75–85vh`, Glyph-Atlas Canvas + 4-Layer Progressive Bottom Blur + Hover Scramble):** Renders the **Restaurant Brand Wordmark** edge-to-edge (NOT static grey text, NOT `FlameLink`!).
- **"Open Kitchen / Daylight Only" Theme Switch Joke:** Clicking the footer toggle fires an **ASCII color ripple across the wordmark**, shakes the knob back to Daylight Sun, and opens an **anchored `shadcn Popover` directly above it** with a 1-click **`Open Kitchen Pass ->`** CTA (zero storefront dark mode!).
- **Live Cairo Local-Time Clock (`Africa/Cairo`):** Placed cleanly **right above the Footer** (Visit / Maadi Hours strip — NOT cluttering the Hero!). Sun while open (`12:00 PM – 1:00 AM`), Crescent Moon resting state after closing.
- **Phone-Width Floating Animated Drawer (`max-w-[400px]–[420px] rounded-[32px]`):** Centered floating bottom sheet on `@base-ui/react` + `motion/react` `ResizeObserver` height morphing (NEVER full 1440px desktop width!).
- **New Signature Craft Touches:** **Bayer 4×4 SVG `<DitherGlow />` side panel** on `/table` Check-In (zero login `C-08`!), **Grok Bot Obsidian dark UI** (luminous rim + colorful translucent status pills) on `/kds` & the 1 dark showcase band, **Tactile Serrated Paper Receipt** on `/table` & `/track`, **Share Dish button** (`/menu?dish=<slug>`), **Swipe-to-Send-to-Kitchen** slider (with WCAG `2.5.7` click/keyboard fallback), scoped **menu CSS SVG cursors** (Fork on standard dishes, Chili on `.spicy`, Flame on `.charcoal`, `pointer: fine` w/ contrast outline — never replacing global cursor on forms/KDS!), and a witty bilingual **`404s.design`-inspired 404 page**!
- **Interactive Full-Proportion iPhone Pro Showcase on `/`:** Lightweight crisp SVG/CSS hardware frame with subtle CSS 3D perspective tilt wrapping a **live interactive React screen** (NO `three.js`!).
- **Notion-Style Cheeky Peeking Micro-Illustrations:** Optional restrained Layer 3 charm peeking cleanly over a card or footer edge.
- **Preferred Building Discipline:** **Kamran Ahmed Section-by-Section iteration** (build & inspect 1 section at a time in `Neon High` — never let `Orchestrator Neon` dump an entire sloppy page in 1 pass!), search web/GitHub first, and **zero tautological labels/tests/components**.

## 4. Cultural, Naming, Arabic & Hard Red Lines
- **Naming Status:**
  - **Platform (`Powered by ...`):** **`FlameLink`** (user ALREADY designed the logo in `assets/logos/`!) — alternates `FireLink`, `360 Link`.
  - **Restaurant Name (Still Open):** Active picks **`KRAVE`**, **`KAIRO`**, **`BRIK`**, **`360°`** (or fresh brainstorm).
  - **PERMANENTLY VETOED:** `Jamr` (evokes Hajj *Ramy al-Jamarat*), `Dakka` (koshary/molokhia), `Char` (unfamiliar in Egypt), `Sear`, `Sizzle` (existing brand), `Area 20` (too corporate), standalone `250°` (feels cold/arbitrary), `Firepass`.
- **Natural Cairo Arabic (`ar-EG`):** **NEVER write `"ع"` shorthand** (always full **`على`**), zero cringe literal translations (`"مقرمش ع النار"`), zero stiff MSA, optical font-size parity with English (`IBM Plex Sans Arabic` or `93%` scale on `Alexandria`), `[dir="rtl"] { letter-spacing: 0; }`.
- **Zero Login / Zero Accounts (`C-08`):** Frictionless 4-digit Table PIN + first name ONLY. No auth/signup/passwords anywhere.
- **Hard Red Lines:** Muddy beige AI templates, fake hand-drawn `shadcn` canvases, AI filler copy, uppercase eyebrows (`01 //`), subtitles restating headings, em-dashes (`—`) in UI copy, fake `"LIVE"` dots, decorative emojis, wasting limited **Claude Opus 5.5** credits before the real codebase is scaffolded & structured.

## 5. Available Tools, Subscriptions & MCP Diet
- **Models & Tools:** Antigravity (`Gemini 4 Neon/Hydrogen/Argon`, `Swarm`), **Figma Make** (has **Claude Opus 5.5** + **Gemini 4 Carbon** + GitHub sync — save limited Opus credits for targeted real-repo visual polish!), **Gemini AI Pro / Google Flow** (food/packaging photography), macOS local (`Node v26.13.1`, `npm 11.20.0`, `gh 2.103.2`).
- **Lean MCP Setup During Coding:** Keep **`context7`** + official **`shadcn MCP`** ON (and `github` only when pushing). Keep **Kite, Paper, Pencil (`pen.dev`), and Cloudflare MCPs DISABLED** during daily coding to save context window & 5-hour quota; re-enable Cloudflare MCP on deploy day!
