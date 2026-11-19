# Creative Toolbox, Design Skills & 3-Layer Build Architecture

> **CURRENT SPEC OVERRIDE (NOV 19):** Keep the **3-Layer Cake discipline** and tools audit below, **EXCEPT** for exact surface colors, multi-page `/` structure, and component implementation always follow **`02-design-vision/UX-FEEDBACK-AND-DESIGN-BRIEF.md`** and **`02-design-vision/LIVE-SITE-CRITIQUE-AND-FIX-SPEC.md`** (Pure Crisp White `#FFFFFF` per `C-05`, NO menu/cart on `/`, `FlameLink` strictly platform/KDS only, Warm Coral-Orange storefront default, Phone-Width Floating Drawer, 60fps `AsciiFooter`, Bayer 4×4 `<DitherGlow />`, Grok-Bot Obsidian `/kds`)!
>
> **Verified:** November 19, 2026 (live web research, GitHub source inspection, Context7 MCP, and local security audit of `/Users/apple/Downloads/dom-gpu-text`).  
> **Goal:** Turn every messy creative spark in your head into **one calm, organized, systemic architecture** so neither you nor any AI agent ever creates "visual soup" or derails the Dec 12 deadline.

---

## 1. The Anti-Chaos Secret: "The 3-Layer Cake" System

Why do great creative ideas accidentally ruin websites? **Timing and Mixing.**
- If you throw pixel icons + WebGL shaders + floating Zomato burgers + Notion cartoon characters + ASCII art + 3D iPhone hands onto Screen 1 *while* you're still figuring out spacing, routes, and components, every style fights every other style and the UI collapses into **visual soup** (and breaks consistency—exactly what you noticed when flat animations sit beside shaded/3D ones!).
- **Top design studios (Linear, Apple, Google Labs, Stripe) build in 3 strict chronological layers** and **lock each layer before touching the next**:

| Layer | Name | What Goes Here (And ONLY Here) | When Built | Consistency Rule |
| :--- | :--- | :--- | :--- | :--- |
| **Layer 1** | **The Unbreakable Skeleton** | Semantic `oklch()` CSS tokens (1-place theme control), `shadcn/ui` (`base-luma` on `@base-ui/react`), chosen icon family (`Hugeicons` free rounded set), spacious light layout grid, crisp typography floor, **zero-fluff copy (`clean-copy` + `unslop-ui`)**, and 100% working React + Convex core flows. | **First (Days 1–13)** | Everything MUST already look calm, clear, and appetizing **with zero animations and zero gimmicks**. |
| **Layer 2** | **Brand Soul & Visual Assets** | Cohesive studio-lit food photography (all shot in 1 lighting style via Google Flow / Gemini AI Pro / curated photos), custom branded packaging shots (Unblast mockup style for our boxes/cups!), clean custom geometric `250°` wordmark, and subtle UI state feedback (`rolling-number` live price counters, smooth drawer/tab transitions). | **Second (Days 14–17)** | **One unified visual physics** — matte sunlit daylight, crisp photography, clean 2D vector icons (no mixing flat + glossy 3D + pixel icons on the same UI chrome!). |
| **Layer 3** | **Signature Human Touches ("The 5% Magic")** | **Max 2–3 restrained, unforgettable delights** that feel native to the brand: (1) **Footer Easter Egg** (Cue/Imgrain-style subtle halftone/ASCII `250°` wordmark with gentle hover/ripple OR tiny rising hearth steam/ember animation), (2) **The "Open Kitchen" Daylight-Only Theme Toggle Joke** in the footer, (3) optional tiny micro-details (e.g., 1.9 KB `dotLottie` burger/flame loader or clean empty-state spot mark). | **Final Polish (Days 18–21)** | Added *only* after Layer 1 & 2 pass every functional, contrast, and browser check. Every Layer 3 touch must be removable in 1 line without breaking UX. |

---

## 2. How Theme Colors Stay 100% Swappable in One Place (Yes, `shadcn` Is Already OKLCH!)

You asked: *"Should the color theme be built so it's easy to change later without rewriting everywhere? And is `shadcn` already `oklch`?"*

- **YES — verified live via Context7 (`/websites/ui_shadcn`)!** `shadcn/ui` v4 + Tailwind CSS v4 uses **`oklch()` CSS variables inside `:root` and `@theme inline`** (`src/index.css`) by default:
  - Every component in the entire app ONLY uses **semantic token classes** (`bg-background`, `bg-card`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`) — **NEVER** hardcoded hex colors like `bg-[#EB4A1E]` inside JSX!
  - Want to shift our restaurant from Terracotta to Ember Vermilion or Roasted Crimson later? You edit **3 lines in `src/index.css`** (verified with **`oklch.fyi`** or **`tweakcn.com`**) and **every button, card, focus ring, badge, and link across the entire app updates instantaneously**.

---

## 3. Complete Architecture of the Homepage (`/`) — Utilitarian + Story-Driven

Your homepage must be **both** breathtaking **and** dead-simple for a hungry diner (or a DEPI evaluator) to use in 3 seconds:

| Section | Layer / Surface | Purpose & Content (Zero Fluff!) | Design DNA Connected |
| :--- | :--- | :--- | :--- |
| **0. Floating Nav Pill** | Frosted daylight glass (`CoolDock` / `Playground`) | Custom `250°` mark · `Menu` · `How It Works` · `Kitchen Pass` · Active Table pill (`Table 5` or `Join Table`) · Primary pill CTA (`Order Now`). | Single compact line, zero clutter, glides smoothly over hero. |
| **1. Sunlit Hero Stage** | Warm Linen/Stone Canvas + `36px` rounded hero photo | **No 50/50 generic SaaS split.** Centered bold display `<h1>` (short & sharp, `<= 15` words supporting line) + dual clear actions (**`Join Your Table`** / **`Explore Menu`**) directly above a wide `16:9` sunlit hearth/table photography stage peeking cleanly above the fold. *(Zero fake KPI strips, zero eyebrows!)* | `CoolDock` + `Dreambeans` + `gemini-frontend-design` centered monumental composition. |
| **2. Live Signature Menu Strip** | Shadowless crisp `#FFFFFF` `24px` cards on warm stone | Immediately usable! Category filter pills (`All`, `Burgers`, `Stone-Deck Pizza`, `Grill`, `Drinks`) + `3-col` generous `4:3` dish cards with live **`rolling-number`** price updates and 1-tap `+ Add` that wakes the bottom **Floating Cart Dock** right on the homepage! | Utilitarian immediacy — the homepage IS a live restaurant, not a brochure. |
| **3. How Table Ordering Works (3-Step Interactive Split)** | Warm stone + crisp interactive right preview | Left: 3 crisp clickable steps (**`Scan Table QR & PIN`** → **`Add & Split Together`** → **`Live Kitchen Pass`**). Right: interactive UI preview (`Firecrawl` / `Playground` tab-switcher spirit — or real mini live preview!). No long walls of text. | Explains the capstone's real-time React architecture visually in 10 seconds. |
| **4. One Dark Contrast Moment — Live Kitchen Pass Preview** | Single `36px`-radius Dark Charcoal island (`Dreambeans` / `CoolDock` break) | Shows a calm real-time peek of the kitchen (`250°C Sear • Live Prep ~12m`) with a direct link to open `/kds` (great for evaluators during live demo!) and a crisp branded packaging/hearth shot. | Delivers the dramatic dark contrast break without turning the site dark-mode! |
| **5. Signature Editorial Footer + Playful Easter Eggs** | Warm linen + crisp `1px` top hairline | Clean 3-column links (Location/Hours, Menu, Staff/KDS) + **`Back to top ↑`** + **Playful "Open Kitchen" Light/Dark Switch** (clicking Dark shows a warm witty popover: *"We're an open sunlit kitchen — no dark kitchens here! (Dark mode lives strictly on the Kitchen Pass `/kds`)"*) + **Oversized subtle halftone/ASCII `250°` wordmark** (`Cue Design` / `Imgrain` style) with a subtle gentle mouse-ripple or warm ember shimmer! | Memorable, charming, 100% cohesive with our warm linen aesthetic! |
| **Persistent Overlay: Floating Table & Cart Dock** | Deep warm charcoal translucent dock (`CoolDock`) | Appears cleanly at bottom once a table is joined or 1 item is added: Table #, live diner avatars, `rolling-number` subtotal, and `Open Cart` pill. | Connects `/` and `/menu` seamlessly into one fluid app. |

---

## 4. Direct Answers to Your Design-Craft Questions (Notion, Zomato, Pixel, Shaders, ASCII, Packaging)

### A. Notion's Tiny Characters (`media_1`) — What Are They Called & Should We Use Them?
- **Name:** **Editorial Spot Illustrations** (specifically *peeking micro-illustrations* / *line-art character vignettes*).
- **Timing:** Strictly **Layer 3 (Late Stage)** — NOT during wireframing or core build.
- **Fit for Our Site:** Notion is a neutral black-and-white productivity wiki with zero food photos, so hand-drawn doodles inject humanity. Our site ALREADY has rich warm food photography carrying emotion! Putting cartoon people peeking over burger photos would clash — **HOWEVER**, 1–2 ultra-minimal single-line ink doodles in **Empty States** (e.g., an empty plate sketch in *"Your table cart is empty"* or a tiny chef hat in KDS *"All caught up"*) work wonderfully without competing with photos!

### B. Zomato's Floating Food Items (`media_2`) — What Are They Called & Should We Use Them?
- **Name:** **Floating Cutout Food Orbit** (transparent PNG food cutouts with subtle scroll parallax along decorative spline paths).
- **Verdict:** **Skip for our main aesthetic!** Look closely at `media_2` vs your CoolDock & Dreambeans captures: floating PNG cutouts on stark `#FFFFFF` feel like a mass-market delivery aggregator (exactly the old food-app aesthetic you said you hate!), and they visually clash with CoolDock/Dreambeans' calm, grounded studio-framed photography (`36px` rounded warm-lit frames). Keep our food **grounded inside sunlit editorial frames** — it looks 10× more modern and expensive.

### C. Pixel Art Icons Everywhere vs. Consistent Design?
- You literally answered your own instinct brilliantly: *"do we make all icons pixelated... its too lacking and not good, i think we need to first do prototype and base design to build on before adding all those ideas."*
- **YES! Trust that instinct!** Pixel icons everywhere clash hard with `base-luma`'s soft Apple/macOS curves and high-res food photography. Keep **all UI chrome icons in ONE smooth rounded family (`Hugeicons` free rounded set)**. Save subtle dot/halftone/ASCII texture strictly for **ONE intentional signature spot** (the giant subtle footer wordmark like your **Cue Design** & **Imgrain** screenshots — where halftone/dots on warm cream paper look genuinely gallery-worthy!).

### D. Mouse-Reactive Background / Shaders (`shaders.com`, Paper Shaders, `OrbKit`)?
- Look at what **Taste Skill 2.5** itself says from real-world blind testing: *"Shaders belong on tech/gaming pages; hospitality and food pages stay calm with photography, sharp typography, and flat tonal color."*
- **Smart Compromise:** Do **NOT** put a heavy constantly-running WebGL shader behind the whole menu (kills mobile battery, distracts from food, hurts Lighthouse score). Instead, if you want **one** subtle mouse-reactive touch in **Layer 3**, put a super lightweight CSS/Canvas **subtle dot/ASCII ripple strictly inside the Footer `250°` wordmark** (like your Cue Design screenshot `cuedesign.space/?c=cue349`) OR a whisper-soft warm radial cursor light on the single Dark Kitchen Pass card!

### E. Food Photography & Branded Packaging (`Unblast`, `Google Flow`, `ChatGPT Images 2.6`)
- **YES — your packaging mockup idea (`media_3` & `media_4` from Unblast) is GENIUS!**
  - Putting our `250°` mark onto **1–2 custom branded craft takeout boxes / cold-drink cups** (using Unblast mockups or generating cohesive studio sets with **Google Flow "Ingredients" (`@AssetName`)** on your Gemini AI Pro sub!) immediately makes `250° Kitchen` look like a **real physical restaurant brand** rather than a fake school project!
  - **Best Photography Approach:** Do **NOT** scrape random existing restaurant brand photos and poorly Photoshop their logos out (lighting clashes + copyright mess). Instead:
    1. Use **Google Flow / Gemini AI Pro** (or Antigravity's `image-generator`) with **ONE locked sunlit linen studio reference ("Ingredient")** so all 14–16 dishes + 1 branded takeout box shot share **identical daylight, ceramic plates, and warm stone backdrop**.
    2. Use **ChatGPT Images 2.6 GIF maker** or **Google Flow** ONLY if we want 1 tiny looping ambient micro-clip (e.g., subtle grill steam or sizzling hero preview — converted to lightweight `<video autoplay muted loop playsinline>` `.mp4`/`.webm` rather than heavy multi-MB `.gif`!).

---

## 5. Complete Fact-Checked Catalog of ALL 20+ Tools & Sites You Shared

| Tool / Resource | What It Actually Is (Nov 2026) | Layer & Verdict for Our Capstone | How / Why |
| :--- | :--- | :--- | :--- |
| **`ui-sdk.dev`** (Vercel Labs) | Behavioral primitive SDK (`@ui-sdk/core`: `createPopup`, `createRovingFocus`, `createAgent`) — early **Beta**, framework-agnostic, built for AI agents constructing *custom* widgets from scratch. | **SKIP for this capstone** *(watch closely for future!)* | `@base-ui/react` inside `shadcn base-luma` ALREADY gives us battle-tested 100% WCAG accessibility + styled React primitives (`Drawer`, `Dialog`, `Tabs`, `RadioGroup`, `Toast`) in stable `v1.9.0`. Mixing Beta `ui-sdk` with Base UI creates dual primitive architectures for zero extra value on a 23-day React sprint. |
| **`Hugeicons`** (`@hugeicons/react` + `@hugeicons/core-free-icons`) | **4,600–6,000+ free MIT Stroke-Rounded icons** natively supported in `shadcn` CLI (`iconLibrary: "hugeicons"` + `npx shadcn@latest migrate icons`). Pro paid only for Bulk/Duotone/Solid. | **YES — LAYER 1 PRIMARY ICON SET!** | Softer Apple/macOS geometric curves match `base-luma` and your CoolDock taste far better than overused Lucide! 100% free MIT for the full rounded stroke set. |
| **`oklch.fyi`** | Interactive OKLCH scale builder, perceptual lightness & contrast checker, Display-P3 gamut tool, CSS exporter. | **YES — LAYER 1 TOOL** | Use right alongside `tweakcn.com` when tuning our final red-orange OKLCH ramp so contrast stays mathematically WCAG AA! |
| **`rolling.kitlangton.dev`** (`rolling-number`) | Ultra-lightweight, interruptible, locale-aware rolling number animation for React. | **YES — LAYER 2 POLISH!** | Imagine the **Cart Subtotal, Dish Modifier Price (`199 → 245 EGP`), and Split-Bill Per-Person Share** smoothly rolling like a precision mechanical counter whenever you tap `+` or change split count! Tiny, classy, 100% functional delight! |
| **`lottiefiles.com/dotlottie`** (`@lottiefiles/dotlottie-react`) | Ultra-compressed `.lottie` vector animations (your burger screenshot is literally **`1.9 KB`**!). | **OPTIONAL LAYER 2/3** | Great for **1 tiny loading/order-preparing indicator** (`< 5 KB`), as long as we recolor it strictly to our exact brand accent stroke so it matches Hugeicons' stroke weight! |
| **`cuedesign.space/?c=cue349`** & **`feralui.dev` (Imgrain)** | Curated interactive UI components (`ASCII Wordmark Footer Ripple`) & halftone/dither dot animations (`Tiptoe` on cream paper). | **YES — LAYER 3 FOOTER INSPIRATION!** | Direct blueprint for our **oversized warm-paper `250°` dot/ASCII footer** + the **playful daylight theme toggle** right next to `Back to top ↑`! |
| **`unblast.com`** (Packaging & iPhone Mockups) | Free high-craft PSD/visual mockups (burger box, cup, cardboard packaging, 3D hand holding iPhone). | **YES — LAYER 2 BRAND & DEPI PITCH DECK!** | Use a branded fast-food box/cup aesthetic for our Takeaway showcase, AND use the `3D hand holding iPhone` mockup cleanly on the homepage *"Scan at Table"* section or in your final **DEPI Evaluator Presentation Slides**! |
| **`reactbits.dev/tools`** | Creative tools (`Background Studio`, `Center Stage`, `Shape Magic`, `Texture Lab`, `Sound Lab`) + animated React snippets. | **SELECTIVE UTILITY ONLY** | **`Center Stage`** is AMAZING for framing crisp product screenshots for your README & DEPI presentation! **`Sound Lab`** is awesome for generating one clean, non-annoying Kitchen Pass chime (`.wav`/`.mp3`) for `/kds`! Skip heavy animated backgrounds on menu pages. |
| **`edoardolunardi/kugiri`** | Zero-dependency TS library that splits text into lines/words/chars at exact browser wrap points for crisp typography reveals. | **OPTIONAL LAYER 3** | Nice if we want a super clean 1-time line-by-line reveal on the `/` Hero `<h1>` (note: test carefully with Arabic RTL if we enable Arabic, as character splitting breaks Arabic ligatures — split by *lines* only for RTL!). |
| **`lucide-animated.com`** & **`morphicons.com`** | Animated Lucide icons (Motion) & zero-dep stroke-icon spring morphing (`play → pause`, `plus → check`, `menu → close`). | **SELECTIVE MICRO-INTERACTION (`morphicons` > `lucide-animated`)** | Since we're leaning **Hugeicons**, don't mix Lucide icons in! **`morphicons`** (or our already-installed `better-ui` spring cross-fade recipe!) works cleanly for 2–3 key state swaps (`+ → ✓` on Add to Cart, `Copy → Copied` on Table PIN). |
| **`logoforge.terravidhal.me`** | 900+ third-party brand SVGs via shadcn CLI + MCP (Stripe, Google, Apple, etc.). | **TINY UTILITY IF NEEDED** | Useful *only* if we need official Google `"G"` or Apple Pay / Visa / Mastercard SVGs in checkout/login. (Does *not* design a custom restaurant logo — for our `250°` wordmark we'll craft a bespoke crisp geometric SVG in Paper!). |
| **`imageory.in/gallery`** | Curated AI image + prompt inspiration gallery. | **REFERENCE ONLY** | Great for stealing lighting/camera-angle prompt vocabulary for our Google Flow / Gemini food shoot. |
| **`cult-ui.com`** | Polished animated shadcn registry blocks (many Radix-first; check Base UI variants). | **INSPIRATION ONLY** | Borrow clean micro-interaction ideas (e.g., expandable cards/docks), **never** copy Radix `asChild` code blindly into our `base-luma` app. |
| **`library.veloxthemes.com`** | High-end Framer/Webflow marketing template library (not React/shadcn code). | **VISUAL INSPIRATION ONLY** | Browse for spacious editorial section spacing, not code copy-paste. |
| **`collectui.com/designs/footer-...`** | Footer layout inspiration archive. | **VISUAL INSPIRATION ONLY** | Helpful reference when sketching our clean editorial footer in Paper. |
| **`koboyo.com` (`icons` & `Page Mascot`)** | Hand-drawn icons + cursor-tracking sprite mascot. | **SKIP FOR MAIN UI** | Hand-drawn / cursor-following sprite mascots clash with our sleek CoolDock × Dreambeans sunlit hospitality tone (would feel gimmicky on a restaurant menu). |
| **`isocons.app`** (Isometric 3D icons) & **`runeicons.com`** (Multi-style/pixel/glass icons) | Isometric 3D icons & multi-style icon sets. | **SKIP (Avoid Style Mixing!)** | Mixing isometric 3D or glass/pixel icons alongside smooth Hugeicons + real food photos instantly causes style clash. Pick ONE icon voice (`Hugeicons`). |
| **`shaders.com`** & **`orbkit.zzzzshawn.cloud`** | WebGL shader hubs & interactive 3D shader orbs. | **SKIP FOR FOOD SITE** | Looks awesome on AI-agent/developer sites, feels cold/sci-fi on a warm restaurant storefront. |
| **`/Users/apple/Downloads/dom-gpu-text`** | **SECURITY AUDIT: 100% SAFE** (MIT license, by Jesper Landberg, zero network/exec/exfiltration — read all 6 files line-by-line!). WebGPU WGSL quadratic Bézier DOM-synced font renderer. | **SAFE, BUT SKIP FOR THIS CAPSTONE** | Massive creative-coding overkill for a restaurant ordering app: Latin-only subset (breaks Arabic cursive shaping), WebGPU compatibility constraints, requires JS wheel-scroll hijack (`Lenis`), zero DEPI grading upside. Bookmark for a future personal creative-dev portfolio! |
| **`kgoedecke/doop`** | Open-source multiplayer HTML-iframe design canvas with built-in MCP server (Paper.design alternative). | **GREAT FREE BACKUP TO PAPER!** | Because Paper Free allows **100 MCP calls/week**, our clean hierarchy is: **1. Paper MCP (strictly budgeted!) → 2. Pen.dev (`pencil` MCP, already installed!) → 3. `doop` (open-source self-hosted MCP)** if we ever exhaust Paper's weekly calls. |

---

## 6. Design Skills Audit — Which Ones to Actually Use (And Why NOT All 7!)

Installing all 7 skills at once causes **conflicting rules & context bloat** (some say *"use serif display"*, others say *"ban beige + serif"*, others inject their own starter HTML!).

**First: Does Base UI (`@base-ui/react`) cover what these skills do?**
**NO — they operate on completely different layers!**
- **Base UI / `shadcn base-luma`** = **Engineering Mechanics** (keyboard nav, focus traps, ARIA, drawers, tabs, clean Tailwind styling primitives).
- **Design / Copy Skills** = **Human Taste & Editorial Restraint** (killing AI filler copy, layout proportions, optical alignment, real-browser screenshot critiques).

### Exact Verdict on Every Skill You Listed

| Skill | What We Verified Inside Its Repo | Verdict & Exact Order of Use |
| :--- | :--- | :--- |
| **1. `rachel`'s `clean-copy` + `felipebasurto/unslop-ui`** | **SOLVES YOUR #1 AI UI FRUSTRATION!** Both are strictly *subtractive* — they hunt down and delete U1 eyebrows (`01 //`), U3 redundant subtitles, U4 botsplaining, U5 leaked chat notes, U9 fake badges, U11 decorative emojis, and report every cut/rewrite cleanly without touching your `shadcn` components or layout! | **USE ALWAYS (Mandatory Copy Gate!)** — Run after every UI slice is built! We already baked their core ladder right into `AGENTS.md`, and you can install `felipebasurto/unslop-ui` anytime. |
| **2. `jakubkrehel/skills` (`better-ui`, `better-typography`, `better-colors`, `better-layout`, `better-accessibility`)** | **SURPRISE: YOU ALREADY HAVE THESE INSTALLED GLOBALLY** in `/Users/apple/.gemini/antigravity/customizations/skills/`! They respect your existing `shadcn` tokens & enforce exact optical alignment, concentric radii, `prefers-reduced-motion`, `currentColor` icons, and `overscroll-behavior: contain`. | **USE AS LAYER 2/3 POLISH AUDITOR!** Invoke `better-ui` / `better-accessibility` / `better-typography` *after* components work to tighten craft — zero conflict with `shadcn`! |
| **3. `google-gemini/demolab` (`gemini-frontend-design`)** | Official Google Gemini 4 skill (Apache-2.0). Brilliant rules on: abandoning generic 50/50 split heroes, max 2 font families (`tabular-nums` instead of a 3rd mono font!), strict 3-size body scale, zero `<13px` text above the fold, zero eyebrow/KPI strip clutter, and mandatory desktop+mobile real-browser screenshot checks! | **HIGHLY COMPATIBLE — GREAT DESIGN COMPASS!** Pairs natively with Gemini 4 Neon & Hydrogen and complements `shadcn` cleanly. |
| **4. `oil-oil/oil-ui`** | Explores 3 distinct visual directions side-by-side & checks screenshots. Note: Free version is exploratory; existing-codebase `shadcn` mapping & deep polish are gated behind Oil UI Pro (\$14.99). | **SKIP (Redundant)** — We already did bespoke visual research of *your* 5 sites and have Paper MCP + `gemini-frontend-design` + your global `better-*` skills for free! |
| **5. `leonxlnx/taste-skill` (`v2.5.1`)** | Very opinionated standalone static-site generator (`assets/starter.html`, `scripts/start.mjs` dealing random palettes/fonts from JSON). | **SKIP — WOULD FIGHT `shadcn base-luma` & YOUR VISION!** It wants to deal its own starter HTML, palette, and font pairing rather than honoring your React + `base-luma` + Paper-approved direction. |
| **6. `benjitaylor/skills` (`Stageshow`)** | Specialized strictly for building *faux product UI demos / cursor animations* for marketing sites. | **OPTIONAL LAYER 3 ONLY** — Only useful if we build an animated mini "How Table Ordering Works" demo card on `/` (and even better: on our app we can show *real* live UI previews!). |

### The Winning 3-Skill Pipeline (Zero Conflict, Maximum Taste!)
1. **Before & During Layout (`Paper MCP` + `shadcn base-luma`):** Follow our `VISUAL-DIRECTION.md` + `gemini-frontend-design` rules (no 50/50 generic hero, 3-size body discipline, zero eyebrows/KPI strips).
2. **Right After Writing Any React Screen:** Run **`clean-copy` + `unslop-ui`** pass to ruthlessly delete every filler label, redundant subtitle, and leaked AI comment.
3. **Final Polish & Accessibility Gate:** Run your already-installed **`better-ui` + `better-accessibility`** check + live desktop/mobile browser screenshot inspection!
