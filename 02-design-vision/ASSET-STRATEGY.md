# Visual Assets, Photography & SVG Strategy (`ASSET-STRATEGY.md`)

> **Built For:** A solo React builder with AI tools (zero design-agency budget, zero broken external image links on demo day).

---

## 1. The #1 Mistake That Ruins Restaurant Websites

Even the cleanest CoolDock/Google Labs UI will look amateur if dish photos come from 10 random Google Images searches with clashing lighting (one harsh flash photo on black slate, one blurry stock photo on a red plate, one white-background cutout).

**The Golden Rule of Food Visuals:**
> **14–16 cohesive photographs shot under the SAME warm daylight on the SAME neutral ceramic/linen aesthetic will make your capstone look like a \$50,000 studio site — far better than 42 mismatched photos.**

---

## 2. Exact Asset Inventory You Actually Need (Minimum High-Impact Set)

Instead of the legacy PRD's overwhelming **47 images**, here is the clean, complete asset list for a jaw-dropping capstone:

| Asset Group | Count | Aspect Ratio | Target Format & Size | Where Used |
| :--- | :---: | :---: | :--- | :--- |
| **1. Hero Centerpiece Visual** | **1** *(+ optional 1 ambient texture)* | `16:9` widescreen (`1600×900`) | `.webp` (`< 220 KB`, `fetchpriority="high"`) | `/` Hero rounded `36px` showcase stage — overhead or 45° sunlit table spread / live 250° sear moment |
| **2. Signature Menu Dish Photos** | **12–16** *(3–4 per category across 4–5 focused categories)* | `4:3` (`960×720`) | `.webp` (`< 90 KB` each, lazy loaded) | Menu cards (desktop `4:3`, mobile crisp `1:1` center-crop via CSS `object-cover`), Dish Modifier Drawer header |
| **3. Culinary Story / Atmosphere Visuals** | **2–3** | `16:9` or `4:3` (`1200×800`) | `.webp` (`< 150 KB`) | Homepage "How Live Table Ordering Works" / Hearth Story section |
| **4. Custom Brand Mark SVG** | **1** | Vector (`viewBox="0 0 120 36"`) | Inline React SVG (`< 1 KB`) | Floating Nav Pill, Footer, QR Table Header (e.g., geometric `250°` wordmark with ember `°` ring) |
| **5. UI Icons** | **~25 icons** | `24×24` (`strokeWidth={1.75}`) | **`lucide-react`** (tree-shaken, zero custom SVG hunting!) | Cart, QR, Table, Flame, Clock, Check, Search, Heart, Plus/Minus, Split, ChefHat, Bell |
| **6. Empty-State & Subtle Decorative Accents** | **2–3 micro-SVGs** | Simple minimal line art | Inline SVG (`< 2 KB`) | Empty Cart, Zero Search Matches, All-Caught-Up Kitchen Pass (clean single-stroke geometric icons — NO cheesy stock cartoons!) |

**Total real images to produce:** Just **16–20 `.webp` images** stored locally inside `public/images/` (so **zero** broken external URLs, **zero** slow remote CDNs, and instant load on Cloudflare!).

---

## 3. How to Get Studio-Cohesive Food Photography (Even If You're Brand New)

You have **two rock-solid free paths** — and **Path A is right inside Antigravity**:

### Path A — Unified AI Art Direction via Antigravity's `image-generator` *(Recommended for 100% Cohesion!)*
Antigravity has a built-in `image-generator` subagent. By locking **ONE Master Art-Direction Suffix** across every single dish generation, all 14–16 dishes look like they were shot in the same afternoon by the same editorial food photographer:

> **Master Food Shoot Style Lock (Example):**  
> *"Editorial overhead-45-degree food photography of [DISH], plated on handmade matte warm-cream ceramic stoneware resting on sunlit pale warm-linen travertine table, soft natural morning window light from the top-left, gentle warm shadows, appetizing crisp textures, shallow depth of field, clean uncluttered negative space around the plate, Kinfolk / Bon Appétit studio magazine aesthetic, warm natural colors, no text, no watermarks, no hands, no cutlery clutter."*

- **Why this works magic with our UI:** Because the photo background itself is sunlit pale warm linen/stone, the `16px`-rounded food frame sits inside our crisp white `24px` card with **seamless color harmony**!

### Path B — Curated Open-License Photography (Unsplash / Pexels) + Unified Warm Grade
- Search Unsplash/Pexels specifically filtering for *"overhead bright warm ceramic plate"*.
- Run a quick 5-line Node `sharp` script (or `squoosh` / `cwebp`) once to:
  1. Crop uniformly to `4:3` (`960×720`) for dishes and `16:9` (`1600×900`) for hero.
  2. Convert to `.webp` (`quality: 82`).
  3. Apply a tiny consistent warm color-temperature balance if needed so no single photo looks cold/blue next to the others.

---

## 4. SVG & Icon Discipline (Keeping the Site Clean & Expensive-Looking)

1. **One Icon Library Only (`lucide-react`):** Never mix Material icons, Heroicons, FontAwesome, and random downloaded SVGs — mismatched stroke weights instantly look messy. Use `lucide-react` at a consistent `strokeWidth={1.75}`.
2. **Ban Clutter Emojis:** Rely on crisp `lucide-react` icons and clean typography badges (`Best Seller`, `Spicy`, `250°C Sear`) instead of scattering emojis across buttons and headings.
3. **Zero Giant Background Blobs or Heavy Illustrations:** Follow CoolDock, Dreambeans, and Stitch Loop — let **real photography, warm light surfaces, and clean typography** carry the visual beauty.
4. **Performance & Zero Layout Shift (CLS = 0):**
   - Always declare explicit `aspect-[4/3]` / `aspect-video` containers + `width`/`height` attributes.
   - Use `fetchpriority="high"` + `loading="eager"` ONLY on the Hero image; `loading="lazy"` + `decoding="async"` on below-the-fold menu cards.
   - Show a soft warm stone skeleton shimmer (`#ECE6DC`) while loading, and a tasteful fallback plate icon if an image ever fails.
