# Brand Identity, Global + KSA/UAE Bilingual Research & SVG Logo Concepts

> **Date:** November 19, 2026  
> **Trigger:** Our v1 studio packaging renders (`branded_250_packaging_mockup*.jpg`) looked clean as placeholder photography, **but** the `"250°"` text stamped on the white cup/box looked like plain default font typed onto blank packaging — zero shelf authority or iconic brand presence.  
> **Research Scope:** Dual-track analysis across **KSA & UAE bilingual F&B leaders** (`Half Million ½M`, `Section-B`, `Barn's`, `BRGR`, `Salt`, `3Fils`, `High Joint`, `Pickl`, Tarek Atrissi, WonderEight) and **Global numeric & fast-casual hospitality systems** (`800° Woodfired Kitchen`, `400 Gradi`, `99 Sushi Bar`, `Double Zero`, `Blank Street`, `Shake Shack`, `CAVA`, `Blacklock`, `Sweetgreen`, `Bleecker`).

---

## 1. Why v1 Looked Like Plain Text — And What Gives Real Restaurant Logos Presence

Standard system numerals (`250°`) fail as a brand mark for three mechanical reasons: passive default kerning, uneven stroke geometry, and a tiny superscript `°` that reads like a math footnote. Real iconic F&B brands fix this with **5 structural techniques**:

1. **Symbolic / Numeric Compression (`Half Million ½M`, `BRGR`, `3Fils`, `Barn's`):**
   - `Barn's` dropped *"Café"* to own one unmistakable wordmark; `Half Million` compressed 500,000 SAR into an architectural fraction **`½M`**.
   - **Rule for us:** **`250°`** is the iconic hero mark — **not** the long phrase *"250° Kitchen"*. `KITCHEN` / `مطبخ` serves strictly as a quiet secondary descriptor in full lockups and packaging stamps, and disappears completely at small/mobile sizes.
2. **Enlarging the Degree Ring (`°`) Into the Brand Anchor (`800°`, `400 Gradi`, `CAVA`):**
   - Instead of a microscopic superscript, scaling the `°` to **28–38% of cap height** in our signature **ember red-orange** turns it into a glowing oven mouth, sun, hearth dial, or heat signature — carrying brand color even in a 16px favicon.
3. **Custom Modular Geometry & Rotational Symmetry (`Double Zero 00`, `Puebla 109`, `E11VN`):**
   - Notice a hidden geometric gift in **`250`**: **`2` and `5` are 180° rotational cousins!** Building `2`, `5`, and `0` on one tight modular stroke grid (`stroke-to-height ~17–20%`, optical tracking `-0.04em` to `-0.06em`) locks three separate digits into a single unified architectural silhouette.
4. **Structural Framing & Hallmark Stamps (`Blank Street`, `Blacklock`, `Section-B`):**
   - Enclosing the mark inside an architectural **kiln/oven arch**, a **heavy stamp frame**, or a **circular tamper seal** transforms numerals into physical culinary hardware rather than web copy.
5. **Packaging as Walking Billboard (Fixing the "Blank White Cup" Problem):**
   - Top KSA/UAE/Global brands (`Half Million`, `SALT`, `CAVA`, `Blank Street`, `Pickl`) never leave 90% of a white cup empty with tiny center text. They combine:
     - **Warm-linen / unbleached kraft substrate** (60% canvas)
     - **Oversized cropped bleed** (scaling `250°` to 130–160% so it wraps around box edges/cup sleeves)
     - **1 bold structural ember-terracotta band** (or double pinstripe)
     - **1-color diagonal repeat greaseproof burger/pizza liner** (makes food photos look unmistakably branded!)
     - **Tamper-evident bilingual circular seal sticker** (`250° · SEALED HOT · مقفول سخن`) — iconic across KSA/UAE/Egypt delivery culture!
     - **Utilitarian bilingual box tick-grid (`Section-B` style):** `[ ] SMASH سماش · [ ] PIZZA بيتزا · [ ] GRILL جريل`.

---

## 2. Bilingual Arabic + English Architecture (KSA & UAE Best Practices)

Drawing directly from Riyadh/Dubai studio craft (Tarek Atrissi, WonderEight, Milk Network's Barn's rebrand):

1. **Universal Western Numerals (`250°`) Across BOTH English & Arabic Modes:**
   - Leading KSA/UAE youth & specialty brands (`½M`, `3Fils`, `BRGR`, `Sign`, `Section-B`) keep **Western numerals (`250°`)** as the universal primary brand emblem in BOTH `en` and `ar-EG`. It feels modern, architectural, and unified across apps and signage.
   - Always wrap `250°` in `<bdi dir="ltr">250°</bdi>` inside Arabic prose so RTL bidi rules never flip the degree sign to the wrong side (`°250`).
   - Optional secondary Arabic-Indic geometric stamp (`٢٥٠°`) may appear *only* as a custom-drawn geometric Kufic packaging seal matching the exact stroke weight of the Latin mark — never a generic cursive fallback font.
2. **Optical Weight & Case Harmonization:**
   - Arabic has continuous connecting baselines and open counters, making it appear visually lighter than ALL-CAPS Latin at identical font sizes.
   - **Barn's Trick:** Pairing lowercase `kitchen` with `مطبخ` (or wide-tracked small uppercase `KITCHEN` matched to 1 step lighter `Alexandria` Arabic) achieves true visual-mass balance under the squint test.
   - **Critical Arabic CSS Rule:** **NEVER** apply negative `letter-spacing` (`-0.02em`) to Arabic text — it breaks connected cursive ligatures! Always enforce `[dir="rtl"] { letter-spacing: 0; }`.
3. **Top Bilingual Free Google Font Pairing for `250°`:**
   - **Primary Pick (Recommended — Modern KSA/Cairo Architectural):** **`Plus Jakarta Sans`** (EN Display & UI) + **`Alexandria`** (AR Display & UI, engineered specifically as a crisp geometric Arabic sans) — optionally pairing **`Readex Pro`** if ultra-wide mobile body legibility is preferred.
   - **Alternative Industrial Precision:** **`Space Grotesk`** (distinctive geometric `2`, `5`, `0`) + **`IBM Plex Sans Arabic`**.
   - **Strict 2-Family Limit (`gemini-frontend-design`):** Zero 3rd monospace font — use `font-variant-numeric: tabular-nums` on our main sans for prices and KDS timers!

---

## 3. 3-Tier Responsive Logo System & 60-30-10 Color Ratio

| Tier | Asset | Exact Usage | Rules |
| :--- | :--- | :--- | :--- |
| **Tier A: Primary Lockup** | Custom vector `250°` + `KITCHEN` / `مطبخ` | Desktop navbar, hero signage, storefront cover, DEPI pitch cover | Never shrink below `110px` wide; drop word descriptor below `96px`. |
| **Tier B: Monogram / Stamp** | Compact `250°` emblem or kiln-arch badge | Mobile sticky nav, app icon, cup sleeves, tamper stickers, avatars, favicons | Use dedicated optical redraws for `32×32px` and `16×16px` (never mechanically shrink Tier A). |
| **Tier C: Packaging Band** | `250°C · HEARTH FIRED · مشوي ع النار` or `250-B / 250-P / 250-G` | **Physical packaging & footer stamp ONLY** (boxes, wraps, receipts) | **NEVER** put Tier C descriptors in web navbar, buttons, or UI cards (anti-slop U1/U3). |

### Exact 60-30-10 Hospitality Color Ratio (+ `>= 18°` OKLCH Error Separation!)
- **60% Warm Linen / Travertine Canvas (`#F4F0E8` / `oklch(0.955 0.011 82)`):** Page floor, matte uncoated boxes, ceramic plates.
- **30% Espresso Charcoal (`#1D1916` / `oklch(0.22 0.008 55)`) + Soft Oat/Clay Surfaces (`#ECE6DC`):** Numerals `250`, crisp typography, dark cart dock & `/kds` pass, structural card steps.
- **10% Hearth Accent (`#CC4524` Kiln Terracotta / `oklch(0.555 0.176 36)` OR `#D94218` Ember Vermilion):** Strictly reserved for the **`°` degree ring**, primary CTA (`Order Now` / `Add`), active state, and circular tamper-seal packaging stickers.
- **Critical Debate Catch (`better-colors` `>= 15°` Hue Separation Rule):** Because our hearth accent lives around OKLCH hue `35°–38°`, naive orange-red errors (`hue ~25°`) blur into primary buttons! Lock **Destructive / Error** strictly to deep **Crimson-Rose (`hue ~14°–16°`, `#B91C3C` / `oklch(0.49 0.195 15)`)** paired with an explicit warning icon (`Alert02Icon`) — giving `>= 20°` perceptual separation!

---

## 4. Three Bespoke Production-Ready SVG Logo Concepts (`02-design-vision/logos/`)

All three concepts are crafted as pure mathematical vector `<path>` geometry (zero broken font fallbacks on the `250°` marks!) with Light Linen, Dark Charcoal KDS, Bilingual EN/AR, Packaging Seal, and Optical `32px`/`16px` Favicon specimens ready to view right now:

| Concept | File | Personality & Inspiration | Best Fit & Trade-Offs |
| :--- | :--- | :--- | :--- |
| **Concept 1: The Hearth Dial** *(Senior Lead Pick)* | [concept-1-hearth-dial.svg](./logos/concept-1-hearth-dial.svg) | Modular geometric `2` & `5` (exact 180° rotational cousins!) + pill `0` + oversized hollow **ember `°` ring** tucked into `0`'s shoulder + Barn's lowercase `kitchen · مطبخ`. | **Most versatile across web UI, CoolDock nav pill, favicon & cups.** Feels effortless, timeless, Apple/Dreambeans-warm, and unmistakably modern Cairo/Riyadh. |
| **Concept 2: The Kiln-Arch Stamp** | [concept-2-kiln-arch-stamp.svg](./logos/concept-2-kiln-arch-stamp.svg) | Solid Espresso Charcoal **woodfire oven arch** with knocked-out Warm Linen `250` on the hearth floor and a glowing **ember `°` apex sun/flame** + bilateral `FIRE KITCHEN / مطبخ النار` lockup. | **Strongest physical packaging & sticker silhouette** (and cleanest `16×16px` favicon: charcoal arch + single ember dot!). Slightly heavier inside a slim floating top navbar unless paired with bare `250°`. |
| **Concept 3: The Stencil Sear** | [concept-3-stencil-sear.svg](./logos/concept-3-stencil-sear.svg) | Bold condensed geometric `250` sliced with crisp **grill-grate stencil cuts** + solid **notched ember `°` disc** + `Section-B`-inspired modular codes (`250-B`, `250-P`, `250-G`). | **Sharpest urban street/fast-casual edge** (`BRGR` × `Section-B` × `Bleecker`). Slightly more industrial/edgy than Dreambeans' soft calm; needs careful optical widening below `24px`. |

> **Next Step After You Pick Concept 1, 2, or 3:** We lock the chosen SVG into `src/components/BrandMark.tsx` (1-color `currentColor` + `var(--primary)` token-driven!), use it inside **Paper MCP Checkpoint #1**, and feed the exact SVG mark into our **v2 Packaging & Food Shoot** so every cup, burger box, greaseproof wrap, and tamper seal carries our real bespoke identity!
