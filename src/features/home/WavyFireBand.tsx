import { Link } from "@tanstack/react-router";
import { useAppAppearance } from "@/app/locale-context";
import { KraveMark } from "@/components/brand/KraveMark";
import { AppIcon, ArrowRight02Icon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CraftMetric {
  readonly value: string;
  readonly labelEn: string;
  readonly labelAr: string;
}

const CRAFT_METRICS: ReadonlyArray<CraftMetric> = [
  { value: "250°C", labelEn: "Seasoned Cast-Iron", labelAr: "درجة صاج السماش" },
  { value: "48h", labelEn: "Cold-Fermented Dough", labelAr: "تخمير عجينة البيتزا" },
  { value: "100%", labelEn: "Live Oak Charcoal", labelAr: "فحم بلوط طبيعي" },
  { value: "4.9★", labelEn: "Maadi Road 9 Rating", labelAr: "تقييم ضيوف المعادي" },
];

/**
 * High-energy editorial brand break inspired by bold wavy topographic flame stripes
 * (user reference #6), paired with Krave's Kitchen Craft Key Performance Metrics.
 */
export function WavyFireBand() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="relative overflow-hidden rounded-[36px] bg-[#16161B] px-6 py-12 text-white shadow-dock sm:px-12 sm:py-16">
        {/* Bold Wavy Topographic Amber Vermilion Stripes Background */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 420"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 size-full opacity-95"
        >
          <rect width="1200" height="420" fill="#16161B" />
          <g fill="none" stroke="#EB4A1E" strokeWidth="36" strokeLinecap="round" opacity="0.22">
            <path d="M-80 40 C 120 -30, 260 150, 460 70 C 660 -10, 820 170, 1020 80 C 1140 30, 1220 90, 1300 60" />
            <path d="M-80 140 C 130 60, 280 250, 490 165 C 690 85, 840 270, 1040 180 C 1150 130, 1230 190, 1300 160" />
            <path d="M-80 245 C 140 165, 290 355, 510 265 C 710 185, 860 365, 1060 280 C 1160 235, 1240 295, 1300 265" />
            <path d="M-80 350 C 150 270, 310 450, 530 365 C 730 285, 880 455, 1080 375 C 1180 335, 1250 390, 1300 365" />
          </g>
          <g fill="none" stroke="#FF6B35" strokeWidth="10" opacity="0.28">
            <path d="M-80 92 C 125 18, 270 198, 475 118 C 675 38, 830 218, 1030 130 C 1145 80, 1225 140, 1300 110" />
            <path d="M-80 298 C 145 218, 300 405, 520 315 C 720 235, 870 410, 1070 328 C 1170 285, 1245 340, 1300 315" />
          </g>
          <rect
            width="1200"
            height="420"
            fill="url(#wavy-vignette)"
          />
          <defs>
            <linearGradient id="wavy-vignette" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#16161B" stopOpacity="0.88" />
              <stop offset="55%" stopColor="#16161B" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#16161B" stopOpacity="0.85" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-5 lg:col-span-6">
            <div className="flex items-center gap-3">
              <KraveMark variant="ember" className="size-10" />
              <span className="font-mono text-xs font-bold tracking-[0.14em] uppercase text-[#FF8C61]">
                {isAr ? "أرقام من قلب المطبخ" : "HEAT BY THE NUMBERS"}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-balance text-white sm:text-4xl">
              {isAr
                ? "طعم النار الحقيقي بيتقاس بالثانية والدرجة."
                : "Real open fire is measured in degrees, not shortcuts."}
            </h2>

            <p className="max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {isAr
                ? "مفيش فريزر، مفيش تسخين مسبق. كل عجينة بتتخمر 48 ساعة، وكل سماش بينزل على الصاج وقت طلب الترابيزة."
                : "No freezers, no heat lamps. Every sourdough ball rests 48 hours and every smash hits cast-iron the moment your table slides to send."}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/about"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "px-6 font-bold",
                )}
              >
                <span>{isAr ? "اقرأ قصة كريف" : "Read Our Story"}</span>
                <AppIcon
                  icon={ArrowRight02Icon}
                  data-icon="inline-end"
                  mirrorInRtl
                />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 lg:col-span-6">
            {CRAFT_METRICS.map((metric) => (
              <div
                key={metric.value}
                className="flex flex-col gap-1.5 rounded-3xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-md"
              >
                <bdi
                  dir="ltr"
                  className="font-mono text-3xl font-extrabold tracking-tight text-white tabular-price sm:text-4xl"
                >
                  {metric.value}
                </bdi>
                <span className="text-xs font-medium text-white/75">
                  {isAr ? metric.labelAr : metric.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
