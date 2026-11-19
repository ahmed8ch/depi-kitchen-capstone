# Paper MCP Budgeted Wireframe & Production Runbook (`<= 35` Calls Total)

> **Status:** Ready-to-Execute Pre-Flight Blueprint (**0 of 100** weekly Paper MCP calls spent)  
> **Created:** November 19, 2026 · **Target Submission:** December 12, 2026  
> **Budget Ceiling:** **32 MCP calls nominal / 35 calls max** out of Paper Free Tier's **100 calls/week** (preserving **65–68%** of weekly quota for feedback tweaks and token verification)  
> **Upstream Truth:** [AGENTS.md](file:///Users/apple/Downloads/dev/antigravity/250-degree-Kitchen%20/AGENTS.md) · [VISUAL-DIRECTION.md](file:///Users/apple/Downloads/dev/antigravity/250-degree-Kitchen%20/02-design-vision/VISUAL-DIRECTION.md) · [CREATIVE-TOOLBOX-AND-LAYERS.md](file:///Users/apple/Downloads/dev/antigravity/250-degree-Kitchen%20/02-design-vision/CREATIVE-TOOLBOX-AND-LAYERS.md) · [DECISIONS.md](file:///Users/apple/Downloads/dev/antigravity/250-degree-Kitchen%20/DECISIONS.md)

---

## 0. Pre-Flight Gates & Zero-Waste Paper Lawbook

Do **not** spend Call `#01` until two quick prerequisites are locked in `DECISIONS.md`:
1. **Design Direction Lock (`D-01` & `D-06`):** Confirm Brand Name (working default: **`250° Kitchen`**, mark **`250°`**), Palette Temperament (**A: Sunlit Kiln & Terracotta** *(default below)*, **B: Ember Vermilion**, or **C: Roasted Crimson**), and Typography Pairing (**Option 1: `Instrument Serif` + `Plus Jakarta Sans`** vs. **Option 2: Unified `Plus Jakarta Sans`**).
2. **Cohesive Starter Photography (`ASSET-STRATEGY.md`):** Produce **1** Hero (`16:9`, `1600×900`) + **4** signature dish photos (`4:3`, `960×720`) under one sunlit-linen daylight art direction in `public/images/` so Paper loads real food via `paper-asset:///...`. *(If wireframing before images exist, use clean `#ECE6DC` warm-oat frames with exact `aspect` dimensions—never ugly stock photos or `paper-gen://` unless explicitly asked.)*

### 8 Paper MCP Survival Laws (Verified Against Paper MCP Tool Schemas)

Every wasted Paper call comes from violating Paper's layout/unit engine and having to patch mistakes. Enforce these 8 rules inside **every** `write_html` call so each group lands **95%+ right on Try #1**:

| # | Paper Engine Rule | Exact Compliance Standard |
| :---: | :--- | :--- |
| **1** | **Flexbox Only** | **NEVER** use `display: grid`, `display: inline`, `margin`, or `<table>` in `write_html`. Build every multi-column layout using `display: flex`, `flex-direction`, `flex-wrap`, `padding`, `gap`, and the **exact integer pixel column widths** pre-calculated in Section 2. |
| **2** | **Strict Typography Units** | Always use **`px`** for `font-size`, **`px`** for `line-height` (never unitless `1.5`!), and **`em`** for `letter-spacing` (e.g., `font-size: 16px; line-height: 25px; letter-spacing: -0.01em;`). Enforce the hospitality floor: **`>= 16px` body**, **`>= 13px` micro-metadata**, **`tabular-nums`** on every price, PIN, and timer. |
| **3** | **Fixed-Width Row Slots** | On repeated rows (nav items, modifier choices, cart lines, KDS ticket lines), put leading icons and trailing prices/actions in explicit `width` + `flex-shrink: 0` containers so columns never wobble. |
| **4** | **Semantic `layer-name` Contract** | Tag every major HTML container with `layer-name="<ShadcnPrimitive> / <FeatureRole>"` (e.g., `layer-name="Card / DishCard / Resting"`, `layer-name="Drawer / DishCustomizer"`). This guarantees 1:1 translation to React in Section 3. |
| **5** | **Batch All Array-Capable Calls** | Pass **all** font families in 1 `get_font_family_info`, **all** design tokens in 1 `create_tokens`, **all** `height: "fit-content"` updates in 1 `update_styles` per checkpoint, and **all** artboard IDs in 1 `finish_working_on_nodes` per checkpoint. |
| **6** | **Clone Over Rewrite** | Reuse identical structures across artboards (e.g., Floating Nav Pill from `AB-01` inside `AB-04`) via `<x-paper-clone node-id="..." />` or `duplicate_nodes` + batched `set_text_content`. |
| **7** | **Unified Stroke Icons, Zero Emojis** | Never use emojis as UI icons. Use minimal inline `20×20` / `24×24` SVGs (`fill="none"`, `stroke="currentColor"`, `stroke-width="1.75"`, `stroke-linecap="round"`, `stroke-linejoin="round"`) matching **`Hugeicons`** Stroke-Rounded weight. |
| **8** | **Zero-Slop Copy Gate (`clean-copy` + `unslop-ui`)** | Zero uppercase eyebrows (`01 //`, `OUR MENU`, `INTRODUCING`), zero subtitles restating headings, zero fake pulsing `"LIVE"` dots, zero vanity KPI strips (`10,000+ Diners`), and zero botsplaining. |

---

## 1. Exact Call-Budget Ledger (32 Nominal / 35 Max out of 100/Week)

### Budget Summary by Phase

| Phase | Scope | Nominal Calls | Max Calls (w/ Split-Session Buffer) | Gate |
| :--- | :--- | :---: | :---: | :--- |
| **Phase 0 — Session Init & Token Lock** | Guide, Canvas Info, Fonts, Semantic Tokens | **4** | **5** *(+1 if new page needed)* | Auto-proceed into Checkpoint 1 |
| **Checkpoint 1 — Style Proof (`AB-01`, `AB-02`)** | Desktop Homepage Hero + Menu + Dock, Component & State Sheet, 2 Screenshots + Release | **12** | **12** | **HARD STOP: User Visual Sign-Off Required!** |
| **Checkpoint 2 — Full Core Flows (`AB-03`, `AB-04`, `AB-05`)** | Mobile `/menu` + PIN Sheet, Desktop `/track` + Editorial Footer, Tablet `/kds` + `86` Drawer | **16** *(12 build + 4 review)* | **18** *(+1 guide re-read if fresh chat, +1 polish/audit)* | Final User Sign-Off + WCAG AA Audit |
| **TOTAL PLANNED SPEND** | **All 5 Production Artboards** | **32 / 100** | **35 / 100** | **65–68 weekly calls remain untouched!** |

### Surgical Call-by-Call Execution Ledger

| Call # | Phase | Paper MCP Tool | Exact Batched Arguments & Payload Scope | Success Criteria |
| :---: | :---: | :--- | :--- | :--- |
| **01** | Init | `get_guide` | `{ topic: "paper-mcp-instructions" }` | Mandatory session primer loaded. |
| **02** | Init | `get_basic_info` | `{}` | Captures `fileId`, active `pageId`, existing canvas bounds, installed fonts. |
| **03** | Init | `get_font_family_info` | `{ fileId, familyNames: ["Instrument Serif", "Fraunces", "Plus Jakarta Sans", "DM Sans", "JetBrains Mono"] }` | Verifies available weights/axes in **1** batched call before any typography. |
| **04** | Init | `create_tokens` | `{ fileId, tokens: [ ...62 semantic tokens in strict Paper order... ] }` *(exact payload below)* | Registers all `oklch()` colors, radii, spacing, containers, and type scales in **1** call. |
| **05** | CP-1 | `create_artboard` | `AB-01`: `"01 — Homepage (Desktop 1440)"` (`1440×900`, `bg: var(--background)`, flex col) | Top-level Desktop Homepage frame created. |
| **06** | CP-1 | `write_html` | `AB-01` **Group 1A**: Floating Frosted Nav Pill (`780×56`) + Centered Sunlit Hero Copy + Dual Pill CTAs + Wide Culinary Stage (`1224×540`, `36px` radius) | Above-the-fold composition lands complete with zero eyebrows or clutter. |
| **07** | CP-1 | `write_html` | `AB-01` **Group 1B**: Live Signature Menu Strip (`All`, `Burgers`, `Stone-Deck`, `Grill`, `Drinks` pill bar + 3-col flex row of `392px` shadowless `#FFFFFF` `24px` dish cards) | Full interactive menu strip visible directly below Hero stage. |
| **08** | CP-1 | `write_html` | `AB-01` **Group 1C**: Persistent Floating Dark Charcoal Table & Cart Dock (`580×68`, `9999px` pill, Table `05`, 2 diner avatars, `545 EGP`, `Open Cart`) | Layer 4 contrast plane anchors the bottom viewport cleanly. |
| **09** | CP-1 | `create_artboard` | `AB-02`: `"02 — Component & State Sheet (1440)"` (`1440×900`, `bg: var(--background)`, `padding: 64px 108px`, `gap: 56px`) | Component sheet placed `80px+` clear of `AB-01`. |
| **10** | CP-1 | `write_html` | `AB-02` **Group 2A**: 3-State Menu Card Matrix (`392px` × 3, `gap: 24px`): **Resting** \| **Hover / Lifted** \| **`86` Sold Out** | Proves shadowless tonal calm, hover elevation, and calm `86` stock lock. |
| **11** | CP-1 | `write_html` | `AB-02` **Group 2B**: `460px` **Dish Customizer Drawer** (header photo, Required RadioGroup, Optional Checkbox Add-Ons, Kitchen Note input, sticky quantity + rolling-price CTA) | Proves `base-luma` form density, `>= 16px` inputs, and clear required badges. |
| **12** | CP-1 | `write_html` | `AB-02` **Group 2C**: `460px` **Split-Bill Checkout Drawer** + `224px` Micro-State Strip (3-mode Split Tabs, Shared Table items w/ diner tags, integer-piaster totals, dual settlement CTAs) | Proves financial hierarchy and multi-diner ownership legibility. |
| **13** | CP-1 | `update_styles` | **Batched**: `[ { nodeIds: [AB-01, AB-02], styles: { height: "fit-content" } } ]` | Eliminates vertical clipping on both CP-1 artboards in **1** call. |
| **14** | CP-1 | `get_screenshot` | `{ fileId, nodeId: AB-01, scale: 1 }` | Inspects Homepage spacing, contrast, optical alignment, and fold balance. |
| **15** | CP-1 | `get_screenshot` | `{ fileId, nodeId: AB-02, scale: 1 }` | Inspects Card states and both Drawers side-by-side. |
| **16** | CP-1 | `finish_working_on_nodes` | `{ fileId, nodeIds: [AB-01, AB-02] }` | Releases working lock. **STOP HERE FOR USER VISUAL SIGN-OFF!** |
| — | **GATE** | **USER APPROVAL** | **Do NOT execute Call `#17` until user explicitly approves Checkpoint 1!** *(If tweaks are requested, batch all style edits into 1 `update_styles` + 1 `get_screenshot` from the 65-call reserve.)* | Prevents cascading rework across Screens 3–5. |
| **17** | CP-2 | `get_guide` | `{ topic: "mobile-status-bar" }` | Mandatory paste-ready iOS status bar markup for `390×844` mobile frame. |
| **18** | CP-2 | `create_artboard` | `AB-03`: `"03 — Mobile Menu & Join PIN Sheet (390)"` (`390×844`, `bg: var(--background)`, flex col) | Exact iPhone viewport width (`390px`). |
| **19** | CP-2 | `write_html` | `AB-03` **Group 3A**: iOS Status Bar + Mobile Sticky Top Bar + Scrollable Category Pills + 4 Compact Mobile Dish Cards (`1:1` thumb, `44×44px` `+` button) + Floating Dark Cart Dock | Full `844px` mobile `/menu` viewport above the fold. |
| **20** | CP-2 | `write_html` | `AB-03` **Group 3B**: `32px` State Divider + **`Table Join PIN Bottom Sheet`** (`390px` wide, `28px` top radius, drag handle, Tables `01–12` chips, 4× `64px` PIN OTP boxes, `16px` Nickname input, `52px` primary pill) | Both mobile `/menu` and Join Sheet inspectable cleanly in 1 artboard. |
| **21** | CP-2 | `create_artboard` | `AB-04`: `"04 — Live Tracker & Editorial Footer (1440)"` (`1440×900`, `bg: var(--background)`, flex col) | Desktop Live Tracker + Signature Footer frame. |
| **22** | CP-2 | `write_html` | `AB-04` **Group 4A**: Cloned Floating Nav Pill + Centered `760px` **Live Order Tracker** (`#250-042`, `~8 min`, 3-Stage Stitch-Loop Progress Stepper, Shared Receipt w/ diner tags) | Proves calm live-order legibility on warm linen. |
| **23** | CP-2 | `write_html` | `AB-04` **Group 4B**: Full-Width Editorial Footer (3-col links, `Back to top ↑`, **Open Kitchen Daylight-Only Toggle** w/ witty popover open, oversized subtle halftone `250°` wordmark) | Proves Layer 3 signature footer craft without visual soup. |
| **24** | CP-2 | `create_artboard` | `AB-05`: `"05 — Kitchen Display System /kds (1180×820)"` (`1180×820`, `bg: var(--kds-bg)`, flex col) | Mounted landscape tablet viewport (fixed height, zero vertical scroll). |
| **25** | CP-2 | `write_html` | `AB-05` **Group 5A**: `64px` KDS Operational Utility Bar (`250° PASS`, live stage counters, avg prep time `09:42`, chime toggle, `86 Stock (2)` drawer trigger) | Clean zero-glare operational header with `>= 44px` targets. |
| **26** | CP-2 | `write_html` | `AB-05` **Group 5B**: 3-Column Active Ticket Pass (`370px` × 3, `gap: 15px`): **NEW (`#044`)** \| **ON THE GRILL (`#039 OVERDUE 16:45` + `#042 06:30`)** \| **READY AT PASS (`#037`)** | Shows all 4 operational ticket states + `48px` tap-to-strike rows. |
| **27** | CP-2 | `write_html` | `AB-05` **Group 5C**: Right-Docked `340px` **`86` Stock Control Drawer** overlay (search input + 5× `56px` instant stock toggle switches) | Proves live menu stock-lock workflow from the kitchen pass. |
| **28** | CP-2 | `update_styles` | **Batched**: `[ { nodeIds: [AB-03, AB-04], styles: { height: "fit-content" } } ]` | Unclips `AB-03` and `AB-04`; `AB-05` stays fixed `1180×820`. |
| **29** | CP-2 | `get_screenshot` | `{ fileId, nodeId: AB-03, scale: 1 }` | Audits mobile tap targets (`>= 44px`), spacing, and PIN sheet legibility. |
| **30** | CP-2 | `get_screenshot` | `{ fileId, nodeId: AB-04, scale: 1 }` | Audits `/track` 3-stage bar, footer popover, and halftone wordmark balance. |
| **31** | CP-2 | `get_screenshot` | `{ fileId, nodeId: AB-05, scale: 1 }` | Audits dark charcoal KDS contrast, overdue legibility, and `86` drawer fit. |
| **32** | CP-2 | `finish_working_on_nodes` | `{ fileId, nodeIds: [AB-03, AB-04, AB-05] }` | Releases all working locks. **All 5 Artboards Complete!** |
| *(33)* | *Opt.* | `get_guide` | `{ topic: "paper-mcp-instructions" }` | *Only if Checkpoint 2 starts in a brand-new Antigravity chat.* |
| *(34)* | *Opt.* | `get_computed_styles` | `{ fileId, nodeIds: [keyText, keyButtons, kdsBadges] }` | *Single batched WCAG AA contrast + exact computed token verification.* |
| *(35)* | *Opt.* | `update_styles` | Batched micro-adjustments post-CP-2 review | *Keeps worst-case total strictly `<= 35` calls!* |

---

### Call `#04` Ready-to-Execute `create_tokens` Payload (Strict Paper Ordering)

> **WCAG AA Contrast Guard (Verified Mathematically):** Pure `#FFFFFF` on `#D14928` (`oklch(0.57 0.175 34)`) calculates to **4.48:1** (passes large bold `>= 18.67px` CTAs at `>= 3:1`, sits `0.02` shy of `4.50:1` for `14px` body pills). Tightening `--primary` slightly to **`oklch(0.55 0.178 34)` (`#C74222`)** delivers **4.96:1** with white text at **every** font size while preserving the exact warm Kiln Terracotta hue! Small accent text on warm linen uses `--primary-deep` (**`#B3391C` = 5.71:1**).

**Token Ordering Rule (per `create_tokens.json`):** Colors first (semantic neutrals → primary → secondary → accent → status → KDS dark plane); all numeric/size tokens sorted **smallest value first**.

| Group | Exact Token Name | Value (Default: Temperament A — Sunlit Kiln & Terracotta) | Contrast / Usage Note |
| :--- | :--- | :--- | :--- |
| **Color · Neutral** | `--background` | `oklch(0.955 0.011 82)` *(`#F4F0E8` Warm Linen)* | Layer 0 Page Canvas |
| **Color · Neutral** | `--card` | `oklch(1 0 0)` *(`#FFFFFF` Pure Crisp Paper)* | Layer 1 Shadowless Cards & Drawers |
| **Color · Neutral** | `--surface-muted` | `oklch(0.928 0.012 80)` *(`#ECE6DC` Soft Oat)* | Subtle pills, image placeholders, disabled states |
| **Color · Neutral** | `--glass-bg` | `rgba(244, 240, 232, 0.78)` | Layer 2 Frosted Daylight Nav Pill |
| **Color · Neutral** | `--border` | `rgba(29, 25, 22, 0.08)` | Whisper-thin hairlines & dividers only |
| **Color · Neutral** | `--foreground` | `oklch(0.22 0.008 55)` *(`#1D1916` Espresso Charcoal)* | **15.4:1** on linen · **17.5:1** on white |
| **Color · Neutral** | `--muted-foreground` | `oklch(0.45 0.014 60)` *(`#5C534B` Warm Slate)* | **6.6:1** on linen · **7.5:1** on white |
| **Color · Primary** | `--primary` | `oklch(0.55 0.178 34)` *(`#C74222` Kiln Terracotta)* | **4.96:1** with `#FFFFFF` (passes AA at all sizes!) |
| **Color · Primary** | `--primary-foreground` | `oklch(0.99 0.004 82)` *(`#FCFBF8` Warm White)* | Button & active pill ink |
| **Color · Primary** | `--primary-deep` | `oklch(0.49 0.165 33)` *(`#B3391C` Roasted Clay)* | Hover fill & small `13–14px` accent text (**5.7:1** on linen) |
| **Color · Primary** | `--primary-soft` | `oklch(0.94 0.032 36)` *(`#FAE8E2` Clay Tint)* | Soft active chip tint / focus halo |
| **Color · Dark Plane** | `--kds-bg` | `oklch(0.19 0.007 50)` *(`#171412` Charred Walnut)* | Layer 4 Floating Cart Dock & `/kds` background |
| **Color · Dark Plane** | `--kds-card` | `oklch(0.24 0.008 50)` *(`#221D1A` Smoked Slate)* | KDS ticket cards & `86` drawer surface |
| **Color · Dark Plane** | `--kds-border` | `rgba(247, 243, 236, 0.10)` | Dark plane subtle elevation edge |
| **Color · Dark Plane** | `--kds-foreground` | `oklch(0.964 0.010 80)` *(`#F7F3EC` Sunlit Ivory)* | **16.5:1** on `--kds-bg` |
| **Color · Dark Plane** | `--kds-muted` | `oklch(0.71 0.012 72)` *(`#A8A097` Warm Ash)* | **7.2:1** on `--kds-bg` |
| **Color · Status** | `--status-grill` | `oklch(0.68 0.175 38)` *(`#F26B44` Live Ember)* | **6.4:1** on `--kds-bg` (active sear indicator) |
| **Color · Status** | `--status-overdue` | `oklch(0.79 0.165 75)` *(`#F5A623` Kitchen Amber)* | **9.8:1** on `--kds-bg` (overdue `>= 15m` ticket alert) |
| **Color · Status** | `--status-ready` | `oklch(0.76 0.165 152)` *(`#34C77B` Pass Mint)* | **9.2:1** on `--kds-bg` (ready at pass) |
| **Radius** | `--radius-xs` → `--radius-pill` | `8px`, `12px`, `16px`, `24px`, `28px`, `36px`, `9999px` | Strict concentric ladder (`16 + 8 = 24`, `16 + 20 = 36`) |
| **Spacing** | `--space-1` → `--space-12` | `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px` | Smallest first |
| **Container** | `--container-mobile` → `--container-desktop` | `358px`, `760px`, `1140px`, `1224px`, `1440px` | Whole-pixel column containers |
| **Font Family** | `--font-display`, `--font-sans` | `"Instrument Serif"` *(or `"Plus Jakarta Sans"`)*, `"Plus Jakarta Sans"` | Max 2 families (`tabular-nums` replaces 3rd mono font!) |
| **Font Size** | `--text-micro` → `--text-hero` | `13px`, `14px`, `16px`, `18px`, `20px`, `24px`, `36px`, `44px`, `60px` | Hard floor: `13px` micro, `16px` body/inputs |
| **Line Height** | `--leading-micro` → `--leading-hero` | `18px`, `20px`, `25px`, `26px`, `28px`, `32px`, `42px`, `50px`, `64px` | Explicit `px` strings for Paper MCP compliance |

#### Instant 3-Line Palette Swap Matrix (If User Picks Temperament B or C in `D-06`)

| Token | Temperament A *(Default)* | Temperament B — Ember Vermilion | Temperament C — Roasted Crimson |
| :--- | :--- | :--- | :--- |
| `--background` | `oklch(0.955 0.011 82)` (`#F4F0E8`) | `oklch(0.952 0.006 75)` (`#F2F0EC`) | `oklch(0.964 0.010 80)` (`#F7F3EC`) |
| `--primary` | `oklch(0.55 0.178 34)` (`#C74222`) | `oklch(0.57 0.205 34)` (`#D94118` AA-safe) | `oklch(0.53 0.190 27)` (`#C83226`) |
| `--kds-bg` | `oklch(0.19 0.007 50)` (`#171412`) | `oklch(0.18 0.003 55)` (`#141312`) | `oklch(0.18 0.010 35)` (`#161211`) |

---

## 2. Exact Spatial Wireframe & Box Geometry Specification (All 5 Artboards)

Every pixel width below is pre-solved for **zero fractional sub-pixels** and **100% flexbox compatibility** in Paper `write_html`.

### Global Concentric Radius & Typography Geometry

- **Concentric Formula:** `R_outer = R_inner + inset_padding`
  - **Hero & Showcase Stage:** Outer **`36px`** · Inner corner overlay badge inset `20px` → **`16px`** radius (`16 + 20 = 36`).
  - **Desktop Menu Card:** Outer **`24px`** · Image frame inset `8px` (`top`/`left`/`right`) → **`16px`** inner food photo radius (`16 + 8 = 24`). Card text copy sits inside `16px` horizontal / `16px–20px` bottom padding below the photo.
  - **Mobile Menu Card:** Outer **`20px`** · Image inset `8px` → **`12px`** inner square photo radius (`12 + 8 = 20`).
  - **Buttons, Category Pills, Nav Pill, Cart Dock:** **`9999px`** full pill (nested pills share concentric circular arcs).
- **Strict 3-Tier Body Scale (Anti-Clutter):**
  - Display: Hero `H1` **`60px / 64px`** (`-0.025em`), Section `H2` **`40px / 46px`** (`-0.02em`), Tracker/Drawer Title **`24px–36px`**.
  - Card & UI Body: Dish Title **`20px / 26px`** (`600`), Body/Description/Inputs **`16px / 25px`** (`400`, max 2 lines).
  - Micro-Metadata: Prep time, dietary pill, price caption, table # **`13px–14px / 18px–20px`** (`500`, `font-variant-numeric: tabular-nums`). **Nothing below `13px` anywhere.**

---

### Artboard 1 (`AB-01`): Desktop Homepage Hero + Floating Nav Pill + Live Signature Menu Strip + Floating Cart Dock

- **Canvas:** `1440px` wide × `900px` initial → `height: "fit-content"` (~`1680px` final) · `background: var(--background)` · `padding: 24px 108px 136px 108px` (bottom `136px` clears the Floating Cart Dock preview) · **Inner Content Width = `1224px`**.
- **Layer & Flexbox Geometry:**

```text
[1440px Artboard · padding: 24px 108px 136px · flex-col · align-items: center]
 │
 ├── Group 1A (Call #06) · width: 1224px · flex-col · align-items: center · gap: 40px
 │    ├── Nav Pill [layer-name="NavigationMenu / FloatingNavPill"]
 │    │    width: 780px · height: 56px · padding: 6px 6px 6px 20px · radius: 9999px
 │    │    bg: var(--glass-bg) · border: 1px solid rgba(255,255,255,0.75)
 │    │    shadow: 0 8px 24px rgba(29,25,22,0.06), inset 0 1px 0 rgba(255,255,255,0.9)
 │    │    Slots (flex-row, align-items: center, justify-content: space-between):
 │    │      • Brand Mark (width: 72px, shrink-0): "250°" (20px bold, ember degree ring)
 │    │      • Links (flex-row, gap: 28px): "Menu" · "How It Works" · "Kitchen Pass" (14px/20px, 500)
 │    │      • Right Cluster (flex-row, gap: 8px, shrink-0):
 │    │          - Table Chip: "Table 05" (height: 40px, padding: 0 14px, radius: 9999px, bg: var(--card))
 │    │          - Primary CTA: "Order Now" (height: 44px, padding: 0 20px, radius: 9999px, bg: var(--primary), 14px 600 #FCFBF8)
 │    │
 │    ├── Hero Copy Stack [layer-name="Hero / CopyBlock"] (ZERO eyebrow!)
 │    │    width: 680px · padding-top: 28px · flex-col · align-items: center · gap: 20px · text-align: center
 │    │      • H1: "Fire-seared plates, ordered together at your table." (60px/64px, -0.025em, 2 crisp lines)
 │    │      • Supporting Line (<= 14 words): "Scan your table card, build one shared cart, and watch the kitchen pass live." (17px/26px, var(--muted-foreground))
 │    │      • CTA Row (flex-row, gap: 12px, padding-top: 8px):
 │    │          - Primary Pill (height: 52px, padding: 0 28px, radius: 9999px, bg: var(--primary)): "Join Your Table" (16px 600)
 │    │          - Secondary Pill (height: 52px, padding: 0 28px, radius: 9999px, bg: var(--card), border: 1px var(--border)): "Explore Menu" (16px 500)
 │    │
 │    └── Hero Culinary Stage [layer-name="Hero / CulinaryStage"]
 │         width: 1224px · height: 540px (cropped sunlit 21:9/16:9 stage peeking cleanly above the 900px fold!)
 │         radius: 36px · overflow: hidden · position: relative · bg: var(--surface-muted)
 │           • Full-bleed sunlit tabletop photography (`paper-asset://.../hero-table.webp`, object-fit: cover)
 │           • Single quiet glass pill bottom-left (bottom: 20px, left: 20px, radius: 16px — exact 36-20=16 concentricity!):
 │             "Kitchen prep ~12 min · Stone deck 250°C" (13px/18px, tabular-nums, zero blinking dot!)
 │
 ├── Group 1B (Call #07) · width: 1224px · padding-top: 88px · flex-col · gap: 32px
 │    ├── Menu Strip Header (flex-row, justify-content: space-between, align-items: flex-end)
 │    │    • Left: H2 "Signature plates" (40px/46px, -0.02em — zero eyebrow, zero redundant subtitle!)
 │    │    • Right [layer-name="Tabs / CategoryFilterPills"] (flex-row, gap: 8px):
 │    │        "All" [active: bg var(--foreground), #FCFBF8] · "Burgers" · "Stone-Deck" · "Grill" · "Drinks"
 │    │        (each height: 40px, padding: 0 18px, radius: 9999px, 14px/20px, bg: var(--card))
 │    │
 │    └── 3-Column Signature Dish Row [layer-name="Grid / SignatureMenuRow"]
 │         width: 1224px · flex-row · gap: 24px
 │         (3 × DishCard @ EXACT 392px each: 3×392 + 2×24 = 1224px!)
 │           Each Card [layer-name="Card / DishCard / Resting"]:
 │             width: 392px · bg: var(--card) · radius: 24px · padding: 8px 8px 20px 8px · flex-col · gap: 16px
 │             (ZERO outer border, ZERO drop shadow!)
 │               • Photo Frame: width: 376px · height: 282px (EXACT 4:3!) · radius: 16px (16+8=24!) · overflow: hidden
 │               • Content Stack (padding: 0 12px, flex-col, gap: 8px):
 │                   - Meta Row (flex-row, gap: 8px): "12 min" · "Best seller" (13px/18px, var(--muted-foreground), tabular-nums)
 │                   - Dish Title: "250° Smashed Brisket Burger" (20px/26px, 600, var(--foreground))
 │                   - Description: 2-line max (16px/24px, var(--muted-foreground))
 │                   - Footer Row (padding-top: 8px, flex-row, justify-content: space-between, align-items: center):
 │                       • Price: "245 EGP" (18px/24px, 600, tabular-nums)
 │                       • Action Pill: "+ Add" (height: 40px, padding: 0 18px, radius: 9999px, bg: var(--surface-muted) / primary on active)
 │
 └── Group 1C (Call #08) · width: 1224px · padding-top: 56px · flex-row · justify-content: center
      └── Floating Cart Dock [layer-name="Dock / FloatingTableCart"]
           width: 580px · height: 68px · padding: 10px 10px 10px 20px · radius: 9999px
           bg: var(--kds-bg) · shadow: 0 20px 44px rgba(23,20,18,0.22) · border: 1px solid rgba(247,243,236,0.10)
           Slots (flex-row, align-items: center, justify-content: space-between):
             • Table & Diners (flex-row, align-items: center, gap: 12px):
                 - "Table 05" pill (height: 32px, padding: 0 12px, radius: 9999px, bg: rgba(247,243,236,0.10), 13px 600 #F7F3EC)
                 - 2 Stacked Initial Avatars ("A", "S", 30×30px circles, -6px overlap via flex container, 13px 600)
                 - Count & Rolling Total: "3 items · 545 EGP" (15px/20px, 500, #F7F3EC, tabular-nums)
             • Primary Pill CTA (height: 48px, padding: 0 22px, radius: 9999px, bg: var(--primary), 15px 600 #FCFBF8): "Open Cart"
```

---

### Artboard 2 (`AB-02`): Component & State Sheet (Card States + Dish Customizer Drawer + Split-Bill Checkout Drawer)

- **Canvas:** `1440px` wide × `900px` initial → `height: "fit-content"` (~`1380px`) · `background: var(--background)` · `padding: 64px 108px 80px 108px` · `gap: 56px` · **Inner Content Width = `1224px`**.
- **Row 1 — Group 2A (Call #10): Menu Card 3-State Anatomy (`1224px` = `3 × 392px` + `2 × 24px` gap)**
  - Clean `14px` section label above each card (`Resting`, `Hover / Interactive Lift`, `86 · Sold Out`):
  1. **`Card / DishCard / Resting` (`392px`):** Pure `#FFFFFF`, `radius: 24px`, `0` border, `0` shadow, `376×282px` (`4:3`, `radius: 16px`) photo, `+ Add` in soft oat `#ECE6DC` with espresso ink.
  2. **`Card / DishCard / Hover` (`392px`):** Pure `#FFFFFF`, `radius: 24px`, `border: 1px solid rgba(29,25,22,0.08)`, `box-shadow: 0 14px 36px rgba(29,25,22,0.08)`, `+ Add` shifts to `--primary` fill with `#FCFBF8` ink.
  3. **`Card / DishCard / SoldOut86` (`392px`):** Surface `#F9F7F3`, `radius: 24px`, photo container `opacity: 0.42` + centered matte pill (`height: 32px`, `padding: 0 14px`, `radius: 9999px`, `bg: var(--foreground)`, `13px 600 #FCFBF8`: **`86 · Sold Out`**), title/price muted to `var(--muted-foreground)`, button disabled (`height: 40px`, `bg: var(--surface-muted)`, `opacity: 0.65`, label **`Unavailable`**).
- **Row 2 — Group 2B & Group 2C (Calls #11 & #12): Two Production-Width `460px` Drawers + `224px` Token Audit Strip (`460 + 40 + 460 + 40 + 224 = 1224px`)**
  - **Left (`460px`, Call #11) — `Drawer / DishCustomizer`:**
    - Container: `width: 460px`, `bg: var(--card)`, `radius: 28px`, `box-shadow: 0 24px 60px rgba(29,25,22,0.12)`, `border: 1px solid var(--border)`, `overflow: hidden`.
    - Header (`padding: 16px 16px 0`): `428×240px` (`16:9`, `radius: 16px`) dish photo with `40×40px` frosted circular Close button top-right (`inset: 12px`).
    - Title Block (`padding: 20px 24px 16px`, `gap: 6px`): `24px/30px` bold title (`Charred Truffle Smash Burger`) + `16px/24px` muted description.
    - Required Choice Group (`padding: 16px 24px`, `gap: 12px`): Header `Patty sear` (`16px 600`) + `Required` pill (`13px`, `bg: var(--primary-soft)`, `color: var(--primary-deep)`). 3 Radio rows (`height: 52px`, `radius: 14px`, `padding: 0 16px`, `border: 1px solid var(--border)`, active row `border-color: var(--primary)` + `bg: var(--primary-soft)`): `Medium-Rare` *(selected)* · `Medium` · `Well Done`, fixed `20px` radio circle right (`flex-shrink: 0`).
    - Optional Add-Ons (`padding: 12px 24px 16px`, `gap: 10px`): Header `Extras` (`16px 600`) + `Optional` (`13px` muted). 2 Checkbox rows (`height: 48px`): `Aged cheddar (+35 EGP)` [checked] · `Caramelized onions (+20 EGP)` with right-aligned `tabular-nums` prices (`width: 84px`, `flex-shrink: 0`).
    - Kitchen Note (`padding: 0 24px 20px`): Label `Kitchen note` (`14px 500`) + input (`height: 48px`, `radius: 12px`, `font-size: 16px`, placeholder `Allergies or no pickles...`).
    - Sticky Footer (`padding: 16px 24px 20px`, `border-top: 1px solid var(--border)`, `flex-row`, `gap: 12px`):
      - Quantity Stepper (`width: 120px`, `height: 48px`, `radius: 9999px`, `bg: var(--surface-muted)`): `-` · `1` · `+` (`40px` hit areas).
      - Primary Add CTA (`flex: 1`, `height: 48px`, `radius: 9999px`, `bg: var(--primary)`): **`Add to Table · 280 EGP`** (`tabular-nums`, Layer 2 `rolling-number` target).
  - **Center (`460px`, Call #12) — `Drawer / SplitBillCheckout`:**
    - Container: `width: 460px`, `bg: var(--card)`, `radius: 28px`, `box-shadow: 0 24px 60px rgba(29,25,22,0.12)`, `border: 1px solid var(--border)`.
    - Header (`padding: 24px 24px 16px`): `Table 05 · Checkout` (`24px/30px` bold) + live diner avatars (`Ahmed`, `Sara`) + Close button (`40×40px`).
    - 3-Mode Split Segmented Tabs (`padding: 4px`, `radius: 9999px`, `bg: var(--surface-muted)`, `height: 48px`): **`Pay Full`** \| **`My Items`** \| **`Split ÷ 2`** *(active pill `#FFFFFF`, shadow `0 2px 6px rgba(29,25,22,0.08)`)* — each tab `flex: 1`, `14px 600`.
    - Shared Line-Item List (`padding: 16px 24px`, `gap: 14px`): 3 rows with fixed slots: `28px` qty (`1×`) · `flex: 1` dish + modifier summary (`15px/20px` + `13px/18px`) · `68px` owner pill (`Ahmed` / `Sara`, `13px`) · `80px` right-aligned `tabular-nums` price (`280 EGP`).
    - Integer-Piaster Summary Box (`margin-free` via parent `padding: 0 24px`): Inner card `bg: var(--background)`, `radius: 16px`, `padding: 16px`, `gap: 8px`: `Subtotal` (`545.00 EGP`) · `VAT 14%` (`76.30 EGP`) · Hairline · **`Your share (÷ 2)`** (`310.65 EGP` in `20px 700 tabular-nums` + `13px` note: *Exact piaster split · +0.01 rounding rule*).
    - Settlement Footer (`padding: 20px 24px 24px`, `flex-col`, `gap: 10px`):
      - Primary Pill (`height: 50px`, `radius: 9999px`, `bg: var(--primary)`): **`Pay 310.65 EGP Now`**
      - Secondary Pill (`height: 46px`, `radius: 9999px`, `bg: var(--surface-muted)`): **`Pay at Counter (#C-205)`**
  - **Right (`224px`, inside Call #12) — `Spec / MicroStates`:**
    - Compact stacked reference cards (`224px` wide, `gap: 16px`): Focus Ring Specimen (`2px solid var(--primary)` + `2px` offset), Base UI Toast Preview (`Added to Table 05 · Undo`), and `rolling-number` price delta badge (`245 → 280 EGP`).

---

### Artboard 3 (`AB-03`): Mobile `390×844` — Interactive `/menu` + Floating Cart Dock + Table Join PIN Sheet

- **Canvas:** `390px` wide × `844px` initial → `height: "fit-content"` (~`1392px`) · `background: var(--background)` · **Inner Content Width = `358px`** (`16px` left/right padding).
- **Top `844px` Viewport — Group 3A (Call #19): Live Mobile `/menu` + Floating Cart Dock**
  - **iOS Status Bar (`390×54px`):** Paste-ready markup from Call `#17` `get_guide({ topic: "mobile-status-bar" })`.
  - **Mobile Top Bar (`358×56px`, `padding: 0 16px`, `flex-row`, `justify-content: space-between`, `align-items: center`):**
    - Left: `250°` wordmark (`20px 700`).
    - Right (`flex-row`, `gap: 8px`): `Table 05` pill (`height: 36px`, `padding: 0 12px`, `radius: 9999px`, `bg: var(--card)`, `13px 600`) + Search icon button (`44×44px`, `radius: 9999px`, `bg: var(--card)`).
  - **Horizontal Category Pills (`390px`, `padding: 8px 16px 12px`, `flex-row`, `gap: 8px`, `overflow: hidden`):**
    - `All` *(active: `bg: var(--foreground)`, `#FCFBF8`)* · `Burgers` · `Stone-Deck` · `Grill` · `Drinks` (each `height: 40px`, `padding: 0 16px`, `radius: 9999px`, `14px 500`, `flex-shrink: 0`).
  - **Mobile Dish Card Stack (`358px`, `padding: 4px 16px`, `flex-col`, `gap: 12px` — 4 cards filling viewport cleanly above the dock):**
    - Each Card (`width: 358px`, `bg: var(--card)`, `radius: 20px`, `padding: 8px`, `flex-row`, `gap: 12px`, `align-items: center`):
      - Left Photo (`width: 104px`, `height: 104px`, `radius: 12px` — exact `12 + 8 = 20px` concentricity!, `flex-shrink: 0`, `object-fit: cover`).
      - Right Stack (`width: 226px`, `flex-col`, `gap: 4px`, `padding-right: 4px`):
        - Meta (`13px/18px`, muted, `tabular-nums`): `12 min · Popular`
        - Dish Title (`17px/22px`, `600`, single/2-line clamp)
        - Short Desc (`14px/19px`, muted, 1 line)
        - Price + Action Row (`padding-top: 6px`, `flex-row`, `justify-content: space-between`, `align-items: center`): `245 EGP` (`16px 600 tabular-nums`) + circular `+` button (**`44×44px`** WCAG touch target, `radius: 9999px`, `bg: var(--surface-muted)` / `var(--primary)` when in cart with qty badge `1`).
  - **Bottom Floating Dark Cart Dock (`358×64px`, `padding: 8px 8px 8px 18px`, `radius: 9999px`, `bg: var(--kds-bg)`, `shadow: 0 16px 36px rgba(23,20,18,0.28)`):**
    - Left: `3 items · 545 EGP` (`15px 600 #F7F3EC tabular-nums`) + `Table 05` (`13px var(--kds-muted)`).
    - Right: `Cart` pill (`height: 48px`, `padding: 0 20px`, `radius: 9999px`, `bg: var(--primary)`, `15px 600 #FCFBF8`).
    - Bottom iOS Home Indicator bar (`134×5px`, `radius: 9999px`, centered in `24px` bottom safe area).
- **Bottom Sheet Spec — Group 3B (Call #20): `Table Join PIN Bottom Sheet` (`390px` wide × `516px` tall, below `32px` warm divider)**
  - Sheet Surface: `width: 390px`, `bg: var(--card)`, `radius: 28px 28px 0 0`, `padding: 12px 20px 32px`, `flex-col`, `gap: 20px`, **Inner Width = `350px`**.
  - Drag Handle: `36×4px`, `radius: 9999px`, `bg: rgba(29,25,22,0.16)`, centered.
  - Header (`gap: 6px`): `Join your table` (`24px/30px` `700`) + `Pick your table number and enter the 4-digit PIN on the table stand.` (`16px/24px` muted).
  - Table Selector Chips (`width: 350px`, `display: flex`, `flex-wrap: wrap`, `gap: 8px`): 2 rows of 6 chips (`01`–`12`), each **`51×44px`** (`6×51 + 5×8 = 346px`, centered cleanly!), `radius: 12px`, `15px 600 tabular-nums` (`05` active in `var(--primary)`).
  - 4-Digit PIN OTP Row (`width: 350px`, `flex-row`, `justify-content: center`, `gap: 12px`): 4 slots × **`64×64px`**, `radius: 16px`, `bg: var(--background)`, `border: 1.5px solid var(--border)` (active slot `border-color: var(--primary)`), `24px 700 tabular-nums` (`4`, `8`, `2`, `|`).
  - Guest Nickname Input (`width: 350px`, `height: 48px`, `padding: 0 16px`, `radius: 14px`, `bg: var(--background)`, **`font-size: 16px`** to prevent iOS Safari zoom!): `Ahmed`.
  - Submit Pill (`width: 350px`, `height: 52px`, `radius: 9999px`, `bg: var(--primary)`, `16px 600 #FCFBF8`): **`Join Table 05`**.

---

### Artboard 4 (`AB-04`): Desktop `1440×900` — Live Order Tracker `/track` + Editorial Halftone Footer w/ Daylight Toggle

- **Canvas:** `1440px` wide × `900px` initial → `height: "fit-content"` (~`1420px`) · `background: var(--background)` · `flex-col` · `align-items: center`.
- **Top Section — Group 4A (Call #22): Floating Nav Pill + Centered `760px` Live Order Tracker (`padding: 24px 108px 88px 108px`, `gap: 48px`)**
  - **Floating Nav Pill:** Cloned from `AB-01` (`780×56px`, `radius: 9999px`) via `<x-paper-clone>` or concise inline mirror (`Table 05` active).
  - **Tracker Hero Card (`width: 760px`, `bg: var(--card)`, `radius: 28px`, `padding: 36px`, `flex-col`, `gap: 28px`):**
    - Top Row (`flex-row`, `justify-content: space-between`, `align-items: flex-start`):
      - Left: `Order #250-042 · Table 05` (`14px/20px` `500` `var(--muted-foreground)` `tabular-nums`) + Headline (`36px/42px` `700` `-0.02em`): **`Your dishes are on the grill`**
      - Right (`align-items: flex-end`): **`~8 min`** (`32px/36px` `700` `var(--primary)` `tabular-nums`) + `Estimated ready` (`13px/18px` muted)
    - **3-Stage Tactile Progress Stepper (`width: 688px`, `flex-row`, `gap: 14px` — `3 × 220px` + `2 × 14px` = `688px` exact):**
      - Stage 1 (`Received · 14:08`): `6px` full-filled `var(--foreground)` track bar + check icon + `14px 600` label.
      - Stage 2 (`On the Grill · Now`): `6px` active `var(--primary)` track bar + hearth flame icon + `14px 600 var(--primary-deep)` label.
      - Stage 3 (`Ready at Pass`): `6px` `var(--surface-muted)` track bar + `14px 500 var(--muted-foreground)` label.
    - Quiet Status Line (`padding: 14px 16px`, `radius: 14px`, `bg: var(--background)`, `flex-row`, `justify-content: space-between`): `Kitchen Pass updated 18s ago` (`14px` muted, `tabular-nums`) · `2 of 3 items firing` (`14px 600`).
  - **Shared Order Receipt Card (`width: 760px`, `bg: var(--card)`, `radius: 24px`, `padding: 28px 36px`, `flex-col`, `gap: 16px`):**
    - Header (`flex-row`, `justify-content: space-between`, `align-items: center`): `Table 05 receipt` (`20px 600`) · `Split Equally · Settled` pill (`13px 600`, `bg: var(--surface-muted)`, `radius: 9999px`, `padding: 6px 12px`).
    - 3 Fixed-Slot Line Rows (`flex-row`, `align-items: center`, `gap: 12px`, `padding: 8px 0`): `32px` qty · `flex: 1` title + modifier (`16px 500` / `14px muted`) · `84px` owner chip (`Ahmed`/`Sara`) · `96px` right-aligned `tabular-nums` price.
    - Footer Row (`border-top: 1px solid var(--border)`, `padding-top: 16px`, `flex-row`, `justify-content: space-between`, `align-items: center`): `Total paid · 621.30 EGP` (`18px 700 tabular-nums`) · Secondary pill (`height: 44px`, `padding: 0 20px`, `radius: 9999px`, `bg: var(--surface-muted)`): `Order another round`.
- **Bottom Section — Group 4B (Call #23): Signature Editorial Footer (`width: 1440px`, `border-top: 1px solid var(--border)`, `padding: 64px 108px 40px 108px`, `flex-col`, `gap: 56px`)**
  - **3-Column Utility Row (`width: 1224px`, `flex-row`, `justify-content: space-between`, `align-items: flex-start`, `gap: 48px`):**
    - Col 1 (`420px`, `flex-col`, `gap: 10px`): `250° Kitchen` (`22px 700`) + `Road 9, Maadi, Cairo · Daily 12:00 – 00:00` (`15px/22px` muted).
    - Col 2 (`360px`, `flex-row`, `gap: 48px`): 2 clean link stacks (`Menu`, `Join Table`, `Track Order` \| `Kitchen Pass (/kds)`, `Staff Sign-In`, `EN / عربي`).
    - Col 3 (`348px`, `flex-col`, `align-items: flex-end`, `gap: 12px`):
      - **Open Popover Preview (`width: 320px`, `padding: 14px 16px`, `radius: 16px`, `bg: var(--card)`, `border: 1px solid var(--border)`, `shadow: 0 12px 28px rgba(29,25,22,0.08)`):** *"We're an open sunlit kitchen — no dark kitchens here. Dark mode lives strictly on the Kitchen Pass (`/kds`)."* (`14px/20px` `var(--foreground)`).
      - Utility Controls Row (`flex-row`, `gap: 10px`, `align-items: center`):
        - **Daylight-Only Theme Toggle** (`height: 40px`, `padding: 4px`, `radius: 9999px`, `bg: var(--surface-muted)`, `flex-row`, `gap: 4px`): Sun pill (`bg: var(--card)`, active) + Moon button (triggers witty popover).
        - **`Back to top ↑`** pill (`height: 40px`, `padding: 0 16px`, `radius: 9999px`, `bg: var(--card)`, `14px 500`).
  - **Oversized Editorial Halftone Wordmark (`width: 1224px`, `height: 196px`, `flex-row`, `justify-content: center`, `align-items: center`, `overflow: hidden`):**
    - Subtle warm espresso dotted/halftone SVG `250°` wordmark (`opacity: 0.14`, clean dot-matrix pattern inside vector glyph bounds, Layer 3 ripple anchor — calm, gallery-worthy, zero visual noise).

---

### Artboard 5 (`AB-05`): Mounted Tablet `1180×820` — Dark Charcoal Kitchen Display System (`/kds`)

- **Canvas:** `1180px` wide × **`820px` fixed** (zero vertical scroll — mounted kitchen pass iPad/tablet!) · `background: var(--kds-bg)` (`#171412`) · `flex-col` · `overflow: hidden`.
- **Group 5A (Call #25): `64px` Top Operational Utility Bar (`width: 1180px`, `height: 64px`, `padding: 0 20px`, `bg: #1E1A17`, `border-bottom: 1px solid var(--kds-border)`, `flex-row`, `justify-content: space-between`, `align-items: center`)**
  - Left (`flex-row`, `align-items: center`, `gap: 20px`): `250° PASS` (`18px 700 #F7F3EC`, ember `°`) + Stage Count Pills (`New 2` · `Grill 2` · `Ready 1`, `14px 600 tabular-nums`, `height: 32px`, `radius: 9999px`).
  - Center: `Avg prep 09:42` (`14px 500 var(--kds-muted) tabular-nums`).
  - Right (`flex-row`, `gap: 10px`): Audio Chime Toggle (`44×44px`, `radius: 9999px`, `bg: var(--kds-card)`) + **`86 Stock (2)`** drawer trigger (`height: 44px`, `padding: 0 18px`, `radius: 9999px`, `bg: var(--primary)`, `14px 600 #FCFBF8`).
- **Group 5B (Call #26): 3-Column Active Ticket Pass (`width: 1180px`, `height: 756px`, `padding: 16px 20px`, `flex-row`, `gap: 15px`)**
  - **Exact Column Math:** `1180 - 40 (padding) = 1140px`; `1140 - 30 (2×15px gaps) = 1110px`; `1110 / 3 =` **`370px` EXACT per column!**
  - **Column 1 (`370px`) — `NEW (2)`:**
    - Column Header (`height: 32px`): `NEW` (`14px 700` tracked `0.06em`, `#F7F3EC`) + count pill `2`.
    - Ticket `#044 · Table 08` (`width: 370px`, `bg: var(--kds-card)`, `radius: 18px`, `border: 1px solid var(--kds-border)`, `padding: 16px`, `gap: 12px`):
      - Ticket Top Row: **`#044 · Table 08`** (`18px 700 #F7F3EC`) · Timer Pill **`01:14`** (`14px 700 tabular-nums`, `bg: rgba(247,243,236,0.10)`).
      - 2 Tap-to-Strike Dish Rows (`min-height: 48px`, `padding: 8px 10px`, `radius: 12px`, `bg: rgba(255,255,255,0.03)`): `2×` (`28px` bold fixed slot) + Dish Name (`16px 600 #F7F3EC`) + High-contrast Modifier Callout (`14px 500 var(--status-grill)`: `No pickles · Medium-Rare`).
      - Full-Width Stage CTA (`height: 48px`, `radius: 12px`, `bg: var(--primary)`, `15px 600 #FCFBF8`): **`Start on Grill`**.
  - **Column 2 (`370px`) — `ON THE GRILL (2)`:**
    - **Ticket 2A — OVERDUE ALERT (`#039 · Table 03`):**
      - `border: 1.5px solid var(--status-overdue)` + `4px` top amber warning edge (`#F5A623`).
      - Timer Pill: **`OVERDUE 16:45`** (`bg: var(--status-overdue)`, `color: #171412`, `14px 700 tabular-nums` — **9.8:1** contrast!).
      - Line 1 (Struck-through / Prepped): Check icon + muted strikethrough `1× Truffle Fries`.
      - Line 2 (Active): `1× Ribeye Steak 250g · Medium-Rare`.
      - CTA (`height: 48px`, `radius: 12px`, `bg: var(--status-overdue)`, `color: #171412`, `15px 700`): **`Mark Ready`**.
    - **Ticket 2B — Normal Active (`#042 · Table 05`):** Timer `06:30` (`var(--status-grill)` badge), 2 lines, `48px` CTA `Mark Ready` (`bg: rgba(247,243,236,0.12)`, `#F7F3EC`).
  - **Column 3 (`370px`) — `READY AT PASS (1)`:**
    - Ticket `#037 · Table 02`: `3px` top `var(--status-ready)` stripe, `11:05` mint timer pill, `48px` CTA **`Served · Clear`** (`bg: var(--status-ready)`, `color: #171412`, `15px 700`).
- **Group 5C (Call #27): Right-Docked `340px` `86 / Stock Control Drawer` Overlay**
  - Positioned `position: absolute; top: 64px; right: 0; width: 340px; height: 756px;` over the right edge of Column 3 (`bg: #26201D`, `border-left: 1px solid rgba(247,243,236,0.14)`, `box-shadow: -20px 0 48px rgba(0,0,0,0.48)`, `padding: 20px`, `flex-col`, `gap: 16px`).
  - Header (`flex-row`, `justify-content: space-between`, `align-items: center`): `86 Stock Control` (`20px 700 #F7F3EC`) + Close `44×44px` button.
  - Subtitle (`13px/18px var(--kds-muted)`): `Toggling a dish locks it live on /menu.`
  - Search Input (`height: 44px`, `radius: 12px`, `bg: var(--kds-bg)`, `font-size: 16px`, `color: #F7F3EC`).
  - 5 Dish Toggle Rows (`height: 56px`, `padding: 0 12px`, `radius: 12px`, `bg: rgba(255,255,255,0.03)`, `flex-row`, `justify-content: space-between`, `align-items: center`):
    - Left: Dish Name (`15px 500 #F7F3EC`) + Category (`13px var(--kds-muted)`).
    - Right (`flex-shrink: 0`): `48×28px` Switch (`In Stock` in `var(--status-ready)` vs. `86` off state with `86` pill badge in `var(--status-overdue)`).

---

## 3. Exact Paper-to-`shadcn base-luma` Translation Contract

> **Hard Engineering Law (Zero Exported `<div>` Slop):**  
> Never paste raw `get_jsx` output from Paper into `src/`. Paper owns **proportions, spacing, typography floor, and `oklch()` token values**; React code owns **semantics, accessibility, and `@base-ui/react` behavior**.
>
> **Critical Nov 2026 Base UI Rule (Verified via Context7 `/websites/ui_shadcn`):**  
> `shadcn/ui` (`base-luma`) runs on **`@base-ui/react`**, which uses the **`render` prop**—**NEVER** Radix UI's `asChild` prop!  
> Example: `<DrawerTrigger render={<Button variant="default" />}>Open Cart</DrawerTrigger>`

### 1:1 Paper Layer → React / `shadcn base-luma` Mapping Table

| Paper `layer-name` | Exact `shadcn base-luma` Primitive (`@/components/ui/*`) | Feature Component Path | Semantic Tailwind v4 Tokens (Zero Hex!) | Layer 2 / 3 Craft Hook |
| :--- | :--- | :--- | :--- | :--- |
| `NavigationMenu / FloatingNavPill` | `Button` + TanStack `<Link>` + `Badge` | `src/features/shared/FloatingNavPill.tsx` | `bg-background/80 backdrop-blur-md border border-border rounded-full` | Custom inline `250°` SVG wordmark + `Hugeicons` |
| `Hero / CulinaryStage` | Semantic `<section>` + `Button` (`rounded-full`) + `Badge` | `src/features/storefront/HeroStage.tsx` | `bg-background text-foreground rounded-[36px] bg-primary text-primary-foreground` | `fetchpriority="high"` `.webp` + optional Layer 3 line reveal |
| `Tabs / CategoryFilterPills` | `Tabs`, `TabsList`, `TabsTrigger` (`@/components/ui/tabs`) | `src/features/menu/CategoryFilterBar.tsx` | `bg-card data-active:bg-foreground data-active:text-primary-foreground rounded-full` | CSS `@starting-style` / subtle spring indicator |
| `Card / DishCard / Resting \| Hover \| SoldOut86` | `Card`, `CardContent`, `CardFooter`, `Badge`, `Button` (`@/components/ui/card`) | `src/features/menu/DishCard.tsx` | `bg-card rounded-3xl p-2 border-0 hover:shadow-lg transition-shadow` | `4:3` `rounded-2xl` photo + `rolling-number` price + `Hugeicons` `+`→`✓` |
| `Dock / FloatingTableCart` | Fixed `<aside>` + `Avatar`, `AvatarFallback` (`@/components/ui/avatar`) + `Button` | `src/features/cart/FloatingCartDock.tsx` | `bg-kds text-kds-foreground rounded-full shadow-2xl border border-kds-border` | `rolling-number` live subtotal + `<LazyMotion>` spring entrance |
| `Drawer / DishCustomizer` | `Drawer`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerClose` (`showSwipeHandle={isMobile}`, `swipeDirection={isMobile ? "down" : "right"}`) + `Field`, `FieldLabel`, `RadioGroup`, `Checkbox`, `Input`, `Button` | `src/features/menu/DishCustomizerDrawer.tsx` | `bg-card text-foreground border-border rounded-t-[28px] md:rounded-l-[28px]` | `@tanstack/react-form` + Zod v4 + live `rolling-number` CTA total |
| `Drawer / SplitBillCheckout` | `Drawer`, `Tabs` (3-way Split mode), `Avatar`, `Separator`, `ScrollArea`, `Button` (`@/components/ui/drawer`, `tabs`, `scroll-area`) | `src/features/cart/SplitCheckoutDrawer.tsx` | `bg-card bg-muted rounded-full bg-background rounded-2xl tabular-nums` | Pure integer-piaster split engine (`vitest` 100% covered) + `rolling-number` share |
| `Sheet / TableJoinPin` | `Drawer` (`swipeDirection="down"`, `showSwipeHandle`) + `ToggleGroup` (Tables `01–12`) + `InputOTP` (`@/components/ui/input-otp`) + `Input` (`text-base` `16px`) + `Button` | `src/features/table/TableJoinSheet.tsx` | `bg-card rounded-t-[28px] bg-background border-border focus-visible:ring-ring` | Auto-focus next OTP slot + Convex `joinTableByPin` mutation |
| `Card / LiveOrderTracker` | `Card`, `Badge`, `Progress` (`@/components/ui/progress`), `Separator`, `Button` | `src/features/track/OrderTrackerCard.tsx` | `bg-card rounded-[28px] bg-primary bg-foreground bg-muted tabular-nums` | Real-time Convex `useQuery` subscription (`<300ms` KDS sync) |
| `Footer / EditorialFooter` | Semantic `<footer>` + `Popover`, `PopoverTrigger`, `PopoverContent` (`@/components/ui/popover`) + `Button` | `src/features/shared/EditorialFooter.tsx` | `bg-background border-t border-border text-muted-foreground` | Layer 3: **Daylight-Only Popover Joke** + subtle halftone `250°` wordmark ripple |
| `Kds / OperationalBar` & `Kds / TicketColumn` | Scoped `.kds-surface` wrapper + `Card`, `Badge`, `Button` (`min-h-12` `48px` targets) | `src/features/kds/KdsBoard.tsx`, `KdsTicketCard.tsx` | `bg-kds text-kds-foreground bg-kds-card border-kds-border text-status-overdue` | `Sound Lab` chime on new ticket + explicit 1-tap bump (zero `@dnd-kit`!) |
| `Drawer / StockControl86` | `Sheet`, `SheetTrigger` (`render={<Button />}`), `SheetContent` (`@/components/ui/sheet`) + `Input` + `Switch` (`@/components/ui/switch`) | `src/features/kds/StockControl86Drawer.tsx` | `bg-kds-card text-kds-foreground border-l border-kds-border` | Convex `toggleDishAvailability` → instant live lock on `/menu` |
| `Spec / MicroStates` | `@base-ui/react/toast` (`@/components/ui/toast`) | `src/features/shared/AppToaster.tsx` | `bg-kds text-kds-foreground rounded-full` | Replaces `sonner` with native Base UI Toast |

### 1-Place Tailwind v4 `src/index.css` Token Bridge (Direct Sync from Paper Call `#04`)

Changing color temperament later edits **only 3–4 lines** inside `:root`—never JSX files:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--foreground);
  --color-popover: var(--card);
  --color-popover-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--surface-muted);
  --color-secondary-foreground: var(--foreground);
  --color-muted: var(--surface-muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-input: var(--border);
  --color-ring: var(--primary);
  /* Layer 4 Dark Plane (Floating Dock & /kds) */
  --color-kds: var(--kds-bg);
  --color-kds-card: var(--kds-card);
  --color-kds-foreground: var(--kds-foreground);
  --color-kds-muted: var(--kds-muted);
  --color-kds-border: var(--kds-border);
  --color-status-grill: var(--status-grill);
  --color-status-overdue: var(--status-overdue);
  --color-status-ready: var(--status-ready);
}
```

---

## 4. Seamless Backup Plan (If Paper's 100 Weekly Calls Ever Run Out)

Because all layout math (Section 2) and `oklch()` design tokens (Section 1) live in this Markdown blueprint—**not** trapped inside Paper—switching tools loses **zero** design decisions and **zero** pixel specifications.

### Backup Tier 1: `pen.dev` (`pencil` MCP — Already Installed in Antigravity!)

Use when you want unlimited structured canvas frames committed directly inside Git (`design/250-kitchen.pen`):
1. **Strict Rule:** `.pen` files are encrypted—**never** use `read_file` or `grep` on them. Interact strictly through `pencil` MCP tools.
2. **Exact Execution Sequence:**
   - Call `pencil:get_app_state({})` to verify the open `.pen` document URI (`file:///.../design/250-kitchen.pen`) and active canvas state.
   - Call `pencil:read_skill()` once to load the exact `execute` JS API documentation.
   - Translate each artboard (`AB-01`–`AB-05`) into **1 batched `pencil:execute` call per artboard** using the exact pixel dimensions (`1440px`, `1224px` container, `392px` cards, `390×844` mobile, `1180×820` KDS) and hex/OKLCH values from Sections 1–2. *(If any `execute` snippet fails, patch via `editId` + `edits` instead of resending from scratch.)*
   - Inspect visuals with `pencil:browser({ uri, action: "return-screenshot" })` and persist via `pencil:save({ uri })`.

### Backup Tier 2: `kgoedecke/doop` (Open-Source Self-Hosted HTML/CSS Canvas + Unlimited MCP)

Use when you want Paper's **exact same HTML/CSS iframe canvas** with **zero weekly call limit**:
1. **Local Spin-Up (Requires `bun` or Docker, zero external DB setup via embedded `pglite`):**
   ```bash
   git clone https://github.com/kgoedecke/doop.git
   cd doop && bun install && bun run dev
   ```
   - Canvas Web UI: `http://localhost:4300`
   - Built-in MCP Server Endpoint: `http://localhost:4400/mcp`
2. **Connect MCP to Antigravity:** Open Doop's web UI (`Connect AI`) or add the MCP server entry pointing `DOOP_SERVER_URL=http://localhost:4400` (`server/mcp.ts` or HTTP MCP transport at `http://localhost:4400/mcp`).
3. **1:1 Reuse:** Every inline-styled HTML block, `var(--token)` CSS variable, and flexbox layout from Section 2 runs verbatim inside Doop's sandboxed HTML artboard frames—and unlike Paper, Doop supports full modern CSS (`grid`, `backdrop-filter`, animations) with unlimited MCP calls.

### Backup Tier 3: Direct `shadcn base-luma` + Browser Subagent Sandbox (Post-Checkpoint 1 Only)

If Paper's 100 calls ever run out **after** Checkpoint 1 (`AB-01` + `AB-02`) is already approved, do **not** burn hours configuring another design tool for remaining screens:
1. Sync Checkpoint 1's verified `oklch()` tokens into `src/index.css`.
2. Build remaining screens (`AB-03`, `AB-04`, `AB-05`) directly in React using Section 2's pixel specifications and Section 3's exact `shadcn base-luma` primitives.
3. Run the `browser` subagent at `1440×900`, `1180×820`, and `390×844` to visually verify rendered screenshots side-by-side against Checkpoint 1 before marking each slice done.
