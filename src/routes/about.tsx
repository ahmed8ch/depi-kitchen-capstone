import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppAppearance } from "@/app/locale-context";
import { FlameLinkMark } from "@/components/brand/FlameLinkMark";
import { KraveMark } from "@/components/brand/KraveMark";
import {
  AppIcon,
  ArrowRight02Icon,
  ChefHatIcon,
  FireIcon,
  Location01Icon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RESTAURANT_BRAND } from "@/config/brand";
import { WavyFireBand } from "@/features/home/WavyFireBand";

const PILLARS = [
  {
    titleEn: "250°C Seasoned Cast-Iron",
    titleAr: "صاج حديد زهر 250 درجة",
    bodyEn:
      "Fresh ground Egyptian prime beef smashed hard to order — never frozen, never pre-cooked — creating caramelized lacy edges with a juicy center.",
    bodyAr:
      "لحم بلدي فريش بيتضغط بالطلب على صاج 250 درجة عشان يديك الحواف المقرمشة والعصارة المظبوطة.",
  },
  {
    titleEn: "48-Hour Stone-Deck Dough",
    titleAr: "تخمير 48 ساعة على الحجر",
    bodyEn:
      "Every pizza dough ball cold-ferments for 48 hours before blistering on radiant stone with crushed San Marzano tomatoes and buffalo mozzarella.",
    bodyAr:
      "كل عجينة بيتزا بتتخمر على البارد 48 ساعة قبل ما تتخبز على الحجر السخن مع موتزاريلا بافلو فريش.",
  },
  {
    titleEn: "Real Oak Charcoal Embers",
    titleAr: "جمر فحم البلوط الطبيعي",
    bodyEn:
      "Hand-minced kofta and yogurt-herb shish tawook finished over glowing live oak embers, paired with saffron basmati and stone-ground tahina.",
    bodyAr:
      "كفتة مفرومة يوميا وشيش طاووق بالأعشاب مشويين على جمر البلوط مع رز زعفران وطحينة بلدي.",
  },
] as const;

function AboutPage() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";

  return (
    <div className="bg-background text-foreground">
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-12 sm:px-6 sm:pt-16">
        <div className="flex flex-col items-start gap-5">
          <Badge className="bg-primary/12 text-primary-ink hover:bg-primary/12">
            <AppIcon icon={ChefHatIcon} size={13} />
            <span>{isAr ? "قصتنا في المعادي" : "Our Story in Maadi"}</span>
          </Badge>

          <div className="flex items-center gap-4">
            <KraveMark variant="ember" className="size-14 sm:size-16" />
            <h1 className="text-4xl font-extrabold tracking-[-0.04em] sm:text-6xl">
              {isAr
                ? "نار حقيقية. وضيافة من غير تعقيد."
                : "Real fire. Zero-friction hospitality."}
            </h1>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {isAr
              ? "بدأنا كريف في شارع 9 المعادي بفكرة بسيطة: أكل نار مفتوحة معمولة بضمير، مع تجربة ترابيزة ذكية بتخليك إنت وصحابك تطلبوا وتقسموا الحساب في ثواني من غير ما تستنوا الويتر أو الشيك."
              : "Krave started on Road 9 in Maadi with one conviction: open-fire food crafted with obsession, paired with modern table hospitality where friends customize together and split checks without waiting on paper calculators."}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[34px] border border-border bg-card shadow-card-hover">
          <img
            src="/images/hero-hearth-table.jpg"
            alt={isAr ? "مائدة كريف في المعادي" : "Krave Maadi dining table"}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.titleEn}
              className="flex flex-col gap-3 rounded-[28px] border border-border bg-card p-6 shadow-xs"
            >
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <AppIcon icon={FireIcon} size={18} />
              </span>
              <h2 className="text-lg font-extrabold tracking-tight text-foreground">
                {isAr ? pillar.titleAr : pillar.titleEn}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {isAr ? pillar.bodyAr : pillar.bodyEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      <WavyFireBand />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-4 rounded-[30px] border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-1.5 text-xs font-bold text-primary-ink">
                <AppIcon icon={Location01Icon} size={14} />
                <span>{isAr ? "الموقع والمواعيد" : "Visit Road 9"}</span>
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight">
                {isAr ? RESTAURANT_BRAND.locationAr : RESTAURANT_BRAND.locationEn}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isAr ? RESTAURANT_BRAND.hoursAr : RESTAURANT_BRAND.hoursEn} ·{" "}
                <bdi dir="ltr">{RESTAURANT_BRAND.phoneDisplay}</bdi>
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Link
                to="/table"
                className={buttonVariants({ variant: "default" })}
              >
                <span>{isAr ? "افتح خريطة الترابيزات" : "Open Floor Plan"}</span>
                <AppIcon icon={ArrowRight02Icon} data-icon="inline-end" mirrorInRtl />
              </Link>
              <Link
                to="/menu"
                className={buttonVariants({ variant: "outline" })}
              >
                {isAr ? "المنيو الكامل" : "Full Menu"}
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-[30px] border border-border bg-surface-tint p-6 sm:p-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <FlameLinkMark variant="badge" className="size-9 rounded-xl" />
                <span className="text-base font-extrabold text-foreground">
                  Powered by FlameLink
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {isAr
                  ? "صالة كريف مربوطة بنظام FlameLink الذكي اللي بيوصل كل طلب من ترابيزتك لشاشة الشيف مباشرة ويحدث الأصناف النافدة في ثانية."
                  : "Krave's dining room runs on FlameLink — syncing live table bags, integer-piaster bill splits, high-legibility kitchen tickets, and instant 86 stock locks."}
              </p>
            </div>
            <Link
              to="/kds"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {isAr ? "استكشف شاشة المطبخ" : "Explore Kitchen Pass (KDS)"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: AboutPage,
});
