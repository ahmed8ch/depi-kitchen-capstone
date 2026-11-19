# Ready-to-Drop Seed Dataset & Bilingual (`en` / `ar-EG`) i18n Dictionaries

> **Date:** November 19, 2026  
> **Status:** Synced 100% with Prep Pack `07` (All 20 Dishes, 19 Flat Modifier Groups, Zero Login per `C-08`, Native Cairo `ar-EG` Audited) — ready to drop directly into the Day-1 scaffold (`src/i18n/locales/en.json`, `src/i18n/locales/ar.json`, `convex/seedData.ts`)  
> **Copy Standards Enforced:** Rachel's `clean-copy`, `unslop-ui`, `better-writing`, `better-typography`, and `02-design-vision/VISUAL-DIRECTION.md`

---

## Editorial, Bidi & Data Invariants

| Rule | Exact Implementation in This Pack |
| :--- | :--- |
| **Zero AI Slop (`clean-copy` + `unslop-ui`)** | Zero uppercase eyebrows (`01 //`, `INTRODUCING`), zero subtitles restating headings, zero botsplaining (*"Click here to start"*, *"Please"*), zero `"Oops!"` / `"Something went wrong"` / `"successfully"`, zero em-dashes (`—`) inside rendered UI strings, zero fake `"LIVE"` badges, zero decorative emojis anywhere, all CTAs `1–3` words verb-first. |
| **Zero Login / Zero Accounts (`C-08`)** | Strictly zero `auth`, `signIn`, `login`, or `password` keys anywhere in `en.json` or `ar.json`. Guests join tables with 4-digit Table PIN + display name only. |
| **Natural Cairo Egyptian Arabic (`ar-EG`)** | Modern, warm Cairo hospitality voice (*"اطلب دلوقتي"*, *"ادخل على ترابيزتك"*, *"خلصان دلوقتي"*, *"على الجريل"*, *"تشيكن برجر مقرمش"*) — always full **`على`** (zero single-letter preposition shorthand), zero literal English calques, never stiff Modern Standard Arabic. |
| **100% Key & Placeholder Parity** | `en.json` and `ar.json` share the exact same 12 namespaces, 241 leaf keys, and identical `{{placeholder}}` names, enabling strict TypeScript compile-time parity (`const _parity: typeof en = ar`). |
| **Western Digits `0–9` & `<bdi dir="ltr">250°</bdi>`** | Every price, timer, table number, weight, and calorie count uses Western digits `0–9` (zero `٠١٢٣٤٥٦٧٨٩`). In `ar.json`, inline brand marks wrap in `<bdi dir="ltr">250°</bdi>` so RTL punctuation never flips the degree ring. Render keys containing `<bdi>` with `react-i18next`'s `<Trans components={{ bdi: <bdi dir="ltr" /> }} />` (never raw `dangerouslySetInnerHTML`). Database strings in `convex/seedData.ts` stay clean plain text (searchable in Convex) and wrap `250°` at render time via a tiny `<BrandText />` helper. |
| **Exact Integer-Piaster Math** | All prices and modifier deltas are integers in piasters (`1 EGP = 100 piasters`, e.g., `24500` = `245.00 EGP`). Dine-in totals apply `12%` service charge + `14%` VAT on `(subtotal + serviceCharge)`; takeaway applies `0%` service charge + `14%` VAT on `subtotal`. |
| **Day-1 Alive `/kds` & `/menu`** | Seeding inserts 5 categories, all 20 cohesive signature dishes (100% identical to Prep Pack `07`), 19 flat modifier groups, 12 tables (`1–12`, capacity `2–8`), and 3 active KDS tickets (`new` Table #5, `preparing` Table #3, `ready` Takeaway `#P-101`) using relative `createdMinutesAgo` offsets so elapsed timers tick immediately. |

---

## 1. `src/i18n/locales/en.json`

```json
{
  "nav": {
    "brand": "250° Kitchen",
    "brandMark": "250°",
    "menu": "Menu",
    "howItWorks": "How it works",
    "kitchenPass": "Kitchen Pass",
    "trackOrder": "Track order",
    "joinTable": "Join table",
    "activeTable": "Table {{number}}",
    "orderNow": "Order now",
    "switchLanguage": "عربي",
    "languageAriaLabel": "Switch language to Arabic",
    "openMenuAria": "Open navigation menu",
    "closeMenuAria": "Close navigation menu",
    "skipToContent": "Skip to content"
  },
  "hero": {
    "headline": "Seared at 250°. Shared at your table.",
    "supporting": "Smash burgers, stone-deck pizza, and charcoal grill, ordered together from your phone.",
    "primaryCta": "Join a table",
    "secondaryCta": "Browse menu",
    "prepEstimate": "Prep ~{{minutes}} min",
    "signatureHeading": "On the grill today",
    "viewFullMenu": "View full menu",
    "stepsHeading": "One table. Everyone orders.",
    "step1Title": "Join with your table PIN",
    "step1Body": "Scan the table QR or pick tables 1–12. No app, no account needed.",
    "step2Title": "Build one shared cart",
    "step2Body": "Everyone adds from their own phone and splits the check evenly or by item.",
    "step3Title": "Track it off the pass",
    "step3Body": "Tickets hit the kitchen pass right away and update at every stage.",
    "kitchenBandHeading": "Inside the 250° pass",
    "kitchenBandBody": "Every smash burger, stone-deck pizza, and charcoal grill ticket runs live on our dark-mode kitchen board.",
    "openKdsCta": "Open Kitchen Pass"
  },
  "menu": {
    "heading": "Menu",
    "searchLabel": "Search dishes",
    "searchPlaceholder": "Smash burger, pizza, kofta, karkadeh…",
    "clearSearchAria": "Clear search",
    "allCategories": "All",
    "categoryBurgers": "Burgers",
    "categoryPizza": "Stone-Deck Pizza",
    "categoryGrill": "Grill & Bowls",
    "categorySidesBoxes": "Sides & Sharing",
    "categoryDrinksPies": "Drinks & Pies",
    "filterAll": "All dishes",
    "filterBestSeller": "Popular",
    "filterSpicy": "Spicy",
    "filterKeto": "Keto",
    "filterVegetarian": "Vegetarian",
    "filterHighProtein": "High-Protein",
    "filterSharing": "Sharing",
    "badgeBestSeller": "Popular",
    "badgeSpicy": "Spicy",
    "badgeKeto": "Keto",
    "badgeVegetarian": "Vegetarian",
    "badgeHighProtein": "High-Protein",
    "badgeGlutenFree": "Gluten-free",
    "badgeSharing": "Serves 4",
    "badgeSoldOut": "Sold out",
    "quickAdd": "Add",
    "customize": "Choose",
    "soldOutAction": "Unavailable",
    "kcalUnit": "{{kcal}} kcal",
    "currencyCode": "EGP",
    "priceFormat": "{{amount}} EGP",
    "resultsCount_one": "1 dish",
    "resultsCount_other": "{{count}} dishes"
  },
  "customizer": {
    "closeAria": "Close dish customizer",
    "requiredBadge": "Required",
    "optionalBadge": "Optional",
    "chooseOne": "Choose 1",
    "chooseUpTo": "Up to {{max}}",
    "included": "Included",
    "priceDelta": "+{{amount}} EGP",
    "kitchenNoteLabel": "Kitchen note",
    "kitchenNotePlaceholder": "No onions, extra pickles, sauce on the side",
    "kitchenNoteCounter": "{{current}}/{{max}}",
    "quantityLabel": "Quantity",
    "decreaseQuantityAria": "Decrease quantity",
    "increaseQuantityAria": "Increase quantity",
    "addToCart": "Add · {{amount}} EGP",
    "updateItem": "Update · {{amount}} EGP",
    "soldOutNotice": "This dish is off the pass for now.",
    "missingRequired": "Choose a required option in {{group}}.",
    "portionMeta": "{{portion}} · {{kcal}} kcal"
  },
  "table": {
    "joinHeading": "Join a table",
    "modeDineIn": "Dine-in table",
    "modeTakeaway": "Takeaway",
    "selectTableLabel": "Table number",
    "tableOption": "Table {{number}}",
    "tableCapacity": "Up to {{capacity}}",
    "statusAvailable": "Open",
    "statusOccupied": "Active",
    "pinLabel": "4-digit table PIN",
    "pinPlaceholder": "4821",
    "pinHint": "Found on your table card or shared by a friend.",
    "nicknameLabel": "Your name",
    "nicknamePlaceholder": "Omar",
    "joinAction": "Join table",
    "startTakeawayAction": "Start takeaway",
    "leaveTableAction": "Leave table",
    "switchTableAction": "Switch table",
    "sharePinLabel": "Table PIN",
    "copyPinAction": "Copy PIN",
    "pinCopied": "PIN copied",
    "dinersCount_one": "1 diner",
    "dinersCount_other": "{{count}} diners",
    "youTag": "You",
    "hostTag": "Host",
    "joinedToast": "Joined Table {{number}}",
    "leftToast": "Left Table {{number}}",
    "takeawayBanner": "Takeaway order · Pickup at the pass"
  },
  "cart": {
    "heading": "Shared table cart",
    "takeawayHeading": "Takeaway cart",
    "closeAria": "Close cart",
    "openCart": "Open cart",
    "itemsCount_one": "1 item",
    "itemsCount_other": "{{count}} items",
    "addedBy": "Added by {{name}}",
    "addedByYou": "Added by you",
    "editItem": "Edit",
    "removeItemAria": "Remove {{dish}}",
    "itemRemovedToast": "Removed {{dish}}",
    "undoRemove": "Undo",
    "itemAddedToast": "Added {{dish}}",
    "upsellHeading": "Pairs well with your order",
    "subtotalLabel": "Subtotal",
    "serviceChargeLabel": "Service (12%)",
    "vatLabel": "VAT (14%)",
    "totalLabel": "Total",
    "proceedToCheckout": "Review & split",
    "clearCartAction": "Clear my items",
    "soldOutConflict": "Unavailable now. Remove to continue."
  },
  "checkout": {
    "heading": "Check & split",
    "backToCart": "Back to cart",
    "splitModeLabel": "Split method",
    "splitFullTitle": "Full table",
    "splitFullDesc": "Cover every item in the shared cart.",
    "splitMineTitle": "My items",
    "splitMineDesc": "Pay only for dishes tagged with your name.",
    "splitEqualTitle": "Split equally",
    "splitEqualDesc": "Divide the total cleanly across diners.",
    "splitPeopleLabel": "Split across",
    "splitWayCount": "{{count}}-way split",
    "yourShareLabel": "Your share",
    "perPersonLabel": "Per person",
    "remainderNote": "Includes {{amount}} EGP rounding adjustment",
    "paymentMethodLabel": "Payment method",
    "methodDemoCardTitle": "Pay by card",
    "methodDemoCardDesc": "Sends straight to the Kitchen Pass.",
    "methodCounterTitle": "Pay at counter",
    "methodCounterDesc": "Get a pickup code and settle on arrival.",
    "orderSummaryHeading": "Order summary",
    "placeOrderAction": "Send order · {{amount}} EGP",
    "submittingAction": "Sending order…",
    "orderSentToast": "Order {{orderCode}} sent to the pass"
  },
  "track": {
    "heading": "Order {{orderCode}}",
    "tableBadge": "Table {{number}}",
    "takeawayBadge": "Takeaway",
    "etaLabel": "Estimated ready",
    "etaMinutes": "~{{minutes}} min",
    "statusNew": "Received",
    "statusNewDetail": "Your ticket is queued on the 250° pass.",
    "statusPreparing": "On the grill",
    "statusPreparingDetail": "Chefs are firing and plating your dishes.",
    "statusReady": "Ready at the pass",
    "statusReadyDetail": "Hot off the pass, heading to your table.",
    "statusReadyTakeawayDetail": "Hot and packed. Collect at the pass with code {{orderCode}}.",
    "statusCompleted": "Served",
    "statusCompletedDetail": "Enjoy your meal at 250° Kitchen.",
    "itemsHeading": "Dishes on this ticket",
    "orderMoreAction": "Order more",
    "backToMenuAction": "Back to menu",
    "counterCodeLabel": "Counter code"
  },
  "kds": {
    "heading": "250° Kitchen Pass",
    "ticketsCount_one": "1 active ticket",
    "ticketsCount_other": "{{count}} active tickets",
    "columnNew": "New",
    "columnPreparing": "On the grill",
    "columnReady": "Ready",
    "filterAll": "All tickets",
    "filterDineIn": "Dine-in",
    "filterTakeaway": "Takeaway",
    "elapsedTime": "{{minutes}}m {{seconds}}s",
    "lateBadge": "Overdue",
    "dineInLabel": "Table {{number}}",
    "takeawayLabel": "Takeaway {{orderCode}}",
    "startPrepAction": "Start prep",
    "markReadyAction": "Mark ready",
    "bumpCompleteAction": "Bump served",
    "recallAction": "Move back",
    "strikeItemAria": "Toggle {{dish}} plated",
    "notePrefix": "Note",
    "stockControlButton": "86 Stock",
    "stockDrawerHeading": "Live dish availability",
    "stockAvailable": "In stock",
    "stockSoldOut": "86 · Sold out",
    "stockUpdatedToast": "{{dish}} marked {{status}}",
    "soundToggleLabel": "New ticket chime",
    "backToStorefront": "Storefront"
  },
  "footer": {
    "tagline": "Modern Cairo kitchen. Seared at 250°C.",
    "hoursHeading": "Hours",
    "hoursValue": "Daily, 12:00 – 01:00",
    "locationHeading": "Location",
    "locationValue": "Road 9, Maadi, Cairo",
    "navigateHeading": "Explore",
    "operationsHeading": "Operations",
    "backToTop": "Back to top",
    "themeToggleLabel": "Theme",
    "themeLight": "Daylight",
    "themeDark": "Dark",
    "daylightOnlyTitle": "Open kitchen. Daylight only.",
    "daylightOnlyToast": "No dark kitchens at 250°. Dark mode lives strictly on the Kitchen Pass.",
    "daylightOnlyAction": "Open Kitchen Pass",
    "copyright": "© 2026 250° Kitchen"
  },
  "errors": {
    "networkUnavailable": "Connection lost. Check your internet and try again.",
    "retryAction": "Try again",
    "invalidPin": "That PIN does not match Table {{number}}. Check your table card and re-enter the 4 digits.",
    "pinFormat": "Enter a 4-digit PIN.",
    "nicknameRequired": "Enter your name so the table knows which dishes are yours.",
    "nicknameLength": "Use between 2 and 24 characters.",
    "tableNotFound": "Table {{number}} was not found. Pick a table between 1 and 12.",
    "dishSoldOut": "{{dish}} just sold out. Remove it from the cart to place your order.",
    "modifierRequired": "Choose an option for {{group}} before adding to cart.",
    "modifierLimit": "Pick up to {{max}} options in {{group}}.",
    "orderNotFound": "Order {{orderCode}} could not be found. Check the link or return to the menu.",
    "checkoutFailed": "Unable to send your order to the pass. Check your connection and try again.",
    "emptyMyItems": "You have no items tagged with your name yet. Add a dish or switch split mode.",
    "notFoundHeading": "Page not found",
    "notFoundBody": "This page does not exist on 250° Kitchen.",
    "notFoundAction": "Go home"
  },
  "empty": {
    "cartHeading": "Your cart is empty",
    "cartBody": "Pick a few dishes from the menu to start your table order.",
    "cartAction": "Browse menu",
    "searchHeading": "No dishes match “{{query}}”",
    "searchBody": "Try another ingredient or clear your active filters.",
    "searchAction": "Clear filters",
    "categoryHeading": "No dishes in this filter",
    "categoryBody": "Switch back to all dishes to see the full menu.",
    "categoryAction": "Show all dishes",
    "kdsAllClearHeading": "Pass is clear",
    "kdsAllClearBody": "New dine-in and takeaway tickets appear here the moment guests order.",
    "kdsColumnEmpty": "No tickets here",
    "tableNoDiners": "You are the first one at Table {{number}}. Share the PIN to invite your table."
  }
}
```

---

## 2. `src/i18n/locales/ar.json`

```json
{
  "nav": {
    "brand": "مطبخ <bdi dir=\"ltr\">250°</bdi>",
    "brandMark": "<bdi dir=\"ltr\">250°</bdi>",
    "menu": "المنيو",
    "howItWorks": "إزاي تطلب",
    "kitchenPass": "شاشة المطبخ",
    "trackOrder": "تابع طلبك",
    "joinTable": "ادخل ترابيزة",
    "activeTable": "ترابيزة {{number}}",
    "orderNow": "اطلب دلوقتي",
    "switchLanguage": "EN",
    "languageAriaLabel": "تغيير اللغة للإنجليزية",
    "openMenuAria": "افتح القائمة",
    "closeMenuAria": "اقفل القائمة",
    "skipToContent": "انتقل للمحتوى"
  },
  "hero": {
    "headline": "مشوي على <bdi dir=\"ltr\">250°</bdi>. وطلب واحد لترابيزتكم.",
    "supporting": "سماش برجر، بيتزا فرن حجري، ومشويات على الفحم. اطلبوا سوا واقسموا الحساب من موبايلكم.",
    "primaryCta": "ادخل على ترابيزتك",
    "secondaryCta": "شوف المنيو",
    "prepEstimate": "التجهيز ~{{minutes}} دقيقة",
    "signatureHeading": "على الجريل النهارده",
    "viewFullMenu": "شوف المنيو كامل",
    "stepsHeading": "ترابيزة واحدة. الكل بيطلب سوا.",
    "step1Title": "ادخل بكود الترابيزة",
    "step1Body": "امسح الـ QR أو اختار ترابيزة من 1 لـ 12. من غير تحميل أبلكيشن ولا حساب.",
    "step2Title": "سلة واحدة لكل الترابيزة",
    "step2Body": "كل واحد يضيف أطباقه من موبايله، وتقسموا الحساب بالتساوي أو كل واحد على طلبه.",
    "step3Title": "تابع طلبك من المطبخ",
    "step3Body": "الأوردر بيوصل لشاشة المطبخ في ساعتها، والحالة بتتحدث عندك خطوة بخطوة.",
    "kitchenBandHeading": "شاشة مطبخ <bdi dir=\"ltr\">250°</bdi>",
    "kitchenBandBody": "كل سماش برجر على الجريل، بيتزا في الفرن الحجري، ومشويات على الفحم شغالة لحظة بلحظة على شاشة المطبخ.",
    "openKdsCta": "افتح شاشة المطبخ"
  },
  "menu": {
    "heading": "المنيو",
    "searchLabel": "دوّر في المنيو",
    "searchPlaceholder": "سماش برجر، بيتزا، كفتة، كركديه…",
    "clearSearchAria": "امسح البحث",
    "allCategories": "الكل",
    "categoryBurgers": "برجر",
    "categoryPizza": "بيتزا فرن حجري",
    "categoryGrill": "مشويات وبولز",
    "categorySidesBoxes": "بطاطس وشيرينج",
    "categoryDrinksPies": "مشروبات وحلو",
    "filterAll": "كل الأصناف",
    "filterBestSeller": "الأكثر طلبًا",
    "filterSpicy": "سبايسي",
    "filterKeto": "كيتو",
    "filterVegetarian": "نباتي",
    "filterHighProtein": "بروتين عالي",
    "filterSharing": "شيرينج",
    "badgeBestSeller": "الأكثر طلبًا",
    "badgeSpicy": "سبايسي",
    "badgeKeto": "كيتو",
    "badgeVegetarian": "نباتي",
    "badgeHighProtein": "بروتين عالي",
    "badgeGlutenFree": "من غير جلوتين",
    "badgeSharing": "يكفي 4",
    "badgeSoldOut": "خلصان دلوقتي",
    "quickAdd": "أضف",
    "customize": "اختار",
    "soldOutAction": "غير متاح",
    "kcalUnit": "{{kcal}} سعرة",
    "currencyCode": "ج.م",
    "priceFormat": "{{amount}} ج.م",
    "resultsCount_one": "صنف واحد",
    "resultsCount_other": "{{count}} أصناف"
  },
  "customizer": {
    "closeAria": "اقفل تفاصيل الصنف",
    "requiredBadge": "مطلوب",
    "optionalBadge": "اختياري",
    "chooseOne": "اختار 1",
    "chooseUpTo": "لحد {{max}}",
    "included": "ضمن السعر",
    "priceDelta": "+{{amount}} ج.م",
    "kitchenNoteLabel": "ملاحظة للمطبخ",
    "kitchenNotePlaceholder": "من غير بصل، مخلل زيادة، الصوص على جنب",
    "kitchenNoteCounter": "{{current}}/{{max}}",
    "quantityLabel": "الكمية",
    "decreaseQuantityAria": "قلّل الكمية",
    "increaseQuantityAria": "زوّد الكمية",
    "addToCart": "أضف · {{amount}} ج.م",
    "updateItem": "حدّث · {{amount}} ج.م",
    "soldOutNotice": "الصنف ده خلصان من المطبخ دلوقتي.",
    "missingRequired": "اختار المطلوب في {{group}} الأول.",
    "portionMeta": "{{portion}} · {{kcal}} سعرة"
  },
  "table": {
    "joinHeading": "ادخل على ترابيزتك",
    "modeDineIn": "صالة",
    "modeTakeaway": "تيك أواي",
    "selectTableLabel": "رقم الترابيزة",
    "tableOption": "ترابيزة {{number}}",
    "tableCapacity": "لحد {{capacity}} أفراد",
    "statusAvailable": "متاحة",
    "statusOccupied": "شغالة",
    "pinLabel": "كود الترابيزة (4 أرقام)",
    "pinPlaceholder": "4821",
    "pinHint": "موجود على كارت الترابيزة أو خده من أي حد معاك.",
    "nicknameLabel": "اسمك",
    "nicknamePlaceholder": "عمر",
    "joinAction": "ادخل الترابيزة",
    "startTakeawayAction": "اطلب تيك أواي",
    "leaveTableAction": "اخرج من الترابيزة",
    "switchTableAction": "غيّر الترابيزة",
    "sharePinLabel": "كود الترابيزة",
    "copyPinAction": "انسخ الكود",
    "pinCopied": "اتنسخ الكود",
    "dinersCount_one": "فرد واحد",
    "dinersCount_other": "{{count}} على الترابيزة",
    "youTag": "أنت",
    "hostTag": "المنظّم",
    "joinedToast": "دخلت ترابيزة {{number}}",
    "leftToast": "خرجت من ترابيزة {{number}}",
    "takeawayBanner": "طلب تيك أواي · الاستلام من الكاونتر"
  },
  "cart": {
    "heading": "سلة الترابيزة المشتركة",
    "takeawayHeading": "سلة التيك أواي",
    "closeAria": "اقفل السلة",
    "openCart": "افتح السلة",
    "itemsCount_one": "صنف واحد",
    "itemsCount_other": "{{count}} أصناف",
    "addedBy": "من {{name}}",
    "addedByYou": "منك أنت",
    "editItem": "تعديل",
    "removeItemAria": "امسح {{dish}}",
    "itemRemovedToast": "اتشال {{dish}}",
    "undoRemove": "تراجع",
    "itemAddedToast": "اتضاف {{dish}}",
    "upsellHeading": "يكمّل معاك الأكلة",
    "subtotalLabel": "المجموع",
    "serviceChargeLabel": "الخدمة (12%)",
    "vatLabel": "الضريبة (14%)",
    "totalLabel": "الإجمالي",
    "proceedToCheckout": "راجع وقسّم الحساب",
    "clearCartAction": "امسح أصنافي",
    "soldOutConflict": "خلصان دلوقتي. شيله عشان تكمل."
  },
  "checkout": {
    "heading": "الحساب والتقسيم",
    "backToCart": "ارجع للسلة",
    "splitModeLabel": "طريقة التقسيم",
    "splitFullTitle": "الحساب كله",
    "splitFullDesc": "ادفع لكل الأصناف اللي في سلة الترابيزة.",
    "splitMineTitle": "طلباتي بس",
    "splitMineDesc": "ادفع للأصناف اللي عليها اسمك بس.",
    "splitEqualTitle": "تقسيم بالتساوي",
    "splitEqualDesc": "اقسم الإجمالي بالتساوي على عدد الأفراد.",
    "splitPeopleLabel": "التقسيم على",
    "splitWayCount": "تقسيم على {{count}}",
    "yourShareLabel": "حسابك",
    "perPersonLabel": "لكل فرد",
    "remainderNote": "شامل فرق تقريب {{amount}} ج.م",
    "paymentMethodLabel": "طريقة الدفع",
    "methodDemoCardTitle": "دفع بالكارت",
    "methodDemoCardDesc": "بيبعت الأوردر لشاشة المطبخ فورًا.",
    "methodCounterTitle": "ادفع عند الكاشير",
    "methodCounterDesc": "خد كود الاستلام وحاسب عند الكاشير.",
    "orderSummaryHeading": "ملخص الأوردر",
    "placeOrderAction": "ابعت للمطبخ · {{amount}} ج.م",
    "submittingAction": "بنبعت للمطبخ…",
    "orderSentToast": "الأوردر {{orderCode}} وصل المطبخ"
  },
  "track": {
    "heading": "أوردر {{orderCode}}",
    "tableBadge": "ترابيزة {{number}}",
    "takeawayBadge": "تيك أواي",
    "etaLabel": "الوقت المتوقع",
    "etaMinutes": "~{{minutes}} دقيقة",
    "statusNew": "اتستلم",
    "statusNewDetail": "أوردرك وصل شاشة مطبخ <bdi dir=\"ltr\">250°</bdi>.",
    "statusPreparing": "على الجريل",
    "statusPreparingDetail": "الشيفات شغالين على تجهيز طلبك دلوقتي.",
    "statusReady": "جاهز للتقديم",
    "statusReadyDetail": "طالع سخن حالًا وفي طريقه لترابيزتك.",
    "statusReadyTakeawayDetail": "سخن ومتغلف. استلمه من الكاونتر بكود {{orderCode}}.",
    "statusCompleted": "تم التقديم",
    "statusCompletedDetail": "بالهنا والشفا في مطبخ <bdi dir=\"ltr\">250°</bdi>.",
    "itemsHeading": "أصناف الأوردر",
    "orderMoreAction": "اطلب تاني",
    "backToMenuAction": "ارجع للمنيو",
    "counterCodeLabel": "كود الاستلام"
  },
  "kds": {
    "heading": "شاشة مطبخ <bdi dir=\"ltr\">250°</bdi>",
    "ticketsCount_one": "أوردر واحد شغال",
    "ticketsCount_other": "{{count}} أوردرات شغالة",
    "columnNew": "جديد",
    "columnPreparing": "على الجريل",
    "columnReady": "جاهز",
    "filterAll": "كل الأوردرات",
    "filterDineIn": "صالة",
    "filterTakeaway": "تيك أواي",
    "elapsedTime": "{{minutes}}د {{seconds}}ث",
    "lateBadge": "متأخر",
    "dineInLabel": "ترابيزة {{number}}",
    "takeawayLabel": "تيك أواي {{orderCode}}",
    "startPrepAction": "ابدأ التجهيز",
    "markReadyAction": "جاهز للتقديم",
    "bumpCompleteAction": "تم التسليم",
    "recallAction": "رجّعه خطوة",
    "strikeItemAria": "تأكيد تجهيز {{dish}}",
    "notePrefix": "ملاحظة",
    "stockControlButton": "إدارة المتاح",
    "stockDrawerHeading": "المتاح في المطبخ دلوقتي",
    "stockAvailable": "متاح",
    "stockSoldOut": "86 · خلصان",
    "stockUpdatedToast": "حالة {{dish}} بقت {{status}}",
    "soundToggleLabel": "تنبيه الأوردر الجديد",
    "backToStorefront": "الواجهة"
  },
  "footer": {
    "tagline": "مطبخ مفتوح في القاهرة. شوي على <bdi dir=\"ltr\">250°C</bdi>.",
    "hoursHeading": "مواعيد العمل",
    "hoursValue": "يوميًا، 12:00 – 01:00",
    "locationHeading": "العنوان",
    "locationValue": "شارع 9، المعادي، القاهرة",
    "navigateHeading": "تصفح",
    "operationsHeading": "التشغيل",
    "backToTop": "اطلع فوق",
    "themeToggleLabel": "الإضاءة",
    "themeLight": "نهاري",
    "themeDark": "داكن",
    "daylightOnlyTitle": "مطبخ مفتوح. إضاءة نهارية بس.",
    "daylightOnlyToast": "في مطبخ <bdi dir=\"ltr\">250°</bdi> مفيش مطابخ ضلمة. الدارك مود حصري لشاشة المطبخ بس.",
    "daylightOnlyAction": "افتح شاشة المطبخ",
    "copyright": "© 2026 مطبخ <bdi dir=\"ltr\">250°</bdi>"
  },
  "errors": {
    "networkUnavailable": "الاتصال اتقطع. اتأكد من الإنترنت وجرب تاني.",
    "retryAction": "جرب تاني",
    "invalidPin": "الكود مش صح لترابيزة {{number}}. راجع الكارت اللي على الترابيزة واكتب الـ 4 أرقام تاني.",
    "pinFormat": "اكتب كود من 4 أرقام.",
    "nicknameRequired": "اكتب اسمك عشان الترابيزة تعرف طلباتك.",
    "nicknameLength": "استخدم اسم بين 2 و24 حرف.",
    "tableNotFound": "ترابيزة {{number}} مش موجودة. اختار ترابيزة من 1 لـ 12.",
    "dishSoldOut": "{{dish}} لسه خلصان دلوقتي. شيله من السلة عشان تكمّل الأوردر.",
    "modifierRequired": "اختار المطلوب في {{group}} قبل الإضافة للسلة.",
    "modifierLimit": "تقدر تختار لحد {{max}} بس في {{group}}.",
    "orderNotFound": "الأوردر {{orderCode}} مش موجود. راجع الرابط أو ارجع للمنيو.",
    "checkoutFailed": "ما قدرناش نبعت الأوردر للمطبخ. اتأكد من النت وجرب تاني.",
    "emptyMyItems": "مفيش أصناف متسجلة باسمك لسه. أضف صنف أو غيّر طريقة التقسيم.",
    "notFoundHeading": "الصفحة مش موجودة",
    "notFoundBody": "الصفحة دي مش موجودة على مطبخ <bdi dir=\"ltr\">250°</bdi>.",
    "notFoundAction": "ارجع للرئيسية"
  },
  "empty": {
    "cartHeading": "السلة لسه فاضية",
    "cartBody": "اختار أصنافك من المنيو عشان تبدأ طلب الترابيزة.",
    "cartAction": "شوف المنيو",
    "searchHeading": "مفيش أصناف باسم \"{{query}}\"",
    "searchBody": "جرب كلمة تانية أو امسح الفلاتر اللي شغالة.",
    "searchAction": "امسح الفلاتر",
    "categoryHeading": "مفيش أصناف في الفلتر ده",
    "categoryBody": "ارجع لكل الأصناف عشان تشوف المنيو كامل.",
    "categoryAction": "اعرض كل الأصناف",
    "kdsAllClearHeading": "الشاشة فاضية وجاهزة",
    "kdsAllClearBody": "أي أوردر جديد من الصالة أو التيك أواي هينزل هنا في ساعتها.",
    "kdsColumnEmpty": "مفيش أوردرات هنا",
    "tableNoDiners": "أنت أول حد على ترابيزة {{number}}. شارك الكود عشان أصحابك يدخلوا معاك."
  }
}
```

---

## 3. `convex/seedData.ts`

```ts
// 250° Kitchen — Type-Safe Day-1 Convex Seed Dataset (Synced 100% with Prep Pack 07)
// Currency unit: Egyptian Piasters (100 piasters = 1.00 EGP). Zero floating-point math.
// Image assets: public/images/menu/<imageSlug>.webp (4:3, 960x720, sunlit ceramic aesthetic).

export type CategorySlug =
  | "smash-burgers"
  | "stone-deck-pizza"
  | "charcoal-grill-bowls"
  | "sides-sharing"
  | "drinks-hot-pies";

export type DietaryTag =
  | "signature"
  | "spicy"
  | "keto"
  | "high-protein"
  | "vegetarian"
  | "gluten-free"
  | "sharing";

export type ModifierSelectionType = "single" | "multi";

export type TableStatus = "available" | "occupied";

export type OrderType = "dine-in" | "takeaway";

export type KdsTicketStatus = "new" | "preparing" | "ready" | "completed";

export type SplitMode = "full" | "by-item" | "equal";

export type PaymentMethod = "demo-card" | "counter";

export interface BilingualText {
  readonly en: string;
  readonly ar: string;
}

export interface SeedCategory {
  readonly slug: CategorySlug;
  readonly name: BilingualText;
  readonly shortTab: BilingualText;
  readonly sortOrder: number;
}

export interface SeedModifierOption {
  readonly id: string;
  readonly name: BilingualText;
  readonly priceDeltaPiaster: number;
  readonly isDefault?: boolean;
}

export interface SeedModifierGroup {
  readonly id: string;
  readonly name: BilingualText;
  readonly selectionType: ModifierSelectionType;
  readonly required: boolean;
  readonly minSelect: number;
  readonly maxSelect: number;
  readonly options: ReadonlyArray<SeedModifierOption>;
}

export interface SeedDish {
  readonly slug: string;
  readonly categorySlug: CategorySlug;
  readonly name: BilingualText;
  readonly description: BilingualText;
  readonly pricePiaster: number;
  readonly kcal: number;
  readonly portion: BilingualText;
  readonly prepMinutes: number;
  readonly imageSlug: string;
  readonly dietaryTags: ReadonlyArray<DietaryTag>;
  readonly isBestSeller: boolean;
  readonly isUpsellable: boolean;
  readonly isAvailable: boolean;
  readonly sortOrder: number;
  readonly modifierGroups: ReadonlyArray<SeedModifierGroup>;
}

export interface SeedTable {
  readonly tableNumber: number;
  readonly capacity: number;
  readonly zone: BilingualText;
  readonly defaultPin: string;
  readonly status: TableStatus;
}

export interface SeedTicketModifier {
  readonly groupId: string;
  readonly optionId: string;
  readonly optionName: BilingualText;
  readonly priceDeltaPiaster: number;
}

export interface SeedKdsTicketItem {
  readonly dishSlug: string;
  readonly dishName: BilingualText;
  readonly dinerName: string;
  readonly quantity: number;
  readonly unitPricePiaster: number;
  readonly selectedModifiers: ReadonlyArray<SeedTicketModifier>;
  readonly lineTotalPiaster: number;
  readonly kitchenNote?: string;
  readonly isStruck: boolean;
}

export interface SeedKdsTicket {
  readonly orderCode: string;
  readonly orderType: OrderType;
  readonly tableNumber: number | null;
  readonly tablePin: string | null;
  readonly status: KdsTicketStatus;
  readonly diners: ReadonlyArray<string>;
  readonly items: ReadonlyArray<SeedKdsTicketItem>;
  readonly subtotalPiaster: number;
  readonly serviceChargePiaster: number;
  readonly vatPiaster: number;
  readonly totalPiaster: number;
  readonly splitMode: SplitMode;
  readonly paymentMethod: PaymentMethod;
  /** Offset from Date.now() when seeding so KDS timers feel alive immediately. */
  readonly createdMinutesAgo: number;
}

// ---------------------------------------------------------------------------
// 1. Nineteen Flat Modifier Groups (Exact 1:1 Match with Prep Pack 07)
// ---------------------------------------------------------------------------

const BURGER_PATTY_SIZE_GROUP: SeedModifierGroup = {
  id: "burger-patty-size",
  name: { en: "Patty Weight", ar: "وزن اللحمة" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "double-200g",
      name: { en: "Double (200g)", ar: "دبل (200 جم)" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "triple-300g",
      name: { en: "Triple (300g)", ar: "تريبل (300 جم)" },
      priceDeltaPiaster: 7500,
    },
  ],
};

const BURGER_BUN_STYLE_GROUP: SeedModifierGroup = {
  id: "burger-bun-style",
  name: { en: "Bun Style", ar: "نوع العيش" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "martins-potato",
      name: { en: "Martin's Potato Roll", ar: "عيش مارتنز بطاطس" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "lettuce-wrap",
      name: { en: "Iceberg Lettuce Wrap (Keto)", ar: "ملفوف في خس آيسبرج (كيتو)" },
      priceDeltaPiaster: 0,
    },
  ],
};

const BURGER_ADD_ONS_GROUP: SeedModifierGroup = {
  id: "burger-add-ons",
  name: { en: "Add Extras", ar: "إضافات" },
  selectionType: "multi",
  required: false,
  minSelect: 0,
  maxSelect: 4,
  options: [
    {
      id: "extra-cheddar",
      name: { en: "Extra American Cheddar", ar: "شيدر زيادة" },
      priceDeltaPiaster: 2500,
    },
    {
      id: "beef-bacon",
      name: { en: "Smoky Beef Bacon", ar: "بيف بيكون مدخن" },
      priceDeltaPiaster: 4500,
    },
    {
      id: "sauteed-mushroom",
      name: { en: "Roasted Portobello Mushroom", ar: "مشروم مشوي" },
      priceDeltaPiaster: 3000,
    },
    {
      id: "fried-egg",
      name: { en: "Sunny-Side Fried Egg", ar: "بيض مقلي" },
      priceDeltaPiaster: 2500,
    },
    {
      id: "pickled-jalapenos",
      name: { en: "Charred Jalapeños", ar: "هالبينو مشوي" },
      priceDeltaPiaster: 1500,
    },
    {
      id: "truffle-aioli-side",
      name: { en: "Truffle Aioli Dip", ar: "صوص ترافل أيولي" },
      priceDeltaPiaster: 3000,
    },
  ],
};

const BURGER_REMOVALS_GROUP: SeedModifierGroup = {
  id: "burger-removals",
  name: { en: "Remove Ingredients", ar: "من غير" },
  selectionType: "multi",
  required: false,
  minSelect: 0,
  maxSelect: 4,
  options: [
    {
      id: "no-onions",
      name: { en: "No Onions", ar: "من غير بصل" },
      priceDeltaPiaster: 0,
    },
    {
      id: "no-pickles",
      name: { en: "No Pickles", ar: "من غير مخلل" },
      priceDeltaPiaster: 0,
    },
    {
      id: "no-sauce",
      name: { en: "Sauce on the Side", ar: "الصوص على جنب" },
      priceDeltaPiaster: 0,
    },
    {
      id: "no-jalapenos",
      name: { en: "No Jalapeños", ar: "من غير هالبينو" },
      priceDeltaPiaster: 0,
    },
  ],
};

const SPICE_LEVEL_GROUP: SeedModifierGroup = {
  id: "spice-level",
  name: { en: "Heat Level", ar: "درجة الشطة" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "mild",
      name: { en: "Mild", ar: "خفيف" },
      priceDeltaPiaster: 0,
    },
    {
      id: "medium",
      name: { en: "Medium", ar: "متوسط" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "hot",
      name: { en: "Extra Hot", ar: "حراق زيادة" },
      priceDeltaPiaster: 0,
    },
  ],
};

const PIZZA_CRUST_GROUP: SeedModifierGroup = {
  id: "pizza-crust",
  name: { en: "Crust Style", ar: "نوع العجينة" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "stone-deck-classic",
      name: { en: "48h Stone-Deck Classic", ar: "عجينة فرن حجري كلاسيك" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "thin-crispy",
      name: { en: "Roman Thin & Crispy", ar: "رفيعة ومقرمشة" },
      priceDeltaPiaster: 0,
    },
    {
      id: "stuffed-edge",
      name: { en: "Mozzarella Stuffed Crust", ar: "أطراف محشية موتزاريلا" },
      priceDeltaPiaster: 4500,
    },
  ],
};

const PIZZA_EXTRAS_GROUP: SeedModifierGroup = {
  id: "pizza-extras",
  name: { en: "Extra Toppings", ar: "إضافات البيتزا" },
  selectionType: "multi",
  required: false,
  minSelect: 0,
  maxSelect: 4,
  options: [
    {
      id: "extra-buffalo-mozz",
      name: { en: "Extra Buffalo Mozzarella", ar: "موتزاريلا بافلو زيادة" },
      priceDeltaPiaster: 5500,
    },
    {
      id: "extra-pepperoni",
      name: { en: "Extra Beef Pepperoni", ar: "بيبروني بيف زيادة" },
      priceDeltaPiaster: 5000,
    },
    {
      id: "hot-honey-drizzle",
      name: { en: "Wildflower Hot Honey Drizzle", ar: "رشة عسل حراق" },
      priceDeltaPiaster: 2500,
    },
    {
      id: "roasted-mushrooms",
      name: { en: "Roasted Mushrooms", ar: "مشروم مشوي" },
      priceDeltaPiaster: 3000,
    },
    {
      id: "fresh-arugula",
      name: { en: "Fresh Wild Arugula", ar: "جرجير فريش" },
      priceDeltaPiaster: 2000,
    },
  ],
};

const GRILL_SIDE_CHOICE_GROUP: SeedModifierGroup = {
  id: "grill-side-choice",
  name: { en: "Choose Side", ar: "اختار الطبق الجانبي" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "warm-pita-fries",
      name: { en: "Warm Baladi Pita & Fries", ar: "عيش بلدي وبطاطس" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "spiced-basmati",
      name: { en: "Spiced Basmati Rice", ar: "رز بسمتي مبهر" },
      priceDeltaPiaster: 0,
    },
    {
      id: "grilled-veg-keto",
      name: { en: "Charred Vegetables (Low-Carb)", ar: "خضار مشوي (لو كارب)" },
      priceDeltaPiaster: 1500,
    },
  ],
};

const GRILL_EXTRAS_GROUP: SeedModifierGroup = {
  id: "grill-extras",
  name: { en: "Grill Add-Ons", ar: "إضافات الشواية" },
  selectionType: "multi",
  required: false,
  minSelect: 0,
  maxSelect: 3,
  options: [
    {
      id: "extra-kofta-skewer",
      name: { en: "Extra Kofta Skewer (90g)", ar: "سيخ كفتة زيادة" },
      priceDeltaPiaster: 8500,
    },
    {
      id: "extra-tawook-skewer",
      name: { en: "Extra Tawook Skewer (125g)", ar: "سيخ شيش طاووق زيادة" },
      priceDeltaPiaster: 8000,
    },
    {
      id: "warm-baladi-pita",
      name: { en: "Extra Warm Baladi Pita", ar: "عيش بلدي زيادة" },
      priceDeltaPiaster: 1500,
    },
  ],
};

const BOWL_BASE_GROUP: SeedModifierGroup = {
  id: "bowl-base",
  name: { en: "Bowl Base", ar: "أساس البول" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "basmati-quinoa",
      name: { en: "Basmati & Quinoa Blend", ar: "رز بسمتي وكينوا" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "full-quinoa",
      name: { en: "100% Tri-Color Quinoa", ar: "كينوا بس" },
      priceDeltaPiaster: 2500,
    },
    {
      id: "greens-only",
      name: { en: "Mixed Greens Base (Keto)", ar: "خضار وجرجير بس (كيتو)" },
      priceDeltaPiaster: 0,
    },
  ],
};

const BOWL_EXTRAS_GROUP: SeedModifierGroup = {
  id: "bowl-extras",
  name: { en: "Bowl Add-Ons", ar: "إضافات البول" },
  selectionType: "multi",
  required: false,
  minSelect: 0,
  maxSelect: 3,
  options: [
    {
      id: "double-chicken",
      name: { en: "Extra 110g Grilled Chicken", ar: "فراخ مشوية زيادة" },
      priceDeltaPiaster: 6500,
    },
    {
      id: "extra-avocado",
      name: { en: "Extra Half Avocado", ar: "أفوكادو زيادة" },
      priceDeltaPiaster: 4500,
    },
    {
      id: "soft-boiled-egg",
      name: { en: "Soft-Boiled Egg", ar: "بيضة مسلوقة" },
      priceDeltaPiaster: 2000,
    },
  ],
};

const FRIES_SIZE_GROUP: SeedModifierGroup = {
  id: "fries-size",
  name: { en: "Portion Size", ar: "الحجم" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "regular",
      name: { en: "Regular", ar: "عادي" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "large-share",
      name: { en: "Large (Shareable)", ar: "كبير (للشيرينج)" },
      priceDeltaPiaster: 4500,
    },
  ],
};

const DIP_PAIRING_GROUP: SeedModifierGroup = {
  id: "dip-pairing",
  name: { en: "House Dips", ar: "صوصات بيتي" },
  selectionType: "multi",
  required: false,
  minSelect: 0,
  maxSelect: 3,
  options: [
    {
      id: "dip-250",
      name: { en: "250° House Sauce", ar: "صوص 250°" },
      priceDeltaPiaster: 2000,
    },
    {
      id: "dip-ranch",
      name: { en: "Buttermilk Ranch", ar: "صوص رانش" },
      priceDeltaPiaster: 2000,
    },
    {
      id: "dip-truffle",
      name: { en: "Black Truffle Aioli", ar: "ترافل أيولي" },
      priceDeltaPiaster: 3000,
    },
    {
      id: "dip-toum",
      name: { en: "Whipped Garlic Toum", ar: "تومية" },
      priceDeltaPiaster: 1500,
    },
    {
      id: "dip-tahina",
      name: { en: "Roasted Sesame Tahina", ar: "طحينة" },
      priceDeltaPiaster: 1500,
    },
  ],
};

const BOX_SLIDER_MIX_GROUP: SeedModifierGroup = {
  id: "box-slider-mix",
  name: { en: "Slider Mix (4)", ar: "تشكيلة السلايدرز (4)" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "mix-2-2",
      name: { en: "2 Classic + 2 Jalapeño", ar: "2 كلاسيك + 2 هالبينو" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "all-classic",
      name: { en: "4 Classic Smash", ar: "4 كلاسيك سماش" },
      priceDeltaPiaster: 0,
    },
    {
      id: "all-jalapeno",
      name: { en: "4 Blazing Jalapeño", ar: "4 هالبينو حراق" },
      priceDeltaPiaster: 0,
    },
  ],
};

const BOX_DRINKS_BUNDLE_GROUP: SeedModifierGroup = {
  id: "box-drinks-bundle",
  name: { en: "Drink Bundle", ar: "باكيدج مشروبات" },
  selectionType: "single",
  required: false,
  minSelect: 0,
  maxSelect: 1,
  options: [
    {
      id: "bundle-v7-mix",
      name: { en: "4× Mixed V7 & V-Cola (300ml)", ar: "4 كانز مشكل V7 وV-Cola" },
      priceDeltaPiaster: 13000,
    },
  ],
};

const VCOLA_VARIANT_GROUP: SeedModifierGroup = {
  id: "vcola-variant",
  name: { en: "Choose Cola", ar: "اختار النوع" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "vcola-classic",
      name: { en: "V-Cola Classic", ar: "V-Cola عادي" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "vdiet-zero",
      name: { en: "V-Diet Zero Sugar", ar: "V-Diet زيرو سكر" },
      priceDeltaPiaster: 0,
    },
  ],
};

const DRINK_SERVE_STYLE_GROUP: SeedModifierGroup = {
  id: "drink-serve-style",
  name: { en: "Serve Style", ar: "طريقة التقديم" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "chilled-ice-glass",
      name: { en: "Glass with Ice", ar: "كوباية بتلج" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "chilled-no-ice",
      name: { en: "Chilled, No Ice", ar: "ساقع من غير تلج" },
      priceDeltaPiaster: 0,
    },
  ],
};

const PIE_FILLING_GROUP: SeedModifierGroup = {
  id: "pie-filling",
  name: { en: "Choose Filling", ar: "اختار الحشو" },
  selectionType: "single",
  required: true,
  minSelect: 1,
  maxSelect: 1,
  options: [
    {
      id: "spiced-apple",
      name: { en: "Spiced Cinnamon Apple", ar: "تفاح بالقرفة" },
      priceDeltaPiaster: 0,
      isDefault: true,
    },
    {
      id: "nutella-kunafa",
      name: { en: "Nutella & Toasted Kunafa", ar: "نوتيلا وكنافة محمصة" },
      priceDeltaPiaster: 1500,
    },
  ],
};

const PIE_EXTRAS_GROUP: SeedModifierGroup = {
  id: "pie-extras",
  name: { en: "Toppings", ar: "إضافات فوق الفطيرة" },
  selectionType: "multi",
  required: false,
  minSelect: 0,
  maxSelect: 2,
  options: [
    {
      id: "vanilla-scoop",
      name: { en: "Vanilla Bean Ice Cream Scoop", ar: "بولة آيس كريم فانيليا" },
      priceDeltaPiaster: 3500,
    },
    {
      id: "pistachio-crush",
      name: { en: "Crushed Roasted Pistachios", ar: "فستق مجروش" },
      priceDeltaPiaster: 2500,
    },
  ],
};

// ---------------------------------------------------------------------------
// 2. Five Menu Categories (Synced 100% with Prep Pack 07)
// ---------------------------------------------------------------------------

export const SEED_CATEGORIES: ReadonlyArray<SeedCategory> = [
  {
    slug: "smash-burgers",
    name: { en: "Smash Burgers", ar: "سماش برجر" },
    shortTab: { en: "Burgers", ar: "برجر" },
    sortOrder: 1,
  },
  {
    slug: "stone-deck-pizza",
    name: { en: "Stone-Deck Pizza", ar: "بيتزا فرن حجري" },
    shortTab: { en: "Pizza", ar: "بيتزا" },
    sortOrder: 2,
  },
  {
    slug: "charcoal-grill-bowls",
    name: { en: "Charcoal Grill & Bowls", ar: "مشويات على الفحم وبولز" },
    shortTab: { en: "Grill & Bowls", ar: "مشويات وبولز" },
    sortOrder: 3,
  },
  {
    slug: "sides-sharing",
    name: { en: "Fries, Dips & Sharing", ar: "بطاطس وصوصات وشيرينج" },
    shortTab: { en: "Sides & Sharing", ar: "بطاطس وشيرينج" },
    sortOrder: 4,
  },
  {
    slug: "drinks-hot-pies",
    name: { en: "Craft Drinks & Hot Pies", ar: "مشروبات وفطاير سخنة" },
    shortTab: { en: "Drinks & Pies", ar: "مشروبات وحلو" },
    sortOrder: 5,
  },
];

// ---------------------------------------------------------------------------
// 3. All Twenty Signature Dishes (100% Identical to Prep Pack 07)
// ---------------------------------------------------------------------------

export const SEED_DISHES: ReadonlyArray<SeedDish> = [
  // --- Smash Burgers (5) ---
  {
    slug: "double-smash-burger",
    categorySlug: "smash-burgers",
    name: { en: "Double Smash", ar: "دبل سماش" },
    description: {
      en: "Two smashed prime beef patties, melted American cheddar, house pickles, seared onions, and 250° sauce on a Martin's potato roll.",
      ar: "قطعتين بيف سماش على الجريل، شيدر أمريكي سايحة، خيار مخلل، بصل مكرمل، وصوص 250° في عيش مارتنز بطاطس.",
    },
    pricePiaster: 24500,
    kcal: 740,
    portion: { en: "200g beef (2×100g)", ar: "200 جم بيف (قطعتين)" },
    prepMinutes: 10,
    imageSlug: "double-smash-burger",
    dietaryTags: ["signature"],
    isBestSeller: true,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 1,
    modifierGroups: [
      BURGER_PATTY_SIZE_GROUP,
      BURGER_BUN_STYLE_GROUP,
      BURGER_ADD_ONS_GROUP,
      BURGER_REMOVALS_GROUP,
    ],
  },
  {
    slug: "truffle-swiss-burger",
    categorySlug: "smash-burgers",
    name: { en: "Truffle Swiss", ar: "ترافل سويس" },
    description: {
      en: "Double smashed beef, roasted portobello mushrooms, melted Swiss Emmental, caramelized onions, and black truffle aioli on a Martin's potato roll.",
      ar: "دبل بيف سماش، مشروم بورتوبيلو مشوي، جبنة إمنتال سويسرية سايحة، بصل مكرمل، وصوص ترافل أيولي في عيش مارتنز.",
    },
    pricePiaster: 28500,
    kcal: 810,
    portion: { en: "200g beef (2×100g)", ar: "200 جم بيف (قطعتين)" },
    prepMinutes: 12,
    imageSlug: "truffle-swiss-burger",
    dietaryTags: ["signature"],
    isBestSeller: true,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 2,
    modifierGroups: [
      BURGER_PATTY_SIZE_GROUP,
      BURGER_BUN_STYLE_GROUP,
      BURGER_ADD_ONS_GROUP,
      BURGER_REMOVALS_GROUP,
    ],
  },
  {
    slug: "blazing-jalapeno-burger",
    categorySlug: "smash-burgers",
    name: { en: "Blazing Jalapeño", ar: "هالبينو حراق" },
    description: {
      en: "Double smashed beef, charred pickled jalapeños, melted pepper jack, crispy shallots, and roasted chili glaze on a Martin's potato roll.",
      ar: "دبل بيف سماش، هالبينو مشوي، جبنة بيبر جاك سايحة، بصل مقرمش، وصوص فلفل مشوي في عيش مارتنز.",
    },
    pricePiaster: 26000,
    kcal: 770,
    portion: { en: "200g beef (2×100g)", ar: "200 جم بيف (قطعتين)" },
    prepMinutes: 10,
    imageSlug: "blazing-jalapeno-burger",
    dietaryTags: ["spicy"],
    isBestSeller: false,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 3,
    modifierGroups: [
      BURGER_PATTY_SIZE_GROUP,
      BURGER_BUN_STYLE_GROUP,
      SPICE_LEVEL_GROUP,
      BURGER_ADD_ONS_GROUP,
      BURGER_REMOVALS_GROUP,
    ],
  },
  {
    slug: "nashville-hot-chicken-burger",
    categorySlug: "smash-burgers",
    name: { en: "Fire-Crisp Chicken Burger", ar: "تشيكن برجر مقرمش" },
    description: {
      en: "Buttermilk-brined crispy chicken thigh, melted American cheddar, crisp slaw, dill pickles, and spiced house sauce on a Martin's potato roll.",
      ar: "ورك فراخ مقرمش متبل باللبن الرايب، شيدر أمريكي سايحة، كول سلو فريش، خيار مخلل، وصوص 250° سبايسي في عيش مارتنز.",
    },
    pricePiaster: 24000,
    kcal: 690,
    portion: { en: "180g crispy chicken thigh", ar: "180 جم ورك فراخ مقرمش" },
    prepMinutes: 11,
    imageSlug: "nashville-hot-chicken-burger",
    dietaryTags: ["spicy", "high-protein"],
    isBestSeller: false,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 4,
    modifierGroups: [
      SPICE_LEVEL_GROUP,
      BURGER_ADD_ONS_GROUP,
      BURGER_REMOVALS_GROUP,
    ],
  },
  {
    slug: "keto-lettuce-wrap-smash",
    categorySlug: "smash-burgers",
    name: { en: "Keto Lettuce-Wrap Smash", ar: "سماش كيتو ملفوف في الخس" },
    description: {
      en: "Double smashed beef, sharp cheddar, vine tomato, dill pickles, and sugar-free 250° sauce wrapped in crisp iceberg lettuce.",
      ar: "دبل بيف سماش، جبنة شيدر، طماطم فريش، خيار مخلل، وصوص 250° من غير سكر، ملفوف في خس آيسبرج مقرمش بدون عيش.",
    },
    pricePiaster: 23500,
    kcal: 510,
    portion: { en: "200g beef · 6g net carbs", ar: "200 جم بيف · 6 جم كارب" },
    prepMinutes: 10,
    imageSlug: "keto-lettuce-wrap-smash",
    dietaryTags: ["keto", "high-protein", "gluten-free"],
    isBestSeller: false,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 5,
    modifierGroups: [
      BURGER_PATTY_SIZE_GROUP,
      BURGER_ADD_ONS_GROUP,
      BURGER_REMOVALS_GROUP,
    ],
  },

  // --- Stone-Deck Pizza (3) ---
  {
    slug: "artisan-margherita-pizza",
    categorySlug: "stone-deck-pizza",
    name: { en: "Artisan Margherita", ar: "مارجريتا أصلية" },
    description: {
      en: "48-hour fermented dough, crushed San Marzano tomatoes, fresh buffalo mozzarella, sweet basil, and cold-pressed olive oil.",
      ar: "عجينة متخمرة 48 ساعة، صلصة طماطم سان مارزانو، موتزاريلا بافلو فريش، ريحان أخضر، وزيت زيتون بكر.",
    },
    pricePiaster: 22000,
    kcal: 780,
    portion: { en: "30cm (8 slices)", ar: "30 سم (8 قطع)" },
    prepMinutes: 12,
    imageSlug: "artisan-margherita-pizza",
    dietaryTags: ["vegetarian"],
    isBestSeller: false,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 6,
    modifierGroups: [PIZZA_CRUST_GROUP, PIZZA_EXTRAS_GROUP, DIP_PAIRING_GROUP],
  },
  {
    slug: "hot-honey-pepperoni-pizza",
    categorySlug: "stone-deck-pizza",
    name: { en: "Hot Honey Double Pepperoni", ar: "دبل بيبروني بالعسل الحراق" },
    description: {
      en: "Stone-baked crust, double cupped beef pepperoni, fior di latte mozzarella, crushed chili flakes, and wildflower hot honey.",
      ar: "عجينة فرن حجري مقرمشة، دبل بيبروني بيف، موتزاريلا فريش، شطة مجروشة، ورشة عسل نحل حراق.",
    },
    pricePiaster: 29500,
    kcal: 960,
    portion: { en: "30cm (8 slices)", ar: "30 سم (8 قطع)" },
    prepMinutes: 12,
    imageSlug: "hot-honey-pepperoni-pizza",
    dietaryTags: ["signature", "spicy"],
    isBestSeller: true,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 7,
    modifierGroups: [
      PIZZA_CRUST_GROUP,
      SPICE_LEVEL_GROUP,
      PIZZA_EXTRAS_GROUP,
      DIP_PAIRING_GROUP,
    ],
  },
  {
    slug: "chicken-ranch-supreme-pizza",
    categorySlug: "stone-deck-pizza",
    name: { en: "Chicken Ranch Supreme", ar: "تشيكن رانش سوبريم" },
    description: {
      en: "Stone-baked crust, flame-grilled chicken breast, smoky beef bacon, melted mozzarella, roasted sweet corn, and house buttermilk ranch.",
      ar: "عجينة فرن حجري، صدور فراخ مشوية، بيف بيكون مدخن، موتزاريلا سايحة، ذرة مشوية، وصوص رانش بيتي.",
    },
    pricePiaster: 29000,
    kcal: 930,
    portion: { en: "30cm (8 slices)", ar: "30 سم (8 قطع)" },
    prepMinutes: 14,
    imageSlug: "chicken-ranch-supreme-pizza",
    dietaryTags: ["high-protein"],
    isBestSeller: false,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 8,
    modifierGroups: [PIZZA_CRUST_GROUP, PIZZA_EXTRAS_GROUP, DIP_PAIRING_GROUP],
  },

  // --- Charcoal Grill & Bowls (3) ---
  {
    slug: "charcoal-kofta-platter",
    categorySlug: "charcoal-grill-bowls",
    name: { en: "Charcoal Kofta Platter", ar: "طبق كفتة على الفحم" },
    description: {
      en: "Three hand-minced beef and lamb kofta skewers over oak charcoal, charred tomato, sumac-parsley onion, warm baladi pita, and tahina.",
      ar: "3 أسياخ كفتة لحم وضاني مشوية على الفحم، طماطم مشوية، بصل بالسماق والبقدونس، عيش بلدي سخن، وطحينة.",
    },
    pricePiaster: 32000,
    kcal: 820,
    portion: { en: "270g (3 skewers)", ar: "270 جم (3 أسياخ)" },
    prepMinutes: 16,
    imageSlug: "charcoal-kofta-platter",
    dietaryTags: ["signature", "high-protein"],
    isBestSeller: true,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 9,
    modifierGroups: [GRILL_SIDE_CHOICE_GROUP, GRILL_EXTRAS_GROUP, DIP_PAIRING_GROUP],
  },
  {
    slug: "herb-shish-tawook",
    categorySlug: "charcoal-grill-bowls",
    name: { en: "Herb Shish Tawook", ar: "شيش طاووق بالأعشاب" },
    description: {
      en: "Yogurt, garlic, and lemon-marinated chicken thigh skewers seared over charcoal with blistered peppers, warm pita, and whipped toum.",
      ar: "أسياخ أوراك فراخ متبلة بالزبادي والتوم والليمون ومشوية على الفحم، مع فلفل ألوان مشوي، عيش سخن، وتومية.",
    },
    pricePiaster: 27500,
    kcal: 690,
    portion: { en: "250g chicken (2 skewers)", ar: "250 جم فراخ (سيخين)" },
    prepMinutes: 15,
    imageSlug: "herb-shish-tawook",
    dietaryTags: ["high-protein"],
    isBestSeller: false,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 10,
    modifierGroups: [
      GRILL_SIDE_CHOICE_GROUP,
      SPICE_LEVEL_GROUP,
      GRILL_EXTRAS_GROUP,
      DIP_PAIRING_GROUP,
    ],
  },
  {
    slug: "high-protein-chicken-bowl",
    categorySlug: "charcoal-grill-bowls",
    name: { en: "High-Protein Grilled Chicken Bowl", ar: "بول فراخ مشوية بالبروتين" },
    description: {
      en: "Charcoal-grilled chicken breast over steamed basmati and quinoa, roasted broccoli, cherry tomatoes, sliced avocado, and lemon-herb dressing.",
      ar: "صدور فراخ مشوية على الفحم مع رز بسمتي وكينوا، بروكلي مشوي، طماطم شيري، أفوكادو، ودريسينج ليمون وأعشاب.",
    },
    pricePiaster: 25500,
    kcal: 560,
    portion: { en: "220g chicken · 48g protein", ar: "220 جم فراخ · 48 جم بروتين" },
    prepMinutes: 13,
    imageSlug: "high-protein-chicken-bowl",
    dietaryTags: ["high-protein", "gluten-free"],
    isBestSeller: false,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 11,
    modifierGroups: [BOWL_BASE_GROUP, BOWL_EXTRAS_GROUP],
  },

  // --- Fries, Dips & Sharing (5) ---
  {
    slug: "loaded-smash-fries",
    categorySlug: "sides-sharing",
    name: { en: "Loaded Smash Fries", ar: "بطاطس لودد بالسماش" },
    description: {
      en: "Skin-on crisp fries topped with chopped smashed beef, warm cheddar sauce, seared onions, pickled jalapeños, and 250° sauce.",
      ar: "بطاطس مقرمشة بقشرها عليها بيف سماش مفروم، صوص شيدر سخن، بصل مكرمل، هالبينو، وصوص 250°.",
    },
    pricePiaster: 18500,
    kcal: 640,
    portion: { en: "320g", ar: "320 جم" },
    prepMinutes: 9,
    imageSlug: "loaded-smash-fries",
    dietaryTags: ["signature"],
    isBestSeller: false,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 12,
    modifierGroups: [FRIES_SIZE_GROUP, DIP_PAIRING_GROUP],
  },
  {
    slug: "truffle-parmesan-fries",
    categorySlug: "sides-sharing",
    name: { en: "Truffle Parmesan Fries", ar: "بطاطس ترافل وبارميزان" },
    description: {
      en: "Double-fried thin-cut potatoes tossed in white truffle oil, grated 24-month parmesan, cracked black pepper, and fresh chives.",
      ar: "بطاطس رفيعة مقرمشة متقلبة في زيت ترافل أبيض، جبنة بارميزان مبشورة، فلفل أسود مجروش، وبصل أخضر ناعم.",
    },
    pricePiaster: 14500,
    kcal: 490,
    portion: { en: "250g", ar: "250 جم" },
    prepMinutes: 8,
    imageSlug: "truffle-parmesan-fries",
    dietaryTags: ["vegetarian"],
    isBestSeller: false,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 13,
    modifierGroups: [FRIES_SIZE_GROUP, DIP_PAIRING_GROUP],
  },
  {
    slug: "classic-skin-on-fries",
    categorySlug: "sides-sharing",
    name: { en: "Classic Skin-On Fries", ar: "بطاطس مقرمشة بقشرها" },
    description: {
      en: "Golden double-fried skin-on potatoes dusted with flaky sea salt and sweet smoked paprika.",
      ar: "بطاطس دهبية مقرمشة بقشرها مع رشة ملح بحري وبابريكا مدخنة.",
    },
    pricePiaster: 7500,
    kcal: 380,
    portion: { en: "220g", ar: "220 جم" },
    prepMinutes: 6,
    imageSlug: "classic-skin-on-fries",
    dietaryTags: ["vegetarian", "gluten-free"],
    isBestSeller: false,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 14,
    modifierGroups: [FRIES_SIZE_GROUP, DIP_PAIRING_GROUP],
  },
  {
    slug: "house-dips-trio",
    categorySlug: "sides-sharing",
    name: { en: "House Dips Trio", ar: "تشكيلة 3 صوصات بيتي" },
    description: {
      en: "Three shareable house dips: 250° signature sauce, black truffle aioli, and whipped garlic toum.",
      ar: "3 صوصات بيتي للشيرينج: صوص 250°، ترافل أيولي، وتومية كريمي.",
    },
    pricePiaster: 5500,
    kcal: 290,
    portion: { en: "3×60ml dips", ar: "3 × 60 مل" },
    prepMinutes: 3,
    imageSlug: "house-dips-trio",
    dietaryTags: ["vegetarian", "gluten-free"],
    isBestSeller: false,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 15,
    modifierGroups: [],
  },
  {
    slug: "squad-sharing-box",
    categorySlug: "sides-sharing",
    name: { en: "250° Squad Sharing Box", ar: "شيرينج بوكس 250°" },
    description: {
      en: "Serves four: four smash sliders (two Classic, two Jalapeño), four herb tawook skewers, two large skin-on fries, and four house dips.",
      ar: "يكفي 4 أفراد: 4 سماش سلايدرز (2 كلاسيك و2 هالبينو)، 4 أسياخ شيش طاووق، 2 بطاطس كبيرة، و4 صوصات بيتي.",
    },
    pricePiaster: 89000,
    kcal: 2640,
    portion: { en: "Serves 4 (~1.4kg)", ar: "يكفي 4 أفراد (~1.4 كجم)" },
    prepMinutes: 18,
    imageSlug: "squad-sharing-box",
    dietaryTags: ["sharing"],
    isBestSeller: true,
    isUpsellable: false,
    isAvailable: true,
    sortOrder: 16,
    modifierGroups: [BOX_SLIDER_MIX_GROUP, BOX_DRINKS_BUNDLE_GROUP, DIP_PAIRING_GROUP],
  },

  // --- Craft Drinks & Hot Pies (4) ---
  {
    slug: "v7-lemon-mint",
    categorySlug: "drinks-hot-pies",
    name: { en: "V7 Lemon Mint", ar: "V7 ليمون نعناع" },
    description: {
      en: "Chilled 300ml Egyptian V7 sparkling lemon-mint soda served over clear ice with fresh mint.",
      ar: "صودا V7 المصرية ليمون بالنعناع ساقعة 300 مل مع تلج وورق نعناع فريش.",
    },
    pricePiaster: 4500,
    kcal: 115,
    portion: { en: "300ml can", ar: "كانز 300 مل" },
    prepMinutes: 2,
    imageSlug: "v7-lemon-mint",
    dietaryTags: ["vegetarian", "gluten-free"],
    isBestSeller: false,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 17,
    modifierGroups: [DRINK_SERVE_STYLE_GROUP],
  },
  {
    slug: "v-cola",
    categorySlug: "drinks-hot-pies",
    name: { en: "V-Cola / V-Diet Cola", ar: "V-Cola / V-Diet كولا" },
    description: {
      en: "Chilled 300ml Egyptian V-Cola or zero-sugar V-Diet Cola served over cracked ice with a fresh lime wedge.",
      ar: "V-Cola المصرية أو V-Diet زيرو سكر ساقعة 300 مل مع تلج وشريحة ليمون.",
    },
    pricePiaster: 4000,
    kcal: 125,
    portion: { en: "300ml can", ar: "كانز 300 مل" },
    prepMinutes: 2,
    imageSlug: "v-cola",
    dietaryTags: ["vegetarian", "gluten-free"],
    isBestSeller: false,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 18,
    modifierGroups: [VCOLA_VARIANT_GROUP, DRINK_SERVE_STYLE_GROUP],
  },
  {
    slug: "sparkling-karkadeh-mint",
    categorySlug: "drinks-hot-pies",
    name: { en: "Sparkling Iced Karkadeh Mint", ar: "كركديه فوار بالنعناع" },
    description: {
      en: "Cold-steeped Aswan hibiscus topped with sparkling water, fresh garden mint, and clear ice.",
      ar: "كركديه أسواني منقوع على البارد مع صودا فوارة، نعناع فريش، وتلج.",
    },
    pricePiaster: 6500,
    kcal: 95,
    portion: { en: "350ml glass", ar: "كوباية 350 مل" },
    prepMinutes: 3,
    imageSlug: "sparkling-karkadeh-mint",
    dietaryTags: ["vegetarian", "gluten-free"],
    isBestSeller: true,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 19,
    modifierGroups: [DRINK_SERVE_STYLE_GROUP],
  },
  {
    slug: "hot-crispy-pie",
    categorySlug: "drinks-hot-pies",
    name: {
      en: "Hot Crispy Apple / Nutella Kunafa Pie",
      ar: "فطيرة مقرمشة سخنة (تفاح أو نوتيلا كنافة)",
    },
    description: {
      en: "Blistered golden hand pie baked crisp to order. Pick spiced cinnamon apple or warm Nutella with toasted kunafa crunch.",
      ar: "فطيرة مقرمشة سخنة بتتخبز بالطلب، اختار تفاح بالقرفة أو نوتيلا سايحة مع كنافة محمصة.",
    },
    pricePiaster: 11500,
    kcal: 490,
    portion: { en: "160g (1 pie)", ar: "160 جم (فطيرة واحدة)" },
    prepMinutes: 8,
    imageSlug: "hot-crispy-pie",
    dietaryTags: ["vegetarian"],
    isBestSeller: true,
    isUpsellable: true,
    isAvailable: true,
    sortOrder: 20,
    modifierGroups: [PIE_FILLING_GROUP, PIE_EXTRAS_GROUP],
  },
];

// ---------------------------------------------------------------------------
// 4. Twelve Dining Tables (Tables 1–12, Seating Capacity 2–8)
// ---------------------------------------------------------------------------

export const SEED_TABLES: ReadonlyArray<SeedTable> = [
  {
    tableNumber: 1,
    capacity: 2,
    zone: { en: "Sunlit Window", ar: "شباك الشمس" },
    defaultPin: "1402",
    status: "available",
  },
  {
    tableNumber: 2,
    capacity: 2,
    zone: { en: "Sunlit Window", ar: "شباك الشمس" },
    defaultPin: "2819",
    status: "available",
  },
  {
    tableNumber: 3,
    capacity: 4,
    zone: { en: "Main Hearth", ar: "صالة الفرن" },
    defaultPin: "3514",
    status: "occupied",
  },
  {
    tableNumber: 4,
    capacity: 4,
    zone: { en: "Main Hearth", ar: "صالة الفرن" },
    defaultPin: "4920",
    status: "available",
  },
  {
    tableNumber: 5,
    capacity: 6,
    zone: { en: "Main Hearth", ar: "صالة الفرن" },
    defaultPin: "5821",
    status: "occupied",
  },
  {
    tableNumber: 6,
    capacity: 4,
    zone: { en: "Main Hearth", ar: "صالة الفرن" },
    defaultPin: "6104",
    status: "available",
  },
  {
    tableNumber: 7,
    capacity: 2,
    zone: { en: "Chef's Counter", ar: "بار الشيف" },
    defaultPin: "7390",
    status: "available",
  },
  {
    tableNumber: 8,
    capacity: 4,
    zone: { en: "Chef's Counter", ar: "بار الشيف" },
    defaultPin: "8427",
    status: "available",
  },
  {
    tableNumber: 9,
    capacity: 6,
    zone: { en: "Garden Patio", ar: "الجاردن" },
    defaultPin: "9153",
    status: "available",
  },
  {
    tableNumber: 10,
    capacity: 6,
    zone: { en: "Garden Patio", ar: "الجاردن" },
    defaultPin: "1064",
    status: "available",
  },
  {
    tableNumber: 11,
    capacity: 8,
    zone: { en: "Garden Patio", ar: "الجاردن" },
    defaultPin: "1182",
    status: "available",
  },
  {
    tableNumber: 12,
    capacity: 8,
    zone: { en: "Garden Patio", ar: "الجاردن" },
    defaultPin: "1295",
    status: "available",
  },
];

// ---------------------------------------------------------------------------
// 5. Three Live KDS Demo Tickets (Synced 100% with the 20 Dishes Above)
//    - Ticket 1: status "new"       | Table #5   (#T5-204) | 2 min ago
//    - Ticket 2: status "preparing" | Table #3   (#T3-203) | 9 min ago
//    - Ticket 3: status "ready"     | Takeaway   (#P-101)  | 14 min ago
// ---------------------------------------------------------------------------

export const SEED_KDS_TICKETS: ReadonlyArray<SeedKdsTicket> = [
  {
    orderCode: "#T5-204",
    orderType: "dine-in",
    tableNumber: 5,
    tablePin: "5821",
    status: "new",
    diners: ["Nour", "Karim"],
    items: [
      {
        dishSlug: "double-smash-burger",
        dishName: { en: "Double Smash", ar: "دبل سماش" },
        dinerName: "Nour",
        quantity: 1,
        unitPricePiaster: 27500,
        selectedModifiers: [
          {
            groupId: "burger-patty-size",
            optionId: "double-200g",
            optionName: { en: "Double (200g)", ar: "دبل (200 جم)" },
            priceDeltaPiaster: 0,
          },
          {
            groupId: "burger-bun-style",
            optionId: "martins-potato",
            optionName: { en: "Martin's Potato Roll", ar: "عيش مارتنز بطاطس" },
            priceDeltaPiaster: 0,
          },
          {
            groupId: "burger-add-ons",
            optionId: "truffle-aioli-side",
            optionName: { en: "Truffle Aioli Dip", ar: "صوص ترافل أيولي" },
            priceDeltaPiaster: 3000,
          },
        ],
        lineTotalPiaster: 27500,
        kitchenNote: "No onions, sauce on the side",
        isStruck: false,
      },
      {
        dishSlug: "hot-honey-pepperoni-pizza",
        dishName: { en: "Hot Honey Double Pepperoni", ar: "دبل بيبروني بالعسل الحراق" },
        dinerName: "Karim",
        quantity: 1,
        unitPricePiaster: 32000,
        selectedModifiers: [
          {
            groupId: "pizza-crust",
            optionId: "stone-deck-classic",
            optionName: { en: "48h Stone-Deck Classic", ar: "عجينة فرن حجري كلاسيك" },
            priceDeltaPiaster: 0,
          },
          {
            groupId: "spice-level",
            optionId: "medium",
            optionName: { en: "Medium", ar: "متوسط" },
            priceDeltaPiaster: 0,
          },
          {
            groupId: "pizza-extras",
            optionId: "hot-honey-drizzle",
            optionName: { en: "Wildflower Hot Honey Drizzle", ar: "رشة عسل حراق" },
            priceDeltaPiaster: 2500,
          },
        ],
        lineTotalPiaster: 32000,
        isStruck: false,
      },
      {
        dishSlug: "truffle-parmesan-fries",
        dishName: { en: "Truffle Parmesan Fries", ar: "بطاطس ترافل وبارميزان" },
        dinerName: "Nour",
        quantity: 1,
        unitPricePiaster: 14500,
        selectedModifiers: [
          {
            groupId: "fries-size",
            optionId: "regular",
            optionName: { en: "Regular", ar: "عادي" },
            priceDeltaPiaster: 0,
          },
        ],
        lineTotalPiaster: 14500,
        isStruck: false,
      },
      {
        dishSlug: "v7-lemon-mint",
        dishName: { en: "V7 Lemon Mint", ar: "V7 ليمون نعناع" },
        dinerName: "Karim",
        quantity: 2,
        unitPricePiaster: 4500,
        selectedModifiers: [
          {
            groupId: "drink-serve-style",
            optionId: "chilled-ice-glass",
            optionName: { en: "Glass with Ice", ar: "كوباية بتلج" },
            priceDeltaPiaster: 0,
          },
        ],
        lineTotalPiaster: 9000,
        isStruck: false,
      },
    ],
    // 27500 + 32000 + 14500 + 9000 = 83000 | 12% service = 9960 | 14% VAT on 92960 = 13014
    subtotalPiaster: 83000,
    serviceChargePiaster: 9960,
    vatPiaster: 13014,
    totalPiaster: 105974,
    splitMode: "by-item",
    paymentMethod: "demo-card",
    createdMinutesAgo: 2,
  },
  {
    orderCode: "#T3-203",
    orderType: "dine-in",
    tableNumber: 3,
    tablePin: "3514",
    status: "preparing",
    diners: ["Salma", "Youssef", "Hana"],
    items: [
      {
        dishSlug: "charcoal-kofta-platter",
        dishName: { en: "Charcoal Kofta Platter", ar: "طبق كفتة على الفحم" },
        dinerName: "Youssef",
        quantity: 1,
        unitPricePiaster: 33500,
        selectedModifiers: [
          {
            groupId: "grill-side-choice",
            optionId: "warm-pita-fries",
            optionName: { en: "Warm Baladi Pita & Fries", ar: "عيش بلدي وبطاطس" },
            priceDeltaPiaster: 0,
          },
          {
            groupId: "dip-pairing",
            optionId: "dip-tahina",
            optionName: { en: "Roasted Sesame Tahina", ar: "طحينة" },
            priceDeltaPiaster: 1500,
          },
        ],
        lineTotalPiaster: 33500,
        kitchenNote: "Extra sumac onions on the side",
        isStruck: false,
      },
      {
        dishSlug: "artisan-margherita-pizza",
        dishName: { en: "Artisan Margherita", ar: "مارجريتا أصلية" },
        dinerName: "Salma",
        quantity: 1,
        unitPricePiaster: 26500,
        selectedModifiers: [
          {
            groupId: "pizza-crust",
            optionId: "stuffed-edge",
            optionName: { en: "Mozzarella Stuffed Crust", ar: "أطراف محشية موتزاريلا" },
            priceDeltaPiaster: 4500,
          },
        ],
        lineTotalPiaster: 26500,
        isStruck: true,
      },
      {
        dishSlug: "truffle-swiss-burger",
        dishName: { en: "Truffle Swiss", ar: "ترافل سويس" },
        dinerName: "Hana",
        quantity: 1,
        unitPricePiaster: 31000,
        selectedModifiers: [
          {
            groupId: "burger-patty-size",
            optionId: "double-200g",
            optionName: { en: "Double (200g)", ar: "دبل (200 جم)" },
            priceDeltaPiaster: 0,
          },
          {
            groupId: "burger-bun-style",
            optionId: "martins-potato",
            optionName: { en: "Martin's Potato Roll", ar: "عيش مارتنز بطاطس" },
            priceDeltaPiaster: 0,
          },
          {
            groupId: "burger-add-ons",
            optionId: "extra-cheddar",
            optionName: { en: "Extra American Cheddar", ar: "شيدر زيادة" },
            priceDeltaPiaster: 2500,
          },
        ],
        lineTotalPiaster: 31000,
        isStruck: false,
      },
      {
        dishSlug: "sparkling-karkadeh-mint",
        dishName: { en: "Sparkling Iced Karkadeh Mint", ar: "كركديه فوار بالنعناع" },
        dinerName: "Salma",
        quantity: 2,
        unitPricePiaster: 6500,
        selectedModifiers: [
          {
            groupId: "drink-serve-style",
            optionId: "chilled-ice-glass",
            optionName: { en: "Glass with Ice", ar: "كوباية بتلج" },
            priceDeltaPiaster: 0,
          },
        ],
        lineTotalPiaster: 13000,
        isStruck: true,
      },
    ],
    // 33500 + 26500 + 31000 + 13000 = 104000 | 12% service = 12480 | 14% VAT on 116480 = 16307
    subtotalPiaster: 104000,
    serviceChargePiaster: 12480,
    vatPiaster: 16307,
    totalPiaster: 132787,
    splitMode: "equal",
    paymentMethod: "demo-card",
    createdMinutesAgo: 9,
  },
  {
    orderCode: "#P-101",
    orderType: "takeaway",
    tableNumber: null,
    tablePin: null,
    status: "ready",
    diners: ["Tarek"],
    items: [
      {
        dishSlug: "nashville-hot-chicken-burger",
        dishName: { en: "Fire-Crisp Chicken Burger", ar: "تشيكن برجر مقرمش" },
        dinerName: "Tarek",
        quantity: 2,
        unitPricePiaster: 24000,
        selectedModifiers: [
          {
            groupId: "spice-level",
            optionId: "medium",
            optionName: { en: "Medium", ar: "متوسط" },
            priceDeltaPiaster: 0,
          },
        ],
        lineTotalPiaster: 48000,
        isStruck: true,
      },
      {
        dishSlug: "classic-skin-on-fries",
        dishName: { en: "Classic Skin-On Fries", ar: "بطاطس مقرمشة بقشرها" },
        dinerName: "Tarek",
        quantity: 1,
        unitPricePiaster: 7500,
        selectedModifiers: [
          {
            groupId: "fries-size",
            optionId: "regular",
            optionName: { en: "Regular", ar: "عادي" },
            priceDeltaPiaster: 0,
          },
        ],
        lineTotalPiaster: 7500,
        isStruck: true,
      },
      {
        dishSlug: "hot-crispy-pie",
        dishName: {
          en: "Hot Crispy Apple / Nutella Kunafa Pie",
          ar: "فطيرة مقرمشة سخنة (تفاح أو نوتيلا كنافة)",
        },
        dinerName: "Tarek",
        quantity: 1,
        unitPricePiaster: 13000,
        selectedModifiers: [
          {
            groupId: "pie-filling",
            optionId: "nutella-kunafa",
            optionName: { en: "Nutella & Toasted Kunafa", ar: "نوتيلا وكنافة محمصة" },
            priceDeltaPiaster: 1500,
          },
        ],
        lineTotalPiaster: 13000,
        kitchenNote: "Pack crisp, no ice cream",
        isStruck: true,
      },
    ],
    // Takeaway: 48000 + 7500 + 13000 = 68500 | 0% service = 0 | 14% VAT on 68500 = 9590
    subtotalPiaster: 68500,
    serviceChargePiaster: 0,
    vatPiaster: 9590,
    totalPiaster: 78090,
    splitMode: "full",
    paymentMethod: "counter",
    createdMinutesAgo: 14,
  },
];
```

---

## Day-1 Wiring & Verification Checklist

1. **Drop all 3 files verbatim** into `src/i18n/locales/en.json`, `src/i18n/locales/ar.json`, and `convex/seedData.ts`.
2. **Render `<bdi dir="ltr">250°</bdi>` safely (zero raw HTML strings):**
   - For `ar.json` keys containing `<bdi>`, use `react-i18next`'s `<Trans i18nKey="footer.daylightOnlyToast" components={{ bdi: <bdi dir="ltr" /> }} />`.
   - For Convex dish/category names containing `250°`, wrap matches of `250°` in `<bdi dir="ltr">250°</bdi>` inside a shared `<BrandText text={...} />` component.
3. **Lock compile-time & test-time key parity:**
   - Add a 10-line Vitest spec (`src/i18n/locales.test.ts`) that asserts deep key equality between `en.json` and `ar.json` (241 leaf keys across 12 namespaces), verifies identical `{{...}}` placeholders, and rejects any Eastern Arabic-Indic digits (`/[٠-٩]/`), single-letter Arabic preposition shorthand (`/(^|\s)\u0639\s/`), em-dashes in UI strings, or emoji code points.
4. **Seed Convex idempotently on Day 1:**
   - Inside `convex/seed.ts`, compute `createdAt = Date.now() - ticket.createdMinutesAgo * 60_000` for `SEED_KDS_TICKETS`, open `/kds`, and confirm all 3 columns (`New` Table #5 `#T5-204`, `On the grill` Table #3 `#T3-203`, `Ready` Takeaway `#P-101`) populate immediately with live ticking timers.
