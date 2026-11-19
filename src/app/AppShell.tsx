import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  useAppAppearance,
  type AppAccent,
  type AppLocale,
} from "@/app/locale-context";
import { FlameLinkMark } from "@/components/brand/FlameLinkMark";
import {
  AppIcon,
  ArrowRight02Icon,
  Globe02Icon,
  Menu01Icon,
} from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface NavItem {
  to: "/" | "/menu" | "/table" | "/kds";
  labelEn: string;
  labelAr: string;
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { to: "/", labelEn: "Home", labelAr: "الرئيسية" },
  { to: "/menu", labelEn: "Menu", labelAr: "المنيو" },
  { to: "/table", labelEn: "Table", labelAr: "الترابيزة" },
  { to: "/kds", labelEn: "Kitchen Pass", labelAr: "شاشة المطبخ" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { locale, setLocale, dir, accent, setAccent } = useAppAppearance();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [isCompact, setIsCompact] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isRouteActive = (to: NavItem["to"]) => {
    if (to === "/") {
      return pathname === "/";
    }
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-3 rounded-full border border-border/80 bg-glass backdrop-blur-xl transition-all duration-300",
            isCompact
              ? "max-w-4xl px-4 py-2 shadow-glass"
              : "max-w-6xl px-5 py-2.5 shadow-sm",
          )}
        >
          <Link
            to="/"
            onClick={() => setLogoClicks((count) => count + 1)}
            className="flex shrink-0 items-center gap-2.5 rounded-full py-1 pe-2 text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <motion.span
              key={logoClicks}
              animate={
                shouldReduceMotion || logoClicks === 0
                  ? undefined
                  : { rotate: [0, -10, 8, -4, 0], scale: [1, 1.08, 1] }
              }
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center"
            >
              <FlameLinkMark variant="mark" className="h-7 w-auto" />
            </motion.span>
            <span className="text-sm font-semibold tracking-tight">
              FlameLink
            </span>
          </Link>

          <nav
            aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}
            className="hidden items-center gap-1 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
                    active
                      ? "bg-secondary font-semibold text-foreground ring-1 ring-border"
                      : "font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  {locale === "ar" ? item.labelAr : item.labelEn}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ToggleGroup
              aria-label={locale === "ar" ? "لون المطعم" : "Accent preset"}
              value={[accent]}
              onValueChange={(nextValues) => {
                const picked = nextValues[0];
                if (picked === "crimson" || picked === "coral") {
                  setAccent(picked);
                }
              }}
              variant="outline"
              size="sm"
              spacing={0}
              className="hidden sm:flex"
            >
              <ToggleGroupItem
                value="crimson"
                aria-label="Rose Crimson accent"
                className="text-xs"
              >
                {locale === "ar" ? "قرمزي" : "Rose"}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="coral"
                aria-label="Coral Orange accent"
                className="text-xs"
              >
                {locale === "ar" ? "مرجاني" : "Coral"}
              </ToggleGroupItem>
            </ToggleGroup>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setLocale((locale === "en" ? "ar" : "en") as AppLocale)
              }
              aria-label={
                locale === "en" ? "Switch to Arabic" : "Switch to English"
              }
            >
              <AppIcon icon={Globe02Icon} data-icon="inline-start" />
              <span>{locale === "en" ? "عربي" : "EN"}</span>
            </Button>

            <Link
              to="/menu"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "hidden sm:inline-flex",
              )}
            >
              <span>{locale === "ar" ? "شوف المنيو" : "Explore Menu"}</span>
              <AppIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                mirrorInRtl
              />
            </Link>

            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    aria-label={
                      locale === "ar" ? "افتح القائمة" : "Open navigation"
                    }
                    className="md:hidden"
                  />
                }
              >
                <AppIcon icon={Menu01Icon} />
              </SheetTrigger>
              <SheetContent side={dir === "rtl" ? "left" : "right"}>
                <SheetHeader>
                  <SheetTitle>
                    {locale === "ar" ? "القائمة" : "Navigation"}
                  </SheetTitle>
                  <SheetDescription>
                    {locale === "ar"
                      ? "اطلب على الترابيزة وتابع الأوردر لحظة بلحظة"
                      : "Order at your table and follow the kitchen pass live."}
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2 px-6">
                  {NAV_ITEMS.map((item) => {
                    const active = isRouteActive(item.to);
                    return (
                      <SheetClose
                        key={item.to}
                        render={
                          <Link
                            to={item.to}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors",
                              active
                                ? "bg-secondary font-semibold text-foreground ring-1 ring-border"
                                : "font-medium text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                            )}
                          />
                        }
                        nativeButton={false}
                      >
                        <span>
                          {locale === "ar" ? item.labelAr : item.labelEn}
                        </span>
                        <AppIcon
                          icon={ArrowRight02Icon}
                          size={16}
                          mirrorInRtl
                        />
                      </SheetClose>
                    );
                  })}
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      {locale === "ar" ? "لون المطعم" : "Accent token"}
                    </span>
                    <ToggleGroup
                      value={[accent]}
                      onValueChange={(nextValues) => {
                        const picked = nextValues[0] as AppAccent | undefined;
                        if (picked === "crimson" || picked === "coral") {
                          setAccent(picked);
                        }
                      }}
                      variant="outline"
                      size="sm"
                      spacing={0}
                    >
                      <ToggleGroupItem value="crimson" className="text-xs">
                        {locale === "ar" ? "قرمزي" : "Rose"}
                      </ToggleGroupItem>
                      <ToggleGroupItem value="coral" className="text-xs">
                        {locale === "ar" ? "مرجاني" : "Coral"}
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
