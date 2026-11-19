# Open-Fire Kitchen — Curated 20-Dish Bilingual Menu, Flat Modifiers & Anti-Slop Copy Bible

> **Prep Pack:** `04-prep-packs/product-and-design/07-curated-16-dish-menu-and-modifiers.md` *(Upgraded cleanly from 16 → 20 dishes & native Cairo `ar-EG` audited on 2026-11-19!)*  
> **Culinary Identity:** **Modern Cairo Open-Fire Kitchen** — every plate touches real live heat across 3 unified stations: **Cast-Iron Smash**, **Stone-Deck Woodfire Oven**, and **Oak Charcoal Grill**.  
> **Languages:** English (`en`) + **Natural Cairo Egyptian Arabic (`ar-EG`, RTL — strictly conversational Cairo menu tone, full **`على`** everywhere, zero single-letter preposition shorthand, NEVER stiff MSA!)**  
> **Currency Unit:** Egyptian Pound (`EGP` / `ج.م`) stored exclusively as **integer piasters** (`1 EGP = 100 piasters`) so split-bill math never suffers JavaScript floating-point drift (`0.1 + 0.2 !== 0.3`).

---

## v1.1 Expansion Addendum — 4 Logical Dishes Integrated (`16 → 20` Dishes, Synced 100% with Prep Pack `14`)

Adding these 4 natural omissions rounds out the menu to **20 cohesive dishes** across 5 categories (covering non-beef burger diners, classic skin-on fries lovers, dip-sharers, and Cairo's signature sparkling karkadeh):

| # | `slug` | Category | English Name | Natural Cairo Arabic (`ar-EG`) | Price | `pricePiaster` | Spec | Why Added |
| :-: | :--- | :--- | :--- | :--- | --: | --: | :--- | :--- |
| **4** | `nashville-hot-chicken-burger` | `smash-burgers` | `Fire-Crisp Chicken Burger` | `تشيكن برجر مقرمش` | `240 EGP` | `24000` | `180g chicken thigh · 690 kcal` | Essential for non-beef diners at a shared table! Uses `spice-level`, `burger-add-ons`, `burger-removals`. |
| **14** | `classic-skin-on-fries` | `sides-sharing` | `Classic Skin-On Fries` | `بطاطس مقرمشة بقشرها` | `75 EGP` | `7500` | `220g · 380 kcal` | Clean everyday side for guests who want crisp salted/paprika fries without beef or truffle. Uses `fries-size`, `dip-pairing`. |
| **15** | `house-dips-trio` | `sides-sharing` | `House Dips Trio` | `تشكيلة 3 صوصات بيتي` | `55 EGP` | `5500` | `3×60ml · 290 kcal` | Shareable trio (`250° House`, `Black Truffle Aioli`, `Whipped Toum`) for table snacking. |
| **19** | `sparkling-karkadeh-mint` | `drinks-hot-pies` | `Sparkling Iced Karkadeh Mint` | `كركديه فوار بالنعناع` | `65 EGP` | `6500` | `350ml glass · 95 kcal` | Authentic modern Cairo hospitality signature drink — gives visual ruby-red glow on sunlit linen & pairs with `drink-serve-style`! |

---

## 0. Architectural Rationale & Copy Gate Rules (Read Before Building)

### Plain-English Glossary (First-Mention Definitions)
- **Integer Piasters (`pricePiaster`):** Storing `245 EGP` as the integer `24500` instead of `245.00` floats. Guarantees exact remainder distribution when splitting a table bill by 3, 5, or 7 diners.
- **Flat Modifier Group:** A single-level option list (`minSelect`, `maxSelect`, `priceDeltaPiaster`) attached by ID to dishes — never nested modifiers inside modifiers. Maps directly to `@base-ui/react` `RadioGroup` (`maxSelect: 1`) or `CheckboxGroup` (`maxSelect > 1`) and validates cleanly with Zod v4.
- **Slug:** URL- and filename-safe lowercase identifier (e.g., `double-smash-burger`) that links each Convex dish record straight to `public/images/menu/<slug>.webp`.
- **`86` (Kitchen Shorthand):** Hospitality term meaning an item has run out for the rest of service and must be pulled off the menu immediately. Staff see **`86 · Sold out`** on `/kds`; diners see plain **`Sold out`** (`خلصان دلوقتي`) on `/menu`.
- **`tabular-nums`:** CSS font feature (`font-variant-numeric: tabular-nums`) that gives every digit the same width so rolling prices (`245 → 290 EGP`) and KDS kitchen timers (`04:12`) never jitter horizontally.

### Why 20 Dishes (Instead of 42)?
1. **Visual Cohesion:** Generating 20 dishes under one locked sunlit-linen studio prompt takes one focused afternoon and keeps total image weight lean (`< 1.8 MB` across the entire menu).
2. **Real-World Scannability:** Five tight categories with 3–5 dishes each cover every table preference (beef, crispy chicken, keto, vegetarian, charcoal grill, sharing box, fries, dips, craft drinks, hot pie) without endless scrolling.
3. **Complete Technical Coverage:** These 20 items exercise every engineering case in the capstone — required single-select modifiers (patty weight, crust, pie filling, cola variant), optional multi-select add-ons, zero-price removals, 1-tap no-modifier items (`House Dips Trio`), dietary filters (`Keto`, `High-Protein`, `Spicy`, `Vegetarian`, `Gluten-Free`), a 4-person sharing box for split-bill math, and `86` live stock locking.

### The Mandatory Anti-Slop Copy Gate (`clean-copy` + `unslop-ui`)
Every single customer and staff string in this document obeys Rachel's **`clean-copy` ladder** and **`felipebasurto/unslop-ui`**:
1. **Ask *"Should this exist?"* before writing.** If layout position or control shape explains the element, delete the copy.
2. **Zero U1 Decorative Eyebrows:** Never place `01 //`, `INTRODUCING`, `OUR MENU`, `HOW IT WORKS`, or `STEP 01` above headings.
3. **Zero U3 Redundant Subtitles:** Never follow a heading with a sentence that restates the heading (`Menu` + *"Browse our menu below"* → delete the subtitle).
4. **Zero U4 Botsplaining:** Never instruct users how standard UI works (*"Click + to add"*, *"Use the tabs below"*, *"Enter your PIN below"*).
5. **Zero U5 Leaked Notes:** Never leak engineering or demo context into UI strings (*"(updates in real time)"*, *"Synced via Convex"*, *"Demo mode"*, *"Exact piaster math"*).
6. **Zero U9 Fake Status Dots:** Never put a pulsing `"LIVE"` dot on the storefront. Show real Convex operational data (`~12 min prep`, `3 active tickets`) instead.
7. **Zero U11 Decorative Emojis:** Zero food/fire/sparkle emojis anywhere in headings, pills, buttons, or descriptions. Rely on crisp `Hugeicons` stroke-rounded icons and concise text badges.
8. **Zero Cheesy AI Buzzwords & Zero Em-Dashes in UI Strings:** Banned permanently — *elevated, seamless, culinary journey, reimagined, handcrafted perfection, mouth-watering, savor, indulge, gastronomic, next-level, symphony of flavors*, plus zero `—` inside rendered UI strings (use `·`, `,`, or `.`).
9. **Natural Cairo Arabic (`ar-EG`) Only — Full `على` Always:** Write how upscale modern Cairo restaurants speak on real menus and apps — crisp, direct, appetizing Egyptian Arabic, **always full `على`** (never single-letter preposition shorthand before nouns), **never** awkward literal English calques, and **never** stiff dictionary MSA (*"رحلة طهي استثنائية"*, *"اضغط هنا للبدء"*).

---

## 1. Curated 20-Dish Bilingual Signature Menu (5 Categories)

> **Pricing Convention:** All menu prices are stored as **integer piasters** (`1 EGP = 100 piasters`) and synced 1:1 with `convex/seedData.ts` in Prep Pack `14`.  
> **Image Path Convention:** Every dish maps to `public/images/menu/<slug>.webp` (`4:3`, `960×720`, `< 90 KB`).

### Category Summary Table

| # | `categoryId` | English Name | Egyptian Arabic (`ar-EG`) | Short Tab Label (EN / `ar-EG`) | Dish Count | `sortOrder` |
| :-: | :--- | :--- | :--- | :--- | :-: | :-: |
| 1 | `smash-burgers` | Smash Burgers | سماش برجر | `Burgers` · `برجر` | 5 | 1 |
| 2 | `stone-deck-pizza` | Stone-Deck Pizza | بيتزا فرن حجري | `Pizza` · `بيتزا` | 3 | 2 |
| 3 | `charcoal-grill-bowls` | Charcoal Grill & Bowls | مشويات على الفحم وبولز | `Grill & Bowls` · `مشويات وبولز` | 3 | 3 |
| 4 | `sides-sharing` | Fries, Dips & Sharing | بطاطس وصوصات وشيرينج | `Sides & Sharing` · `بطاطس وشيرينج` | 5 | 4 |
| 5 | `drinks-hot-pies` | Craft Drinks & Hot Pies | مشروبات وفطاير سخنة | `Drinks & Pies` · `مشروبات وحلو` | 4 | 5 |

---

### Category 1: Smash Burgers (`smash-burgers` · `سماش برجر`)

#### 1. Double Smash (`double-smash-burger`)
- **Name (EN / `ar-EG`):** `Double Smash` · `دبل سماش`
- **Description (EN):** Two smashed prime beef patties, melted American cheddar, house pickles, seared onions, and 250° sauce on a Martin's potato roll.
- **Description (`ar-EG`):** قطعتين بيف سماش على الجريل، شيدر أمريكي سايحة، خيار مخلل، بصل مكرمل، وصوص 250° في عيش مارتنز بطاطس.
- **Price:** `245 EGP` (`24500` piasters) · **Prep:** `10 min`
- **Nutrition & Spec:** `740 kcal` · `200g beef (2×100g)` · `200 جم بيف (قطعتين)`
- **Image Slug:** `public/images/menu/double-smash-burger.webp`
- **Tags:** `["signature"]` *(Display badge: `Popular` / `الأكثر طلبًا`)*
- **Modifier Groups:** `["burger-patty-size", "burger-bun-style", "burger-add-ons", "burger-removals"]`

#### 2. Truffle Swiss (`truffle-swiss-burger`)
- **Name (EN / `ar-EG`):** `Truffle Swiss` · `ترافل سويس`
- **Description (EN):** Double smashed beef, roasted portobello mushrooms, melted Swiss Emmental, caramelized onions, and black truffle aioli on a Martin's potato roll.
- **Description (`ar-EG`):** دبل بيف سماش، مشروم بورتوبيلو مشوي، جبنة إمنتال سويسرية سايحة، بصل مكرمل، وصوص ترافل أيولي في عيش مارتنز.
- **Price:** `285 EGP` (`28500` piasters) · **Prep:** `12 min`
- **Nutrition & Spec:** `810 kcal` · `200g beef (2×100g)` · `200 جم بيف (قطعتين)`
- **Image Slug:** `public/images/menu/truffle-swiss-burger.webp`
- **Tags:** `["signature"]` *(Display badge: none on grid to prevent badge clutter)*
- **Modifier Groups:** `["burger-patty-size", "burger-bun-style", "burger-add-ons", "burger-removals"]`

#### 3. Blazing Jalapeño (`blazing-jalapeno-burger`)
- **Name (EN / `ar-EG`):** `Blazing Jalapeño` · `هالبينو حراق`
- **Description (EN):** Double smashed beef, charred pickled jalapeños, melted pepper jack, crispy shallots, and roasted chili glaze on a Martin's potato roll.
- **Description (`ar-EG`):** دبل بيف سماش، هالبينو مشوي، جبنة بيبر جاك سايحة، بصل مقرمش، وصوص فلفل مشوي في عيش مارتنز.
- **Price:** `260 EGP` (`26000` piasters) · **Prep:** `10 min`
- **Nutrition & Spec:** `770 kcal` · `200g beef (2×100g)` · `200 جم بيف (قطعتين)`
- **Image Slug:** `public/images/menu/blazing-jalapeno-burger.webp`
- **Tags:** `["spicy"]` *(Display badge: `Spicy` / `سبايسي`)*
- **Modifier Groups:** `["burger-patty-size", "burger-bun-style", "spice-level", "burger-add-ons", "burger-removals"]`

#### 4. Fire-Crisp Chicken Burger (`nashville-hot-chicken-burger`)
- **Name (EN / `ar-EG`):** `Fire-Crisp Chicken Burger` · `تشيكن برجر مقرمش`
- **Description (EN):** Buttermilk-brined crispy chicken thigh, melted American cheddar, crisp slaw, dill pickles, and spiced house sauce on a Martin's potato roll.
- **Description (`ar-EG`):** ورك فراخ مقرمش متبل باللبن الرايب، شيدر أمريكي سايحة، كول سلو فريش، خيار مخلل، وصوص 250° سبايسي في عيش مارتنز.
- **Price:** `240 EGP` (`24000` piasters) · **Prep:** `11 min`
- **Nutrition & Spec:** `690 kcal` · `180g crispy chicken thigh` · `180 جم ورك فراخ مقرمش`
- **Image Slug:** `public/images/menu/nashville-hot-chicken-burger.webp`
- **Tags:** `["spicy", "high-protein"]` *(Display badge: `Spicy` / `سبايسي`)*
- **Modifier Groups:** `["spice-level", "burger-add-ons", "burger-removals"]`

#### 5. Keto Lettuce-Wrap Smash (`keto-lettuce-wrap-smash`)
- **Name (EN / `ar-EG`):** `Keto Lettuce-Wrap Smash` · `سماش كيتو ملفوف في الخس`
- **Description (EN):** Double smashed beef, sharp cheddar, vine tomato, dill pickles, and sugar-free 250° sauce wrapped in crisp iceberg lettuce.
- **Description (`ar-EG`):** دبل بيف سماش، جبنة شيدر، طماطم فريش، خيار مخلل، وصوص 250° من غير سكر، ملفوف في خس آيسبرج مقرمش بدون عيش.
- **Price:** `235 EGP` (`23500` piasters) · **Prep:** `10 min`
- **Nutrition & Spec:** `510 kcal` · `200g beef · 6g net carbs` · `200 جم بيف · 6 جم كارب`
- **Image Slug:** `public/images/menu/keto-lettuce-wrap-smash.webp`
- **Tags:** `["keto", "high-protein", "gluten-free"]` *(Display badge: `Keto` / `كيتو`)*
- **Modifier Groups:** `["burger-patty-size", "burger-add-ons", "burger-removals"]`

---

### Category 2: Stone-Deck Pizza (`stone-deck-pizza` · `بيتزا فرن حجري`)

#### 6. Artisan Margherita (`artisan-margherita-pizza`)
- **Name (EN / `ar-EG`):** `Artisan Margherita` · `مارجريتا أصلية`
- **Description (EN):** 48-hour fermented dough, crushed San Marzano tomatoes, fresh buffalo mozzarella, sweet basil, and cold-pressed olive oil.
- **Description (`ar-EG`):** عجينة متخمرة 48 ساعة، صلصة طماطم سان مارزانو، موتزاريلا بافلو فريش، ريحان أخضر، وزيت زيتون بكر.
- **Price:** `220 EGP` (`22000` piasters) · **Prep:** `12 min`
- **Nutrition & Spec:** `780 kcal` · `30cm (8 slices)` · `30 سم (8 قطع)`
- **Image Slug:** `public/images/menu/artisan-margherita-pizza.webp`
- **Tags:** `["vegetarian"]` *(Display badge: `Vegetarian` / `نباتي`)*
- **Modifier Groups:** `["pizza-crust", "pizza-extras", "dip-pairing"]`

#### 7. Hot Honey Double Pepperoni (`hot-honey-pepperoni-pizza`)
- **Name (EN / `ar-EG`):** `Hot Honey Double Pepperoni` · `دبل بيبروني بالعسل الحراق`
- **Description (EN):** Stone-baked crust, double cupped beef pepperoni, fior di latte mozzarella, crushed chili flakes, and wildflower hot honey.
- **Description (`ar-EG`):** عجينة فرن حجري مقرمشة، دبل بيبروني بيف، موتزاريلا فريش، شطة مجروشة، ورشة عسل نحل حراق.
- **Price:** `295 EGP` (`29500` piasters) · **Prep:** `12 min`
- **Nutrition & Spec:** `960 kcal` · `30cm (8 slices)` · `30 سم (8 قطع)`
- **Image Slug:** `public/images/menu/hot-honey-pepperoni-pizza.webp`
- **Tags:** `["signature", "spicy"]` *(Display badge: `Popular` / `الأكثر طلبًا` + `Spicy` / `سبايسي`)*
- **Modifier Groups:** `["pizza-crust", "spice-level", "pizza-extras", "dip-pairing"]`

#### 8. Chicken Ranch Supreme (`chicken-ranch-supreme-pizza`)
- **Name (EN / `ar-EG`):** `Chicken Ranch Supreme` · `تشيكن رانش سوبريم`
- **Description (EN):** Stone-baked crust, flame-grilled chicken breast, smoky beef bacon, melted mozzarella, roasted sweet corn, and house buttermilk ranch.
- **Description (`ar-EG`):** عجينة فرن حجري، صدور فراخ مشوية، بيف بيكون مدخن، موتزاريلا سايحة، ذرة مشوية، وصوص رانش بيتي.
- **Price:** `290 EGP` (`29000` piasters) · **Prep:** `14 min`
- **Nutrition & Spec:** `930 kcal` · `30cm (8 slices)` · `30 سم (8 قطع)`
- **Image Slug:** `public/images/menu/chicken-ranch-supreme-pizza.webp`
- **Tags:** `["high-protein"]` *(Display badge: none)*
- **Modifier Groups:** `["pizza-crust", "pizza-extras", "dip-pairing"]`

---

### Category 3: Charcoal Grill & Bowls (`charcoal-grill-bowls` · `مشويات على الفحم وبولز`)

#### 9. Charcoal Kofta Platter (`charcoal-kofta-platter`)
- **Name (EN / `ar-EG`):** `Charcoal Kofta Platter` · `طبق كفتة على الفحم`
- **Description (EN):** Three hand-minced beef and lamb kofta skewers over oak charcoal, charred tomato, sumac-parsley onion, warm baladi pita, and tahina.
- **Description (`ar-EG`):** 3 أسياخ كفتة لحم وضاني مشوية على الفحم، طماطم مشوية، بصل بالسماق والبقدونس، عيش بلدي سخن، وطحينة.
- **Price:** `320 EGP` (`32000` piasters) · **Prep:** `16 min`
- **Nutrition & Spec:** `820 kcal` · `270g (3 skewers)` · `270 جم (3 أسياخ)`
- **Image Slug:** `public/images/menu/charcoal-kofta-platter.webp`
- **Tags:** `["signature", "high-protein"]` *(Display badge: `Popular` / `الأكثر طلبًا`)*
- **Modifier Groups:** `["grill-side-choice", "grill-extras", "dip-pairing"]`

#### 10. Herb Shish Tawook (`herb-shish-tawook`)
- **Name (EN / `ar-EG`):** `Herb Shish Tawook` · `شيش طاووق بالأعشاب`
- **Description (EN):** Yogurt, garlic, and lemon-marinated chicken thigh skewers seared over charcoal with blistered peppers, warm pita, and whipped toum.
- **Description (`ar-EG`):** أسياخ أوراك فراخ متبلة بالزبادي والتوم والليمون ومشوية على الفحم، مع فلفل ألوان مشوي، عيش سخن، وتومية.
- **Price:** `275 EGP` (`27500` piasters) · **Prep:** `15 min`
- **Nutrition & Spec:** `690 kcal` · `250g chicken (2 skewers)` · `250 جم فراخ (سيخين)`
- **Image Slug:** `public/images/menu/herb-shish-tawook.webp`
- **Tags:** `["high-protein"]` *(Display badge: none)*
- **Modifier Groups:** `["grill-side-choice", "spice-level", "grill-extras", "dip-pairing"]`

#### 11. High-Protein Grilled Chicken Bowl (`high-protein-chicken-bowl`)
- **Name (EN / `ar-EG`):** `High-Protein Grilled Chicken Bowl` · `بول فراخ مشوية بالبروتين`
- **Description (EN):** Charcoal-grilled chicken breast over steamed basmati and quinoa, roasted broccoli, cherry tomatoes, sliced avocado, and lemon-herb dressing.
- **Description (`ar-EG`):** صدور فراخ مشوية على الفحم مع رز بسمتي وكينوا، بروكلي مشوي، طماطم شيري، أفوكادو، ودريسينج ليمون وأعشاب.
- **Price:** `255 EGP` (`25500` piasters) · **Prep:** `13 min`
- **Nutrition & Spec:** `560 kcal` · `220g chicken · 48g protein` · `220 جم فراخ · 48 جم بروتين`
- **Image Slug:** `public/images/menu/high-protein-chicken-bowl.webp`
- **Tags:** `["high-protein", "gluten-free"]` *(Display badge: `48g Protein` / `48 جم بروتين`)*
- **Modifier Groups:** `["bowl-base", "bowl-extras"]`

---

### Category 4: Fries, Dips & Sharing (`sides-sharing` · `بطاطس وصوصات وشيرينج`)

#### 12. Loaded Smash Fries (`loaded-smash-fries`)
- **Name (EN / `ar-EG`):** `Loaded Smash Fries` · `بطاطس لودد بالسماش`
- **Description (EN):** Skin-on crisp fries topped with chopped smashed beef, warm cheddar sauce, seared onions, pickled jalapeños, and 250° sauce.
- **Description (`ar-EG`):** بطاطس مقرمشة بقشرها عليها بيف سماش مفروم، صوص شيدر سخن، بصل مكرمل، هالبينو، وصوص 250°.
- **Price:** `185 EGP` (`18500` piasters) · **Prep:** `9 min`
- **Nutrition & Spec:** `640 kcal` · `320g` · `320 جم`
- **Image Slug:** `public/images/menu/loaded-smash-fries.webp`
- **Tags:** `["signature"]` *(Display badge: none)*
- **Modifier Groups:** `["fries-size", "dip-pairing"]`

#### 13. Truffle Parmesan Fries (`truffle-parmesan-fries`)
- **Name (EN / `ar-EG`):** `Truffle Parmesan Fries` · `بطاطس ترافل وبارميزان`
- **Description (EN):** Double-fried thin-cut potatoes tossed in white truffle oil, grated 24-month parmesan, cracked black pepper, and fresh chives.
- **Description (`ar-EG`):** بطاطس رفيعة مقرمشة متقلبة في زيت ترافل أبيض، جبنة بارميزان مبشورة، فلفل أسود مجروش، وبصل أخضر ناعم.
- **Price:** `145 EGP` (`14500` piasters) · **Prep:** `8 min`
- **Nutrition & Spec:** `490 kcal` · `250g` · `250 جم`
- **Image Slug:** `public/images/menu/truffle-parmesan-fries.webp`
- **Tags:** `["vegetarian"]` *(Display badge: `Vegetarian` / `نباتي`)*
- **Modifier Groups:** `["fries-size", "dip-pairing"]`

#### 14. Classic Skin-On Fries (`classic-skin-on-fries`)
- **Name (EN / `ar-EG`):** `Classic Skin-On Fries` · `بطاطس مقرمشة بقشرها`
- **Description (EN):** Golden double-fried skin-on potatoes dusted with flaky sea salt and sweet smoked paprika.
- **Description (`ar-EG`):** بطاطس دهبية مقرمشة بقشرها مع رشة ملح بحري وبابريكا مدخنة.
- **Price:** `75 EGP` (`7500` piasters) · **Prep:** `6 min`
- **Nutrition & Spec:** `380 kcal` · `220g` · `220 جم`
- **Image Slug:** `public/images/menu/classic-skin-on-fries.webp`
- **Tags:** `["vegetarian", "gluten-free"]` *(Display badge: none)*
- **Modifier Groups:** `["fries-size", "dip-pairing"]`

#### 15. House Dips Trio (`house-dips-trio`)
- **Name (EN / `ar-EG`):** `House Dips Trio` · `تشكيلة 3 صوصات بيتي`
- **Description (EN):** Three shareable house dips: 250° signature sauce, black truffle aioli, and whipped garlic toum.
- **Description (`ar-EG`):** 3 صوصات بيتي للشيرينج: صوص 250°، ترافل أيولي، وتومية كريمي.
- **Price:** `55 EGP` (`5500` piasters) · **Prep:** `3 min`
- **Nutrition & Spec:** `290 kcal` · `3×60ml dips` · `3 × 60 مل`
- **Image Slug:** `public/images/menu/house-dips-trio.webp`
- **Tags:** `["vegetarian", "gluten-free"]` *(Display badge: none)*
- **Modifier Groups:** `[]` *(1-tap add)*

#### 16. `250°` Squad Sharing Box (`squad-sharing-box`)
- **Name (EN / `ar-EG`):** `250° Squad Sharing Box` · `شيرينج بوكس 250°`
- **Description (EN):** Serves four: four smash sliders (two Classic, two Jalapeño), four herb tawook skewers, two large skin-on fries, and four house dips.
- **Description (`ar-EG`):** يكفي 4 أفراد: 4 سماش سلايدرز (2 كلاسيك و2 هالبينو)، 4 أسياخ شيش طاووق، 2 بطاطس كبيرة، و4 صوصات بيتي.
- **Price:** `890 EGP` (`89000` piasters) · **Prep:** `18 min`
- **Nutrition & Spec:** `2,640 kcal` · `Serves 4 (~1.4kg)` · `يكفي 4 أفراد (~1.4 كجم)`
- **Image Slug:** `public/images/menu/squad-sharing-box.webp`
- **Tags:** `["sharing"]` *(Display badge: `Serves 4` / `يكفي 4`)*
- **Modifier Groups:** `["box-slider-mix", "box-drinks-bundle", "dip-pairing"]`

---

### Category 5: Craft Drinks & Hot Pies (`drinks-hot-pies` · `مشروبات وفطاير سخنة`)

#### 17. V7 Lemon Mint (`v7-lemon-mint`)
- **Name (EN / `ar-EG`):** `V7 Lemon Mint` · `V7 ليمون نعناع`
- **Description (EN):** Chilled 300ml Egyptian V7 sparkling lemon-mint soda served over clear ice with fresh mint.
- **Description (`ar-EG`):** صودا V7 المصرية ليمون بالنعناع ساقعة 300 مل مع تلج وورق نعناع فريش.
- **Price:** `45 EGP` (`4500` piasters) · **Prep:** `2 min`
- **Nutrition & Spec:** `115 kcal` · `300ml can` · `كانز 300 مل`
- **Image Slug:** `public/images/menu/v7-lemon-mint.webp`
- **Tags:** `["vegetarian", "gluten-free"]` *(Display badge: none)*
- **Modifier Groups:** `["drink-serve-style"]`

#### 18. V-Cola / V-Diet Cola (`v-cola`)
- **Name (EN / `ar-EG`):** `V-Cola / V-Diet Cola` · `V-Cola / V-Diet كولا`
- **Description (EN):** Chilled 300ml Egyptian V-Cola or zero-sugar V-Diet Cola served over cracked ice with a fresh lime wedge.
- **Description (`ar-EG`):** V-Cola المصرية أو V-Diet زيرو سكر ساقعة 300 مل مع تلج وشريحة ليمون.
- **Price:** `40 EGP` (`4000` piasters) · **Prep:** `2 min`
- **Nutrition & Spec:** `125 kcal` · `300ml can` · `كانز 300 مل`
- **Image Slug:** `public/images/menu/v-cola.webp`
- **Tags:** `["vegetarian", "gluten-free"]` *(Display badge: none)*
- **Modifier Groups:** `["vcola-variant", "drink-serve-style"]`

#### 19. Sparkling Iced Karkadeh Mint (`sparkling-karkadeh-mint`)
- **Name (EN / `ar-EG`):** `Sparkling Iced Karkadeh Mint` · `كركديه فوار بالنعناع`
- **Description (EN):** Cold-steeped Aswan hibiscus topped with sparkling water, fresh garden mint, and clear ice.
- **Description (`ar-EG`):** كركديه أسواني منقوع على البارد مع صودا فوارة، نعناع فريش، وتلج.
- **Price:** `65 EGP` (`6500` piasters) · **Prep:** `3 min`
- **Nutrition & Spec:** `95 kcal` · `350ml glass` · `كوباية 350 مل`
- **Image Slug:** `public/images/menu/sparkling-karkadeh-mint.webp`
- **Tags:** `["vegetarian", "gluten-free"]` *(Display badge: none)*
- **Modifier Groups:** `["drink-serve-style"]`

#### 20. Hot Crispy Apple / Nutella Kunafa Pie (`hot-crispy-pie`)
- **Name (EN / `ar-EG`):** `Hot Crispy Apple / Nutella Kunafa Pie` · `فطيرة مقرمشة سخنة (تفاح أو نوتيلا كنافة)`
- **Description (EN):** Blistered golden hand pie baked crisp to order. Pick spiced cinnamon apple or warm Nutella with toasted kunafa crunch.
- **Description (`ar-EG`):** فطيرة مقرمشة سخنة بتتخبز بالطلب، اختار تفاح بالقرفة أو نوتيلا سايحة مع كنافة محمصة.
- **Price:** `115 EGP` (`11500` piasters) · **Prep:** `8 min`
- **Nutrition & Spec:** `490 kcal` · `160g (1 pie)` · `160 جم (فطيرة واحدة)`
- **Image Slug:** `public/images/menu/hot-crispy-pie.webp`
- **Tags:** `["vegetarian"]` *(Display badge: `Baked to order` / `بالطلب`)*
- **Modifier Groups:** `["pie-filling", "pie-extras"]`

---

### Master Quick-Reference Seed Summary (20 Dishes)

| # | `slug` | Category | EGP | `pricePiaster` | `kcal` | Spec | `prepMin` | `requiresCustomization` |
| :-: | :--- | :--- | --: | --: | --: | :--- | :-: | :-: |
| 1 | `double-smash-burger` | `smash-burgers` | 245 | `24500` | 740 | `200g beef (2×100g)` | 10 | `true` |
| 2 | `truffle-swiss-burger` | `smash-burgers` | 285 | `28500` | 810 | `200g beef (2×100g)` | 12 | `true` |
| 3 | `blazing-jalapeno-burger` | `smash-burgers` | 260 | `26000` | 770 | `200g beef (2×100g)` | 10 | `true` |
| 4 | `nashville-hot-chicken-burger` | `smash-burgers` | 240 | `24000` | 690 | `180g crispy chicken thigh` | 11 | `true` |
| 5 | `keto-lettuce-wrap-smash` | `smash-burgers` | 235 | `23500` | 510 | `200g beef · 6g carbs` | 10 | `true` |
| 6 | `artisan-margherita-pizza` | `stone-deck-pizza` | 220 | `22000` | 780 | `30cm (8 slices)` | 12 | `true` |
| 7 | `hot-honey-pepperoni-pizza` | `stone-deck-pizza` | 295 | `29500` | 960 | `30cm (8 slices)` | 12 | `true` |
| 8 | `chicken-ranch-supreme-pizza` | `stone-deck-pizza` | 290 | `29000` | 930 | `30cm (8 slices)` | 14 | `true` |
| 9 | `charcoal-kofta-platter` | `charcoal-grill-bowls` | 320 | `32000` | 820 | `270g (3 skewers)` | 16 | `true` |
| 10 | `herb-shish-tawook` | `charcoal-grill-bowls` | 275 | `27500` | 690 | `250g (2 skewers)` | 15 | `true` |
| 11 | `high-protein-chicken-bowl` | `charcoal-grill-bowls` | 255 | `25500` | 560 | `220g · 48g protein` | 13 | `true` |
| 12 | `loaded-smash-fries` | `sides-sharing` | 185 | `18500` | 640 | `320g` | 9 | `true` |
| 13 | `truffle-parmesan-fries` | `sides-sharing` | 145 | `14500` | 490 | `250g` | 8 | `true` |
| 14 | `classic-skin-on-fries` | `sides-sharing` | 75 | `7500` | 380 | `220g` | 6 | `true` |
| 15 | `house-dips-trio` | `sides-sharing` | 55 | `5500` | 290 | `3×60ml dips` | 3 | `false` *(no modifiers)* |
| 16 | `squad-sharing-box` | `sides-sharing` | 890 | `89000` | 2640 | `Serves 4 (~1.4kg)` | 18 | `true` |
| 17 | `v7-lemon-mint` | `drinks-hot-pies` | 45 | `4500` | 115 | `300ml can` | 2 | `false` *(has default)* |
| 18 | `v-cola` | `drinks-hot-pies` | 40 | `4000` | 125 | `300ml can` | 2 | `true` |
| 19 | `sparkling-karkadeh-mint` | `drinks-hot-pies` | 65 | `6500` | 95 | `350ml glass` | 3 | `false` *(has default)* |
| 20 | `hot-crispy-pie` | `drinks-hot-pies` | 115 | `11500` | 490 | `160g (1 pie)` | 8 | `true` |

> **UX Quick-Add Rule:** Dishes whose required groups all have an `isDefault: true` option support **1-tap `+ Add`** on the card (adds default build immediately and wakes the Floating Cart Dock), while tapping the card body opens the **Dish Customizer Drawer**. Only **`V-Cola / V-Diet Cola`** and **`Hot Crispy Pie`** (where the flavor/variant choice is an active decision) or tapping the card body force opening the Customizer first — or keep all required defaults pre-selected inside the drawer so the diner is always 1 tap away from `Add`!

---

## 2. Exact Flat Modifier Groups Data Table (`convex/seed.ts` Ready)

### Control Mapping & Pricing Contract
- `minSelect === 1 && maxSelect === 1` → **Required Single-Select (`RadioGroup`)** · badge: `Required` / `مطلوب`
- `minSelect === 0 && maxSelect === 1` → **Optional Single-Select (`RadioGroup` / toggleable)** · badge: `Optional` / `اختياري`
- `minSelect === 0 && maxSelect > 1` → **Optional Multi-Select (`CheckboxGroup`)** · badge: `Up to N` / `لحد N`
- **All `priceDeltaPiaster` values are non-negative integers (`>= 0`)** so base dish prices on cards are always honest starting prices (`from 245 EGP` isn't even needed when the standard build is `+0`).

### Complete 19 Flat Modifier Groups Table

| `groupId` | Group Label (EN / `ar-EG`) | `minSelect` | `maxSelect` | `optionId` | Option Label (EN) | Option Label (`ar-EG`) | `priceDeltaPiaster` | Display Delta | `isDefault` |
| :--- | :--- | :-: | :-: | :--- | :--- | :--- | --: | --: | :-: |
| `burger-patty-size` | `Patty Weight` · `وزن اللحمة` | 1 | 1 | `double-200g` | Double (200g) | دبل (200 جم) | `0` | — | `true` |
| | | | | `triple-300g` | Triple (300g) | تريبل (300 جم) | `7500` | `+75 EGP` | `false` |
| `burger-bun-style` | `Bun Style` · `نوع العيش` | 1 | 1 | `martins-potato` | Martin's Potato Roll | عيش مارتنز بطاطس | `0` | — | `true` |
| | | | | `lettuce-wrap` | Iceberg Lettuce Wrap (Keto) | ملفوف في خس آيسبرج (كيتو) | `0` | — | `false` |
| `burger-add-ons` | `Add Extras` · `إضافات` | 0 | 4 | `extra-cheddar` | Extra American Cheddar | شيدر زيادة | `2500` | `+25 EGP` | `false` |
| | | | | `beef-bacon` | Smoky Beef Bacon | بيف بيكون مدخن | `4500` | `+45 EGP` | `false` |
| | | | | `sauteed-mushroom` | Roasted Portobello Mushroom | مشروم مشوي | `3000` | `+30 EGP` | `false` |
| | | | | `fried-egg` | Sunny-Side Fried Egg | بيض مقلي | `2500` | `+25 EGP` | `false` |
| | | | | `pickled-jalapenos` | Charred Jalapeños | هالبينو مشوي | `1500` | `+15 EGP` | `false` |
| | | | | `truffle-aioli-side` | Truffle Aioli Dip | صوص ترافل أيولي | `3000` | `+30 EGP` | `false` |
| `burger-removals` | `Remove Ingredients` · `من غير` | 0 | 4 | `no-onions` | No Onions | من غير بصل | `0` | — | `false` |
| | | | | `no-pickles` | No Pickles | من غير مخلل | `0` | — | `false` |
| | | | | `no-sauce` | Sauce on the Side | الصوص على جنب | `0` | — | `false` |
| | | | | `no-jalapenos` | No Jalapeños | من غير هالبينو | `0` | — | `false` |
| `spice-level` | `Heat Level` · `درجة الشطة` | 1 | 1 | `mild` | Mild | خفيف | `0` | — | `false` |
| | | | | `medium` | Medium | متوسط | `0` | — | `true` |
| | | | | `hot` | Extra Hot | حراق زيادة | `0` | — | `false` |
| `pizza-crust` | `Crust Style` · `نوع العجينة` | 1 | 1 | `stone-deck-classic` | 48h Stone-Deck Classic | عجينة فرن حجري كلاسيك | `0` | — | `true` |
| | | | | `thin-crispy` | Roman Thin & Crispy | رفيعة ومقرمشة | `0` | — | `false` |
| | | | | `stuffed-edge` | Mozzarella Stuffed Crust | أطراف محشية موتزاريلا | `4500` | `+45 EGP` | `false` |
| `pizza-extras` | `Extra Toppings` · `إضافات البيتزا` | 0 | 4 | `extra-buffalo-mozz` | Extra Buffalo Mozzarella | موتزاريلا بافلو زيادة | `5500` | `+55 EGP` | `false` |
| | | | | `extra-pepperoni` | Extra Beef Pepperoni | بيبروني بيف زيادة | `5000` | `+50 EGP` | `false` |
| | | | | `hot-honey-drizzle` | Wildflower Hot Honey Drizzle | رشة عسل حراق | `2500` | `+25 EGP` | `false` |
| | | | | `roasted-mushrooms` | Roasted Mushrooms | مشروم مشوي | `3000` | `+30 EGP` | `false` |
| | | | | `fresh-arugula` | Fresh Wild Arugula | جرجير فريش | `2000` | `+20 EGP` | `false` |
| `grill-side-choice` | `Choose Side` · `اختار الطبق الجانبي` | 1 | 1 | `warm-pita-fries` | Warm Baladi Pita & Fries | عيش بلدي وبطاطس | `0` | — | `true` |
| | | | | `spiced-basmati` | Spiced Basmati Rice | رز بسمتي مبهر | `0` | — | `false` |
| | | | | `grilled-veg-keto` | Charred Vegetables (Low-Carb) | خضار مشوي (لو كارب) | `1500` | `+15 EGP` | `false` |
| `grill-extras` | `Grill Add-Ons` · `إضافات الشواية` | 0 | 3 | `extra-kofta-skewer` | Extra Kofta Skewer (90g) | سيخ كفتة زيادة | `8500` | `+85 EGP` | `false` |
| | | | | `extra-tawook-skewer` | Extra Tawook Skewer (125g) | سيخ شيش طاووق زيادة | `8000` | `+80 EGP` | `false` |
| | | | | `warm-baladi-pita` | Extra Warm Baladi Pita | عيش بلدي زيادة | `1500` | `+15 EGP` | `false` |
| `bowl-base` | `Bowl Base` · `أساس البول` | 1 | 1 | `basmati-quinoa` | Basmati & Quinoa Blend | رز بسمتي وكينوا | `0` | — | `true` |
| | | | | `full-quinoa` | 100% Tri-Color Quinoa | كينوا بس | `2500` | `+25 EGP` | `false` |
| | | | | `greens-only` | Mixed Greens Base (Keto) | خضار وجرجير بس (كيتو) | `0` | — | `false` |
| `bowl-extras` | `Bowl Add-Ons` · `إضافات البول` | 0 | 3 | `double-chicken` | Extra 110g Grilled Chicken | فراخ مشوية زيادة | `6500` | `+65 EGP` | `false` |
| | | | | `extra-avocado` | Extra Half Avocado | أفوكادو زيادة | `4500` | `+45 EGP` | `false` |
| | | | | `soft-boiled-egg` | Soft-Boiled Egg | بيضة مسلوقة | `2000` | `+20 EGP` | `false` |
| `fries-size` | `Portion Size` · `الحجم` | 1 | 1 | `regular` | Regular | عادي | `0` | — | `true` |
| | | | | `large-share` | Large (Shareable) | كبير (للشيرينج) | `4500` | `+45 EGP` | `false` |
| `dip-pairing` | `House Dips` · `صوصات بيتي` | 0 | 3 | `dip-250` | 250° House Sauce | صوص 250° | `2000` | `+20 EGP` | `false` |
| | | | | `dip-ranch` | Buttermilk Ranch | صوص رانش | `2000` | `+20 EGP` | `false` |
| | | | | `dip-truffle` | Black Truffle Aioli | ترافل أيولي | `3000` | `+30 EGP` | `false` |
| | | | | `dip-toum` | Whipped Garlic Toum | تومية | `1500` | `+15 EGP` | `false` |
| | | | | `dip-tahina` | Roasted Sesame Tahina | طحينة | `1500` | `+15 EGP` | `false` |
| `box-slider-mix` | `Slider Mix (4)` · `تشكيلة السلايدرز (4)` | 1 | 1 | `mix-2-2` | 2 Classic + 2 Jalapeño | 2 كلاسيك + 2 هالبينو | `0` | — | `true` |
| | | | | `all-classic` | 4 Classic Smash | 4 كلاسيك سماش | `0` | — | `false` |
| | | | | `all-jalapeno` | 4 Blazing Jalapeño | 4 هالبينو حراق | `0` | — | `false` |
| `box-drinks-bundle` | `Drink Bundle` · `باكيدج مشروبات` | 0 | 1 | `bundle-v7-mix` | 4× Mixed V7 & V-Cola (300ml) | 4 كانز مشكل V7 وV-Cola | `13000` | `+130 EGP` | `false` |
| `vcola-variant` | `Choose Cola` · `اختار النوع` | 1 | 1 | `vcola-classic` | V-Cola Classic | V-Cola عادي | `0` | — | `true` |
| | | | | `vdiet-zero` | V-Diet Zero Sugar | V-Diet زيرو سكر | `0` | — | `false` |
| `drink-serve-style` | `Serve Style` · `طريقة التقديم` | 1 | 1 | `chilled-ice-glass` | Glass with Ice | كوباية بتلج | `0` | — | `true` |
| | | | | `chilled-no-ice` | Chilled, No Ice | ساقع من غير تلج | `0` | — | `false` |
| `pie-filling` | `Choose Filling` · `اختار الحشو` | 1 | 1 | `spiced-apple` | Spiced Cinnamon Apple | تفاح بالقرفة | `0` | — | `true` |
| | | | | `nutella-kunafa` | Nutella & Toasted Kunafa | نوتيلا وكنافة محمصة | `1500` | `+15 EGP` | `false` |
| `pie-extras` | `Toppings` · `إضافات فوق الفطيرة` | 0 | 2 | `vanilla-scoop` | Vanilla Bean Ice Cream Scoop | بولة آيس كريم فانيليا | `3500` | `+35 EGP` | `false` |
| | | | | `pistachio-crush` | Crushed Roasted Pistachios | فستق مجروش | `2500` | `+25 EGP` | `false` |

### `convex/seed.ts` Type Contract & Verified Split-Bill Test Fixture

```ts
export type DietaryTag =
  | "signature"
  | "spicy"
  | "keto"
  | "high-protein"
  | "vegetarian"
  | "gluten-free"
  | "sharing";

export interface ModifierOptionSeed {
  id: string;
  labelEn: string;
  labelAr: string;
  priceDeltaPiaster: number; // Always >= 0 integer
  isDefault: boolean;
}

export interface ModifierGroupSeed {
  id: string;
  nameEn: string;
  nameAr: string;
  minSelect: number;
  maxSelect: number;
  options: ModifierOptionSeed[];
}

export interface MenuItemSeed {
  slug: string;
  categoryId:
    | "smash-burgers"
    | "stone-deck-pizza"
    | "charcoal-grill-bowls"
    | "sides-sharing"
    | "drinks-hot-pies";
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  pricePiaster: number; // Integer piasters (1 EGP = 100)
  kcal: number;
  portionSpecEn: string;
  portionSpecAr: string;
  prepMinutes: number;
  imagePath: `/images/menu/${string}.webp`;
  tags: DietaryTag[];
  modifierGroupIds: string[];
  isAvailable: boolean; // Toggled live by KDS "86"
  sortOrder: number;
}
```

> **Verified Vitest Split-Bill Fixture (For Live DEPI Demo):**
> - **Omar:** `Double Smash` (`24500`) + `Smoky Beef Bacon` (`+4500`) + `V7 Lemon Mint` (`4500`) = **`33500` piasters (`335 EGP`)**
> - **Salma:** `Hot Honey Double Pepperoni` (`29500`) + `Truffle Parmesan Fries` (`14500`) + `Hot Crispy Pie` (`11500`) + `Nutella & Toasted Kunafa` (`+1500`) = **`57000` piasters (`570 EGP`)**
> - **Table #5 Total:** **`90500` piasters (`905 EGP`)**
> - **Split Equally ÷ 2:** `45250` + `45250` (`452.50 EGP` each — exact)
> - **Split Equally ÷ 3 (Remainder Check):** `30167` + `30167` + `30166` (`301.67`, `301.67`, `301.66 EGP` — sum = `90500` exact, zero drift)

---

## 3. Complete Anti-Slop Screen-by-Screen UI Copy Sheet (EN + `ar-EG`)

> Every single string below has been audited through **`clean-copy` + `unslop-ui`**. Anything omitted (such as section eyebrows, filler subtitles, or instructional tooltips) is **intentionally absent — do NOT invent replacement filler when building React JSX.**

### 3.1 Global Chrome — Floating Nav Pill & Floating Table/Cart Dock

| Slot / Component | English (`en`) | Egyptian Arabic (`ar-EG`) | Notes |
| :--- | :--- | :--- | :--- |
| Brand Wordmark (`aria-label`) | `250° Kitchen` | `مطبخ 250°` | Visual mark renders `250°` |
| Nav Link 1 | `Menu` | `المنيو` | Links to `/menu` |
| Nav Link 2 | `How it works` | `إزاي تطلب` | Scrolls to `#how-it-works` on `/` |
| Nav Link 3 | `Kitchen Pass` | `شاشة المطبخ` | Links to `/kds` |
| Language Toggle | `عربي` *(when EN)* / `EN` *(when AR)* | `EN` *(when AR)* / `عربي` *(when EN)* | Flips `dir="rtl"` / `dir="ltr"` |
| Table Status Pill (No Table) | `Join table` | `ادخل ترابيزة` | Opens Table PIN modal / `/table` |
| Table Status Pill (Active) | `Table {n}` | `ترابيزة {n}` | Shows active table number |
| Nav Primary CTA | `Order` | `اطلب` | Scrolls to menu strip or routes to `/menu` |
| Floating Dock — Table Label | `Table {n}` | `ترابيزة {n}` | Or `Takeaway` / `تيك أواي` when no table |
| Floating Dock — Diner Count | `{count} at table` | `{count} على الترابيزة` | Shown only when `count >= 2` |
| Floating Dock — Item Count | `{count} item` / `{count} items` | `{count} صنف` / `{count} أصناف` | Singular/plural handled cleanly |
| Floating Dock — CTA | `View cart` | `افتح السلة` | Rolling price sits beside label |

---

### 3.2 Route 1: `/` — Sunlit Storefront Homepage

| Section & Slot | English (`en`) | Egyptian Arabic (`ar-EG`) | Clean-Copy Check |
| :--- | :--- | :--- | :--- |
| **Hero — Meta Pill** | `Prep ~{min} min · Maadi, Cairo` | `التجهيز ~{min} دقيقة · المعادي` | Real prep average, zero pulsing `LIVE` dot |
| **Hero — `<h1>`** | `Seared at 250°. Shared at your table.` | `مشوي على 250°. وطلب واحد لترابيزتكم.` | 2 balanced lines (`text-wrap: balance`) |
| **Hero — Supporting Line** | `Smash burgers, stone-deck pizza, and charcoal grill, ordered together from your phone.` | `سماش برجر، بيتزا فرن حجري، ومشويات على الفحم. اطلبوا سوا واقسموا الحساب من موبايلكم.` | 13 words, concrete food + table mechanic, zero em-dash |
| **Hero — Primary CTA** | `Join a table` | `ادخل على ترابيزتك` | Opens Table PIN sheet |
| **Hero — Secondary CTA** | `Browse menu` | `شوف المنيو` | Routes to `/menu` |
| **Menu Strip — `<h2>`** | `On the grill today` | `على الجريل النهارده` | Zero eyebrow, zero subtitle |
| **Menu Strip — Link** | `Full menu` | `المنيو كامل` | Routes to `/menu` |
| **Menu Strip — Quick Add** | `+ Add` | `+ أضف` | For items with valid defaults |
| **Menu Strip — Customize** | `Choose` | `اختار` | For variant-required items (`V-Cola`, `Hot Pie`) |
| **How It Works — `<h2>`** | `One table. Everyone orders.` | `ترابيزة واحدة. الكل بيطلب سوا.` | Zero subtitle; steps carry the explanation |
| **Step 1 — Title** | `Join with your table PIN` | `ادخل بكود الترابيزة` | No `01 //` prefix |
| **Step 1 — Body** | `Scan the table code, type a name, and you're in. No account needed.` | `امسح كود الترابيزة واكتب اسمك وبس. من غير تسجيل حساب.` | Concrete, zero botsplaining |
| **Step 2 — Title** | `Build one shared cart` | `سلة واحدة للكل` | |
| **Step 2 — Body** | `Watch dishes land by diner, then pay full, pay yours, or split evenly.` | `شوف مين طلب إيه لحظة بلحظة، وادفع كله أو طلبك أو اقسموه بالتساوي.` | |
| **Step 3 — Title** | `Track it off the pass` | `تابع طلبك من المطبخ` | |
| **Step 3 — Body** | `Follow your ticket from the grill straight to your table.` | `تابع الأوردر وهو على الجريل لحد ما يوصلك سخن.` | |
| **Dark Band — `<h2>`** | `The 250° Pass` | `شاشة المطبخ 250°` | Single dark-charcoal contrast island |
| **Dark Band — Body** | `Every table ticket hits the pass at once. When a dish sells out, every menu locks immediately.` | `كل أوردر بينزل على شاشة الشيف في ساعتها. وأي صنف يخلص بيتقفل في المنيو فورًا.` | Zero leaked tech jargon ("Convex") |
| **Dark Band — Live Stat** | `{n} active tickets · {min} min avg` | `{n} أوردرات شغالة · متوسط {min} دقيقة` | Real query data only |
| **Dark Band — CTA** | `Open Kitchen Pass` | `افتح شاشة المطبخ` | Routes to `/kds` |

---

### 3.3 Route 2: `/menu` — Full Interactive Menu

| Slot / State | English (`en`) | Egyptian Arabic (`ar-EG`) |
| :--- | :--- | :--- |
| Page `<h1>` | `Menu` | `المنيو` |
| Search Input Placeholder | `Search burgers, pizza, kofta...` | `دوّر على برجر، بيتزا، كفتة...` |
| Search Clear (`aria-label`) | `Clear search` | `امسح البحث` |
| Category Tab: All | `All` | `الكل` |
| Category Tabs 1–5 | `Burgers` · `Pizza` · `Grill & Bowls` · `Sides & Sharing` · `Drinks & Pies` | `برجر` · `بيتزا` · `مشويات وبولز` · `بطاطس وشيرينج` · `مشروبات وحلو` |
| Dietary Filter Pills | `Spicy` · `Keto` · `High-Protein` · `Vegetarian` · `Sharing` | `سبايسي` · `كيتو` · `بروتين عالي` · `نباتي` · `شيرينج` |
| Dish Card — Price Format | `{amount} EGP` | `{amount} ج.م` |
| Dish Card — Meta Line | `{kcal} kcal · {min} min` | `{kcal} سعرة · {min} د` |
| Dish Card — Sold Out Overlay | `Sold out` | `خلصان دلوقتي` |
| Dish Card — Sold Out Button | `Unavailable` | `غير متاح` |
| Empty Search — Heading | `No dishes match "{query}"` | `مفيش أصناف باسم "{query}"` |
| Empty Search — Action | `Reset filters` | `امسح الفلاتر` |
| Tax Footnote (Bottom of Grid) | `Prices exclude 12% service (dine-in) and 14% VAT.` | `الأسعار غير شاملة 12% خدمة (صالة) و14% ضريبة.` |

---

### 3.4 Route 3: `/table/:n` — Shared Table & PIN Join Flow

| Slot / State | English (`en`) | Egyptian Arabic (`ar-EG`) |
| :--- | :--- | :--- |
| Join Sheet — Heading (Table Known) | `Join Table {n}` | `ادخل ترابيزة {n}` |
| Join Sheet — Heading (No Table) | `Join a table` | `ادخل على ترابيزتك` |
| Field 1 Label / Placeholder | `Table number` / `1–12` | `رقم الترابيزة` / `1–12` |
| Field 2 Label / Placeholder | `4-digit PIN` / `••••` | `كود الترابيزة (4 أرقام)` / `••••` |
| Field 3 Label / Placeholder | `Your name` / `e.g. Omar` | `اسمك` / `مثلًا عمر` |
| Submit CTA | `Join table` | `ادخل الترابيزة` |
| Alternative Action | `Order takeaway` | `اطلب تيك أواي` |
| Error — Wrong PIN | `That PIN doesn't match Table {n}. Check the table card.` | `الكود مش صح لترابيزة {n}. راجع الكارت اللي على الترابيزة.` |
| Error — Invalid Table | `Pick a table between 1 and 12.` | `اختار رقم ترابيزة من 1 لـ 12.` |
| Error — Empty Name | `Add a short name so friends know your items.` | `اكتب اسمك عشان أصحابك يعرفوا طلباتك.` |
| Active Table Header | `Table {n}` | `ترابيزة {n}` |
| Active Table — PIN Pill | `PIN {pin}` *(tap copies)* | `الكود {pin}` |
| PIN Copied Toast | `Table PIN copied` | `اتنسخ كود الترابيزة` |
| Active Diners Label | `At this table` | `الموجودين على الترابيزة` |
| Current User Tag | `{name} (You)` | `{name} (أنت)` |
| Secondary Action | `Leave table` | `اخرج من الترابيزة` |
| Primary Action | `Open menu` | `افتح المنيو` |

---

### 3.5 Route 4: `/track/:orderId` — Live Order Tracker

| Slot / State | English (`en`) | Egyptian Arabic (`ar-EG`) |
| :--- | :--- | :--- |
| Page `<h1>` | `Order #{code}` | `أوردر #{code}` |
| Context Pill (Dine-in / Counter) | `Table {n}` / `Counter pickup` | `ترابيزة {n}` / `استلام من الكاشير` |
| ETA Readout (Active) | `Ready in ~{min} min` | `جاهز خلال ~{min} دقيقة` |
| ETA Readout (Ready) | `Ready at the pass` | `طلبك جاهز دلوقتي` |
| ETA Readout (Served) | `Served` | `تم التقديم` |
| Stage 1 | `Received` | `اتستلم` |
| Stage 2 | `On the grill` | `على الجريل` |
| Stage 3 | `Ready` | `جاهز` |
| Stage 4 | `Served` | `وصل الترابيزة` |
| Receipt Section Heading | `Order summary` | `ملخص الأوردر` |
| Payment Line — Paid | `Paid · {amount} EGP` | `مدفوع · {amount} ج.م` |
| Payment Line — Counter | `Pay at counter · {amount} EGP` | `الدفع عند الكاشير · {amount} ج.م` |
| Split Share Note (If Split) | `Your share ({mode})` | `حسابك ({mode})` |
| Action — Order More | `Order more` | `اطلب حاجة تانية` |
| Invalid Order State — Heading | `Order not found` | `الأوردر مش موجود` |
| Invalid Order State — CTA | `Back to menu` | `ارجع للمنيو` |

---

### 3.6 Route 5: `/kds` — Kitchen Display System (Dark Charcoal Pass)

> **Zero-Login Constraint (`C-08`):** No email/password login gate or account creation anywhere in the app. `/kds` opens directly for instant live demonstration and returns to `/` via the top bar.

| Slot / State | English (`en`) | Egyptian Arabic (`ar-EG`) |
| :--- | :--- | :--- |
| Top Bar — Title | `250° Pass` | `شاشة المطبخ 250°` |
| Top Bar — Active Counter | `{n} active` | `{n} شغال` |
| Top Bar — Avg Time | `Avg {min}m` | `متوسط {min} د` |
| Top Bar — Sound Toggle | `Chime on` / `Muted` | `الصوت شغال` / `صامت` |
| Top Bar — Stock Drawer Trigger | `86 Stock` | `إدارة المتاح (86)` |
| Top Bar — Storefront Link | `Storefront` | `الواجهة` |
| Column 1 Header | `New` | `جديد` |
| Column 2 Header | `On the grill` | `على الجريل` |
| Column 3 Header | `Ready` | `جاهز` |
| Ticket Header — Dine-In | `Table {n} · #{code}` | `ترابيزة {n} · #{code}` |
| Ticket Header — Takeaway | `Counter · #{code}` | `تيك أواي · #{code}` |
| Ticket Elapsed Badge | `{mm}:{ss}` | `{mm}:{ss}` |
| Ticket Kitchen Note Prefix | `Note:` | `ملاحظة:` |
| Ticket Action (New → Grill) | `Start prep` | `ابدأ التجهيز` |
| Ticket Action (Grill → Ready) | `Mark ready` | `جاهز للتقديم` |
| Ticket Action (Ready → Served) | `Bump served` | `تم التسليم` |
| Empty Board Heading | `Pass is clear` | `الشاشة فاضية` |
| Empty Board Body | `New table tickets appear here automatically.` | `الأوردرات الجديدة هتنزل هنا أول بأول.` |
| **86 Stock Sheet — Title** | `86 · Out of Stock` | `86 · إيقاف الأصناف` |
| **86 Stock Sheet — Search** | `Filter dishes...` | `دوّر على صنف...` |
| **86 Stock Sheet — Available** | `In stock` | `متاح` |
| **86 Stock Sheet — Sold Out** | `86 · Sold out` | `86 · خلصان` |

---

### 3.7 The 3 Drawers

#### Drawer 1: Dish Customizer Drawer
| Slot / State | English (`en`) | Egyptian Arabic (`ar-EG`) |
| :--- | :--- | :--- |
| Required Group Badge | `Required` | `مطلوب` |
| Optional Group Badge | `Optional` | `اختياري` |
| Multi-Select Cap Badge | `Up to {max}` | `لحد {max}` |
| Selected Check Badge | `Selected` | `تم الاختيار` |
| Kitchen Note Label | `Kitchen note` | `ملاحظة للمطبخ` |
| Kitchen Note Placeholder | `Allergies, extra crisp, cut in half...` | `حساسية، تسوية زيادة، يتقسم نصين...` |
| Validation Error (Missing Req) | `Choose {groupName} to continue.` | `اختار {groupName} عشان تكمل.` |
| Validation Error (Max Exceeded) | `Pick up to {max} options.` | `اختار بحد أقصى {max}.` |
| Primary CTA (New Item) | `Add · {price} EGP` | `أضف · {price} ج.م` |
| Primary CTA (Editing Item) | `Update · {price} EGP` | `حدّث · {price} ج.م` |
| Mid-Edit `86` Banner | `This dish just sold out.` | `الصنف ده لسه خلصان دلوقتي.` |

#### Drawer 2: Shared Table Cart Drawer
| Slot / State | English (`en`) | Egyptian Arabic (`ar-EG`) |
| :--- | :--- | :--- |
| Drawer Heading (Table) | `Table {n} cart` | `سلة ترابيزة {n}` |
| Drawer Heading (Solo) | `Your cart` | `سلتك` |
| Diner Group Label (Self) | `Your items` | `طلباتك` |
| Diner Group Label (Other) | `{name}'s items` | `طلبات {name}` |
| Edit Link | `Edit` | `تعديل` |
| Remove (`aria-label`) | `Remove {dish}` | `امسح {dish}` |
| Summary Line — Total | `Total` | `الإجمالي` |
| Primary CTA | `Checkout · {total} EGP` | `الحساب · {total} ج.م` |
| Empty Cart — Heading | `Your cart is empty` | `السلة فاضية` |
| Empty Cart — CTA | `Browse menu` | `شوف المنيو` |
| Sold-Out Item Banner in Cart | `Sold out. Remove to checkout.` | `خلصان دلوقتي. شيله عشان تكمل.` |

#### Drawer 3: Smart Split-Bill Checkout Drawer
| Slot / State | English (`en`) | Egyptian Arabic (`ar-EG`) |
| :--- | :--- | :--- |
| Drawer Heading | `Checkout` | `إتمام الطلب` |
| Mode Tab 1 | `Full table` | `الحساب كله` |
| Mode Tab 2 | `My items` | `طلباتي بس` |
| Mode Tab 3 | `Split equally` | `تقسيم بالتساوي` |
| Split Counter Label | `Split between` | `تقسيم على` |
| Split Unit | `{n} guests` | `{n} أفراد` |
| Per-Person Amount Label | `Your share` | `حسابك` |
| Remainder Footnote *(only when remainder > 0)* | `Includes {rem} EGP rounding.` | `شامل {rem} ج.م فرق تقريب.` |
| Payment Method Heading | `Payment` | `طريقة الدفع` |
| Payment Option 1 | `Pay now` | `ادفع دلوقتي` |
| Payment Option 2 | `Pay at counter` | `ادفع عند الكاشير` |
| Primary CTA (Pay Now) | `Pay {amount} EGP` | `ادفع {amount} ج.م` |
| Primary CTA (Counter) | `Send order · {amount} EGP` | `ابعت الأوردر · {amount} ج.م` |
| Processing State | `Sending to kitchen...` | `بنبعت للمطبخ...` |
| Error State | `Couldn't send your order. Try again.` | `ما قدرناش نبعت الأوردر. جرب تاني.` |
| Empty "My Items" Warning | `You haven't added any items yet.` | `لسه ما ضفتش طلبات باسمك.` |

---

### 3.8 Signature Editorial Footer & "Open Kitchen / Daylight Only" Theme Toggle

#### Clean 3-Column Footer Links
| Column | Heading (EN / `ar-EG`) | Links / Lines (EN) | Links / Lines (`ar-EG`) |
| :--- | :--- | :--- | :--- |
| **Col 1** | `Kitchen` · `المطبخ` | `Road 9, Maadi, Cairo`<br>`Daily 12:00 – 01:00` | `شارع 9، المعادي، القاهرة`<br>`يوميًا 12:00 ظهرًا – 1:00 صباحًا` |
| **Col 2** | `Order` · `الطلب` | `Menu` · `Join a table` · `How it works` | `المنيو` · `ادخل على ترابيزتك` · `إزاي تطلب` |
| **Col 3** | `Staff` · `الموظفين` | `Kitchen Pass (/kds)` · `Stock 86` | `شاشة المطبخ` · `إيقاف الأصناف` |
| **Bottom Utility Row** | — | `© 2026 250° Kitchen` · `[Theme Toggle]` · `Back to top ↑` | `© 2026 مطبخ 250°` · `[تبديل الإضاءة]` · `فوق ↑` |

#### The Playful "Open Kitchen / Daylight Only" Theme Toggle — 3 Witty Variations (Pick One!)

> **Interaction Behavior:** The toggle sits discreetly in the footer utility row beside `Back to top ↑`, defaulting to the Sun icon (`Daylight`). Clicking the Moon icon never breaks the sunlit design system — instead it opens a tiny, crisp `@base-ui/react` Popover directly above the switch (with shake physics!) and a direct link to the one genuine dark surface in the product (`/kds`).

| Variation | Vibe | Popover Headline (EN / `ar-EG`) | 1-Line Punchline (EN / `ar-EG`) | Action Link (EN / `ar-EG`) |
| :--- | :--- | :--- | :--- | :--- |
| **A — "Open Kitchen"** *(Recommended)* | Warm, hospitality-first wit | **EN:** `No dark kitchens here.`<br>**AR:** `مفيش دارك كيتشن هنا.` | **EN:** `250° is a sunlit open kitchen. Dark mode lives strictly on the Kitchen Pass.`<br>**AR:** `مطبخ 250° مفتوح وفي النور دايمًا. الدارك مود حصري لشاشة الشيف.` | **EN:** `Peek at Kitchen Pass →`<br>**AR:** `بص على شاشة المطبخ ←` |
| **B — "Daylight Only"** | Dry minimalist (Apple / Linear deadpan) | **EN:** `Daylight only.`<br>**AR:** `إضاءة نهارية بس.` | **EN:** `Food looks better in daylight. If you want charcoal, head to the pass.`<br>**AR:** `الأكل أحلى في النور. لو عايز أسود وفحم، اطلع على شاشة المطبخ.` | **EN:** `Open Kitchen Pass →`<br>**AR:** `افتح شاشة المطبخ ←` |
| **C — "250° Heat"** | Playful culinary cheek | **EN:** `Can't dim a 250° grill.`<br>**AR:** `مش هنعرف نطفي شواية 250°.` | **EN:** `The dining room stays sunlit all day. The dark shift runs behind the pass.`<br>**AR:** `الصالة منورة طول اليوم. الشفت الغامق شغال جوا المطبخ.` | **EN:** `Visit the pass →`<br>**AR:** `ادخل المطبخ ←` |

---

### 3.9 Anti-Slop Proof Table — What We Killed (And Why)

| Violated Rule | Typical AI Slop (BANNED) | Our Clean-Copy Replacement |
| :--- | :--- | :--- |
| **U1 (Eyebrow)** | `01 // SIGNATURE MENU` above `On the grill today` | *(Deleted completely)* |
| **U3 (Redundant Subtitle)** | `Menu` + *"Explore our curated selection of fresh dishes below"* | `Menu` *(no subtitle)* |
| **U4 (Botsplaining)** | *"Click the + button on any card to add items to your shared table cart"* | `+ Add` on the button itself |
| **U5 (Leaked Tech/Demo Note)** | *"Shared Table Cart (updates in real time via Convex)"* | `Table {n} cart` |
| **U9 (Fake Status Dot)** | `[● LIVE] Kitchen Open Now!` | `Prep ~12 min · Maadi, Cairo` |
| **U11 (Decorative Emoji)** | `🔥 Blazing Jalapeño Burger 🌶️` | `Blazing Jalapeño` + clean `Spicy` pill |
| **AI Buzzword** | *"An elevated culinary journey reimagined for modern Cairo dining"* | `Seared at 250°. Shared at your table.` |
| **Stiff MSA / Literal Arabic** | `انضم إلى رحلة طهي استثنائية واضغط هنا لتصفح قائمتنا المختارة` | `تشيكن برجر مقرمش` · `سماش برجر، بيتزا فرن حجري، ومشويات على الفحم.` |
| **Kitchen Jargon Leak** | Showing `86'd` to diners on `/menu` | `Sold out` (`خلصان دلوقتي`) on `/menu`; `86 · Sold out` only on `/kds` |

---

## 4. Unified Sunlit Food Photography Prompt Sheet (One Studio Afternoon)

### How to Lock 100% Cohesion Across All 20 Dishes
- **Aspect Ratio & Export Budget:** Generate all 20 menu shots at **`4:3`** (`960×720` `.webp`, quality `82`, target **`< 90 KB`** each). Keep the plate **centered with ~20% clean breathing margin** around all four edges so desktop cards show the full `4:3` frame and mobile `1:1` center-crops never slice off burger tops or pizza crusts.
- **Google Flow "Ingredients" Tip (Gemini AI Pro):** Before generating the 20 dishes, generate **1 reference empty-table setup** (`sunlit pale warm-linen travertine tabletop with an empty handmade matte warm-ivory ceramic stoneware plate under soft top-left morning window light`), save it as `@StudioSurface` in Google Flow Ingredients, and attach it to every dish prompt below.
- **Locked Master Style Suffix (Embedded in every prompt below):**  
  `Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.`

---

### Category 1 — Smash Burgers (`4:3`)

**1. `public/images/menu/double-smash-burger.webp`**
> Editorial food photography of a double smash burger with two thin seared beef patties featuring crispy caramelized lacy edges, two slices of glossy melted American cheddar, crisp house dill pickle chips, jammy seared onions, and warm coral-tan burger sauce peeking out inside a golden toasted Martin's potato roll. Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**2. `public/images/menu/truffle-swiss-burger.webp`**
> Editorial food photography of a gourmet double smash beef burger layered with thick slices of roasted golden-brown portobello mushrooms, velvety melted pale Swiss Emmental cheese, glossy dark caramelized onions, and a creamy black-flecked truffle aioli inside a golden toasted Martin's potato roll. Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**3. `public/images/menu/blazing-jalapeno-burger.webp`**
> Editorial food photography of a spicy double smash beef burger stacked with blistered charred green jalapeño slices, melted pepper jack cheese flecked with red chili, crunchy golden fried shallots, and a glossy terracotta-red roasted chili glaze inside a golden toasted Martin's potato roll. Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**4. `public/images/menu/nashville-hot-chicken-burger.webp`**
> Editorial food photography of a golden buttermilk-fried crispy chicken burger featuring a craggy terracotta-spiced crunchy chicken thigh fillet, melted American cheddar, crisp pale cabbage slaw, dill pickle chips, and warm house sauce inside a golden toasted Martin's potato roll. Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**5. `public/images/menu/keto-lettuce-wrap-smash.webp`**
> Editorial food photography of a neat keto lettuce-wrap double smash burger with two crispy-edged seared beef patties, sharp melted cheddar, a bright red vine-ripened tomato slice, dill pickles, and creamy house sauce tightly cradled inside crisp layered fresh pale-green iceberg lettuce leaves with zero bread bun. Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

---

### Category 2 — Stone-Deck Pizza (`4:3`)

**6. `public/images/menu/artisan-margherita-pizza.webp`**
> Editorial food photography of a whole 30cm artisan Neapolitan Margherita pizza with an airy leopard-spotted blistered stone-baked crust, vibrant crushed San Marzano red tomato sauce, pools of melted snowy buffalo mozzarella, whole fresh bright-green basil leaves, and a glistening drizzle of golden olive oil, pre-sliced cleanly into eight wedges. Plated on a wide handmade matte warm-ivory speckled ceramic stoneware pizza plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**7. `public/images/menu/hot-honey-pepperoni-pizza.webp`**
> Editorial food photography of a whole 30cm stone-deck pizza with charred blistered crust, generous cupped crispy-edged beef pepperoni curls over melted fior di latte mozzarella and rich tomato sauce, finished with crushed red chili flakes and sunlit glistening amber threads of hot honey drizzled across the slices. Plated on a wide handmade matte warm-ivory speckled ceramic stoneware pizza plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**8. `public/images/menu/chicken-ranch-supreme-pizza.webp`**
> Editorial food photography of a whole 30cm stone-baked pizza topped with tender charcoal-seared chicken breast strips, crispy smoked beef bacon pieces, golden bubbled mozzarella, charred sweet yellow corn kernels, fresh chopped parsley, and a delicate swirl of creamy white buttermilk ranch sauce across a crisp blistered crust. Plated on a wide handmade matte warm-ivory speckled ceramic stoneware pizza plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

---

### Category 3 — Charcoal Grill & Bowls (`4:3`)

**9. `public/images/menu/charcoal-kofta-platter.webp`**
> Editorial food photography of three juicy Egyptian charcoal-grilled beef and lamb kofta fingers with distinct dark grill char marks resting over warm folded baladi pita bread, accompanied by a blistered charred red tomato, crisp sliced red onion tossed with crimson sumac and chopped flat-leaf parsley, and a small matte ceramic ramekin of velvety sesame tahina with an olive oil swirl. Plated on a handmade matte warm-ivory speckled ceramic stoneware platter resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**10. `public/images/menu/herb-shish-tawook.webp`**
> Editorial food photography of golden-red paprika and herb marinated charcoal-grilled chicken shish tawook skewers with crisp caramelized edges, alternating with charred sweet bell pepper squares, served beside folded warm pita bread, a fresh lemon wedge, and a small stoneware ramekin of fluffy white whipped garlic toum. Plated on a handmade matte warm-ivory speckled ceramic stoneware platter resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**11. `public/images/menu/high-protein-chicken-bowl.webp`**
> Editorial food photography of a vibrant high-protein grain bowl filled with neatly sliced charcoal-grilled chicken breast showing clean sear marks, arranged over fluffy steamed basmati rice and tri-color quinoa alongside charred bright-green broccoli florets, glossy halved cherry tomatoes, fanned ripe avocado slices, and a light drizzle of lemon-herb olive oil dressing. Plated in a wide shallow handmade matte warm-ivory speckled ceramic stoneware bowl resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the bowl rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

---

### Category 4 — Fries, Dips & Sharing (`4:3`)

**12. `public/images/menu/loaded-smash-fries.webp`**
> Editorial food photography of a generous mound of golden crisp skin-on french fries topped with crumbled crispy-edged smashed beef, glossy melted warm cheddar cheese sauce, caramelized onions, sliced green pickled jalapeños, and neat ribbons of terracotta-tinted house burger sauce. Plated in a shallow handmade matte warm-ivory speckled ceramic stoneware dish resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the dish rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**13. `public/images/menu/truffle-parmesan-fries.webp`**
> Editorial food photography of crisp golden double-fried thin-cut shoestring fries lightly glistening with truffle oil, generously showered with fine fluffy grated aged parmesan cheese, coarsely cracked black pepper, and freshly snipped green chives, with a tiny stoneware ramekin of black truffle aioli tucked neatly on the plate edge. Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**14. `public/images/menu/classic-skin-on-fries.webp`**
> Editorial food photography of a crisp golden stack of double-fried rustic skin-on french fries lightly dusted with flaky sea salt crystals and warm smoked paprika, served cleanly with zero clutter. Plated on a handmade matte warm-ivory speckled ceramic stoneware plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**15. `public/images/menu/house-dips-trio.webp`**
> Editorial food photography of three matching handmade matte warm-ivory ceramic dipping ramekins arranged in a neat triangle: warm coral-tan 250° house burger sauce, creamy ivory black-flecked truffle aioli, and fluffy whipped white garlic toum with a delicate olive oil swirl. Set on a handmade matte warm-ivory speckled ceramic stoneware tray resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the tray rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

**16. `public/images/menu/squad-sharing-box.webp`**
> Editorial food photography of an open matte warm-kraft minimalist sharing feast box arranged cleanly for four people: four glossy golden smash burger sliders lined along one side, four charred herb shish tawook skewers beside a generous pile of crisp skin-on fries, and four neat small matte ramekins holding coral burger sauce, white ranch, sesame tahina, and truffle aioli. Resting directly on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the open box, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no brand labels.

---

### Category 5 — Craft Drinks & Hot Pies (`4:3`)

**17. `public/images/menu/v7-lemon-mint.webp`**
> Editorial food photography of a tall minimalist clear ribbed tumbler glass filled with sparkling pale-green lemon-mint soda, crystal-clear ice cubes, fresh bright-green bruised mint sprigs, and a thin backlit yellow lemon wheel, showing crisp cool condensation droplets down the glass exterior. Set on a small handmade matte warm-ivory speckled ceramic coaster resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting delicate refractive caustic light and gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space, Kinfolk and Bon Appetit studio daylight color grade, strictly no text, no watermarks, no hands, no logos.

**18. `public/images/menu/v-cola.webp`**
> Editorial food photography of a minimalist clear heavy-bottomed glass filled with dark amber-caramel fizzy cola over cracked clear ice cubes, tiny effervescent bubbles rising along the rim, garnished with a crisp fresh green lime wedge perched cleanly on the edge, cool dew condensation beading on the glass. Set on a small handmade matte warm-ivory speckled ceramic coaster resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting warm amber light refraction and gentle shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space, Kinfolk and Bon Appetit studio daylight color grade, strictly no text, no watermarks, no hands, no logos.

**19. `public/images/menu/sparkling-karkadeh-mint.webp`**
> Editorial food photography of a tall clear minimalist glass filled with jewel-like ruby-red sparkling iced Egyptian karkadeh hibiscus, fine effervescent bubbles rising through crystal-clear ice cubes, crowned with a vibrant sprig of fresh green mint and cool condensation droplets beading on the glass. Set on a small handmade matte warm-ivory speckled ceramic coaster resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting glowing ruby caustic light across the stone tabletop, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space, Kinfolk and Bon Appetit studio daylight color grade, strictly no text, no watermarks, no hands, no logos.

**20. `public/images/menu/hot-crispy-pie.webp`**
> Editorial food photography of a freshly baked blistered golden-brown crispy rectangular hand pie cut diagonally in half so the crisp flaky layers frame a warm glossy spill of rich melted chocolate-hazelnut spread laced with golden toasted crunchy kunafa threads and a light scatter of crushed green pistachios. Plated on a small handmade matte warm-ivory speckled ceramic stoneware dessert plate resting on a sunlit pale warm-linen travertine stone table (#F4F0E8 tone), 45-degree editorial tabletop angle, soft natural late-morning window light from top-left casting gentle warm shadows to bottom-right, 50mm prime lens f/2.8 shallow depth of field, centered composition with clean uncluttered breathing space around the plate rim, Kinfolk and Bon Appetit studio daylight color grade, crisp natural textures, strictly no text, no watermarks, no hands, no cutlery clutter, no logos.

---

### Bonus Essential Brand Shots (Aligned with `ASSET-STRATEGY.md`)

**Bonus A — `/` Homepage Hero Centerpiece (`public/images/hero-hearth-table.webp` · `16:9` · `1600×900` · `< 220 KB`)**
> Wide 16:9 editorial hospitality photography of a sunlit modern Cairo restaurant tabletop spread arranged with calm negative space: a double smash burger on a toasted potato roll, a stone-deck hot honey pepperoni pizza on matte ivory stoneware, charcoal-grilled kofta skewers with tahina, a tall iced lemon-mint tumbler with sunlight caustics, and folded unbleached linen napkins on a pale warm travertine stone table (#F4F0E8 tone). High 45-degree editorial framing with bright natural late-morning window light streaming from the upper left casting soft warm architectural shadows across the linen stone, Kinfolk and Bon Appetit magazine aesthetic, rich natural food color against calm warm neutral stone, shallow depth of field, strictly no text, no watermarks, no people, no phones, no visual clutter.

**Bonus B — Dark Kitchen Pass Packaging Visual (`public/images/packaging-takeaway.webp` · `4:3` · `1200×900` · `< 120 KB`)**
> Editorial studio product photography of minimalist matte unbleached kraft-paper restaurant takeaway burger box and matching insulated paper cup with crisp dark-espresso geometric typography reading only "250°" subtly embossed on the front face, paired with one crisp folded linen napkin resting on a dark roasted-walnut charred stone pass counter (#171412 tone). Warm directional overhead kitchen pass lighting creating gentle sculptural highlights on the matte paper edges, quiet luxury fast-casual hospitality packaging aesthetic, 50mm f/2.8 shallow depth of field, clean negative space, zero extra text, zero watermarks, zero hands.
