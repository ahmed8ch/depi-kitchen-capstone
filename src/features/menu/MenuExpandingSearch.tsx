import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import {
  AppIcon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  Clock01Icon,
  FireIcon,
  Search01Icon,
} from "@/components/icons";
import { MENU_DISHES, type MenuDish } from "@/data/menu-catalog";
import { formatEgp } from "@/domain/money";
import { cn } from "@/lib/utils";

interface MenuExpandingSearchProps {
  readonly query: string;
  readonly onQueryChange: (next: string) => void;
  readonly onSelectDish: (dish: MenuDish) => void;
}

const TRENDING_TERMS_EN: ReadonlyArray<string> = [
  "Double Smash",
  "Hot Honey",
  "Charcoal Kofta",
  "Crispy Pie",
];

const TRENDING_TERMS_AR: ReadonlyArray<string> = [
  "دبل سماش",
  "بيبروني",
  "كفتة على الفحم",
  "فطيرة مقرمشة",
];

/**
 * Expanding Search Command Panel (adapted from DropdownMenu08 with Hugeicons + motion/react):
 * Recent searches, trending fire dishes, live instant results with photos, and keyboard navigation.
 */
export function MenuExpandingSearch({
  query,
  onQueryChange,
  onSelectDish,
}: MenuExpandingSearchProps) {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<Array<string>>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const term = query.trim().toLowerCase();
  const matches = term
    ? MENU_DISHES.filter(
        (d) =>
          d.nameEn.toLowerCase().includes(term) ||
          d.descEn.toLowerCase().includes(term) ||
          d.nameAr.includes(query.trim()),
      ).slice(0, 5)
    : [];

  const trending = isAr ? TRENDING_TERMS_AR : TRENDING_TERMS_EN;

  const pickTerm = (label: string) => {
    onQueryChange(label);
    setRecent((prev) =>
      [label, ...prev.filter((item) => item !== label)].slice(0, 3),
    );
    setActiveIndex(0);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (matches.length === 0) {
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + matches.length) % matches.length);
    } else if (event.key === "Enter") {
      const picked = matches[activeIndex];
      if (picked) {
        event.preventDefault();
        setRecent((prev) =>
          [
            isAr ? picked.nameAr : picked.nameEn,
            ...prev.filter((i) => i !== (isAr ? picked.nameAr : picked.nameEn)),
          ].slice(0, 3),
        );
        setOpen(false);
        onSelectDish(picked);
      }
    }
  };

  return (
    <div ref={wrapRef} className="relative w-full sm:w-64">
      <div
        className={cn(
          "flex h-9 items-center gap-2 rounded-full border bg-card px-3 transition-shadow",
          open
            ? "border-primary/60 ring-3 ring-primary/15"
            : "border-border hover:border-foreground/25",
        )}
      >
        <AppIcon
          icon={Search01Icon}
          size={15}
          className="shrink-0 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            onQueryChange(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={isAr ? "دور على طبق..." : "Search 20 dishes..."}
          aria-label={isAr ? "بحث في المنيو" : "Search dishes"}
          className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {query.length > 0 ? (
          <button
            type="button"
            aria-label={isAr ? "مسح البحث" : "Clear search"}
            onClick={() => {
              onQueryChange("");
              setActiveIndex(0);
              inputRef.current?.focus();
            }}
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
          >
            <AppIcon icon={Cancel01Icon} size={11} />
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="absolute end-0 top-full z-40 mt-2 w-full min-w-[280px] overflow-hidden rounded-3xl border border-border bg-popover p-2 shadow-2xl sm:w-80"
          >
            {term ? (
              matches.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {matches.map((dish, idx) => (
                    <button
                      key={dish.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        setOpen(false);
                        onSelectDish(dish);
                      }}
                      className={cn(
                        "flex items-center gap-2.5 rounded-2xl p-2 text-start transition-colors",
                        activeIndex === idx ? "bg-secondary" : "hover:bg-secondary/60",
                      )}
                    >
                      <img
                        src={dish.image}
                        alt={isAr ? dish.nameAr : dish.nameEn}
                        className="size-10 shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-foreground">
                          {isAr ? dish.nameAr : dish.nameEn}
                        </p>
                        <bdi
                          dir="ltr"
                          className="text-[11px] font-semibold text-primary-ink tabular-price"
                        >
                          {formatEgp(dish.pricePiasters, locale)}
                        </bdi>
                      </div>
                      <AppIcon
                        icon={ArrowUpRight01Icon}
                        size={14}
                        mirrorInRtl
                        className="shrink-0 text-muted-foreground"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-3 py-5 text-center text-xs text-muted-foreground">
                  {isAr ? "مفيش طبق بالاسم ده" : "No dishes match that search."}
                </p>
              )
            ) : (
              <div className="flex flex-col gap-3 p-1.5">
                {recent.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between px-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">
                        {isAr ? "الأخيرة" : "Recent"}
                      </span>
                      <button
                        type="button"
                        onClick={() => setRecent([])}
                        className="text-[10px] font-medium text-muted-foreground hover:text-foreground"
                      >
                        {isAr ? "مسح" : "Clear"}
                      </button>
                    </div>
                    {recent.map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => pickTerm(label)}
                        className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-start text-xs text-foreground hover:bg-secondary"
                      >
                        <AppIcon
                          icon={Clock01Icon}
                          size={13}
                          className="text-muted-foreground"
                        />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                ) : null}

                <div className="flex flex-col gap-1">
                  <span className="px-2 text-[10px] font-bold tracking-wider uppercase text-muted-foreground">
                    {isAr ? "الأكثر طلبا" : "Trending on Fire"}
                  </span>
                  {trending.map((label) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => pickTerm(label)}
                      className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-start text-xs font-medium text-foreground hover:bg-secondary"
                    >
                      <AppIcon
                        icon={FireIcon}
                        size={13}
                        className="text-primary"
                      />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
