# Visual Reference Synthesis — What Your Taste Is Actually Telling Us

> **PURE WHITE SURFACE OVERRIDE (`C-05` LOCKED — READ FIRST!):**  
> Keep **ALL spatial, layout, pill, frosted glass, whitespace, macro-frame, and contrast laws** distilled from `CoolDock`, `Dreambeans`, `Google Labs Playground`, `Stitch Loop`, and `Firecrawl` below — **EXCEPT replace every warm-linen/beige canvas hex (`#F4F0E8`, `#F6F2EC`, `#F3EFEA`) with Pure Crisp White (`#FFFFFF` / `oklch(1 0 0)`) + neutral `shadcn base-luma` (`#FAFAFA` / `#F5F5F5`, `#09090B` ink, hairline `#E5E5E5` borders)!** Muddy beige is permanently rejected (`C-05`).
>
> **Purpose:** Distill the **shared visual DNA** across all 5 websites you picked (`CoolDock`, `Dreambeans`, `Playground`, `Stitch Loop`, `Firecrawl`) so we build **one unified, original hospitality design system** — never a Frankenstein collage.

---

## The Hidden Pattern Across All 5 Sites You Loved

You said *"I'm still new to this and don't know its name."* Here is the exact name for the aesthetic your eye naturally gravitated toward across all 5 links:

### **"Warm Tonal Minimalism" (Sunlit Studio Craft)**

Every single site you liked — regardless of whether it sells a Mac dock, a morning coffee AI experiment, a game maker, a dev loop, or a web API — obeys **the exact same 5 laws of Layers, Light, and Layout**:

| Law | How Your 5 References Do It | Why Old Food-Ordering Apps Feel Ugly by Comparison |
| :--- | :--- | :--- |
| **1. Tonal Separation Over Heavy Borders & Muddy Shadows** | Warm tinted canvas (`#F3EFEA` Dreambeans, `#EDECEB` CoolDock, `#F9F9F9` Firecrawl) + lifted crisp white/off-white cards (`#FFFFFF` / `#F7F7F7`) with **almost zero drop shadows** and whisper-thin or zero borders. | Generic food apps slap `#FFFFFF` cards onto `#FFFFFF` backgrounds and try to rescue them with ugly gray boxes, heavy shadows, and cluttered promo badges. |
| **2. Wide Desktop Canvas + Narrow Focused Copy** | Generous desktop container (`1150px–1320px`) using real horizontal breathing room, while keeping headlines & intro copy capped at `600px–760px` with `text-wrap: balance`. | Generic food apps squeeze a cramped mobile column onto a wide monitor or cram 4 noisy sidebars onto one screen. |
| **3. Large, Tactile Corner Radii (`24px–36px`) + Pill Actions (`9999px`)** | CoolDock (`30px`), Dreambeans (`36–40px`), Playground (`24–30px`), Stitch Loop (`22–26px`) — paired with friendly `rounded-full` pill buttons and filter chips. | Generic restaurant templates use stiff `6–8px` boxes that feel dated and corporate. |
| **4. 90/10 Earned Accent Discipline** | ~90% of the viewport is calm warm stone/linen + soft espresso/charcoal ink (`#1A1A1A`–`#262626`). Accent color (`#FA5D19` Firecrawl, terracotta Dreambeans) is **earned**, appearing only on primary CTAs, active tabs, and heat/status moments. | Generic food apps spray screaming red/orange banners, pulsing discount stickers, and giant solid-red headers everywhere until nothing stands out. |
| **5. One Intentional High-Contrast Dark Moment** | CoolDock's floating dark dock & single dark section break; Dreambeans' `#1A1A1A` bottom island; Stitch Loop's dark CLI card. **Light theme is home; darkness is a deliberate contrast moment.** | Either 100% blinding flat white or dark-mode-everywhere gamer templates. |

---

## Exact Borrow / Leave Matrix (How the 5 Sites Combine Without Colliding)

| Element of Our App | Primary Inspiration | Specific Principle We Take | Specific Trap We Refuse to Copy |
| :--- | :--- | :--- | :--- |
| **Page Canvas & Light Mood** | **Dreambeans** + **CoolDock** | Sunlit warm linen/stone canvas (`#F6F2EC` / `#EFECE6` territory) with soft espresso-charcoal ink (`#1A1614`). | No stark `#FFFFFF` background glare; no `#000000` dark-by-default pages. |
| **Top Navigation** | **CoolDock** + **Playground** | Compact floating frosted-glass pill navbar (`blur`, crisp inset top highlight) over generous desktop breathing room. | No bloated 2-row sticky promo bars or fake MacBook notch chrome. |
| **Hero Stage (`/`)** | **CoolDock** + **Dreambeans** + **Playground** | Centered high-craft editorial typography (`text-wrap: balance`) + crisp primary CTAs + giant `32–36px` rounded hero culinary/hearth stage peeking cleanly above the fold. | No Zomato floating cutout clipart; no Firecrawl ASCII dot-matrix or `22×21` crosshairs. |
| **Accent & CTA Energy** | **Firecrawl** + **Dreambeans** | Rich red-orange hearth accent (warm terracotta-to-ember flame) with subtle tactile inner depth on primary buttons; WCAG AA contrast guaranteed. | No neon `#CCFF00` sale green, no `#AEEA00` arcade lime, no `#6256f9` dev blurple. |
| **Menu Cards & Filter Pills** | **Stitch Loop** + **CoolDock** | Shadowless lifted `#FFFFFF` `24px` rounded cards on warm stone canvas + `rounded-full` crisp white filter pills + rich `4:3` food photography. | Fix Firecrawl's tiny `12–13px` text floor! Enforce generous `16–17px` descriptions & `20–22px` dish titles. |
| **Persistent Table & Cart Bar** | **CoolDock** | Dark translucent floating dock (`rgba(20,16,14,0.92)`, `backdrop-blur`, `28px` radius) hovering cleanly at bottom with Table #, live avatars, item count, subtotal, and `View Cart` pill. | Keep it slim, warm-charcoal, and purposeful — never a literal macOS app icon bar. |
| **Order Tracker & KDS Contrast** | **Stitch Loop** + **Dreambeans** | Stitch Loop's ultra-clean 3-stage progress grammar on light canvas for `/track`; Dreambeans/CoolDock's deliberate dark-charcoal contrast surface strictly for the **Kitchen Display System (`/kds`)** & one dark kitchen preview band on `/`. | Zero scanlines, zero noisy SaaS telemetry clutter, zero 3-way theme-toggle spaghetti. |

---

## Read Individual Dissections

- [01-cooldock.md](./01-cooldock.md) — Tonal stone layers, floating frosted nav pill, floating dark dock, desktop macro-whitespace.
- [02-dreambeans.md](./02-dreambeans.md) — Warm linen surface, shadowless `40px` media cards, editorial numbered sections, dark bottom island.
- [03-playground.md](./03-playground.md) — Full-bleed viewport hero, progressive blur header, peeking side-slides showcase, single-accent discipline.
- [04-stitch-loop.md](./04-stitch-loop.md) — Native Tailwind v4 `oklch()` matte-canvas/white-card hierarchy, crisp `rounded-full` pills, 3-stage progress grammar.
- [05-firecrawl.md](./05-firecrawl.md) — Warm paper + flame-orange discipline, tactile CTA depth, and exact measurements of why we MUST raise its typography floor.
