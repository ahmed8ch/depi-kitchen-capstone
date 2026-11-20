import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import {
  AppIcon,
  ArrowDown01Icon,
  ArrowRight02Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  DeliveryTruck01Icon,
  SmartPhone01Icon,
  StarIcon,
} from "@/components/icons";
import { AvatarDot } from "@/components/shared/AvatarDot";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface SignaturePlateItem {
  readonly slug: string;
  readonly nameEn: string;
  readonly nameAr: string;
  readonly priceEn: string;
  readonly priceAr: string;
  readonly image: string;
  readonly reviewerName: string;
  readonly reviewerAvatarId: number;
  readonly quoteEn: string;
  readonly quoteAr: string;
}

const SIGNATURE_PLATES: ReadonlyArray<SignaturePlateItem> = [
  {
    slug: "double-smash-burger",
    nameEn: "Double Smash",
    nameAr: "دبل سماش",
    priceEn: "245 EGP",
    priceAr: "245 ج.م",
    image: "/images/dish-smoked-smash.jpg",
    reviewerName: "Nada M.",
    reviewerAvatarId: 5,
    quoteEn:
      "The lacy crispy edges on the Double Smash are genuinely the best in Maadi.",
    quoteAr: "الحواف المقرمشة بتاعة الدبل سماش بجد أحلى سماش جربته في المعادي.",
  },
  {
    slug: "hot-honey-pepperoni-pizza",
    nameEn: "Hot Honey Pepperoni",
    nameAr: "بيبروني بالعسل الحراق",
    priceEn: "295 EGP",
    priceAr: "295 ج.م",
    image: "/images/dish-hot-honey-pizza.jpg",
    reviewerName: "Karim H.",
    reviewerAvatarId: 2,
    quoteEn:
      "48-hour sourdough crust plus wild hot honey — our whole table ordered a second one.",
    quoteAr:
      "عجينة الفرن الحجري مع العسل الحراق خطيرة، الترابيزة كلها طلبت واحدة تانية.",
  },
  {
    slug: "charcoal-kofta-platter",
    nameEn: "Charcoal Kofta Platter",
    nameAr: "طبق كفتة على الفحم",
    priceEn: "320 EGP",
    priceAr: "320 ج.م",
    image: "/images/dish-charcoal-kofta.jpg",
    reviewerName: "Youssef A.",
    reviewerAvatarId: 3,
    quoteEn:
      "Real oak smoke flavor, juicy skewers, and saffron rice done right.",
    quoteAr: "ريحة الفحم الأصلية والكفتة الطرية مع رز الزعفران مظبوطة على الشعر.",
  },
  {
    slug: "hot-crispy-pie",
    nameEn: "Hot Crispy Turnover Pie",
    nameAr: "فطيرة مقرمشة سخنة",
    priceEn: "115 EGP",
    priceAr: "115 ج.م",
    image: "/images/dish-turnover-pie.jpg",
    reviewerName: "Salma R.",
    reviewerAvatarId: 1,
    quoteEn:
      "Warm Nutella kunafa turnover with cold vanilla soft-serve is mandatory.",
    quoteAr: "فطيرة النوتيلا والكنافة السخنة مع آيس كريم الفانيليا حاجة تانية خالص.",
  },
];

/**
 * Interactive 4-Plate Rotating Showcase w/ Live Guest Review Bubble (adapted from hero-section-41).
 */
export function SignaturePlateSpotlight() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  const current = SIGNATURE_PLATES[activeIdx] ?? SIGNATURE_PLATES[0]!;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="rounded-[36px] border border-border bg-card p-6 shadow-card-hover sm:p-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left: Plate Picker + Guest Quote */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500/12 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
                <AppIcon icon={StarIcon} size={13} />
                <span>
                  {isAr ? "اختيارات ضيوف المعادي" : "Most Ordered in Maadi"}
                </span>
              </span>
              <h2 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                {isAr
                  ? "أطباق الناس بترجع عشانها كل أسبوع."
                  : "Plates Maadi tables come back for every weekend."}
              </h2>
            </div>

            {/* Guest Review Bubble w/ Grokbot Avatar */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3.5 rounded-3xl border border-border bg-surface-tint p-4"
              >
                <AvatarDot
                  avatarId={current.reviewerAvatarId}
                  name={current.reviewerName}
                  size="md"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">
                      {current.reviewerName}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      ★★★★★
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{isAr ? current.quoteAr : current.quoteEn}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* 4 Interactive Plate Thumbnails */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {SIGNATURE_PLATES.map((plate, idx) => {
                const selected = idx === activeIdx;
                return (
                  <button
                    key={plate.slug}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-2xl border p-2 text-start transition-all",
                      selected
                        ? "border-primary bg-primary/6 shadow-xs"
                        : "border-border bg-background hover:bg-surface-tint",
                    )}
                  >
                    <img
                      src={plate.image}
                      alt={isAr ? plate.nameAr : plate.nameEn}
                      className="aspect-[4/3] w-full rounded-xl object-cover"
                    />
                    <span className="line-clamp-1 text-xs font-bold text-foreground">
                      {isAr ? plate.nameAr : plate.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Dish Showcase Stage */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-[28px] border border-border bg-surface-tint"
              >
                <img
                  src={current.image}
                  alt={isAr ? current.nameAr : current.nameEn}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
                  <div>
                    <span className="font-mono text-xs font-semibold text-white/80 tabular-price">
                      {isAr ? current.priceAr : current.priceEn}
                    </span>
                    <h3 className="text-xl font-extrabold tracking-tight">
                      {isAr ? current.nameAr : current.nameEn}
                    </h3>
                  </div>
                  <Link
                    to="/menu"
                    search={{ dish: current.slug }}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" }),
                      "rounded-full font-bold",
                    )}
                  >
                    <span>{isAr ? "اطلبه الآن" : "Order this"}</span>
                    <AppIcon icon={ArrowUpRight01Icon} size={14} mirrorInRtl />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

const GALLERY_ITEMS = [
  {
    slug: "truffle-swiss-burger",
    titleEn: "Truffle Swiss Smash",
    titleAr: "ترافل سويس سماش",
    tagEn: "Cast-Iron",
    tagAr: "على الصاج",
    image: "/images/dish-truffle-swiss.jpg",
    span: "md:col-span-2",
  },
  {
    slug: "artisan-margherita-pizza",
    titleEn: "Artisan Margherita",
    titleAr: "مارجريتا أصلية",
    tagEn: "Stone-Deck",
    tagAr: "فرن حجري",
    image: "/images/dish-margherita-pizza.jpg",
    span: "",
  },
  {
    slug: "herb-shish-tawook",
    titleEn: "Herb Shish Tawook",
    titleAr: "شيش طاووق بالأعشاب",
    tagEn: "Oak Charcoal",
    tagAr: "على الفحم",
    image: "/images/dish-shish-tawook.jpg",
    span: "",
  },
  {
    slug: "truffle-parmesan-fries",
    titleEn: "Truffle Parmesan Fries",
    titleAr: "بطاطس ترافل وبارميزان",
    tagEn: "Sharing",
    tagAr: "للشيرينج",
    image: "/images/dish-truffle-fries.jpg",
    span: "",
  },
  {
    slug: "sparkling-karkadeh-mint",
    titleEn: "Sparkling Karkadeh Mint",
    titleAr: "كركديه فوار بالنعناع",
    tagEn: "House Craft",
    tagAr: "مشروب بيتي",
    image: "/images/dish-karkadeh-mint.jpg",
    span: "",
  },
] as const;

export function StudioFoodGallery() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            {isAr ? "من الصالة مباشرة" : "Fresh Off the Pass"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isAr
              ? "اضغط على أي صورة عشان تفتح الطبق وتخصصه فورا."
              : "Tap any shot to jump straight into customizing that dish."}
          </p>
        </div>
        <Link
          to="/menu"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <span>{isAr ? "تصفح الـ 20 طبق" : "Browse all 20 dishes"}</span>
          <AppIcon icon={ArrowRight02Icon} data-icon="inline-end" mirrorInRtl />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {GALLERY_ITEMS.map((item) => (
          <Link
            key={item.slug}
            to="/menu"
            search={{ dish: item.slug }}
            className={cn(
              "group relative overflow-hidden rounded-[28px] border border-border bg-card",
              item.span,
            )}
          >
            <img
              src={item.image}
              alt={isAr ? item.titleAr : item.titleEn}
              loading="lazy"
              className={cn(
                "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]",
                item.span ? "aspect-[16/9] md:aspect-[21/10]" : "aspect-[4/3]",
              )}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-white">
              <div>
                <span className="text-[11px] font-medium text-white/80">
                  {isAr ? item.tagAr : item.tagEn}
                </span>
                <p className="text-base font-extrabold tracking-tight">
                  {isAr ? item.titleAr : item.titleEn}
                </p>
              </div>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors group-hover:bg-primary group-hover:text-white">
                <AppIcon icon={ArrowUpRight01Icon} size={15} mirrorInRtl />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Logical Restaurant Growth Section:
 * 1) Maadi Delivery & Mobile App Coming Soon Waitlist
 * 2) Clean, Basic Reserve-a-Table Form
 */
export function DeliveryAndReserveSection() {
  const { locale } = useAppAppearance();
  const { waitlistEmail, joinWaitlist, createReservation, reservations } =
    useKraveStore();
  const isAr = locale === "ar";

  const [email, setEmail] = useState(waitlistEmail ?? "");
  const [resName, setResName] = useState("");
  const [resPhone, setResPhone] = useState("");
  const [resDate, setResDate] = useState("2026-11-21");
  const [resTime, setResTime] = useState("8:00 PM");
  const [resGuests, setResGuests] = useState(4);

  const latestReservation = reservations[0];

  const handleWaitlist = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      return;
    }
    joinWaitlist(email);
    toast.add({
      type: "success",
      title: isAr ? "أهلا بيك في قائمة الانتظار" : "You're on the Early Access list!",
      description: isAr
        ? "أول أوردر توصيل مجاني أول ما نفتح في المعادي."
        : "Free first Maadi delivery unlocked when we launch.",
    });
  };

  const handleReserve = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!resName.trim() || !resPhone.trim()) {
      return;
    }
    const booking = createReservation({
      name: resName,
      phone: resPhone,
      date: resDate,
      time: resTime,
      guests: resGuests,
    });
    setResName("");
    setResPhone("");
    toast.add({
      type: "success",
      title: isAr
        ? `تم تأكيد الحجز #${booking.id}`
        : `Table Reserved · #${booking.id}`,
      description: isAr
        ? `${booking.guests} أفراد يوم ${booking.date} الساعة ${booking.time}`
        : `Party of ${booking.guests} on ${booking.date} at ${booking.time}`,
    });
  };

  return (
    <section
      id="reserve"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left (6 cols): Delivery & Mobile App Coming Soon Waitlist */}
        <div className="flex flex-col justify-between gap-6 rounded-[32px] border border-border bg-card p-6 shadow-card-hover sm:p-8 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-sky-500/12 text-sky-700 hover:bg-sky-500/12 dark:text-sky-300">
                <AppIcon icon={DeliveryTruck01Icon} size={13} />
                <span>{isAr ? "قريبا في المعادي" : "Coming Soon"}</span>
              </Badge>
              <Badge variant="outline">
                <AppIcon icon={SmartPhone01Icon} size={13} />
                <span>iOS & Android</span>
              </Badge>
            </div>

            <h2 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              {isAr
                ? "التوصيل المباشر وأبلكيشن كريف في الفرن."
                : "Maadi Delivery & the Krave App are in the oven."}
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {isAr
                ? "بسبب الإقبال الكبير في شارع 9، بنجهز حاليا فريق توصيل خاص بكريف وأبلكيشن سريع عشان الأكل يوصلك سخن زي الصالة. سجل عشان تاخد أول توصيل مجانا."
                : "Because our dining room stays packed, we're launching our own heated-pack Maadi delivery fleet and native mobile app. Join the waitlist for free first delivery and instant drop alerts."}
            </p>
          </div>

          <form
            onSubmit={handleWaitlist}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-tint p-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  isAr ? "اكتب إيميلك لأولوية التوصيل..." : "Enter your email for early access..."
                }
                className="h-11 flex-1 rounded-full bg-background px-4"
              />
              <Button
                type="submit"
                size="lg"
                className="h-11 shrink-0 rounded-full px-6 font-bold"
              >
                {waitlistEmail
                  ? isAr
                    ? "تم تسجيلك"
                    : "Joined!"
                  : isAr
                    ? "انضم للقائمة"
                    : "Join Waitlist"}
              </Button>
            </div>
            <p className="px-1 text-[11px] text-muted-foreground">
              {waitlistEmail
                ? isAr
                  ? `مسجل بالإيميل ${waitlistEmail} · أولوية التوصيل المجاني مفعلة.`
                  : `Registered as ${waitlistEmail} · Free first Maadi delivery reserved.`
                : isAr
                  ? "انضم لأكثر من 420 شخص من المعادي منتظرين الإطلاق."
                  : "Join 420+ Maadi regulars already waiting for launch day."}
            </p>
          </form>
        </div>

        {/* Right (6 cols): Simple Basic Table Reservation Form */}
        <div className="flex flex-col justify-between gap-5 rounded-[32px] border border-border bg-card p-6 shadow-card-hover sm:p-8 lg:col-span-6">
          <div className="flex flex-col gap-1.5">
            <Badge className="w-fit bg-emerald-500/12 text-emerald-700 hover:bg-emerald-500/12 dark:text-emerald-300">
              <AppIcon icon={Calendar03Icon} size={13} />
              <span>{isAr ? "احجز ترابيزتك" : "Reserve Ahead"}</span>
            </Badge>
            <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
              {isAr ? "احجز ترابيزة في شارع 9" : "Book a Table on Road 9"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isAr
                ? "حجز سريع في 10 ثواني بدون مكالمات."
                : "Skip the weekend wait — instant table hold in 10 seconds."}
            </p>
          </div>

          <form onSubmit={handleReserve} className="flex flex-col gap-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Input
                required
                value={resName}
                onChange={(event) => setResName(event.target.value)}
                placeholder={isAr ? "الاسم" : "Your name"}
                className="h-10 rounded-xl bg-surface-tint"
              />
              <Input
                required
                value={resPhone}
                onChange={(event) => setResPhone(event.target.value)}
                placeholder={isAr ? "رقم الموبايل" : "Phone (010...)"}
                className="h-10 rounded-xl bg-surface-tint"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <Input
                type="date"
                value={resDate}
                onChange={(event) => setResDate(event.target.value)}
                className="h-10 rounded-xl bg-surface-tint text-xs"
              />
              <select
                aria-label={isAr ? "الوقت" : "Time"}
                value={resTime}
                onChange={(event) => setResTime(event.target.value)}
                className="h-10 rounded-xl border border-border bg-surface-tint px-2.5 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="6:30 PM">6:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="9:30 PM">9:30 PM</option>
                <option value="11:00 PM">11:00 PM</option>
              </select>
              <select
                aria-label={isAr ? "عدد الأفراد" : "Guests"}
                value={resGuests}
                onChange={(event) => setResGuests(Number(event.target.value))}
                className="h-10 rounded-xl border border-border bg-surface-tint px-2.5 text-xs font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {[2, 4, 6, 8].map((n) => (
                  <option key={n} value={n}>
                    {isAr ? `${n} أفراد` : `${n} guests`}
                  </option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-11 w-full rounded-full font-bold"
            >
              {isAr ? "تأكيد حجز الترابيزة" : "Confirm Table Hold"}
            </Button>

            {latestReservation ? (
              <div className="flex items-center gap-2 rounded-2xl bg-status-ready-bg px-3.5 py-2 text-xs font-semibold text-status-ready">
                <AppIcon icon={CheckmarkCircle02Icon} size={15} />
                <span>
                  {isAr
                    ? `آخر حجز مؤكد: #${latestReservation.id} · ${latestReservation.guests} أفراد (${latestReservation.date} · ${latestReservation.time})`
                    : `Confirmed hold #${latestReservation.id} · ${latestReservation.guests} guests (${latestReservation.date} at ${latestReservation.time})`}
                </span>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS: ReadonlyArray<{
  readonly qEn: string;
  readonly qAr: string;
  readonly aEn: string;
  readonly aAr: string;
}> = [
  {
    qEn: "Do I have to sign up or create an account to order?",
    qAr: "هل لازم أعمل حساب عشان أطلب على الترابيزة؟",
    aEn: "Never required! You can walk in, pick your table, and order as a guest in seconds. Creating an optional account unlocks saved favorite dishes, order history, and faster reorders.",
    aAr: "لأ خالص! تقدر تفتح ترابيزتك وتطلب كضيف في ثواني. عمل حساب اختياري بيديك حفظ المفضلة، سجل طلباتك، وإعادة الطلب بضغطة واحدة.",
  },
  {
    qEn: "When do I need a 4-digit Table PIN?",
    qAr: "إمتى بحتاج أدخل كود الترابيزة (PIN)؟",
    aEn: "Only when joining an already-occupied table where your friends are seated. Opening an empty table starts immediately and gives you a fresh 4-digit PIN to share.",
    aAr: "فقط لما تنضم لترابيزة مشغولة فيها صحابك. لو اخترت ترابيزة فاضية بتتفتح فورا ويطلعلك كود من 4 أرقام تشاركه معاهم.",
  },
  {
    qEn: "How does bill splitting avoid awkward rounding errors?",
    qAr: "تقسيم الفاتورة بيتم إزاي من غير أخطاء حسابية؟",
    aEn: "Every dish and modifier is calculated in exact integer piasters (1 EGP = 100 piasters). Choose Pay Full, My Items, or Split Equally across diners — the shares always add up to the exact check.",
    aAr: "كل الأسعار والإضافات بتتحسب بالقرش بدقة تامة. اختار الدفع كامل أو أطباقك فقط أو التقسيم بالتساوي ومجموع الأنصبة دايما يساوي الفاتورة بالظبط.",
  },
  {
    qEn: "Is everything halal, and do you have keto or vegetarian dishes?",
    qAr: "هل الأكل كله حلال وهل فيه اختيارات كيتو ونباتي؟",
    aEn: "Yes, 100% halal prime Egyptian beef and poultry. Look for the Keto, Vegetarian, and Allergen badges directly on the menu cards and dish customizer.",
    aAr: "أكيد، 100% لحوم ودواجن بلدي حلال. هتلاقي علامات الكيتو والنباتي ومسببات الحساسية واضحة مباشرة على كل طبق.",
  },
  {
    qEn: "Is Krave a dark kitchen or a dine-in restaurant?",
    qAr: "هل كريف مطعم فعلي ولا كلاود كيتشن للتوصيل فقط؟",
    aEn: "Krave is a sunlit open-fire dine-in restaurant on Road 9, Maadi, Cairo (open daily 12:00 PM to 1:00 AM). Direct Maadi delivery and our native app are launching soon!",
    aAr: "كريف مطعم حقيقي منور بصالة ونار مفتوحة في شارع 9، المعادي (مفتوح يوميا 12 ظهرا حتى 1 صباحا)، والتوصيل المباشر جاي قريبا!",
  },
];

export function HomeFaqSection() {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
          {isAr ? "أسئلة بتتكرر قبل الزيارة" : "Common Questions"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isAr
            ? "كل اللي محتاج تعرفه عن الطلب على الترابيزة، التقسيم، والمعادي."
            : "Everything to know about table sessions, splitting checks, and Road 9."}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.qEn}
              className="overflow-hidden rounded-3xl border border-border bg-card transition-colors"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-start text-sm font-bold text-foreground sm:text-base"
              >
                <span>{isAr ? item.qAr : item.qEn}</span>
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-tint text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 bg-primary/12 text-primary",
                  )}
                >
                  <AppIcon icon={ArrowDown01Icon} size={15} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-border/60 px-6 pt-3.5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {isAr ? item.aAr : item.aEn}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
