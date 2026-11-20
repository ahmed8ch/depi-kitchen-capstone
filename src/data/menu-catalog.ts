export type DishCategoryId =
  | "smash-burgers"
  | "stone-deck-pizza"
  | "charcoal-grill-bowls"
  | "sides-sharing"
  | "drinks-hot-pies";

export type DishStation = "cast-iron" | "stone-oven" | "oak-charcoal" | "bar";

export type DishTag =
  | "signature"
  | "spicy"
  | "charcoal"
  | "vegetarian"
  | "keto"
  | "high-protein"
  | "gluten-free"
  | "sharing";

export interface ModifierOption {
  readonly id: string;
  readonly labelEn: string;
  readonly labelAr: string;
  readonly deltaPiasters: number;
}

export interface DishCategoryMeta {
  readonly id: DishCategoryId;
  readonly labelEn: string;
  readonly labelAr: string;
  readonly shortEn: string;
  readonly shortAr: string;
}

export interface MenuDish {
  readonly id: string;
  readonly slug: string;
  readonly category: DishCategoryId;
  readonly station: DishStation;
  readonly nameEn: string;
  readonly nameAr: string;
  readonly descEn: string;
  readonly descAr: string;
  readonly pricePiasters: number;
  readonly prepMinutes: number;
  readonly kcal: number;
  readonly specEn: string;
  readonly specAr: string;
  readonly image: string;
  readonly tags: ReadonlyArray<DishTag>;
  readonly allergensEn: ReadonlyArray<string>;
  readonly allergensAr: ReadonlyArray<string>;
  readonly requiredLabelEn: string;
  readonly requiredLabelAr: string;
  readonly requiredOptions: ReadonlyArray<ModifierOption>;
  readonly extras: ReadonlyArray<ModifierOption>;
}

export const MENU_CATEGORIES: ReadonlyArray<DishCategoryMeta> = [
  {
    id: "smash-burgers",
    labelEn: "Smash Burgers",
    labelAr: "سماش برجر",
    shortEn: "Burgers",
    shortAr: "برجر",
  },
  {
    id: "stone-deck-pizza",
    labelEn: "Stone-Deck Pizza",
    labelAr: "بيتزا فرن حجري",
    shortEn: "Pizza",
    shortAr: "بيتزا",
  },
  {
    id: "charcoal-grill-bowls",
    labelEn: "Charcoal Grill & Bowls",
    labelAr: "مشويات على الفحم وبولز",
    shortEn: "Grill",
    shortAr: "مشويات",
  },
  {
    id: "sides-sharing",
    labelEn: "Fries, Dips & Sharing",
    labelAr: "بطاطس وصوصات وشيرينج",
    shortEn: "Sides",
    shortAr: "بطاطس وشيرينج",
  },
  {
    id: "drinks-hot-pies",
    labelEn: "Craft Drinks & Hot Pies",
    labelAr: "مشروبات وفطاير سخنة",
    shortEn: "Drinks & Pies",
    shortAr: "مشروبات وحلو",
  },
];

const BURGER_SEAR_OPTIONS: ReadonlyArray<ModifierOption> = [
  {
    id: "double-200g",
    labelEn: "Double Smash (200g)",
    labelAr: "دبل سماش (200 جم)",
    deltaPiasters: 0,
  },
  {
    id: "triple-300g",
    labelEn: "Triple Smash (300g)",
    labelAr: "تريبل سماش (300 جم)",
    deltaPiasters: 8500,
  },
];

const BURGER_EXTRAS: ReadonlyArray<ModifierOption> = [
  {
    id: "smoked-cheddar",
    labelEn: "Aged Smoked Cheddar",
    labelAr: "شيدر مدخن",
    deltaPiasters: 4500,
  },
  {
    id: "charred-jalapeno",
    labelEn: "Charred Jalapeno",
    labelAr: "هالبينو مشوي",
    deltaPiasters: 2500,
  },
  {
    id: "beef-bacon",
    labelEn: "Smoky Beef Bacon",
    labelAr: "بيف بيكون مدخن",
    deltaPiasters: 5500,
  },
];

const PIZZA_CRUST_OPTIONS: ReadonlyArray<ModifierOption> = [
  {
    id: "stone-classic",
    labelEn: "48h Sourdough Crust",
    labelAr: "عجينة فرن حجري 48 ساعة",
    deltaPiasters: 0,
  },
  {
    id: "thin-crisp",
    labelEn: "Extra Crisp Thin",
    labelAr: "رفيعة مقرمشة زيادة",
    deltaPiasters: 0,
  },
];

const PIZZA_EXTRAS: ReadonlyArray<ModifierOption> = [
  {
    id: "hot-honey-drizzle",
    labelEn: "Extra Wild Hot Honey",
    labelAr: "عسل فلفل حار زيادة",
    deltaPiasters: 3000,
  },
  {
    id: "buffalo-mozzarella",
    labelEn: "Fresh Buffalo Mozzarella",
    labelAr: "موتزاريلا بافلو فريش",
    deltaPiasters: 5500,
  },
  {
    id: "truffle-dip",
    labelEn: "Side Truffle Aioli Dip",
    labelAr: "صوص ترافل أيولي جانبي",
    deltaPiasters: 3500,
  },
];

const GRILL_SIDE_OPTIONS: ReadonlyArray<ModifierOption> = [
  {
    id: "saffron-rice",
    labelEn: "Saffron Basmati Rice",
    labelAr: "رز بسمتي بالزعفران",
    deltaPiasters: 0,
  },
  {
    id: "baladi-pita",
    labelEn: "Charred Baladi Pita & Greens",
    labelAr: "عيش بلدي مشوي وخضار",
    deltaPiasters: 0,
  },
];

const GRILL_EXTRAS: ReadonlyArray<ModifierOption> = [
  {
    id: "extra-skewer",
    labelEn: "Add 1 Charcoal Skewer",
    labelAr: "سيخ مشوي زيادة",
    deltaPiasters: 9500,
  },
  {
    id: "extra-tahina",
    labelEn: "Stone-Ground Tahina",
    labelAr: "طحينة بلدي زيادة",
    deltaPiasters: 2500,
  },
];

const FRIES_SIZE_OPTIONS: ReadonlyArray<ModifierOption> = [
  {
    id: "regular",
    labelEn: "Regular Bowl",
    labelAr: "حجم عادي",
    deltaPiasters: 0,
  },
  {
    id: "table-share",
    labelEn: "Table Share Size",
    labelAr: "حجم كبير للترابيزة",
    deltaPiasters: 5500,
  },
];

const FRIES_EXTRAS: ReadonlyArray<ModifierOption> = [
  {
    id: "krave-sauce",
    labelEn: "Krave House Sauce",
    labelAr: "صوص كريف البيتي",
    deltaPiasters: 2500,
  },
  {
    id: "warm-cheddar",
    labelEn: "Warm Cheddar Pour",
    labelAr: "صوص شيدر سخن",
    deltaPiasters: 3500,
  },
];

const DRINK_ICE_OPTIONS: ReadonlyArray<ModifierOption> = [
  {
    id: "crisp-ice",
    labelEn: "Over Clear Ice",
    labelAr: "بالتلج الفريش",
    deltaPiasters: 0,
  },
  {
    id: "light-ice",
    labelEn: "Light Ice",
    labelAr: "تلج خفيف",
    deltaPiasters: 0,
  },
];

const PIE_FILLING_OPTIONS: ReadonlyArray<ModifierOption> = [
  {
    id: "spiced-apple",
    labelEn: "Cinnamon Spiced Apple",
    labelAr: "تفاح بالقرفة المكرمل",
    deltaPiasters: 0,
  },
  {
    id: "nutella-kunafa",
    labelEn: "Warm Nutella & Toasted Kunafa",
    labelAr: "نوتيلا سايحة وكنافة محمصة",
    deltaPiasters: 2000,
  },
];

export const MENU_DISHES: ReadonlyArray<MenuDish> = [
  {
    id: "double-smash-burger",
    slug: "double-smash-burger",
    category: "smash-burgers",
    station: "cast-iron",
    nameEn: "Double Smash",
    nameAr: "دبل سماش",
    descEn:
      "Two seared prime beef patties, melted American cheddar, house pickles, seared onions, and Krave sauce on a toasted potato roll.",
    descAr:
      "قطعتين بيف سماش على الجريل، شيدر أمريكي سايحة، خيار مخلل، بصل مكرمل، وصوص كريف في عيش مارتنز بطاطس.",
    pricePiasters: 24_500,
    prepMinutes: 10,
    kcal: 740,
    specEn: "200g beef · 740 kcal",
    specAr: "200 جم بيف · 740 سعرة",
    image: "/images/dish-smoked-smash.jpg",
    tags: ["signature"],
    allergensEn: ["Gluten", "Dairy", "Mustard"],
    allergensAr: ["جلوتين", "ألبان", "خردل"],
    requiredLabelEn: "Patty Stack",
    requiredLabelAr: "حجم اللحم",
    requiredOptions: BURGER_SEAR_OPTIONS,
    extras: BURGER_EXTRAS,
  },
  {
    id: "truffle-swiss-burger",
    slug: "truffle-swiss-burger",
    category: "smash-burgers",
    station: "cast-iron",
    nameEn: "Truffle Swiss",
    nameAr: "ترافل سويس",
    descEn:
      "Double smashed beef, roasted portobello mushrooms, melted Swiss Emmental, caramelized onions, and black truffle aioli.",
    descAr:
      "دبل بيف سماش، مشروم بورتوبيلو مشوي، جبنة إمنتال سويسرية سايحة، بصل مكرمل، وصوص ترافل أيولي.",
    pricePiasters: 28_500,
    prepMinutes: 12,
    kcal: 810,
    specEn: "200g beef · 810 kcal",
    specAr: "200 جم بيف · 810 سعرة",
    image: "/images/dish-truffle-swiss.jpg",
    tags: ["signature"],
    allergensEn: ["Gluten", "Dairy", "Egg"],
    allergensAr: ["جلوتين", "ألبان", "بيض"],
    requiredLabelEn: "Patty Stack",
    requiredLabelAr: "حجم اللحم",
    requiredOptions: BURGER_SEAR_OPTIONS,
    extras: BURGER_EXTRAS,
  },
  {
    id: "blazing-jalapeno-burger",
    slug: "blazing-jalapeno-burger",
    category: "smash-burgers",
    station: "cast-iron",
    nameEn: "Blazing Jalapeno",
    nameAr: "هالبينو حراق",
    descEn:
      "Double smashed beef, charred pickled jalapenos, melted pepper jack, crispy shallots, and roasted chili glaze.",
    descAr:
      "دبل بيف سماش، هالبينو مشوي، جبنة بيبر جاك سايحة، بصل مقرمش، وصوص فلفل مشوي.",
    pricePiasters: 26_000,
    prepMinutes: 10,
    kcal: 770,
    specEn: "200g beef · Spicy",
    specAr: "200 جم بيف · سبايسي",
    image: "/images/dish-jalapeno-burger.jpg",
    tags: ["spicy"],
    allergensEn: ["Gluten", "Dairy"],
    allergensAr: ["جلوتين", "ألبان"],
    requiredLabelEn: "Patty Stack",
    requiredLabelAr: "حجم اللحم",
    requiredOptions: BURGER_SEAR_OPTIONS,
    extras: BURGER_EXTRAS,
  },
  {
    id: "nashville-hot-chicken-burger",
    slug: "nashville-hot-chicken-burger",
    category: "smash-burgers",
    station: "cast-iron",
    nameEn: "Fire-Crisp Chicken Burger",
    nameAr: "تشيكن برجر مقرمش",
    descEn:
      "Buttermilk-brined crispy chicken thigh, melted American cheddar, crisp slaw, dill pickles, and spiced Krave sauce.",
    descAr:
      "ورك فراخ مقرمش متبل باللبن الرايب، شيدر أمريكي سايحة، كول سلو فريش، خيار مخلل، وصوص كريف سبايسي.",
    pricePiasters: 24_000,
    prepMinutes: 11,
    kcal: 690,
    specEn: "180g thigh · Spicy",
    specAr: "180 جم فراخ · سبايسي",
    image: "/images/dish-chicken-burger.jpg",
    tags: ["spicy", "high-protein"],
    allergensEn: ["Gluten", "Dairy", "Egg"],
    allergensAr: ["جلوتين", "ألبان", "بيض"],
    requiredLabelEn: "Heat Level",
    requiredLabelAr: "درجة الشطة",
    requiredOptions: [
      { id: "mild-ember", labelEn: "Warm Mild", labelAr: "خفيف دافي", deltaPiasters: 0 },
      { id: "cairo-hot", labelEn: "Fiery Hot", labelAr: "حراق زيادة", deltaPiasters: 0 },
    ],
    extras: BURGER_EXTRAS,
  },
  {
    id: "keto-lettuce-wrap-smash",
    slug: "keto-lettuce-wrap-smash",
    category: "smash-burgers",
    station: "cast-iron",
    nameEn: "Keto Lettuce-Wrap Smash",
    nameAr: "سماش كيتو ملفوف في الخس",
    descEn:
      "Double smashed beef, sharp cheddar, vine tomato, dill pickles, and sugar-free Krave sauce wrapped in crisp iceberg lettuce.",
    descAr:
      "دبل بيف سماش، جبنة شيدر، طماطم فريش، خيار مخلل، وصوص كريف من غير سكر، ملفوف في خس آيسبرج مقرمش.",
    pricePiasters: 23_500,
    prepMinutes: 10,
    kcal: 510,
    specEn: "6g net carbs · Keto",
    specAr: "6 جم كارب · كيتو",
    image: "/images/dish-keto-smash.jpg",
    tags: ["keto", "high-protein", "gluten-free"],
    allergensEn: ["Dairy"],
    allergensAr: ["ألبان"],
    requiredLabelEn: "Patty Stack",
    requiredLabelAr: "حجم اللحم",
    requiredOptions: BURGER_SEAR_OPTIONS,
    extras: BURGER_EXTRAS,
  },
  {
    id: "artisan-margherita-pizza",
    slug: "artisan-margherita-pizza",
    category: "stone-deck-pizza",
    station: "stone-oven",
    nameEn: "Artisan Margherita",
    nameAr: "مارجريتا أصلية",
    descEn:
      "48-hour fermented dough, crushed San Marzano tomatoes, fresh buffalo mozzarella, sweet basil, and cold-pressed olive oil.",
    descAr:
      "عجينة متخمرة 48 ساعة، صلصة طماطم سان مارزانو، موتزاريلا بافلو فريش، ريحان أخضر، وزيت زيتون بكر.",
    pricePiasters: 22_000,
    prepMinutes: 12,
    kcal: 780,
    specEn: "30cm · Vegetarian",
    specAr: "30 سم · نباتي",
    image: "/images/dish-margherita-pizza.jpg",
    tags: ["vegetarian"],
    allergensEn: ["Gluten", "Dairy"],
    allergensAr: ["جلوتين", "ألبان"],
    requiredLabelEn: "Crust Style",
    requiredLabelAr: "نوع العجينة",
    requiredOptions: PIZZA_CRUST_OPTIONS,
    extras: PIZZA_EXTRAS,
  },
  {
    id: "hot-honey-pepperoni-pizza",
    slug: "hot-honey-pepperoni-pizza",
    category: "stone-deck-pizza",
    station: "stone-oven",
    nameEn: "Hot Honey Double Pepperoni",
    nameAr: "دبل بيبروني بالعسل الحراق",
    descEn:
      "Stone-baked crust, double cupped beef pepperoni, fior di latte mozzarella, crushed chili flakes, and wildflower hot honey.",
    descAr:
      "عجينة فرن حجري مقرمشة، دبل بيبروني بيف، موتزاريلا فريش، شطة مجروشة، ورشة عسل نحل حراق.",
    pricePiasters: 29_500,
    prepMinutes: 12,
    kcal: 960,
    specEn: "30cm · Popular · Spicy",
    specAr: "30 سم · الأكثر طلبا · سبايسي",
    image: "/images/dish-hot-honey-pizza.jpg",
    tags: ["signature", "spicy"],
    allergensEn: ["Gluten", "Dairy"],
    allergensAr: ["جلوتين", "ألبان"],
    requiredLabelEn: "Crust Style",
    requiredLabelAr: "نوع العجينة",
    requiredOptions: PIZZA_CRUST_OPTIONS,
    extras: PIZZA_EXTRAS,
  },
  {
    id: "chicken-ranch-supreme-pizza",
    slug: "chicken-ranch-supreme-pizza",
    category: "stone-deck-pizza",
    station: "stone-oven",
    nameEn: "Chicken Ranch Supreme",
    nameAr: "تشيكن رانش سوبريم",
    descEn:
      "Stone-baked crust, flame-grilled chicken breast, smoky beef bacon, melted mozzarella, roasted sweet corn, and buttermilk ranch.",
    descAr:
      "عجينة فرن حجري، صدور فراخ مشوية، بيف بيكون مدخن، موتزاريلا سايحة، ذرة مشوية، وصوص رانش بيتي.",
    pricePiasters: 29_000,
    prepMinutes: 14,
    kcal: 930,
    specEn: "30cm · High-Protein",
    specAr: "30 سم · بروتين عالي",
    image: "/images/dish-chicken-ranch-pizza.jpg",
    tags: ["high-protein"],
    allergensEn: ["Gluten", "Dairy"],
    allergensAr: ["جلوتين", "ألبان"],
    requiredLabelEn: "Crust Style",
    requiredLabelAr: "نوع العجينة",
    requiredOptions: PIZZA_CRUST_OPTIONS,
    extras: PIZZA_EXTRAS,
  },
  {
    id: "charcoal-kofta-platter",
    slug: "charcoal-kofta-platter",
    category: "charcoal-grill-bowls",
    station: "oak-charcoal",
    nameEn: "Charcoal Kofta Platter",
    nameAr: "طبق كفتة على الفحم",
    descEn:
      "Three hand-minced beef and lamb kofta skewers over oak charcoal, charred tomato, sumac-parsley onion, warm baladi pita, and tahina.",
    descAr:
      "3 أسياخ كفتة لحم وضاني مشوية على الفحم، طماطم مشوية، بصل بالسماق والبقدونس، عيش بلدي سخن، وطحينة.",
    pricePiasters: 32_000,
    prepMinutes: 16,
    kcal: 820,
    specEn: "270g · 3 skewers",
    specAr: "270 جم · 3 أسياخ",
    image: "/images/dish-charcoal-kofta.jpg",
    tags: ["signature", "charcoal", "high-protein"],
    allergensEn: ["Sesame", "Gluten"],
    allergensAr: ["سمسم", "جلوتين"],
    requiredLabelEn: "Served With",
    requiredLabelAr: "التقديم مع",
    requiredOptions: GRILL_SIDE_OPTIONS,
    extras: GRILL_EXTRAS,
  },
  {
    id: "herb-shish-tawook",
    slug: "herb-shish-tawook",
    category: "charcoal-grill-bowls",
    station: "oak-charcoal",
    nameEn: "Herb Shish Tawook",
    nameAr: "شيش طاووق بالأعشاب",
    descEn:
      "Yogurt, garlic, and lemon-marinated chicken thigh skewers seared over charcoal with blistered peppers, warm pita, and whipped toum.",
    descAr:
      "أسياخ أوراك فراخ متبلة بالزبادي والتوم والليمون ومشوية على الفحم، مع فلفل ألوان مشوي، عيش سخن، وتومية.",
    pricePiasters: 27_500,
    prepMinutes: 15,
    kcal: 690,
    specEn: "250g · Oak Charcoal",
    specAr: "250 جم · على الفحم",
    image: "/images/dish-shish-tawook.jpg",
    tags: ["charcoal", "high-protein"],
    allergensEn: ["Dairy", "Gluten"],
    allergensAr: ["ألبان", "جلوتين"],
    requiredLabelEn: "Served With",
    requiredLabelAr: "التقديم مع",
    requiredOptions: GRILL_SIDE_OPTIONS,
    extras: GRILL_EXTRAS,
  },
  {
    id: "high-protein-chicken-bowl",
    slug: "high-protein-chicken-bowl",
    category: "charcoal-grill-bowls",
    station: "oak-charcoal",
    nameEn: "High-Protein Grilled Chicken Bowl",
    nameAr: "بول فراخ مشوية بالبروتين",
    descEn:
      "Charcoal-grilled chicken breast over steamed basmati and quinoa, roasted broccoli, cherry tomatoes, avocado, and lemon-herb dressing.",
    descAr:
      "صدور فراخ مشوية على الفحم مع رز بسمتي وكينوا، بروكلي مشوي، طماطم شيري، أفوكادو، ودريسينج ليمون وأعشاب.",
    pricePiasters: 25_500,
    prepMinutes: 13,
    kcal: 560,
    specEn: "48g protein · Gluten-Free",
    specAr: "48 جم بروتين · خالي جلوتين",
    image: "/images/dish-chicken-bowl.jpg",
    tags: ["charcoal", "high-protein", "gluten-free"],
    allergensEn: ["None"],
    allergensAr: ["لا يوجد"],
    requiredLabelEn: "Bowl Base",
    requiredLabelAr: "أساس البول",
    requiredOptions: [
      { id: "basmati-quinoa", labelEn: "Basmati & Quinoa", labelAr: "بسمتي وكينوا", deltaPiasters: 0 },
      { id: "roasted-greens", labelEn: "All Greens (Low-Carb)", labelAr: "خضار مشوي (لو كارب)", deltaPiasters: 0 },
    ],
    extras: GRILL_EXTRAS,
  },
  {
    id: "loaded-smash-fries",
    slug: "loaded-smash-fries",
    category: "sides-sharing",
    station: "cast-iron",
    nameEn: "Loaded Smash Fries",
    nameAr: "بطاطس لودد بالسماش",
    descEn:
      "Skin-on crisp fries topped with chopped smashed beef, warm cheddar sauce, seared onions, pickled jalapenos, and Krave sauce.",
    descAr:
      "بطاطس مقرمشة بقشرها عليها بيف سماش مفروم، صوص شيدر سخن، بصل مكرمل، هالبينو، وصوص كريف.",
    pricePiasters: 18_500,
    prepMinutes: 9,
    kcal: 640,
    specEn: "320g · Popular",
    specAr: "320 جم · الأكثر طلبا",
    image: "/images/dish-loaded-fries.jpg",
    tags: ["signature", "spicy"],
    allergensEn: ["Dairy"],
    allergensAr: ["ألبان"],
    requiredLabelEn: "Portion",
    requiredLabelAr: "الحجم",
    requiredOptions: FRIES_SIZE_OPTIONS,
    extras: FRIES_EXTRAS,
  },
  {
    id: "truffle-parmesan-fries",
    slug: "truffle-parmesan-fries",
    category: "sides-sharing",
    station: "cast-iron",
    nameEn: "Truffle Parmesan Fries",
    nameAr: "بطاطس ترافل وبارميزان",
    descEn:
      "Double-fried thin-cut potatoes tossed in white truffle oil, grated 24-month parmesan, cracked black pepper, and chives.",
    descAr:
      "بطاطس رفيعة مقرمشة متقلبة في زيت ترافل أبيض، جبنة بارميزان مبشورة، فلفل أسود مجروش، وبصل أخضر ناعم.",
    pricePiasters: 14_500,
    prepMinutes: 8,
    kcal: 490,
    specEn: "250g · Vegetarian",
    specAr: "250 جم · نباتي",
    image: "/images/dish-truffle-fries.jpg",
    tags: ["vegetarian"],
    allergensEn: ["Dairy"],
    allergensAr: ["ألبان"],
    requiredLabelEn: "Portion",
    requiredLabelAr: "الحجم",
    requiredOptions: FRIES_SIZE_OPTIONS,
    extras: FRIES_EXTRAS,
  },
  {
    id: "classic-skin-on-fries",
    slug: "classic-skin-on-fries",
    category: "sides-sharing",
    station: "cast-iron",
    nameEn: "Classic Skin-On Fries",
    nameAr: "بطاطس مقرمشة بقشرها",
    descEn:
      "Golden double-fried skin-on potatoes dusted with flaky sea salt and sweet smoked paprika.",
    descAr: "بطاطس دهبية مقرمشة بقشرها مع رشة ملح بحري وبابريكا مدخنة.",
    pricePiasters: 7500,
    prepMinutes: 6,
    kcal: 380,
    specEn: "220g · Gluten-Free",
    specAr: "220 جم · خالي جلوتين",
    image: "/images/dish-classic-fries.jpg",
    tags: ["vegetarian", "gluten-free"],
    allergensEn: ["None"],
    allergensAr: ["لا يوجد"],
    requiredLabelEn: "Portion",
    requiredLabelAr: "الحجم",
    requiredOptions: FRIES_SIZE_OPTIONS,
    extras: FRIES_EXTRAS,
  },
  {
    id: "house-dips-trio",
    slug: "house-dips-trio",
    category: "sides-sharing",
    station: "bar",
    nameEn: "House Dips Trio",
    nameAr: "تشكيلة 3 صوصات بيتي",
    descEn:
      "Three shareable house dips: Krave signature sauce, black truffle aioli, and whipped garlic toum.",
    descAr: "3 صوصات بيتي للشيرينج: صوص كريف، ترافل أيولي، وتومية كريمي.",
    pricePiasters: 5500,
    prepMinutes: 3,
    kcal: 290,
    specEn: "3x60ml · Sharing",
    specAr: "3×60 مل · شيرينج",
    image: "/images/dish-dips-trio.jpg",
    tags: ["vegetarian", "gluten-free", "sharing"],
    allergensEn: ["Egg", "Mustard"],
    allergensAr: ["بيض", "خردل"],
    requiredLabelEn: "Serving Style",
    requiredLabelAr: "طريقة التقديم",
    requiredOptions: [
      { id: "trio-classic", labelEn: "Standard Trio", labelAr: "التشكيلة الكلاسيك", deltaPiasters: 0 },
    ],
    extras: [],
  },
  {
    id: "squad-sharing-box",
    slug: "squad-sharing-box",
    category: "sides-sharing",
    station: "oak-charcoal",
    nameEn: "Krave Squad Sharing Box",
    nameAr: "شيرينج بوكس كريف",
    descEn:
      "Serves four: four smash sliders, four herb tawook skewers, two large skin-on fries, and four house dips.",
    descAr:
      "يكفي 4 أفراد: 4 سماش سلايدرز، 4 أسياخ شيش طاووق، 2 بطاطس كبيرة، و4 صوصات بيتي.",
    pricePiasters: 89_000,
    prepMinutes: 18,
    kcal: 2640,
    specEn: "Serves 4 · 1.4kg",
    specAr: "يكفي 4 أفراد · 1.4 كجم",
    image: "/images/hero-hearth-table.jpg",
    tags: ["sharing", "signature", "charcoal"],
    allergensEn: ["Gluten", "Dairy", "Egg"],
    allergensAr: ["جلوتين", "ألبان", "بيض"],
    requiredLabelEn: "Slider Mix",
    requiredLabelAr: "اختيار السلايدرز",
    requiredOptions: [
      { id: "mix-2-2", labelEn: "2 Classic + 2 Spicy Jalapeno", labelAr: "2 كلاسيك + 2 هالبينو سبايسي", deltaPiasters: 0 },
      { id: "all-classic", labelEn: "All 4 Classic Smash", labelAr: "كلهم كلاسيك سماش", deltaPiasters: 0 },
    ],
    extras: [
      { id: "add-4-drinks", labelEn: "Add 4 Craft Sodas", labelAr: "إضافة 4 مشروبات فوارة", deltaPiasters: 14_000 },
    ],
  },
  {
    id: "v7-lemon-mint",
    slug: "v7-lemon-mint",
    category: "drinks-hot-pies",
    station: "bar",
    nameEn: "V7 Sparkling Lemon Mint",
    nameAr: "V7 ليمون نعناع فوار",
    descEn:
      "Chilled Egyptian V7 sparkling lemon-mint soda poured over clear ice with fresh garden mint and a lemon wheel.",
    descAr:
      "صودا V7 المصرية ليمون بالنعناع ساقعة مع تلج صافي وورق نعناع فريش وشريحة ليمون.",
    pricePiasters: 4500,
    prepMinutes: 2,
    kcal: 115,
    specEn: "350ml · Chilled",
    specAr: "350 مل · ساقع",
    image: "/images/dish-lemon-mint.jpg",
    tags: ["vegetarian", "gluten-free"],
    allergensEn: ["None"],
    allergensAr: ["لا يوجد"],
    requiredLabelEn: "Ice",
    requiredLabelAr: "التلج",
    requiredOptions: DRINK_ICE_OPTIONS,
    extras: [],
  },
  {
    id: "v-cola",
    slug: "v-cola",
    category: "drinks-hot-pies",
    station: "bar",
    nameEn: "V-Cola / V-Diet Cola",
    nameAr: "V-Cola / V-Diet كولا",
    descEn:
      "Chilled 300ml Egyptian V-Cola or zero-sugar V-Diet Cola served over cracked ice with fresh lime.",
    descAr:
      "V-Cola المصرية أو V-Diet زيرو سكر ساقعة 300 مل مع تلج وشريحة ليمون فريش.",
    pricePiasters: 4000,
    prepMinutes: 2,
    kcal: 125,
    specEn: "300ml · Classic or Diet",
    specAr: "300 مل · عادي أو دايت",
    image: "/images/dish-cola-lime.jpg",
    tags: ["vegetarian", "gluten-free"],
    allergensEn: ["None"],
    allergensAr: ["لا يوجد"],
    requiredLabelEn: "Variant",
    requiredLabelAr: "النوع",
    requiredOptions: [
      { id: "classic-cola", labelEn: "V-Cola Classic", labelAr: "V-Cola كلاسيك", deltaPiasters: 0 },
      { id: "diet-cola", labelEn: "V-Diet Zero Sugar", labelAr: "V-Diet زيرو سكر", deltaPiasters: 0 },
    ],
    extras: [],
  },
  {
    id: "sparkling-karkadeh-mint",
    slug: "sparkling-karkadeh-mint",
    category: "drinks-hot-pies",
    station: "bar",
    nameEn: "Sparkling Iced Karkadeh Mint",
    nameAr: "كركديه فوار بالنعناع",
    descEn:
      "Cold-steeped Aswan hibiscus topped with sparkling water, fresh garden mint, and clear ice.",
    descAr: "كركديه أسواني منقوع على البارد مع صودا فوارة، نعناع فريش، وتلج.",
    pricePiasters: 6500,
    prepMinutes: 3,
    kcal: 95,
    specEn: "350ml · House Craft",
    specAr: "350 مل · تحضير بيتي",
    image: "/images/dish-karkadeh-mint.jpg",
    tags: ["signature", "vegetarian", "gluten-free"],
    allergensEn: ["None"],
    allergensAr: ["لا يوجد"],
    requiredLabelEn: "Ice",
    requiredLabelAr: "التلج",
    requiredOptions: DRINK_ICE_OPTIONS,
    extras: [],
  },
  {
    id: "hot-crispy-pie",
    slug: "hot-crispy-pie",
    category: "drinks-hot-pies",
    station: "stone-oven",
    nameEn: "Hot Crispy Turnover Pie",
    nameAr: "فطيرة مقرمشة سخنة",
    descEn:
      "Blistered golden hand pie baked crisp to order with vanilla bean soft-serve. Pick spiced apple or warm Nutella kunafa.",
    descAr:
      "فطيرة مقرمشة سخنة بتتخبز بالطلب مع آيس كريم فانيليا، اختار تفاح بالقرفة أو نوتيلا سايحة مع كنافة محمصة.",
    pricePiasters: 11_500,
    prepMinutes: 8,
    kcal: 460,
    specEn: "Baked to order · Sweet",
    specAr: "بتتخبز بالطلب · حلو",
    image: "/images/dish-turnover-pie.jpg",
    tags: ["signature", "vegetarian"],
    allergensEn: ["Gluten", "Dairy", "Hazelnuts (Nutella)"],
    allergensAr: ["جلوتين", "ألبان", "بندق (في النوتيلا)"],
    requiredLabelEn: "Filling",
    requiredLabelAr: "الحشوة",
    requiredOptions: PIE_FILLING_OPTIONS,
    extras: [
      { id: "extra-soft-serve", labelEn: "Extra Vanilla Bean Scoop", labelAr: "بولة فانيليا زيادة", deltaPiasters: 3500 },
    ],
  },
];

export function getDishBySlug(slug: string): MenuDish | undefined {
  return MENU_DISHES.find((dish) => dish.slug === slug || dish.id === slug);
}
