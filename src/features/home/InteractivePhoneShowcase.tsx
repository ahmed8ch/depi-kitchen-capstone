import { RollingNumber } from "@kitlangton/rolling-number/react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import {
  AppIcon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  FireIcon,
  Invoice02Icon,
  QrCode01Icon,
  UserGroupIcon,
} from "@/components/icons";
import { AvatarDot } from "@/components/shared/AvatarDot";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { splitEquallyPiasters } from "@/domain/money";
import { cn } from "@/lib/utils";

type ShowcaseStepId = "join" | "order" | "split";

interface ShowcaseStep {
  readonly id: ShowcaseStepId;
  readonly titleEn: string;
  readonly titleAr: string;
  readonly descEn: string;
  readonly descAr: string;
  readonly icon: typeof QrCode01Icon;
  readonly tintClass: string;
}

const SHOWCASE_STEPS: ReadonlyArray<ShowcaseStep> = [
  {
    id: "join",
    titleEn: "Pick or Join a Table",
    titleAr: "افتح أو انضم لترابيزة",
    descEn:
      "Open an empty table in one tap, or enter the 4-digit PIN to join friends already seated.",
    descAr:
      "افتح أي ترابيزة فاضية بضغطة واحدة، أو اكتب كود الترابيزة عشان تنضم لصحابك.",
    icon: QrCode01Icon,
    tintClass: "bg-violet-500/12 text-violet-600 dark:text-violet-300",
  },
  {
    id: "order",
    titleEn: "Customize Together",
    titleAr: "اطلبوا في سلة واحدة",
    descEn:
      "Everyone picks their sear, crust, and toppings into one live table bag with avatar ownership.",
    descAr:
      "كل فرد يختار تسويته وإضافاته في سلة واحدة مشتركة باسمه ولون الأفاتار بتاعه.",
    icon: UserGroupIcon,
    tintClass: "bg-sky-500/12 text-sky-600 dark:text-sky-300",
  },
  {
    id: "split",
    titleEn: "Split to the Piaster",
    titleAr: "قسم الحساب بالقرش",
    descEn:
      "Pay full, pay only your dishes, or split equally with exact integer-piaster precision.",
    descAr:
      "ادفع الفاتورة كاملة، أو أطباقك فقط، أو قسمها بالتساوي بدقة كاملة بدون أي فرق.",
    icon: Invoice02Icon,
    tintClass: "bg-primary/14 text-primary-ink",
  },
];

/**
 * Authentic iPhone 17 Pro Vector Hardware (derived directly from user's IPhone_17_Pro_Vector.svg
 * with Palette B Amber Vermilion titanium chassis + metallic side buttons + optical Dynamic Island lens)
 * wrapping our live interactive React Table & Split-Bill preview.
 */
export function InteractivePhoneShowcase() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const [activeStep, setActiveStep] = useState<ShowcaseStepId>("split");
  const [diners, setDiners] = useState(3);

  const sampleBillPiasters = 98_500;
  const shares = splitEquallyPiasters(sampleBillPiasters, diners);
  const yourShare = shares[0] ?? sampleBillPiasters;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-7, 7]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [5, -5]), {
    stiffness: 180,
    damping: 22,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left: 3-Step Interactive Switcher */}
        <div className="flex flex-col gap-6 lg:col-span-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary-ink">
              <AppIcon icon={QrCode01Icon} size={13} />
              <span>{isAr ? "كيف تطلب في كريف" : "How Table Ordering Works"}</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-balance sm:text-4xl">
              {isAr
                ? "ترابيزة واحدة، سلة مشتركة، وتقسيم حساب في ثواني."
                : "One table, one live bag, zero awkward bill math."}
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              {isAr
                ? "بدل بين الخطوات أو جرب تقسيم الحساب جوه الموبايل التفاعلي."
                : "Tap through each step or test live piaster-accurate bill splitting inside the phone."}
            </p>
          </div>

          <div
            className="flex flex-col gap-3"
            role="tablist"
            aria-label={isAr ? "خطوات الطلب" : "Table workflow"}
          >
            {SHOWCASE_STEPS.map((step, index) => {
              const selected = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    "group flex items-start gap-4 rounded-[24px] p-4 text-start transition-[background-color,box-shadow,transform,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99]",
                    selected
                      ? "bg-card shadow-card-hover ring-1 ring-border"
                      : "bg-surface-tint/70 hover:bg-card/70",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-2xl transition-colors",
                      selected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : step.tintClass,
                    )}
                  >
                    <AppIcon icon={step.icon} size={19} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold tracking-tight text-foreground">
                      <span className="me-1.5 font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                      {isAr ? step.titleAr : step.titleEn}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {isAr ? step.descAr : step.descEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-1">
            <Link
              to="/table"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              <span>{isAr ? "افتح خريطة الترابيزات" : "Open Floor Plan"}</span>
              <AppIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                mirrorInRtl
              />
            </Link>
          </div>
        </div>

        {/* Right: Authentic Amber-Vermilion Titanium iPhone 17 Pro Vector Hardware */}
        <div
          className="relative flex items-center justify-center py-4 lg:col-span-6"
          style={{ perspective: 1100 }}
          onPointerMove={(event) => {
            if (shouldReduceMotion) {
              return;
            }
            const rect = event.currentTarget.getBoundingClientRect();
            const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
            rawX.set(nx);
            rawY.set(ny);
          }}
          onPointerLeave={() => {
            rawX.set(0);
            rawY.set(0);
          }}
        >
          {/* Ambient Brand-Tinted Soft Glow Halo Behind Phone */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 inset-y-8 rounded-full bg-[radial-gradient(circle,oklch(0.605_0.21_35/0.16),transparent_68%)] blur-2xl"
          />

          <motion.div
            style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
            className="relative w-[306px] sm:w-[322px]"
          >
            {/* Notion-style cheeky minimal ink character perched right onto the top shoulder of the iPhone */}
            <svg
              aria-hidden="true"
              viewBox="0 0 76 38"
              fill="none"
              className="pointer-events-none absolute -top-7 end-9 z-0 h-9 w-[74px] text-foreground"
            >
              <path
                d="M10 37C10 17 22 6 38 6C54 6 66 17 66 37"
                className="fill-card stroke-current"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="30" cy="22" r="2.4" fill="currentColor" />
              <circle cx="44" cy="22" r="2.4" fill="currentColor" />
              <path
                d="M36 24L34.5 29.5L39 29.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Exact Aspect Ratio Container matching IPhone_17_Pro_Vector.svg (72.5 x 150) */}
            <div className="relative z-10 aspect-[72.5/150] w-full drop-shadow-[0_32px_60px_rgba(18,18,22,0.28)]">
              {/* Layer 1 (Back): Metallic Amber-Vermilion Titanium Chassis + Hardware Buttons */}
              <svg
                aria-hidden="true"
                viewBox="0 0 72.5 150"
                className="pointer-events-none absolute inset-0 size-full"
              >
                <defs>
                  <linearGradient id="ip17-chassis" x1="0" y1="0" x2="72.5" y2="150" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF7A45" />
                    <stop offset="45%" stopColor="#EB4A1E" />
                    <stop offset="100%" stopColor="#A62D0C" />
                  </linearGradient>
                  <linearGradient id="ip17-btn" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF8654" />
                    <stop offset="100%" stopColor="#B83410" />
                  </linearGradient>
                </defs>
                {/* Left Hardware Buttons (Action + Volume Up/Down) */}
                <rect x="0" y="30.7" width="1.2" height="6.95" rx="0.4" fill="url(#ip17-btn)" />
                <rect x="0" y="42.8" width="1.2" height="11.2" rx="0.4" fill="url(#ip17-btn)" />
                <rect x="0" y="57.0" width="1.2" height="11.2" rx="0.4" fill="url(#ip17-btn)" />
                {/* Right Side Power Button */}
                <rect x="71.3" y="46.6" width="1.2" height="17.8" rx="0.4" fill="url(#ip17-btn)" />
                {/* Outer Titanium Frame (Brand Amber Vermilion) */}
                <rect x="0.45" y="0" width="71.6" height="150" rx="12.87" fill="url(#ip17-chassis)" />
                {/* Subtle Titanium Specular Rim */}
                <rect
                  x="0.95"
                  y="0.5"
                  width="70.6"
                  height="149"
                  rx="12.37"
                  fill="none"
                  stroke="#FFC3A6"
                  strokeOpacity="0.55"
                  strokeWidth="0.45"
                />
                {/* Antenna Lines */}
                <rect x="0.45" y="15.4" width="71.6" height="1.35" fill="#9E2D0F" fillOpacity="0.55" />
                <rect x="0.45" y="133.2" width="71.6" height="1.35" fill="#9E2D0F" fillOpacity="0.55" />
                {/* Deep Gloss Black Display Bezel */}
                <rect x="1.42" y="0.98" width="69.65" height="148.05" rx="11.89" fill="#0B0B0D" />
              </svg>

              {/* Layer 2 (Live Interactive React Screen Clipped Precisely Inside Vector Bezel) */}
              <div
                className="absolute inset-x-[4.02%] inset-y-[1.64%] flex flex-col overflow-hidden rounded-[36px] bg-background text-foreground"
              >
                {/* Status Bar Row (Leaves clean clearance for Dynamic Island overlay) */}
                <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[10px] font-bold text-foreground tabular-price">
                  <bdi dir="ltr">9:41</bdi>
                  <span className="text-[9px] text-muted-foreground">5G</span>
                </div>

                {/* Live Interactive App Screen */}
                <div className="flex flex-1 flex-col justify-between px-4 pt-3 pb-4">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex size-6 items-center justify-center rounded-lg bg-primary text-[11px] font-extrabold text-white">
                          K
                        </span>
                        <span className="text-xs font-extrabold">
                          {isAr ? "ترابيزة 5" : "Table 5"}
                        </span>
                      </div>
                      <div className="flex items-center -space-x-1.5 rtl:space-x-reverse">
                        <AvatarDot avatarId={0} size="xs" className="size-5 ring-2 ring-background" />
                        <AvatarDot avatarId={5} size="xs" className="size-5 ring-2 ring-background" />
                        <AvatarDot avatarId={2} size="xs" className="size-5 ring-2 ring-background" />
                      </div>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      {activeStep === "join" ? (
                        <motion.div
                          key="join"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="flex flex-col gap-3"
                        >
                          <div className="rounded-3xl bg-surface-tint p-3.5 ring-1 ring-border">
                            <p className="text-[11px] font-semibold text-muted-foreground">
                              {isAr ? "كود الترابيزة المشغولة" : "Occupied Table PIN"}
                            </p>
                            <div
                              dir="ltr"
                              className="mt-2.5 grid grid-cols-4 gap-1.5 text-center font-mono text-base font-extrabold tabular-price"
                            >
                              {["4", "8", "2", "9"].map((digit, index) => (
                                <div
                                  key={index}
                                  className="flex h-11 items-center justify-center rounded-xl bg-card ring-1 ring-border"
                                >
                                  {digit}
                                </div>
                              ))}
                            </div>
                            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-card px-3 py-2 text-xs ring-1 ring-border">
                              <span className="text-muted-foreground">
                                {isAr ? "أهلا" : "Guest"}
                              </span>
                              <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                                <AvatarDot avatarId={0} size="xs" className="size-4" />
                                <span>{isAr ? "عمر" : "Omar"}</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 rounded-2xl bg-status-ready-bg px-3 py-2.5 text-[11px] font-semibold text-status-ready">
                            <AppIcon icon={CheckmarkCircle02Icon} size={15} />
                            <span>
                              {isAr
                                ? "متصل مع سلمى وطارق لحظيا"
                                : "Synced live with Salma & Tarek"}
                            </span>
                          </div>
                        </motion.div>
                      ) : activeStep === "order" ? (
                        <motion.div
                          key="order"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="flex flex-col gap-2"
                        >
                          {[
                            {
                              title: isAr ? "دبل سماش" : "Double Smash",
                              owner: isAr ? "أنت" : "You",
                              avatarId: 0,
                              price: "290",
                              img: "/images/dish-smoked-smash.jpg",
                            },
                            {
                              title: isAr ? "بيبروني بالعسل" : "Hot Honey Pizza",
                              owner: isAr ? "سلمى" : "Salma",
                              avatarId: 5,
                              price: "295",
                              img: "/images/dish-hot-honey-pizza.jpg",
                            },
                            {
                              title: isAr ? "كفتة على الفحم" : "Charcoal Kofta",
                              owner: isAr ? "طارق" : "Tarek",
                              avatarId: 2,
                              price: "320",
                              img: "/images/dish-charcoal-kofta.jpg",
                            },
                          ].map((row) => (
                            <div
                              key={row.title}
                              className="flex items-center gap-2.5 rounded-2xl bg-surface-tint p-2 ring-1 ring-border/70"
                            >
                              <img
                                src={row.img}
                                alt={row.title}
                                className="size-10 rounded-xl object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[11px] font-bold text-foreground">
                                  {row.title}
                                </p>
                                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <AvatarDot avatarId={row.avatarId} size="xs" className="size-3" />
                                  <span>{row.owner}</span>
                                </span>
                              </div>
                              <bdi
                                dir="ltr"
                                className="text-[11px] font-bold tabular-price"
                              >
                                {row.price} {isAr ? "ج.م" : "EGP"}
                              </bdi>
                            </div>
                          ))}
                          <div className="mt-1 flex items-center justify-between rounded-2xl bg-foreground px-3 py-2 text-[11px] font-bold text-background">
                            <span className="inline-flex items-center gap-1.5">
                              <AppIcon icon={FireIcon} size={13} className="text-primary" />
                              <span>{isAr ? "جاهز للإرسال" : "Ready to fire"}</span>
                            </span>
                            <bdi dir="ltr" className="tabular-price">
                              905 {isAr ? "ج.م" : "EGP"}
                            </bdi>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="split"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                          className="flex flex-col gap-2.5"
                        >
                          <div className="rounded-3xl bg-surface-tint p-3 ring-1 ring-border">
                            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                              <span>{isAr ? "إجمالي الترابيزة" : "Table Total"}</span>
                              <bdi dir="ltr" className="font-bold text-foreground tabular-price">
                                985 {isAr ? "ج.م" : "EGP"}
                              </bdi>
                            </div>
                            <div className="mt-2.5 flex items-center justify-between gap-2">
                              <span className="text-[11px] font-semibold text-foreground">
                                {isAr ? "تقسيم على" : "Split across"}
                              </span>
                              <div className="flex items-center gap-1">
                                {[2, 3, 4].map((count) => (
                                  <button
                                    key={count}
                                    type="button"
                                    onClick={() => setDiners(count)}
                                    className={cn(
                                      "flex size-7 items-center justify-center rounded-full text-xs font-bold transition-colors tabular-price",
                                      diners === count
                                        ? "bg-foreground text-background"
                                        : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground",
                                    )}
                                  >
                                    {count}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="rounded-3xl bg-card p-3.5 ring-1 ring-border">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-muted-foreground">
                                {isAr ? "حسابك بالظبط" : "Your exact share"}
                              </span>
                              <Badge variant="secondary" className="px-2 py-0 text-[10px]">
                                ÷ {diners}
                              </Badge>
                            </div>
                            <div className="mt-1 flex items-baseline gap-1 text-2xl font-extrabold text-foreground">
                              <bdi dir="ltr" className="tabular-price">
                                <RollingNumber
                                  value={yourShare / 100}
                                  locales="en-EG"
                                  format={{
                                    minimumFractionDigits:
                                      yourShare % 100 === 0 ? 0 : 2,
                                    maximumFractionDigits: 2,
                                  }}
                                />
                              </bdi>
                              <span className="text-xs font-semibold text-muted-foreground">
                                {isAr ? "ج.م" : "EGP"}
                              </span>
                            </div>
                            <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
                              {isAr
                                ? "مجموع الأنصبة = 985 ج.م بالقرش بدون أي فرق."
                                : "Exact integer piasters — zero rounding drift."}
                            </p>
                          </div>

                          <Link
                            to="/table"
                            className={cn(
                              buttonVariants({ variant: "default", size: "sm" }),
                              "w-full rounded-full font-bold",
                            )}
                          >
                            {isAr ? "جرب تقسيم فاتورتك" : "Try Live Split-Bill"}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Home Indicator */}
                  <div className="flex justify-center pt-2">
                    <div
                      aria-hidden="true"
                      className="h-1 w-24 rounded-full bg-foreground/20"
                    />
                  </div>
                </div>
              </div>

              {/* Layer 3 (Front Overlay): Authentic Dynamic Island + Optical Front Camera Lens */}
              <svg
                aria-hidden="true"
                viewBox="0 0 72.5 150"
                className="pointer-events-none absolute inset-0 z-20 size-full"
              >
                <defs>
                  <radialGradient id="ip17-lens" cx="50%" cy="42%" r="55%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
                    <stop offset="55%" stopColor="#1E1B4B" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#050505" />
                  </radialGradient>
                </defs>
                {/* Dynamic Island Pill */}
                <rect x="25.8" y="4.8" width="20.9" height="6.0" rx="3.0" fill="#050505" />
                {/* Camera Sensor Ring + Optical Tint */}
                <circle cx="43.68" cy="7.82" r="1.55" fill="#121218" />
                <circle cx="43.68" cy="7.82" r="0.92" fill="url(#ip17-lens)" />
                <circle cx="43.35" cy="7.45" r="0.28" fill="#C7D2FE" fillOpacity="0.7" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
