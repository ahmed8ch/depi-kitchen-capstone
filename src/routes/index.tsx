import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import { FlameLinkMark } from "@/components/brand/FlameLinkMark";
import {
  AppIcon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  FireIcon,
  QrCode01Icon,
} from "@/components/icons";
import { SpotlightCard } from "@/components/shared/SpotlightCard";
import { buttonVariants } from "@/components/ui/button";
import { RESTAURANT_BRAND } from "@/config/brand";
import {
  DeliveryAndReserveSection,
  HomeFaqSection,
  SignaturePlateSpotlight,
  StudioFoodGallery,
} from "@/features/home/HomeSections";
import { InteractivePhoneShowcase } from "@/features/home/InteractivePhoneShowcase";
import { WavyFireBand } from "@/features/home/WavyFireBand";
import { cn } from "@/lib/utils";

interface CraftStation {
  readonly id: string;
  readonly categoryQuery: string;
  readonly titleEn: string;
  readonly titleAr: string;
  readonly detailEn: string;
  readonly detailAr: string;
  readonly metricEn: string;
  readonly metricAr: string;
  readonly badgeCls: string;
  readonly image: string;
}

const CRAFT_STATIONS: ReadonlyArray<CraftStation> = [
  {
    id: "smash",
    categoryQuery: "smash-burgers",
    titleEn: "Cast-Iron Smash",
    titleAr: "سماش على الصاج",
    detailEn:
      "Prime beef pressed hard on seasoned 250°C steel for caramelized lace edges.",
    detailAr:
      "برجر لحم بلدي مضغوط على صاج 250 درجة لحواف مقرمشة وعصارة متماسكة.",
    metricEn: "250°C Steel",
    metricAr: "صاج 250°",
    badgeCls: "bg-primary text-white",
    image: "/images/dish-smoked-smash.jpg",
  },
  {
    id: "deck",
    categoryQuery: "stone-deck-pizza",
    titleEn: "48h Stone-Deck",
    titleAr: "فرن حجري 48 ساعة",
    detailEn:
      "Cold-fermented dough blistered on radiant stone with cupped pepperoni and hot honey.",
    detailAr:
      "عجينة متخمرة 48 ساعة ومخبوزة على الحجر مع بيبروني وعسل حراق.",
    metricEn: "48h Dough",
    metricAr: "تخمير 48 ساعة",
    badgeCls: "bg-amber-600 text-white",
    image: "/images/dish-hot-honey-pizza.jpg",
  },
  {
    id: "charcoal",
    categoryQuery: "charcoal-grill-bowls",
    titleEn: "Oak Charcoal",
    titleAr: "مشويات على الفحم",
    detailEn:
      "Hand-minced kofta and herb tawook finished over glowing oak embers before the pass.",
    detailAr:
      "كفتة بلدي وشيش طاووق مشوي على جمر البلوط مع رز زعفران وطحينة.",
    metricEn: "Oak Embers",
    metricAr: "فحم البلوط",
    badgeCls: "bg-emerald-600 text-white",
    image: "/images/dish-charcoal-kofta.jpg",
  },
];

function HomePage() {
  const { locale } = useAppAppearance();
  const { orders } = useKraveStore();
  const isAr = locale === "ar";
  const previewOrders = orders.slice(0, 2);

  return (
    <div id="top" className="bg-background text-foreground">
      {/* 1. Sunlit Storytelling Hero w/ Subtle Amber Vermilion Ambient Glass Tint & Clear Flow */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_55%_at_50%_0%,oklch(0.605_0.21_35/0.11),transparent_72%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs backdrop-blur-md">
              <span className="size-2 rounded-full bg-primary" />
              <span>
                {isAr
                  ? `${RESTAURANT_BRAND.locationAr} · مفتوح يوميا 12 ظهرا – 1 صباحا`
                  : `${RESTAURANT_BRAND.locationEn} · Open daily 12 PM – 1 AM`}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-balance sm:text-6xl lg:text-[4.35rem] lg:leading-[1.03]">
              {isAr ? (
                <>
                  نار مفتوحة.{" "}
                  <span className="text-primary">وطلب واحد للترابيزة.</span>
                </>
              ) : (
                <>
                  Open-fire craft.{" "}
                  <span className="text-primary">Ordered together.</span>
                </>
              )}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {isAr
                ? "اختار ترابيزتك في صالة المعادي، خصص كل برجر وبيتزا مع صحابك في سلة واحدة، وقسم الفاتورة بالقرش في ثواني."
                : "Claim a table on our Maadi floor plan, customize every sear and crust together in one bag, and split the bill cleanly to the piaster."}
            </p>

            {/* Clear 3-Action Story Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/menu"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-12 px-7 text-sm font-bold shadow-sm",
                )}
              >
                <span>{isAr ? "افتح المنيو (20 طبق)" : "Explore Menu"}</span>
                <AppIcon
                  icon={ArrowRight02Icon}
                  data-icon="inline-end"
                  mirrorInRtl
                />
              </Link>
              <Link
                to="/table"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 bg-card px-6 text-sm font-semibold",
                )}
              >
                <AppIcon icon={QrCode01Icon} data-icon="inline-start" />
                <span>{isAr ? "انضم لترابيزة" : "Join a Table"}</span>
              </Link>
              <a
                href="#reserve"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "h-12 px-5 text-sm font-semibold text-muted-foreground hover:text-foreground",
                )}
              >
                <AppIcon icon={Calendar03Icon} data-icon="inline-start" />
                <span>{isAr ? "احجز مسبقا" : "Reserve"}</span>
              </a>
            </div>

            {/* Clean 3-Step Story Strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground">
                1. {isAr ? "اختر الترابيزة" : "Pick your table"}
              </span>
              <span aria-hidden="true" className="text-primary">
                →
              </span>
              <span className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground">
                2. {isAr ? "خصص طلبك" : "Customize dishes"}
              </span>
              <span aria-hidden="true" className="text-primary">
                →
              </span>
              <span className="rounded-full border border-border bg-card px-3.5 py-1.5 text-foreground">
                3. {isAr ? "قسّم واسحب للمطبخ" : "Split & fire live"}
              </span>
            </div>
          </div>

          {/* Unobstructed Rounded Architectural Hero Food Spread (ZERO giant bill bar!) */}
          <div className="relative mt-10 overflow-hidden rounded-[34px] border border-border/80 bg-card shadow-card-hover sm:mt-14">
            <img
              src="/images/hero-hearth-table.jpg"
              alt={
                isAr
                  ? "طاولة كريف في المعادي عليها دبل سماش برجر وبيتزا فرن حجري وبطاطس ومشروب ليمون بالنعناع"
                  : "Krave sunlit table spread featuring a double smash burger, stone-deck pepperoni pizza, skin-on fries, and sparkling lemon mint"
              }
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
            />
          </div>
        </div>
      </section>

      {/* 2. Interactive 4-Plate Rotating Showcase w/ Maadi Guest Reviews */}
      <SignaturePlateSpotlight />

      {/* 3. Authentic Amber-Vermilion iPhone 17 Pro Interactive Table Showcase */}
      <InteractivePhoneShowcase />

      {/* 4. Three Open-Fire Craft Stations — Real Bespoke Food Photography */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              {isAr ? "ثلاث محطات نار مفتوحة" : "Three Open-Fire Stations"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isAr
                ? "كل محطة شغالة بنارها الخاصة عشان كل طبق يطلع في أقصى لذته."
                : "Dedicated cast-iron, stone deck, and oak-ember lines firing in sync."}
            </p>
          </div>
          <Link
            to="/menu"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <span>{isAr ? "عرض الـ 20 طبق" : "See all 20 dishes"}</span>
            <AppIcon
              icon={ArrowRight02Icon}
              data-icon="inline-end"
              mirrorInRtl
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CRAFT_STATIONS.map((station) => (
            <SpotlightCard
              key={station.id}
              className="group flex flex-col overflow-hidden rounded-[30px] border border-border/80 bg-card p-3 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="relative overflow-hidden rounded-[22px]">
                <img
                  src={station.image}
                  alt={isAr ? station.titleAr : station.titleEn}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                />
                <span
                  className={cn(
                    "absolute start-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold shadow-sm",
                    station.badgeCls,
                  )}
                >
                  {isAr ? station.metricAr : station.metricEn}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4 px-2.5 pt-4 pb-2">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-extrabold tracking-tight text-foreground">
                    {isAr ? station.titleAr : station.titleEn}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {isAr ? station.detailAr : station.detailEn}
                  </p>
                </div>

                <Link
                  to="/menu"
                  search={{ category: station.categoryQuery }}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "w-fit px-0 font-bold text-primary-ink hover:bg-transparent hover:text-primary",
                  )}
                >
                  <span>{isAr ? "تصفح القسم" : "Browse station"}</span>
                  <AppIcon
                    icon={ArrowRight02Icon}
                    data-icon="inline-end"
                    mirrorInRtl
                  />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 5. PewDiePie-Inspired Wavy Flame Stripe Energy Band + Key Craft Metrics */}
      <WavyFireBand />

      {/* 6. Ambient 6-Photo Studio Food Bento Gallery */}
      <StudioFoodGallery />

      {/* 7. Maadi Delivery & App Waitlist + Simple Table Reservation Form */}
      <DeliveryAndReserveSection />

      {/* 8. High-Legibility Light-Paper-on-Obsidian FlameLink Kitchen Pass Preview Band */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div
          data-surface="dark-pass"
          className="overflow-hidden rounded-[36px] border border-white/10 bg-[#121216] px-6 py-10 text-white shadow-dock sm:px-10 sm:py-12"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-5">
              <div className="flex items-center gap-3">
                <FlameLinkMark variant="badge" className="size-9 rounded-xl" />
                <span className="text-sm font-bold tracking-tight text-white">
                  FlameLink Kitchen Pass
                </span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-balance text-white sm:text-4xl">
                {isAr
                  ? "شاشة مطبخ واضحة القراءة من 6 أقدام."
                  : "High-legibility paper tickets built for real fire lines."}
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                {isAr
                  ? "كروت فاتحة مريحة للعين على شاشة داكنة ضد الانعكاس، بألوان حالة واضحة وإيقاف فوري للأصناف النافدة."
                  : "Crisp light paper ticket cards on an anti-glare obsidian rail — bold 18px dish typography, color-coded status headers, and 1-tap 86 stock locks."}
              </p>
              <div className="pt-1">
                <Link
                  to="/kds"
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "px-6 font-bold",
                  )}
                >
                  <span>{isAr ? "افتح شاشة المطبخ" : "Open Kitchen Pass"}</span>
                  <AppIcon
                    icon={ArrowUpRight01Icon}
                    data-icon="inline-end"
                    mirrorInRtl
                  />
                </Link>
              </div>
            </div>

            {/* Preview of our New High-Legibility Light Paper Ticket Cards on Dark Rail */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {previewOrders.map((order) => {
                const headerCls =
                  order.status === "ready"
                    ? "bg-emerald-600 text-white"
                    : order.status === "firing"
                      ? "bg-amber-500 text-[#121216]"
                      : "bg-blue-600 text-white";

                const statusLabel =
                  order.status === "ready"
                    ? isAr
                      ? "جاهز"
                      : "Ready"
                    : order.status === "firing"
                      ? isAr
                        ? "على النار"
                        : "On the Fire"
                      : isAr
                        ? "أوردر جديد"
                        : "New Ticket";

                return (
                  <div
                    key={order.id}
                    className="overflow-hidden rounded-[24px] bg-[#FAF9F6] text-[#18181B] shadow-lg"
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between px-4 py-2.5 text-xs font-extrabold",
                        headerCls,
                      )}
                    >
                      <span>
                        {isAr
                          ? `ترابيزة ${order.tableNumber}`
                          : `Table ${order.tableNumber}`}{" "}
                        · #{order.id}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <AppIcon icon={FireIcon} size={12} />
                        <span>{statusLabel}</span>
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div
                          key={`${order.id}-${idx}`}
                          className="flex items-start justify-between gap-2 text-sm font-bold text-[#18181B]"
                        >
                          <span>
                            <span className="me-1.5 inline-flex size-5 items-center justify-center rounded-md bg-[#18181B] font-mono text-xs text-white">
                              {item.quantity}
                            </span>
                            {isAr ? item.nameAr : item.nameEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Common Dining Questions FAQ Accordion */}
      <HomeFaqSection />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
