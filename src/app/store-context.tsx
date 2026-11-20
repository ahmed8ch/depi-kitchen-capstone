import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getDishBySlug, type DishStation } from "@/data/menu-catalog";

export interface CartModifierSelection {
  readonly id: string;
  readonly labelEn: string;
  readonly labelAr: string;
  readonly deltaPiasters: number;
}

export interface SharedCartItem {
  readonly lineId: string;
  readonly dishId: string;
  readonly dishSlug: string;
  readonly nameEn: string;
  readonly nameAr: string;
  readonly image: string;
  readonly station: DishStation;
  readonly basePiasters: number;
  readonly requiredOption: CartModifierSelection;
  readonly extras: ReadonlyArray<CartModifierSelection>;
  readonly note: string;
  readonly quantity: number;
  readonly ownerName: string;
  readonly ownerAvatarId: number;
}

export type KdsOrderStatus = "new" | "firing" | "ready" | "served";

export interface KdsOrderItemSummary {
  readonly dishId: string;
  readonly nameEn: string;
  readonly nameAr: string;
  readonly quantity: number;
  readonly modifiersSummaryEn: string;
  readonly modifiersSummaryAr: string;
  readonly note: string;
  readonly station: DishStation;
  readonly lineTotalPiasters: number;
  readonly ownerName: string;
}

export interface KitchenOrder {
  readonly id: string;
  readonly tableNumber: string;
  readonly guestName: string;
  readonly status: KdsOrderStatus;
  readonly createdAtMs: number;
  readonly totalPiasters: number;
  readonly paymentMethod: "split" | "full" | "mine";
  readonly items: ReadonlyArray<KdsOrderItemSummary>;
}

export interface TableDiner {
  readonly id: string;
  readonly name: string;
  readonly avatarId: number;
  readonly isYou: boolean;
}

export interface FloorTableInfo {
  readonly number: string;
  readonly seats: number;
  readonly shape: "round" | "booth";
  readonly zoneEn: string;
  readonly zoneAr: string;
  readonly occupied: boolean;
  readonly activePin?: string;
  readonly activeDiners: ReadonlyArray<TableDiner>;
}

export interface TableSessionState {
  readonly isJoined: boolean;
  readonly tableNumber: string;
  readonly pin: string;
  readonly guestName: string;
  readonly guestAvatarId: number;
  readonly diners: ReadonlyArray<TableDiner>;
}

export interface UserAccount {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatarId: number;
  readonly dietaryNote: string;
  readonly joinedAtIso: string;
}

export interface TableReservation {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly date: string;
  readonly time: string;
  readonly guests: number;
  readonly createdAtMs: number;
}

interface PersistedState {
  readonly session: TableSessionState;
  readonly cart: Array<SharedCartItem>;
  readonly soldOutIds: Array<string>;
  readonly favoriteDishIds: Array<string>;
  readonly orders: Array<KitchenOrder>;
  readonly account: UserAccount | null;
  readonly reservations: Array<TableReservation>;
  readonly waitlistEmail: string | null;
}

const STORAGE_KEY = "krave-flamelink-state-v2";

const RANDOM_GUEST_NAMES_EN: ReadonlyArray<string> = [
  "Ember Scout",
  "Saffron Guest",
  "Maadi Diner",
  "Hearth Fan",
  "Crispy Hopper",
  "Oak Foodie",
];

const RANDOM_GUEST_NAMES_AR: ReadonlyArray<string> = [
  "ضيف المعادي",
  "عاشق السماش",
  "بطل الجريل",
  "ضيف كريف",
  "ذواق النار",
];

const COMPANION_POOL: ReadonlyArray<{ readonly name: string; readonly avatarId: number }> = [
  { name: "Nour", avatarId: 1 },
  { name: "Youssef", avatarId: 3 },
  { name: "Mariam", avatarId: 4 },
  { name: "Karim", avatarId: 6 },
  { name: "Hana", avatarId: 7 },
];

export const FLOOR_TABLES: ReadonlyArray<FloorTableInfo> = [
  {
    number: "1",
    seats: 2,
    shape: "round",
    zoneEn: "Window",
    zoneAr: "الشباك",
    occupied: false,
    activeDiners: [],
  },
  {
    number: "2",
    seats: 4,
    shape: "round",
    zoneEn: "Window",
    zoneAr: "الشباك",
    occupied: false,
    activeDiners: [],
  },
  {
    number: "3",
    seats: 4,
    shape: "round",
    zoneEn: "Hearth",
    zoneAr: "قرب الفرن",
    occupied: false,
    activeDiners: [],
  },
  {
    number: "4",
    seats: 6,
    shape: "booth",
    zoneEn: "Lounge",
    zoneAr: "الصالة",
    occupied: false,
    activeDiners: [],
  },
  {
    number: "5",
    seats: 4,
    shape: "round",
    zoneEn: "Hearth",
    zoneAr: "قرب الفرن",
    occupied: true,
    activePin: "4829",
    activeDiners: [
      { id: "salma-t5", name: "Salma", avatarId: 5, isYou: false },
      { id: "tarek-t5", name: "Tarek", avatarId: 2, isYou: false },
    ],
  },
  {
    number: "6",
    seats: 6,
    shape: "booth",
    zoneEn: "Patio",
    zoneAr: "التراس",
    occupied: false,
    activeDiners: [],
  },
  {
    number: "7",
    seats: 2,
    shape: "round",
    zoneEn: "Patio",
    zoneAr: "التراس",
    occupied: false,
    activeDiners: [],
  },
  {
    number: "8",
    seats: 4,
    shape: "round",
    zoneEn: "Patio",
    zoneAr: "التراس",
    occupied: false,
    activeDiners: [],
  },
];

const TABLE_5_SHARED_ITEMS: ReadonlyArray<SharedCartItem> = [
  {
    lineId: "t5-salma-pizza",
    dishId: "hot-honey-pepperoni-pizza",
    dishSlug: "hot-honey-pepperoni-pizza",
    nameEn: "Hot Honey Double Pepperoni",
    nameAr: "دبل بيبروني بالعسل الحراق",
    image: "/images/dish-hot-honey-pizza.jpg",
    station: "stone-oven",
    basePiasters: 29_500,
    requiredOption: {
      id: "stone-classic",
      labelEn: "48h Sourdough Crust",
      labelAr: "عجينة فرن حجري 48 ساعة",
      deltaPiasters: 0,
    },
    extras: [],
    note: "",
    quantity: 1,
    ownerName: "Salma",
    ownerAvatarId: 5,
  },
  {
    lineId: "t5-tarek-kofta",
    dishId: "charcoal-kofta-platter",
    dishSlug: "charcoal-kofta-platter",
    nameEn: "Charcoal Kofta Platter",
    nameAr: "طبق كفتة على الفحم",
    image: "/images/dish-charcoal-kofta.jpg",
    station: "oak-charcoal",
    basePiasters: 32_000,
    requiredOption: {
      id: "saffron-rice",
      labelEn: "Saffron Basmati Rice",
      labelAr: "رز بسمتي بالزعفران",
      deltaPiasters: 0,
    },
    extras: [],
    note: "",
    quantity: 1,
    ownerName: "Tarek",
    ownerAvatarId: 2,
  },
];

export function computeCartItemUnitPiasters(item: SharedCartItem): number {
  const extrasSum = item.extras.reduce(
    (sum, extra) => sum + extra.deltaPiasters,
    0,
  );
  return item.basePiasters + item.requiredOption.deltaPiasters + extrasSum;
}

export function computeCartItemLinePiasters(item: SharedCartItem): number {
  return computeCartItemUnitPiasters(item) * item.quantity;
}

export function generateRandomGuestName(locale: "en" | "ar"): string {
  const list = locale === "ar" ? RANDOM_GUEST_NAMES_AR : RANDOM_GUEST_NAMES_EN;
  const idx = Math.floor(Math.random() * list.length);
  return list[idx] ?? "Guest";
}

function generatePin(): string {
  return String(1000 + Math.floor(Math.random() * 9000));
}

function createInitialState(): PersistedState {
  const now = Date.now();
  return {
    // CLEAN FIRST VISIT: User is NOT falsely auto-joined to Table 5 or paired with strangers!
    session: {
      isJoined: false,
      tableNumber: "",
      pin: "",
      guestName: "",
      guestAvatarId: 0,
      diners: [],
    },
    cart: [],
    soldOutIds: [],
    favoriteDishIds: ["double-smash-burger", "hot-honey-pepperoni-pizza"],
    account: null,
    reservations: [],
    waitlistEmail: null,
    orders: [
      {
        id: "KR-204",
        tableNumber: "5",
        guestName: "Salma",
        status: "firing",
        createdAtMs: now - 4 * 60_000 - 18_000,
        totalPiasters: 58_500,
        paymentMethod: "split",
        items: [
          {
            dishId: "double-smash-burger",
            nameEn: "Double Smash",
            nameAr: "دبل سماش",
            quantity: 1,
            modifiersSummaryEn: "Double Smash · Smoked Cheddar",
            modifiersSummaryAr: "دبل سماش · شيدر مدخن",
            note: "Sauce on the side",
            station: "cast-iron",
            lineTotalPiasters: 29_000,
            ownerName: "Salma",
          },
          {
            dishId: "hot-honey-pepperoni-pizza",
            nameEn: "Hot Honey Double Pepperoni",
            nameAr: "دبل بيبروني بالعسل الحراق",
            quantity: 1,
            modifiersSummaryEn: "48h Sourdough Crust",
            modifiersSummaryAr: "عجينة فرن حجري 48 ساعة",
            note: "",
            station: "stone-oven",
            lineTotalPiasters: 29_500,
            ownerName: "Tarek",
          },
        ],
      },
      {
        id: "KR-205",
        tableNumber: "2",
        guestName: "Nour",
        status: "new",
        createdAtMs: now - 1 * 60_000 - 12_000,
        totalPiasters: 43_500,
        paymentMethod: "full",
        items: [
          {
            dishId: "charcoal-kofta-platter",
            nameEn: "Charcoal Kofta Platter",
            nameAr: "طبق كفتة على الفحم",
            quantity: 1,
            modifiersSummaryEn: "Saffron Basmati Rice",
            modifiersSummaryAr: "رز بسمتي بالزعفران",
            note: "Extra charred tomatoes",
            station: "oak-charcoal",
            lineTotalPiasters: 32_000,
            ownerName: "Nour",
          },
          {
            dishId: "hot-crispy-pie",
            nameEn: "Hot Crispy Turnover Pie",
            nameAr: "فطيرة مقرمشة سخنة",
            quantity: 1,
            modifiersSummaryEn: "Cinnamon Spiced Apple",
            modifiersSummaryAr: "تفاح بالقرفة المكرمل",
            note: "",
            station: "stone-oven",
            lineTotalPiasters: 11_500,
            ownerName: "Nour",
          },
        ],
      },
      {
        id: "KR-203",
        tableNumber: "7",
        guestName: "Youssef",
        status: "firing",
        createdAtMs: now - 13 * 60_000 - 5000,
        totalPiasters: 50_500,
        paymentMethod: "split",
        items: [
          {
            dishId: "truffle-swiss-burger",
            nameEn: "Truffle Swiss",
            nameAr: "ترافل سويس",
            quantity: 1,
            modifiersSummaryEn: "Double Smash (200g)",
            modifiersSummaryAr: "دبل سماش (200 جم)",
            note: "No pickles · Nut allergy",
            station: "cast-iron",
            lineTotalPiasters: 28_500,
            ownerName: "Youssef",
          },
          {
            dishId: "artisan-margherita-pizza",
            nameEn: "Artisan Margherita",
            nameAr: "مارجريتا أصلية",
            quantity: 1,
            modifiersSummaryEn: "Extra Crisp Thin",
            modifiersSummaryAr: "رفيعة مقرمشة زيادة",
            note: "",
            station: "stone-oven",
            lineTotalPiasters: 22_000,
            ownerName: "Mariam",
          },
        ],
      },
      {
        id: "KR-202",
        tableNumber: "3",
        guestName: "Laila",
        status: "ready",
        createdAtMs: now - 8 * 60_000 - 40_000,
        totalPiasters: 25_000,
        paymentMethod: "mine",
        items: [
          {
            dishId: "loaded-smash-fries",
            nameEn: "Loaded Smash Fries",
            nameAr: "بطاطس لودد بالسماش",
            quantity: 1,
            modifiersSummaryEn: "Regular Bowl",
            modifiersSummaryAr: "حجم عادي",
            note: "",
            station: "cast-iron",
            lineTotalPiasters: 18_500,
            ownerName: "Laila",
          },
          {
            dishId: "sparkling-karkadeh-mint",
            nameEn: "Sparkling Iced Karkadeh Mint",
            nameAr: "كركديه فوار بالنعناع",
            quantity: 1,
            modifiersSummaryEn: "Over Clear Ice",
            modifiersSummaryAr: "بالتلج الفريش",
            note: "",
            station: "bar",
            lineTotalPiasters: 6500,
            ownerName: "Laila",
          },
        ],
      },
    ],
  };
}

function loadState(): PersistedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createInitialState();
    }
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    const fallback = createInitialState();
    return {
      session: parsed.session ?? fallback.session,
      cart: Array.isArray(parsed.cart) ? parsed.cart : fallback.cart,
      soldOutIds: Array.isArray(parsed.soldOutIds)
        ? parsed.soldOutIds
        : fallback.soldOutIds,
      favoriteDishIds: Array.isArray(parsed.favoriteDishIds)
        ? parsed.favoriteDishIds
        : fallback.favoriteDishIds,
      orders:
        Array.isArray(parsed.orders) && parsed.orders.length > 0
          ? parsed.orders
          : fallback.orders,
      account: parsed.account ?? null,
      reservations: Array.isArray(parsed.reservations)
        ? parsed.reservations
        : [],
      waitlistEmail:
        typeof parsed.waitlistEmail === "string" ? parsed.waitlistEmail : null,
    };
  } catch {
    return createInitialState();
  }
}

interface AddToCartInput {
  readonly dishId: string;
  readonly requiredOption: CartModifierSelection;
  readonly extras: ReadonlyArray<CartModifierSelection>;
  readonly note: string;
  readonly quantity: number;
  readonly ownerName?: string;
}

export interface JoinTableResult {
  readonly ok: boolean;
  readonly error?: string;
}

interface KraveStoreContextValue {
  readonly session: TableSessionState;
  readonly cart: ReadonlyArray<SharedCartItem>;
  readonly cartItemCount: number;
  readonly cartTotalPiasters: number;
  readonly soldOutIds: ReadonlyArray<string>;
  readonly favoriteDishIds: ReadonlyArray<string>;
  readonly orders: ReadonlyArray<KitchenOrder>;
  readonly account: UserAccount | null;
  readonly reservations: ReadonlyArray<TableReservation>;
  readonly waitlistEmail: string | null;
  readonly openEmptyTable: (
    tableNumber: string,
    guestName: string,
    avatarId?: number,
  ) => string;
  readonly joinOccupiedTable: (
    tableNumber: string,
    pin: string,
    guestName: string,
    avatarId?: number,
  ) => JoinTableResult;
  readonly leaveTable: () => void;
  readonly addDemoCompanion: () => TableDiner | null;
  readonly addToCart: (input: AddToCartInput) => void;
  readonly addQuickDish: (dishId: string) => void;
  readonly updateCartQty: (lineId: string, delta: number) => void;
  readonly removeCartLine: (lineId: string) => void;
  readonly clearCart: () => void;
  readonly toggleFavorite: (dishId: string) => void;
  readonly toggleSoldOut: (dishId: string) => void;
  readonly fireOrderToKitchen: (
    paymentMethod: "split" | "full" | "mine",
  ) => KitchenOrder | null;
  readonly advanceOrderStatus: (
    orderId: string,
    nextStatus: KdsOrderStatus,
  ) => void;
  readonly signUp: (name: string, email: string, avatarId: number) => void;
  readonly signIn: (email: string, name?: string) => void;
  readonly signOut: () => void;
  readonly updateAccount: (updates: {
    readonly name?: string;
    readonly avatarId?: number;
    readonly dietaryNote?: string;
  }) => void;
  readonly createReservation: (input: {
    readonly name: string;
    readonly phone: string;
    readonly date: string;
    readonly time: string;
    readonly guests: number;
  }) => TableReservation;
  readonly joinWaitlist: (email: string) => void;
  readonly reorderFromOrder: (orderId: string) => number;
}

const KraveStoreContext = createContext<KraveStoreContextValue | null>(null);

export function KraveStoreProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [state, setState] = useState<PersistedState>(loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore restricted storage errors.
    }
  }, [state]);

  const openEmptyTable = useCallback(
    (tableNumber: string, guestName: string, avatarId?: number): string => {
      const newPin = generatePin();
      setState((prev) => {
        const cleaned =
          guestName.trim() ||
          prev.account?.name ||
          generateRandomGuestName("en");
        const resolvedAvatar = avatarId ?? prev.account?.avatarId ?? 0;
        return {
          ...prev,
          session: {
            isJoined: true,
            tableNumber,
            pin: newPin,
            guestName: cleaned,
            guestAvatarId: resolvedAvatar,
            diners: [
              {
                id: "you",
                name: cleaned,
                avatarId: resolvedAvatar,
                isYou: true,
              },
            ],
          },
        };
      });
      return newPin;
    },
    [],
  );

  const joinOccupiedTable = useCallback(
    (
      tableNumber: string,
      pin: string,
      guestName: string,
      avatarId?: number,
    ): JoinTableResult => {
      const table = FLOOR_TABLES.find((t) => t.number === tableNumber);
      if (!table || !table.occupied) {
        openEmptyTable(tableNumber, guestName, avatarId);
        return { ok: true };
      }

      if (table.activePin && pin.trim() !== table.activePin) {
        return { ok: false, error: "PIN mismatch" };
      }

      setState((prev) => {
        const cleaned =
          guestName.trim() ||
          prev.account?.name ||
          generateRandomGuestName("en");
        const resolvedAvatar = avatarId ?? prev.account?.avatarId ?? 0;
        const youDiner: TableDiner = {
          id: "you",
          name: cleaned,
          avatarId: resolvedAvatar,
          isYou: true,
        };
        const existingOther = table.activeDiners.filter(
          (d) => d.name.toLowerCase() !== cleaned.toLowerCase(),
        );
        const alreadyHasT5 = prev.cart.some((item) =>
          item.lineId.startsWith("t5-"),
        );
        const mergedCart =
          tableNumber === "5" && !alreadyHasT5
            ? [...TABLE_5_SHARED_ITEMS, ...prev.cart]
            : prev.cart;

        return {
          ...prev,
          cart: mergedCart,
          session: {
            isJoined: true,
            tableNumber,
            pin: pin.trim(),
            guestName: cleaned,
            guestAvatarId: resolvedAvatar,
            diners: [youDiner, ...existingOther],
          },
        };
      });
      return { ok: true };
    },
    [openEmptyTable],
  );

  const leaveTable = useCallback(() => {
    setState((prev) => ({
      ...prev,
      session: {
        isJoined: false,
        tableNumber: "",
        pin: "",
        guestName: prev.account?.name ?? "",
        guestAvatarId: prev.account?.avatarId ?? 0,
        diners: [],
      },
      cart: [],
    }));
  }, []);

  const addDemoCompanion = useCallback((): TableDiner | null => {
    let added: TableDiner | null = null;
    setState((prev) => {
      if (!prev.session.isJoined || prev.session.diners.length >= 6) {
        return prev;
      }
      const taken = new Set(prev.session.diners.map((d) => d.name));
      const candidate = COMPANION_POOL.find((c) => !taken.has(c.name));
      if (!candidate) {
        return prev;
      }
      const companion: TableDiner = {
        id: `guest-${candidate.name.toLowerCase()}`,
        name: candidate.name,
        avatarId: candidate.avatarId,
        isYou: false,
      };
      added = companion;
      return {
        ...prev,
        session: {
          ...prev.session,
          diners: [...prev.session.diners, companion],
        },
      };
    });
    return added;
  }, []);

  const addToCart = useCallback((input: AddToCartInput) => {
    const dish = getDishBySlug(input.dishId);
    if (!dish) {
      return;
    }

    setState((prev) => {
      const owner =
        input.ownerName?.trim() ||
        prev.session.guestName ||
        prev.account?.name ||
        "You";
      const ownerAvatarId =
        prev.session.guestAvatarId || prev.account?.avatarId || 0;
      const extrasKey = input.extras
        .map((extra) => extra.id)
        .toSorted()
        .join(",");
      const noteTrimmed = input.note.trim();

      const existingIndex = prev.cart.findIndex(
        (line) =>
          line.dishId === dish.id &&
          line.requiredOption.id === input.requiredOption.id &&
          line.extras
            .map((extra) => extra.id)
            .toSorted()
            .join(",") === extrasKey &&
          line.note === noteTrimmed &&
          line.ownerName === owner,
      );

      if (existingIndex >= 0) {
        const updatedCart = prev.cart.map((line, index) =>
          index === existingIndex
            ? {
                ...line,
                quantity: Math.min(20, line.quantity + input.quantity),
              }
            : line,
        );
        return { ...prev, cart: updatedCart };
      }

      const newLine: SharedCartItem = {
        lineId: `${dish.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        dishId: dish.id,
        dishSlug: dish.slug,
        nameEn: dish.nameEn,
        nameAr: dish.nameAr,
        image: dish.image,
        station: dish.station,
        basePiasters: dish.pricePiasters,
        requiredOption: input.requiredOption,
        extras: [...input.extras],
        note: noteTrimmed,
        quantity: input.quantity,
        ownerName: owner,
        ownerAvatarId,
      };

      return { ...prev, cart: [...prev.cart, newLine] };
    });
  }, []);

  const addQuickDish = useCallback(
    (dishId: string) => {
      const dish = getDishBySlug(dishId);
      const defaultOpt = dish?.requiredOptions[0];
      if (!dish || !defaultOpt) {
        return;
      }
      addToCart({
        dishId: dish.id,
        requiredOption: defaultOpt,
        extras: [],
        note: "",
        quantity: 1,
      });
    },
    [addToCart],
  );

  const updateCartQty = useCallback((lineId: string, delta: number) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart
        .map((line) =>
          line.lineId === lineId
            ? { ...line, quantity: line.quantity + delta }
            : line,
        )
        .filter((line) => line.quantity > 0),
    }));
  }, []);

  const removeCartLine = useCallback((lineId: string) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((line) => line.lineId !== lineId),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, cart: [] }));
  }, []);

  const toggleFavorite = useCallback((dishId: string) => {
    setState((prev) => ({
      ...prev,
      favoriteDishIds: prev.favoriteDishIds.includes(dishId)
        ? prev.favoriteDishIds.filter((id) => id !== dishId)
        : [...prev.favoriteDishIds, dishId],
    }));
  }, []);

  const toggleSoldOut = useCallback((dishId: string) => {
    setState((prev) => ({
      ...prev,
      soldOutIds: prev.soldOutIds.includes(dishId)
        ? prev.soldOutIds.filter((id) => id !== dishId)
        : [...prev.soldOutIds, dishId],
    }));
  }, []);

  const fireOrderToKitchen = useCallback(
    (paymentMethod: "split" | "full" | "mine"): KitchenOrder | null => {
      if (state.cart.length === 0) {
        return null;
      }
      const nextNum = 206 + state.orders.length;
      const newOrder: KitchenOrder = {
        id: `KR-${nextNum}`,
        tableNumber: state.session.tableNumber || "Counter",
        guestName:
          state.session.guestName || state.account?.name || "Guest",
        status: "new",
        createdAtMs: Date.now(),
        totalPiasters: state.cart.reduce(
          (sum, item) => sum + computeCartItemLinePiasters(item),
          0,
        ),
        paymentMethod,
        items: state.cart.map((item) => ({
          dishId: item.dishId,
          nameEn: item.nameEn,
          nameAr: item.nameAr,
          quantity: item.quantity,
          modifiersSummaryEn: [
            item.requiredOption.labelEn,
            ...item.extras.map((extra) => extra.labelEn),
          ].join(" · "),
          modifiersSummaryAr: [
            item.requiredOption.labelAr,
            ...item.extras.map((extra) => extra.labelAr),
          ].join(" · "),
          note: item.note,
          station: item.station,
          lineTotalPiasters: computeCartItemLinePiasters(item),
          ownerName: item.ownerName,
        })),
      };

      setState((prev) => ({
        ...prev,
        orders: [newOrder, ...prev.orders],
        cart: [],
      }));

      return newOrder;
    },
    [
      state.account?.name,
      state.cart,
      state.orders.length,
      state.session.guestName,
      state.session.tableNumber,
    ],
  );

  const advanceOrderStatus = useCallback(
    (orderId: string, nextStatus: KdsOrderStatus) => {
      setState((prev) => ({
        ...prev,
        orders: prev.orders.map((order) =>
          order.id === orderId ? { ...order, status: nextStatus } : order,
        ),
      }));
    },
    [],
  );

  const signUp = useCallback(
    (name: string, email: string, avatarId: number) => {
      const cleanedName = name.trim() || "Krave Member";
      const cleanedEmail = email.trim().toLowerCase();
      setState((prev) => ({
        ...prev,
        account: {
          id: `usr-${Date.now()}`,
          name: cleanedName,
          email: cleanedEmail,
          avatarId,
          dietaryNote: "",
          joinedAtIso: new Date().toISOString(),
        },
        session: prev.session.isJoined
          ? {
              ...prev.session,
              guestName: cleanedName,
              guestAvatarId: avatarId,
              diners: prev.session.diners.map((d) =>
                d.isYou ? { ...d, name: cleanedName, avatarId } : d,
              ),
            }
          : prev.session,
      }));
    },
    [],
  );

  const signIn = useCallback((email: string, name?: string) => {
    const cleanedEmail = email.trim().toLowerCase();
    const fallbackName =
      name?.trim() ||
      cleanedEmail.split("@")[0]?.replaceAll(/[._-]/g, " ") ||
      "Krave Member";
    const formattedName = fallbackName.replaceAll(/\b\w/g, (c) =>
      c.toUpperCase(),
    );
    setState((prev) => ({
      ...prev,
      account: {
        id: `usr-${Date.now()}`,
        name: formattedName,
        email: cleanedEmail,
        avatarId: prev.account?.avatarId ?? 1,
        dietaryNote: prev.account?.dietaryNote ?? "",
        joinedAtIso: prev.account?.joinedAtIso ?? new Date().toISOString(),
      },
    }));
  }, []);

  const signOut = useCallback(() => {
    setState((prev) => ({
      ...prev,
      account: null,
    }));
  }, []);

  const updateAccount = useCallback(
    (updates: {
      readonly name?: string;
      readonly avatarId?: number;
      readonly dietaryNote?: string;
    }) => {
      setState((prev) => {
        if (!prev.account) {
          return prev;
        }
        const nextName = updates.name?.trim() || prev.account.name;
        const nextAvatar = updates.avatarId ?? prev.account.avatarId;
        return {
          ...prev,
          account: {
            ...prev.account,
            name: nextName,
            avatarId: nextAvatar,
            dietaryNote: updates.dietaryNote ?? prev.account.dietaryNote,
          },
          session: prev.session.isJoined
            ? {
                ...prev.session,
                guestName: nextName,
                guestAvatarId: nextAvatar,
                diners: prev.session.diners.map((d) =>
                  d.isYou ? { ...d, name: nextName, avatarId: nextAvatar } : d,
                ),
              }
            : prev.session,
        };
      });
    },
    [],
  );

  const createReservation = useCallback(
    (input: {
      readonly name: string;
      readonly phone: string;
      readonly date: string;
      readonly time: string;
      readonly guests: number;
    }): TableReservation => {
      const booking: TableReservation = {
        id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
        name: input.name.trim(),
        phone: input.phone.trim(),
        date: input.date,
        time: input.time,
        guests: input.guests,
        createdAtMs: Date.now(),
      };
      setState((prev) => ({
        ...prev,
        reservations: [booking, ...prev.reservations],
      }));
      return booking;
    },
    [],
  );

  const joinWaitlist = useCallback((email: string) => {
    setState((prev) => ({
      ...prev,
      waitlistEmail: email.trim().toLowerCase(),
    }));
  }, []);

  const reorderFromOrder = useCallback(
    (orderId: string): number => {
      const target = state.orders.find((o) => o.id === orderId);
      if (!target) {
        return 0;
      }
      let addedCount = 0;
      for (const item of target.items) {
        const dish = getDishBySlug(item.dishId);
        const defaultOpt = dish?.requiredOptions[0];
        if (dish && defaultOpt) {
          addToCart({
            dishId: dish.id,
            requiredOption: defaultOpt,
            extras: [],
            note: item.note,
            quantity: item.quantity,
          });
          addedCount += item.quantity;
        }
      }
      return addedCount;
    },
    [addToCart, state.orders],
  );

  const cartItemCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    [state.cart],
  );

  const cartTotalPiasters = useMemo(
    () =>
      state.cart.reduce(
        (sum, item) => sum + computeCartItemLinePiasters(item),
        0,
      ),
    [state.cart],
  );

  const value = useMemo<KraveStoreContextValue>(
    () => ({
      session: state.session,
      cart: state.cart,
      cartItemCount,
      cartTotalPiasters,
      soldOutIds: state.soldOutIds,
      favoriteDishIds: state.favoriteDishIds,
      orders: state.orders,
      account: state.account,
      reservations: state.reservations,
      waitlistEmail: state.waitlistEmail,
      openEmptyTable,
      joinOccupiedTable,
      leaveTable,
      addDemoCompanion,
      addToCart,
      addQuickDish,
      updateCartQty,
      removeCartLine,
      clearCart,
      toggleFavorite,
      toggleSoldOut,
      fireOrderToKitchen,
      advanceOrderStatus,
      signUp,
      signIn,
      signOut,
      updateAccount,
      createReservation,
      joinWaitlist,
      reorderFromOrder,
    }),
    [
      state.session,
      state.cart,
      cartItemCount,
      cartTotalPiasters,
      state.soldOutIds,
      state.favoriteDishIds,
      state.orders,
      state.account,
      state.reservations,
      state.waitlistEmail,
      openEmptyTable,
      joinOccupiedTable,
      leaveTable,
      addDemoCompanion,
      addToCart,
      addQuickDish,
      updateCartQty,
      removeCartLine,
      clearCart,
      toggleFavorite,
      toggleSoldOut,
      fireOrderToKitchen,
      advanceOrderStatus,
      signUp,
      signIn,
      signOut,
      updateAccount,
      createReservation,
      joinWaitlist,
      reorderFromOrder,
    ],
  );

  return (
    <KraveStoreContext.Provider value={value}>
      {children}
    </KraveStoreContext.Provider>
  );
}

export function useKraveStore(): KraveStoreContextValue {
  const context = useContext(KraveStoreContext);
  if (!context) {
    throw new Error("useKraveStore must be used within KraveStoreProvider.");
  }
  return context;
}
