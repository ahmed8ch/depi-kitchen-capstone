import { RollingNumber } from "@kitlangton/rolling-number/react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import {
  Add01Icon,
  AppIcon,
  FavouriteIcon,
  FireIcon,
  Leaf01Icon,
  ShoppingBag01Icon,
  SparklesIcon,
} from "@/components/icons";
import { EmptySpotIcon } from "@/components/shared/EmptySpotIcon";
import { FavoriteDishButton } from "@/components/shared/FavoriteDishButton";
import { ShareDishButton } from "@/components/shared/ShareDishButton";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  getDishBySlug,
  MENU_CATEGORIES,
  MENU_DISHES,
  type DishCategoryId,
  type MenuDish,
} from "@/data/menu-catalog";
import { formatEgp } from "@/domain/money";
import { DishCustomizerDrawer } from "@/features/menu/DishCustomizerDrawer";
import { MenuExpandingSearch } from "@/features/menu/MenuExpandingSearch";
import { TableCartSheet } from "@/features/menu/TableCartSheet";
import { cn } from "@/lib/utils";

interface MenuSearchParams {
  readonly category?: string;
  readonly dish?: string;
}

const VALID_CATEGORIES = new Set<string>([
  "all",
  ...MENU_CATEGORIES.map((c) => c.id),
]);

function MenuPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { locale } = useAppAppearance();
  const {
    session,
    cartItemCount,
    cartTotalPiasters,
    soldOutIds,
    favoriteDishIds,
  } = useKraveStore();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const initialCategory =
    search.category && VALID_CATEGORIES.has(search.category)
      ? search.category
      : "all";

  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState("");
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [onlySaved, setOnlySaved] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuDish | null>(() =>
    search.dish ? (getDishBySlug(search.dish) ?? null) : null,
  );
  const [drawerOpen, setDrawerOpen] = useState<boolean>(
    () => Boolean(search.dish && getDishBySlug(search.dish)),
  );
  const [bagOpen, setBagOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredDishes = MENU_DISHES.filter((dish) => {
    const matchesCategory = category === "all" || dish.category === category;
    const matchesSpicy = !onlySpicy || dish.tags.includes("spicy");
    const matchesVeg = !onlyVeg || dish.tags.includes("vegetarian");
    const matchesSaved = !onlySaved || favoriteDishIds.includes(dish.id);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      dish.nameEn.toLowerCase().includes(normalizedQuery) ||
      dish.descEn.toLowerCase().includes(normalizedQuery) ||
      dish.nameAr.includes(normalizedQuery) ||
      dish.descAr.includes(normalizedQuery);
    return (
      matchesCategory &&
      matchesSpicy &&
      matchesVeg &&
      matchesSaved &&
      matchesQuery
    );
  });

  const handleOpenDish = (dish: MenuDish) => {
    if (soldOutIds.includes(dish.id)) {
      return;
    }
    setSelectedDish(dish);
    setDrawerOpen(true);
  };

  const handleCategoryChange = (nextCategory: string) => {
    setCategory(nextCategory);
    void navigate({
      search: (prev) => ({
        ...prev,
        category: nextCategory === "all" ? undefined : nextCategory,
      }),
      replace: true,
    });
  };

  const getNoticeableTag = (
    dish: MenuDish,
  ): {
    readonly label: string;
    readonly cls: string;
    readonly icon: typeof FireIcon;
  } | null => {
    if (dish.tags.includes("spicy")) {
      return {
        label: isAr ? "سبايسي" : "Spicy",
        cls: "border-red-500/25 bg-red-600 text-white shadow-sm",
        icon: FireIcon,
      };
    }
    if (dish.tags.includes("signature")) {
      return {
        label: isAr ? "الأكثر طلبا" : "Signature",
        cls: "border-foreground/10 bg-foreground text-background shadow-sm",
        icon: SparklesIcon,
      };
    }
    if (dish.tags.includes("keto")) {
      return {
        label: isAr ? "كيتو" : "Keto",
        cls: "border-sky-600/25 bg-sky-600 text-white shadow-sm",
        icon: SparklesIcon,
      };
    }
    if (dish.tags.includes("vegetarian")) {
      return {
        label: isAr ? "نباتي" : "Vegetarian",
        cls: "border-emerald-600/25 bg-emerald-600 text-white shadow-sm",
        icon: Leaf01Icon,
      };
    }
    return null;
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pt-8 pb-28 sm:px-6 sm:pt-12">
      {/* Editorial Menu Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/12 text-primary-ink tabular-price"
            >
              {isAr
                ? `${MENU_DISHES.length} طبق على النار المفتوحة`
                : `${MENU_DISHES.length} Open-Fire Dishes`}
            </Badge>
            {session.isJoined ? (
              <Badge variant="outline" className="bg-card">
                {isAr
                  ? `ترابيزة ${session.tableNumber}`
                  : `Table ${session.tableNumber}`}
              </Badge>
            ) : null}
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
            {isAr ? "منيو النار المفتوحة" : "Open-Fire Menu"}
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            {isAr
              ? "اضغط على أي مكان في الكارت عشان تخصص إضافاتك وتضيف للسلة."
              : "Click anywhere on a dish card to customize your stack, crust, or toppings."}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => setBagOpen(true)}
          className="rounded-full bg-card"
        >
          <AppIcon icon={ShoppingBag01Icon} data-icon="inline-start" />
          <span>{isAr ? "سلة الطلبات" : "Order Bag"}</span>
          {cartItemCount > 0 ? (
            <Badge variant="default" className="ms-1 tabular-price">
              {cartItemCount}
            </Badge>
          ) : null}
        </Button>
      </div>

      {/* Category Pills + Quick Filters + Expanding Command Search */}
      <div className="flex flex-col gap-3 rounded-[28px] border border-border/80 bg-card/80 p-3 shadow-xs sm:p-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div className="-mx-1 overflow-x-auto px-1 pb-1 lg:pb-0">
            <ToggleGroup
              value={[category]}
              onValueChange={(nextValues) => {
                const picked = nextValues[0];
                if (picked) {
                  handleCategoryChange(picked);
                }
              }}
              variant="outline"
              spacing={1}
              aria-label={isAr ? "تصنيف الأطباق" : "Dish categories"}
              className="flex-nowrap"
            >
              <ToggleGroupItem value="all">
                {isAr ? "الكل (20)" : "All (20)"}
              </ToggleGroupItem>
              {MENU_CATEGORIES.map((cat) => (
                <ToggleGroupItem
                  key={cat.id}
                  value={cat.id satisfies DishCategoryId}
                >
                  {isAr ? cat.shortAr : cat.shortEn}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Toggle
              variant="outline"
              size="sm"
              pressed={onlySpicy}
              onPressedChange={setOnlySpicy}
            >
              <AppIcon icon={FireIcon} size={14} />
              <span>{isAr ? "سبايسي" : "Spicy"}</span>
            </Toggle>

            <Toggle
              variant="outline"
              size="sm"
              pressed={onlyVeg}
              onPressedChange={setOnlyVeg}
            >
              <AppIcon icon={Leaf01Icon} size={14} />
              <span>{isAr ? "نباتي" : "Veg"}</span>
            </Toggle>

            <Toggle
              variant="outline"
              size="sm"
              pressed={onlySaved}
              onPressedChange={setOnlySaved}
            >
              <AppIcon icon={FavouriteIcon} size={14} />
              <span>
                {isAr
                  ? `المفضلة (${favoriteDishIds.length})`
                  : `Saved (${favoriteDishIds.length})`}
              </span>
            </Toggle>

            <MenuExpandingSearch
              query={query}
              onQueryChange={setQuery}
              onSelectDish={handleOpenDish}
            />
          </div>
        </div>
      </div>

      {/* 20 Unique Real-Photo Dishes — 100% Clickable Cards + Full-Card Custom 32px Cursors */}
      {filteredDishes.length === 0 ? (
        <Empty className="border border-border bg-card py-14">
          <EmptyHeader>
            <EmptyMedia>
              <EmptySpotIcon variant="search" />
            </EmptyMedia>
            <EmptyTitle>
              {isAr ? "مفيش أطباق بالبحث ده" : "No matching dishes"}
            </EmptyTitle>
            <EmptyDescription>
              {isAr
                ? "جرب تمسح الفلاتر أو تختار قسم تاني من المنيو."
                : "Clear your active filters or switch to another fire station."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => {
                handleCategoryChange("all");
                setQuery("");
                setOnlySpicy(false);
                setOnlyVeg(false);
                setOnlySaved(false);
              }}
            >
              {isAr ? "عرض كل الـ 20 طبق" : "Show all 20 dishes"}
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDishes.map((dish) => {
            const isSoldOut = soldOutIds.includes(dish.id);
            const tag = getNoticeableTag(dish);
            const cursorClass = isSoldOut
              ? "cursor-not-allowed"
              : dish.tags.includes("spicy")
                ? "menu-card-cursor cursor-spicy"
                : dish.tags.includes("charcoal")
                  ? "menu-card-cursor cursor-charcoal"
                  : "menu-card-cursor";

            return (
              <SpotlightCard
                key={dish.id}
                role="button"
                tabIndex={isSoldOut ? -1 : 0}
                aria-disabled={isSoldOut}
                aria-label={
                  isAr ? `تخصيص ${dish.nameAr}` : `Customize ${dish.nameEn}`
                }
                onClick={() => handleOpenDish(dish)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleOpenDish(dish);
                  }
                }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-[28px] border border-border/80 bg-card p-3 text-start outline-none transition-[transform,box-shadow,opacity,border-color] duration-200 focus-visible:ring-3 focus-visible:ring-ring/40",
                  !isSoldOut &&
                    "hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-card-hover",
                  isSoldOut && "opacity-65",
                  cursorClass,
                )}
              >
                {/* Unique Studio Dish Photo */}
                <div className="relative overflow-hidden rounded-[20px] bg-surface-tint">
                  <img
                    src={dish.image}
                    alt={isAr ? dish.nameAr : dish.nameEn}
                    loading="lazy"
                    className={cn(
                      "aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      !isSoldOut && "group-hover:scale-[1.04]",
                      isSoldOut && "grayscale",
                    )}
                  />

                  <div className="absolute start-3 top-3 flex items-center gap-1.5">
                    {isSoldOut ? (
                      <Badge variant="destructive" className="shadow-sm">
                        {isAr ? "86 · خلصان دلوقتي" : "86 · Sold out"}
                      </Badge>
                    ) : tag ? (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-tight",
                          tag.cls,
                        )}
                      >
                        <AppIcon icon={tag.icon} size={12} />
                        <span>{tag.label}</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Floating Heart + Share (Stop Propagation cleanly) */}
                  <div
                    data-native-cursor="true"
                    className="absolute end-3 top-3 flex items-center gap-1.5"
                  >
                    <FavoriteDishButton
                      dishId={dish.id}
                      dishNameEn={dish.nameEn}
                      dishNameAr={dish.nameAr}
                    />
                    <ShareDishButton
                      dishSlug={dish.slug}
                      dishNameEn={dish.nameEn}
                      dishNameAr={dish.nameAr}
                    />
                  </div>
                </div>

                {/* Dish Copy + Clean Spec Footer (Zero Prep Times!) */}
                <div className="flex flex-1 flex-col justify-between gap-4 px-2 pt-4 pb-1.5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base font-extrabold tracking-tight text-foreground">
                        {isAr ? dish.nameAr : dish.nameEn}
                      </h2>
                      <bdi
                        dir="ltr"
                        className="shrink-0 text-sm font-extrabold text-primary-ink tabular-price"
                      >
                        {formatEgp(dish.pricePiasters, locale)}
                      </bdi>
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {isAr ? dish.descAr : dish.descEn}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-3">
                    <span className="truncate text-[11px] font-medium text-muted-foreground">
                      {isAr ? dish.specAr : dish.specEn}
                    </span>

                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
                        isSoldOut
                          ? "border border-border bg-secondary text-muted-foreground"
                          : "bg-primary text-primary-foreground group-hover:bg-primary-hover",
                      )}
                    >
                      {isSoldOut ? (
                        <span>{isAr ? "غير متاح" : "Sold out"}</span>
                      ) : (
                        <>
                          <AppIcon icon={Add01Icon} size={13} />
                          <span>{isAr ? "أضف" : "Add"}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      )}

      {/* CoolDock Translucent Dark Floating Cart Dock (Strictly on /menu when bag >= 1) */}
      <AnimatePresence>
        {cartItemCount > 0 ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none fixed inset-x-4 bottom-5 z-30 flex justify-center"
          >
            <button
              type="button"
              data-surface="dark-pass"
              onClick={() => setBagOpen(true)}
              className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-full border border-white/15 bg-black/88 px-4 py-2.5 text-white shadow-dock backdrop-blur-xl transition-transform duration-150 hover:scale-[1.01] active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white tabular-price">
                  {cartItemCount}
                </span>
                <div className="flex flex-col text-start">
                  <span className="text-xs font-bold text-white">
                    {session.isJoined
                      ? isAr
                        ? `سلة ترابيزة ${session.tableNumber}`
                        : `Table ${session.tableNumber} Bag`
                      : isAr
                        ? "سلة الطلبات"
                        : "Order Bag"}
                  </span>
                  <span className="text-[11px] text-white/70">
                    {isAr ? "اضغط للمراجعة والتقسيم" : "Tap to review & split"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <bdi
                  dir="ltr"
                  className="text-sm font-bold text-white tabular-price"
                >
                  <RollingNumber
                    value={cartTotalPiasters / 100}
                    locales="en-EG"
                  />{" "}
                  {isAr ? "ج.م" : "EGP"}
                </bdi>
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black">
                  {isAr ? "افتح السلة" : "Open Bag"}
                </span>
              </div>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Two-Column Desktop / Floating Sheet Mobile Dish Customizer w/ Outside Circular X */}
      <DishCustomizerDrawer
        dish={selectedDish}
        open={drawerOpen}
        onOpenChange={(nextOpen) => {
          setDrawerOpen(nextOpen);
          if (!nextOpen && search.dish) {
            void navigate({
              search: (prev) => ({ ...prev, dish: undefined }),
              replace: true,
            });
          }
        }}
      />

      {/* Upgraded Trailing Side Sheet with Free Perk Progress + Pairs Well With */}
      <TableCartSheet open={bagOpen} onOpenChange={setBagOpen} />
    </div>
  );
}

interface RawMenuSearchInput {
  readonly category?: unknown;
  readonly dish?: unknown;
}

export const Route = createFileRoute("/menu")({
  validateSearch: (raw: RawMenuSearchInput): MenuSearchParams => ({
    category: typeof raw.category === "string" ? raw.category : undefined,
    dish: typeof raw.dish === "string" ? raw.dish : undefined,
  }),
  component: MenuPage,
});
