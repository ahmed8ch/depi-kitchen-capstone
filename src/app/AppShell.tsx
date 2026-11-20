import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAppAppearance, type AppLocale } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import { KraveMark } from "@/components/brand/KraveMark";
import {
  AppIcon,
  ArrowDown01Icon,
  ArrowRight02Icon,
  Cancel01Icon,
  Globe02Icon,
  Menu01Icon,
  QrCode01Icon,
  ShoppingBag01Icon,
  UserCircleIcon,
} from "@/components/icons";
import { AsciiFooter } from "@/components/layout/AsciiFooter";
import { AvatarDot } from "@/components/shared/AvatarDot";
import { Button, buttonVariants } from "@/components/ui/button";
import { RESTAURANT_BRAND } from "@/config/brand";
import { cn } from "@/lib/utils";

interface NavItem {
  readonly to: "/" | "/menu" | "/table" | "/track" | "/about" | "/kds";
  readonly labelEn: string;
  readonly labelAr: string;
}

interface MenuSubItem {
  readonly category: string;
  readonly titleEn: string;
  readonly titleAr: string;
  readonly descEn: string;
  readonly descAr: string;
  readonly image: string;
}

const MENU_SUBMENU_ITEMS: ReadonlyArray<MenuSubItem> = [
  {
    category: "smash-burgers",
    titleEn: "Cast-Iron Smash",
    titleAr: "سماش برجر",
    descEn: "Lacy-edged seared beef on toasted potato rolls.",
    descAr: "بيف سماش مقرمش على صاج 250 درجة.",
    image: "/images/dish-smoked-smash.jpg",
  },
  {
    category: "stone-deck-pizza",
    titleEn: "Stone-Deck Pizza",
    titleAr: "بيتزا فرن حجري",
    descEn: "48h sourdough blistered with hot honey & buffalo mozzarella.",
    descAr: "عجينة 48 ساعة مخبوزة على الحجر.",
    image: "/images/dish-hot-honey-pizza.jpg",
  },
  {
    category: "charcoal-grill-bowls",
    titleEn: "Oak Charcoal Grill",
    titleAr: "مشويات على الفحم",
    descEn: "Hand-minced kofta, herb tawook & high-protein bowls.",
    descAr: "كفتة وشيش طاووق وبولز بروتين على الفحم.",
    image: "/images/dish-charcoal-kofta.jpg",
  },
  {
    category: "drinks-hot-pies",
    titleEn: "Craft Drinks & Hot Pies",
    titleAr: "مشروبات وفطاير سخنة",
    descEn: "Sparkling karkadeh mint, V7 sodas & warm turnover pies.",
    descAr: "كركديه فوار وفطاير مقرمشة سخنة بالطلب.",
    image: "/images/dish-turnover-pie.jpg",
  },
];

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { to: "/", labelEn: "Home", labelAr: "الرئيسية" },
  { to: "/menu", labelEn: "Menu", labelAr: "المنيو" },
  { to: "/table", labelEn: "Table", labelAr: "الترابيزة" },
  { to: "/track", labelEn: "Track", labelAr: "المتابعة" },
  { to: "/about", labelEn: "About", labelAr: "قصتنا" },
  { to: "/kds", labelEn: "Kitchen Pass", labelAr: "المطبخ" },
];

export function AppShell({ children }: { readonly children: ReactNode }) {
  const { locale, setLocale } = useAppAppearance();
  const { cartItemCount, session, account } = useKraveStore();
  const isAr = locale === "ar";
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuPreviewOpen, setMenuPreviewOpen] = useState(false);
  const [hoveredStationIdx, setHoveredStationIdx] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const closeTimerRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setMenuPreviewOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isRouteActive = (to: NavItem["to"]) => {
    if (to === "/") {
      return pathname === "/";
    }
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  const openSubmenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuPreviewOpen(true);
  };

  const scheduleCloseSubmenu = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setMenuPreviewOpen(false);
    }, 160);
  };

  const activePreview =
    MENU_SUBMENU_ITEMS[hoveredStationIdx] ?? MENU_SUBMENU_ITEMS[0]!;

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* Stitch Loop Scroll-Morph Navbar: Flat & flush at scrollY=0 -> Floating frosted pill on scroll */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-[padding] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
          isScrolled ? "px-4 pt-3 sm:px-6" : "px-4 pt-2 sm:px-6",
        )}
      >
        <div
          className={cn(
            "relative mx-auto flex items-center justify-between gap-2 transition-[max-width,padding,background-color,border-color,box-shadow,border-radius] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isScrolled
              ? "max-w-5xl rounded-full border border-border/80 bg-glass px-3.5 py-2 shadow-glass backdrop-blur-xl"
              : "max-w-6xl rounded-full border border-transparent bg-transparent px-1 py-2.5 shadow-none",
          )}
        >
          {/* Bespoke Negative-Space Geometric K-Flame Brand Mark */}
          <Link
            to="/"
            onClick={() => setLogoClicks((count) => count + 1)}
            className="flex shrink-0 items-center gap-2.5 rounded-full py-0.5 pe-2 text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <motion.span
              key={logoClicks}
              animate={
                shouldReduceMotion || logoClicks === 0
                  ? undefined
                  : { rotate: [0, -8, 6, -3, 0], scale: [1, 1.07, 1] }
              }
              transition={{ duration: 0.36, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 whitespace-nowrap"
            >
              <KraveMark variant="badge" className="size-8" />
              <span className="text-base font-extrabold tracking-tight">
                {isAr ? RESTAURANT_BRAND.nameAr : RESTAURANT_BRAND.nameEn}
              </span>
            </motion.span>
          </Link>

          {/* Desktop Primary Nav + Hover Preview Submenu on Menu */}
          <nav
            aria-label={isAr ? "التنقل الرئيسي" : "Primary"}
            className="hidden items-center gap-0.5 lg:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(item.to);
              if (item.to === "/menu") {
                return (
                  <div
                    key={item.to}
                    className="relative"
                    onMouseEnter={openSubmenu}
                    onMouseLeave={scheduleCloseSubmenu}
                  >
                    <Link
                      to="/menu"
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuPreviewOpen(false)}
                      className={cn(
                        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                        active
                          ? "bg-secondary font-semibold text-foreground ring-1 ring-border"
                          : "font-medium text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                      )}
                    >
                      <span>{isAr ? item.labelAr : item.labelEn}</span>
                      <AppIcon
                        icon={ArrowDown01Icon}
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          menuPreviewOpen && "rotate-180",
                        )}
                      />
                    </Link>

                    {/* shadcnspace-inspired Two-Column Photo Preview Submenu */}
                    <AnimatePresence>
                      {menuPreviewOpen ? (
                        <motion.div
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: 8, scale: 0.98 }
                          }
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={
                            shouldReduceMotion
                              ? undefined
                              : { opacity: 0, y: 6, scale: 0.98 }
                          }
                          transition={{
                            duration: 0.18,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          onMouseEnter={openSubmenu}
                          onMouseLeave={scheduleCloseSubmenu}
                          className="absolute start-1/2 top-full z-50 mt-3 w-[560px] -translate-x-1/2 rtl:translate-x-1/2 overflow-hidden rounded-[26px] border border-border bg-popover p-2.5 shadow-2xl"
                        >
                          <div className="grid grid-cols-[1.05fr_1fr] gap-2.5">
                            <div className="flex flex-col gap-1">
                              {MENU_SUBMENU_ITEMS.map((sub, idx) => (
                                <Link
                                  key={sub.category}
                                  to="/menu"
                                  search={{ category: sub.category }}
                                  onMouseEnter={() => setHoveredStationIdx(idx)}
                                  onFocus={() => setHoveredStationIdx(idx)}
                                  onClick={() => setMenuPreviewOpen(false)}
                                  className={cn(
                                    "flex flex-col gap-0.5 rounded-2xl px-3.5 py-2.5 text-start transition-colors",
                                    hoveredStationIdx === idx
                                      ? "bg-secondary text-foreground"
                                      : "text-foreground hover:bg-secondary/60",
                                  )}
                                >
                                  <span className="text-sm font-semibold">
                                    {isAr ? sub.titleAr : sub.titleEn}
                                  </span>
                                  <span className="line-clamp-2 text-xs text-muted-foreground">
                                    {isAr ? sub.descAr : sub.descEn}
                                  </span>
                                </Link>
                              ))}
                            </div>

                            <Link
                              to="/menu"
                              search={{ category: activePreview.category }}
                              onClick={() => setMenuPreviewOpen(false)}
                              className="group relative overflow-hidden rounded-[20px] bg-surface-tint"
                            >
                              <img
                                src={activePreview.image}
                                alt={
                                  isAr
                                    ? activePreview.titleAr
                                    : activePreview.titleEn
                                }
                                className="h-full min-h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs font-semibold text-white">
                                <span>
                                  {isAr
                                    ? activePreview.titleAr
                                    : activePreview.titleEn}
                                </span>
                                <AppIcon
                                  icon={ArrowRight02Icon}
                                  size={14}
                                  mirrorInRtl
                                />
                              </div>
                            </Link>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                    active
                      ? "bg-secondary font-semibold text-foreground ring-1 ring-border"
                      : "font-medium text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                  )}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </Link>
              );
            })}
          </nav>

          {/* Right Utility & Logical CTA Cluster */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Compact Minimal Bag Dot ONLY when items exist (Zero giant homepage bill!) */}
            {cartItemCount > 0 ? (
              <Link
                to="/table"
                aria-label={
                  isAr
                    ? `سلة الطلبات (${cartItemCount})`
                    : `Table bag (${cartItemCount} items)`
                }
                className="relative flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
              >
                <AppIcon icon={ShoppingBag01Icon} size={16} />
                <span className="absolute -end-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground tabular-price ring-2 ring-background">
                  {cartItemCount}
                </span>
              </Link>
            ) : null}

            {/* Clean Icon-Only Bilingual Language Switcher */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="relative size-9 rounded-full"
              title={
                locale === "en"
                  ? "Switch to Arabic (عربي)"
                  : "Switch to English (EN)"
              }
              aria-label={
                locale === "en" ? "Switch to Arabic" : "Switch to English"
              }
              onClick={() =>
                setLocale((locale === "en" ? "ar" : "en") as AppLocale)
              }
            >
              <AppIcon icon={Globe02Icon} size={16} />
              <span className="pointer-events-none absolute -bottom-0.5 -end-0.5 rounded-full bg-foreground px-1 text-[8px] leading-tight font-bold text-background">
                {locale === "en" ? "ع" : "EN"}
              </span>
            </Button>

            {/* Optional Account Avatar Pill (or crisp Sign-In icon button) */}
            <Link
              to="/account"
              aria-label={
                account
                  ? `${account.name} account`
                  : isAr
                    ? "حسابي"
                    : "Account & Sign In"
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border bg-card transition-colors hover:bg-secondary",
                account ? "py-1 ps-1 pe-2.5" : "size-9 justify-center",
              )}
            >
              {account ? (
                <>
                  <AvatarDot
                    avatarId={account.avatarId}
                    name={account.name}
                    size="xs"
                  />
                  <span className="hidden max-w-20 truncate text-xs font-semibold text-foreground sm:inline">
                    {account.name.split(" ")[0]}
                  </span>
                </>
              ) : (
                <AppIcon icon={UserCircleIcon} size={17} />
              )}
            </Link>

            {/* Logical Primary Action: NEVER shows fake "Table 5" before joining! */}
            {session.isJoined ? (
              <Link
                to="/table"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "hidden whitespace-nowrap sm:inline-flex",
                )}
              >
                <AppIcon icon={QrCode01Icon} data-icon="inline-start" />
                <span>
                  {isAr
                    ? `ترابيزة ${session.tableNumber}`
                    : `Table ${session.tableNumber}`}
                </span>
              </Link>
            ) : pathname === "/menu" ? (
              <Link
                to="/table"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "hidden whitespace-nowrap sm:inline-flex",
                )}
              >
                <AppIcon icon={QrCode01Icon} data-icon="inline-start" />
                <span>{isAr ? "اختر ترابيزة" : "Join Table"}</span>
              </Link>
            ) : (
              <Link
                to="/menu"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "hidden whitespace-nowrap sm:inline-flex",
                )}
              >
                <span>{isAr ? "افتح المنيو" : "Explore Menu"}</span>
                <AppIcon
                  icon={ArrowRight02Icon}
                  data-icon="inline-end"
                  mirrorInRtl
                />
              </Link>
            )}

            {/* Apple Card-Shaped Mobile Menu Trigger */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-expanded={mobileMenuOpen}
              aria-label={isAr ? "افتح القائمة" : "Open menu"}
              onClick={() => setMobileMenuOpen(true)}
              className="size-9 rounded-full lg:hidden"
            >
              <AppIcon icon={Menu01Icon} size={17} />
            </Button>
          </div>
        </div>
      </header>

      {/* Apple Card-Shaped Floating Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={isAr ? "القائمة الرئيسية" : "Navigation menu"}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: -16, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, y: -12, scale: 0.97 }
              }
              transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-x-4 top-4 z-50 mx-auto max-w-sm overflow-hidden rounded-[28px] border border-border bg-card p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-2.5">
                  <KraveMark variant="badge" className="size-7" />
                  <span className="text-base font-bold tracking-tight text-foreground">
                    {isAr ? "القائمة" : "Menu"}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={isAr ? "إغلاق" : "Close"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
                >
                  <AppIcon icon={Cancel01Icon} size={18} />
                </button>
              </div>

              <div className="border-t border-border py-5">
                <nav className="flex flex-col gap-3">
                  {NAV_ITEMS.map((item) => {
                    const active = isRouteActive(item.to);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 text-2xl font-semibold tracking-tight transition-colors",
                          active
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {active ? (
                          <span
                            aria-hidden="true"
                            className="inline-block h-0.5 w-5 rounded-full bg-primary"
                          />
                        ) : null}
                        <span>{isAr ? item.labelAr : item.labelEn}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  {account ? (
                    <>
                      <AvatarDot
                        avatarId={account.avatarId}
                        name={account.name}
                        size="xs"
                      />
                      <span>{account.name}</span>
                    </>
                  ) : (
                    <>
                      <AppIcon icon={UserCircleIcon} size={18} />
                      <span>{isAr ? "تسجيل الدخول" : "Sign In"}</span>
                    </>
                  )}
                </Link>

                <Link
                  to="/table"
                  onClick={() => setMobileMenuOpen(false)}
                  className={buttonVariants({ variant: "default", size: "sm" })}
                >
                  {session.isJoined
                    ? isAr
                      ? `ترابيزة ${session.tableNumber}`
                      : `Table ${session.tableNumber}`
                    : isAr
                      ? "انضم للترابيزة"
                      : "Join Table"}
                </Link>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <AsciiFooter />
    </div>
  );
}
