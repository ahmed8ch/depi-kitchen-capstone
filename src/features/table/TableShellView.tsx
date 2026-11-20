import { RollingNumber } from "@kitlangton/rolling-number/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import {
  computeCartItemLinePiasters,
  FLOOR_TABLES,
  generateRandomGuestName,
  useKraveStore,
  type FloorTableInfo,
} from "@/app/store-context";
import {
  Add01Icon,
  AppIcon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  Invoice02Icon,
  LockIcon,
  Logout01Icon,
  MinusSignIcon,
  QrCode01Icon,
  RestaurantTableIcon,
  UserGroupIcon,
} from "@/components/icons";
import {
  AVATAR_DOT_PRESETS,
  AvatarDot,
} from "@/components/shared/AvatarDot";
import { DitherGlow } from "@/components/shared/DitherGlow";
import { EmptySpotIcon } from "@/components/shared/EmptySpotIcon";
import { PaperReceiptCard } from "@/components/shared/PaperReceiptCard";
import { SlideToConfirm } from "@/components/shared/SlideToConfirm";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RESTAURANT_BRAND } from "@/config/brand";
import { formatEgp, splitEquallyPiasters } from "@/domain/money";
import { cn } from "@/lib/utils";

type SplitMode = "full" | "mine" | "split";

/**
 * Mini-game-inspired Top-Down Seated Table Visualization showing animated colorful
 * avatars seated around the physical table perimeter.
 */
function SeatedTableVisual({
  tableNumber,
  shape,
  pin,
  isAr,
}: {
  readonly tableNumber: string;
  readonly shape: "round" | "booth";
  readonly pin: string;
  readonly isAr: boolean;
}) {
  const { session, cart, addDemoCompanion } = useKraveStore();
  const shouldReduceMotion = useReducedMotion();

  const seatPositions: ReadonlyArray<{ readonly top: string; readonly left: string }> =
    shape === "booth"
      ? [
          { top: "8%", left: "26%" },
          { top: "8%", left: "50%" },
          { top: "8%", left: "74%" },
          { top: "92%", left: "26%" },
          { top: "92%", left: "50%" },
          { top: "92%", left: "74%" },
        ]
      : [
          { top: "9%", left: "50%" },
          { top: "50%", left: "91%" },
          { top: "91%", left: "50%" },
          { top: "50%", left: "9%" },
          { top: "20%", left: "82%" },
          { top: "80%", left: "18%" },
        ];

  const handleCopyPin = () => {
    void navigator.clipboard?.writeText(pin);
    toast.add({
      type: "success",
      title: isAr ? `تم نسخ كود الترابيزة (${pin})` : `Table PIN ${pin} copied`,
      description: isAr
        ? "ابعته لصحابك عشان ينضموا لنفس السلة."
        : "Share with friends at your table to sync bags.",
    });
  };

  return (
    <div className="rounded-[32px] border border-border bg-card p-5 shadow-card-hover sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold tracking-tight text-foreground">
              {isAr
                ? `ترابيزة ${tableNumber} · مباشر`
                : `Table ${tableNumber} · Live Seats`}
            </h2>
            <Badge className="bg-status-ready-bg text-status-ready hover:bg-status-ready-bg">
              {session.diners.length}{" "}
              {isAr
                ? session.diners.length === 1
                  ? "فرد"
                  : "أفراد"
                : session.diners.length === 1
                  ? "diner"
                  : "diners"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {isAr
              ? "كل شخص قاعد على الترابيزة يقدر يضيف أطباقه ويشوف السلة فورا."
              : "Everyone seated here adds into one live table check."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyPin}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-tint px-3 py-1.5 font-mono text-xs font-bold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            <span>PIN: {pin}</span>
            <AppIcon icon={Copy01Icon} size={13} />
          </button>

          {session.diners.length < 6 ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => {
                const added = addDemoCompanion();
                if (added) {
                  toast.add({
                    type: "info",
                    title: isAr
                      ? `${added.name} انضم للترابيزة`
                      : `${added.name} joined the table`,
                  });
                }
              }}
            >
              <AppIcon icon={Add01Icon} size={13} />
              <span>{isAr ? "إضافة صديق" : "Invite Seat"}</span>
            </Button>
          ) : null}
        </div>
      </div>

      {/* Physical Top-Down Mini-Game Table Canvas */}
      <div className="relative mx-auto my-2 flex h-64 w-full max-w-md items-center justify-center rounded-3xl bg-surface-tint/85 ring-1 ring-border/70">
        {/* Table Surface */}
        <div
          className={cn(
            "relative flex flex-col items-center justify-center border-2 border-border bg-card shadow-sm",
            shape === "booth"
              ? "h-28 w-60 rounded-[28px]"
              : "size-36 rounded-full",
          )}
        >
          <span className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-muted-foreground">
            {isAr ? RESTAURANT_BRAND.nameAr : RESTAURANT_BRAND.wordmarkEn}
          </span>
          <span className="text-xl font-extrabold tracking-tight text-foreground tabular-price">
            T{tableNumber}
          </span>
          <span className="mt-0.5 text-[10px] font-medium text-muted-foreground">
            {cart.length}{" "}
            {isAr ? "أطباق" : cart.length === 1 ? "dish" : "dishes"}
          </span>
        </div>

        {/* Animated Seated Diners Around Perimeter */}
        <AnimatePresence>
          {session.diners.map((diner, idx) => {
            const pos = seatPositions[idx] ?? { top: "50%", left: "50%" };
            const count = cart
              .filter((item) => item.ownerName === diner.name)
              .reduce((s, item) => s + item.quantity, 0);
            return (
              <motion.div
                key={diner.id}
                initial={shouldReduceMotion ? false : { scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              >
                <div className="relative">
                  <AvatarDot
                    avatarId={diner.avatarId}
                    name={diner.name}
                    size="md"
                    className={cn(
                      diner.isYou && "ring-2 ring-primary ring-offset-2 ring-offset-surface-tint",
                    )}
                  />
                  {count > 0 ? (
                    <span className="absolute -end-1 -top-1 flex size-4.5 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background tabular-price ring-2 ring-card">
                      {count}
                    </span>
                  ) : null}
                </div>
                <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-bold text-foreground shadow-xs ring-1 ring-border">
                  {diner.name}
                  {diner.isYou ? (isAr ? " (أنت)" : " (You)") : ""}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function TableShellView({
  initialTable,
}: {
  readonly initialTable?: string;
}) {
  const navigate = useNavigate();
  const { locale } = useAppAppearance();
  const {
    session,
    account,
    cart,
    cartTotalPiasters,
    orders,
    openEmptyTable,
    joinOccupiedTable,
    leaveTable,
    updateCartQty,
    fireOrderToKitchen,
  } = useKraveStore();
  const isAr = locale === "ar";

  const [pickedTableNumber, setPickedTableNumber] = useState<string>(
    initialTable || "",
  );
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [guestName, setGuestName] = useState(
    account?.name || session.guestName || "",
  );
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(
    account?.avatarId ?? session.guestAvatarId ?? 0,
  );
  const [splitMode, setSplitMode] = useState<SplitMode>("split");
  const [dinerCount, setDinerCount] = useState<number>(() =>
    Math.min(5, Math.max(2, session.diners.length || 2)),
  );

  const pickedTable: FloorTableInfo | undefined = FLOOR_TABLES.find(
    (t) => t.number === pickedTableNumber,
  );
  const activeFloorTable = FLOOR_TABLES.find(
    (t) => t.number === session.tableNumber,
  );

  const activeName = session.guestName || account?.name || "You";
  const myItemsPiasters = cart
    .filter((item) => item.ownerName.toLowerCase() === activeName.toLowerCase())
    .reduce((sum, item) => sum + computeCartItemLinePiasters(item), 0);

  const effectiveTotal = cartTotalPiasters;
  const effectiveDiners = Math.max(2, dinerCount);
  const splitShares =
    effectiveTotal > 0
      ? splitEquallyPiasters(effectiveTotal, effectiveDiners)
      : [0];

  const activeSharePiasters =
    splitMode === "full"
      ? effectiveTotal
      : splitMode === "mine"
        ? myItemsPiasters
        : (splitShares[0] ?? 0);

  const latestOrder = orders[0];

  const handleSeatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pickedTable) {
      return;
    }

    const finalName =
      guestName.trim() || account?.name || generateRandomGuestName(locale);

    // OPEN TABLE -> Opens immediately with ZERO PIN required!
    if (!pickedTable.occupied) {
      const generatedPin = openEmptyTable(
        pickedTable.number,
        finalName,
        selectedAvatarId,
      );
      setGuestName(finalName);
      toast.add({
        type: "success",
        title: isAr
          ? `تم فتح ترابيزة ${pickedTable.number}`
          : `Seated at Table ${pickedTable.number}`,
        description: isAr
          ? `أهلا ${finalName}! كود المشاركة لصحابك: ${generatedPin}`
          : `Welcome ${finalName}! Share PIN ${generatedPin} with friends.`,
      });
      return;
    }

    // OCCUPIED TABLE -> Verify 4-digit PIN
    if (pin.length !== 4) {
      setPinError(true);
      return;
    }
    const result = joinOccupiedTable(
      pickedTable.number,
      pin,
      finalName,
      selectedAvatarId,
    );
    if (!result.ok) {
      setPinError(true);
      toast.add({
        type: "error",
        title: isAr ? "كود الترابيزة غلط" : "Incorrect Table PIN",
        description: isAr
          ? "كود ترابيزة 5 هو 4829."
          : "Hint: Table 5's active PIN is 4829.",
      });
      return;
    }

    setPinError(false);
    setGuestName(finalName);
    toast.add({
      type: "success",
      title: isAr
        ? `انضممت لترابيزة ${pickedTable.number}`
        : `Joined Table ${pickedTable.number}`,
      description: isAr
        ? `أهلا ${finalName}! السلة المشتركة جاهزة.`
        : `Welcome ${finalName}! Shared bag synced with your friends.`,
    });
  };

  const handleFireToKitchen = () => {
    const created = fireOrderToKitchen(splitMode);
    if (!created) {
      return;
    }

    toast.add({
      type: "success",
      title: isAr
        ? `وصل أوردر #${created.id} للمطبخ`
        : `Order #${created.id} fired to Kitchen Pass`,
      description: isAr
        ? `ترابيزة ${created.tableNumber} · بيتحضر الآن`
        : `Table ${created.tableNumber} · Firing on the pass`,
    });

    void navigate({
      to: "/track/$orderId",
      params: { orderId: created.id },
    });
  };

  // =========================================================================
  // STEP 1: NOT SEATED YET -> Interactive Maadi Floor Plan (Open vs Occupied)
  // =========================================================================
  if (!session.isJoined) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Badge className="w-fit bg-primary/12 text-primary-ink hover:bg-primary/12">
              <AppIcon icon={RestaurantTableIcon} size={13} />
              <span>{isAr ? "صالة كريف المعادي" : "Krave Maadi Floor Plan"}</span>
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
              {isAr ? "اختر ترابيزتك على الخريطة" : "Pick Your Table"}
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              {isAr
                ? "الترابيزة الفاضية بتتفتح فورا من غير كود. الترابيزة المشغولة (زي ترابيزة 5) بتطلب كود الـ 4 أرقام عشان تنضم لصحابك."
                : "Open tables start immediately with zero PIN. Occupied tables (like Table 5) ask for the 4-digit PIN so you can join friends safely."}
            </p>
          </div>

          {latestOrder ? (
            <Link
              to="/track/$orderId"
              params={{ orderId: latestOrder.id }}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <span>
                {isAr
                  ? `متابعة أوردر #${latestOrder.id}`
                  : `Track active #${latestOrder.id}`}
              </span>
              <AppIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                mirrorInRtl
              />
            </Link>
          ) : null}
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left (7 cols): Interactive 2D Floor Plan */}
          <div className="rounded-[32px] border border-border bg-card p-5 shadow-card-hover sm:p-7 lg:col-span-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <span className="text-sm font-bold text-foreground">
                {isAr ? "اضغط على أي ترابيزة" : "Tap any table to select"}
              </span>
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-emerald-500" />
                  <span>{isAr ? "متاحة (بدون كود)" : "Open (No PIN)"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-primary" />
                  <span>{isAr ? "مشغولة (بكود)" : "Occupied (PIN)"}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {FLOOR_TABLES.map((table) => {
                const selected = pickedTableNumber === table.number;
                return (
                  <button
                    key={table.number}
                    type="button"
                    onClick={() => {
                      setPickedTableNumber(table.number);
                      setPin("");
                      setPinError(false);
                    }}
                    className={cn(
                      "group relative flex flex-col items-center justify-between gap-3 rounded-3xl border p-4 text-center transition-[transform,border-color,background-color,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.98]",
                      selected
                        ? "border-primary bg-primary/6 shadow-card-hover ring-2 ring-primary/25"
                        : table.occupied
                          ? "border-amber-500/35 bg-amber-500/[0.04] hover:border-primary/50"
                          : "border-border bg-surface-tint/60 hover:border-foreground/25 hover:bg-card",
                    )}
                  >
                    <div className="flex w-full items-center justify-between text-[10px] font-bold">
                      <span className="text-muted-foreground">
                        {isAr ? table.zoneAr : table.zoneEn}
                      </span>
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          table.occupied ? "bg-primary" : "bg-emerald-500",
                        )}
                      />
                    </div>

                    {/* Visual Table Silhouette (Round vs Booth) */}
                    <div
                      className={cn(
                        "flex items-center justify-center border-2 bg-card font-extrabold text-foreground transition-colors",
                        selected
                          ? "border-primary text-primary"
                          : "border-border",
                        table.shape === "booth"
                          ? "h-12 w-20 rounded-2xl"
                          : "size-14 rounded-full",
                      )}
                    >
                      <span className="tabular-price">T{table.number}</span>
                    </div>

                    {/* Active Diners Avatars or Open Seat Count */}
                    {table.occupied ? (
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-1.5 rtl:space-x-reverse">
                          {table.activeDiners.map((d) => (
                            <AvatarDot
                              key={d.id}
                              avatarId={d.avatarId}
                              name={d.name}
                              size="xs"
                              className="size-5 ring-2 ring-card"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-primary-ink">
                          {isAr ? "كود" : "PIN"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[11px] font-medium text-muted-foreground">
                        {isAr ? `${table.seats} كراسي · متاحة` : `${table.seats} seats · Open`}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right (5 cols, Sticky): Contextual Check-In Card w/ Bayer 4x4 Dither Accent */}
          <div className="overflow-hidden rounded-[32px] border border-border bg-card shadow-card-hover lg:sticky lg:top-24 lg:col-span-5">
            <div className="relative overflow-hidden border-b border-border bg-surface-tint p-5">
              <DitherGlow className="opacity-70" />
              <div className="relative z-10 flex flex-col gap-1">
                <span className="text-xs font-bold text-primary-ink">
                  {pickedTable
                    ? pickedTable.occupied
                      ? isAr
                        ? `انضمام لترابيزة ${pickedTable.number} (مشغولة)`
                        : `Join Occupied Table ${pickedTable.number}`
                      : isAr
                        ? `فتح ترابيزة ${pickedTable.number} (متاحة)`
                        : `Open Table ${pickedTable.number}`
                    : isAr
                      ? "الخطوة 1"
                      : "Step 1"}
                </span>
                <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                  {pickedTable
                    ? isAr
                      ? `ترابيزة ${pickedTable.number} · ${pickedTable.zoneAr}`
                      : `Table ${pickedTable.number} · ${pickedTable.zoneEn}`
                    : isAr
                      ? "اختار ترابيزة من الخريطة"
                      : "Select a table on the map"}
                </h2>
              </div>
            </div>

            <div className="p-6">
              {!pickedTable ? (
                <div className="flex flex-col gap-4 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {isAr
                      ? "اضغط على أي ترابيزة خضراء لفتح جلسة جديدة فورا، أو اضغط على ترابيزة 5 لتجربة الانضمام لصحابك بكود PIN."
                      : "Tap any green open table to seat yourself immediately, or pick Table 5 to try joining an active table with a 4-digit PIN."}
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      onClick={() => setPickedTableNumber("2")}
                      className="w-full justify-between"
                    >
                      <span>{isAr ? "افتح ترابيزة 2 (فاضية)" : "Open Table 2 (Empty)"}</span>
                      <AppIcon icon={ArrowRight02Icon} size={16} mirrorInRtl />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setPickedTableNumber("5")}
                      className="w-full justify-between"
                    >
                      <span>
                        {isAr
                          ? "انضم لترابيزة 5 (سلمى وطارق)"
                          : "Join Table 5 (Salma & Tarek)"}
                      </span>
                      <AppIcon icon={LockIcon} size={15} />
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSeatSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* Occupied table companions preview */}
                  {pickedTable.occupied ? (
                    <div className="flex items-center justify-between gap-2 rounded-2xl border border-primary/25 bg-primary/6 px-3.5 py-2.5 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5 rtl:space-x-reverse">
                          {pickedTable.activeDiners.map((d) => (
                            <AvatarDot
                              key={d.id}
                              avatarId={d.avatarId}
                              name={d.name}
                              size="xs"
                              className="ring-2 ring-card"
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-foreground">
                          {pickedTable.activeDiners.map((d) => d.name).join(" & ")}
                        </span>
                      </div>
                      <Badge variant="outline" className="bg-card text-[10px]">
                        PIN: 4829
                      </Badge>
                    </div>
                  ) : null}

                  <FieldGroup className="gap-4">
                    {/* PIN ONLY shown when table is OCCUPIED! */}
                    {pickedTable.occupied ? (
                      <Field data-invalid={pinError || undefined}>
                        <FieldLabel htmlFor="table-pin-input">
                          {isAr
                            ? "كود الترابيزة (4 أرقام)"
                            : "4-Digit Table PIN"}
                        </FieldLabel>
                        <div dir="ltr" className="w-fit">
                          <InputOTP
                            id="table-pin-input"
                            maxLength={4}
                            value={pin}
                            onChange={(val) => {
                              setPin(val);
                              setPinError(false);
                            }}
                            aria-label={isAr ? "كود الترابيزة" : "Table PIN"}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} className="size-11 text-base font-bold" />
                              <InputOTPSlot index={1} className="size-11 text-base font-bold" />
                              <InputOTPSlot index={2} className="size-11 text-base font-bold" />
                              <InputOTPSlot index={3} className="size-11 text-base font-bold" />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        <FieldDescription>
                          {isAr
                            ? "اسأل صحابك على الترابيزة عن الكود (ترابيزة 5: 4829)."
                            : "Ask your tablemates for the 4-digit PIN (Table 5: 4829)."}
                        </FieldDescription>
                      </Field>
                    ) : null}

                    {/* Optional Name (Random fun guest name if blank!) */}
                    <Field>
                      <FieldLabel htmlFor="guest-first-name">
                        {isAr
                          ? "اسمك (اختياري)"
                          : "Your First Name (optional)"}
                      </FieldLabel>
                      <Input
                        id="guest-first-name"
                        value={guestName}
                        onChange={(event) => setGuestName(event.target.value)}
                        placeholder={
                          isAr
                            ? "سيبه فاضي لاسم عشوائي لطيف"
                            : "Leave blank for a fun random name"
                        }
                        autoComplete="given-name"
                      />
                    </Field>

                    {/* Playful Grokbot Avatar Color Selector */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-foreground">
                        {isAr ? "اختر لون الأفاتار بتاعك" : "Pick your seat avatar"}
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {AVATAR_DOT_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            aria-label={preset.label}
                            onClick={() => setSelectedAvatarId(preset.id)}
                            className={cn(
                              "rounded-full p-0.5 transition-transform",
                              selectedAvatarId === preset.id
                                ? "scale-110 ring-2 ring-foreground"
                                : "opacity-75 hover:opacity-100",
                            )}
                          >
                            <AvatarDot avatarId={preset.id} size="sm" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </FieldGroup>

                  <Button type="submit" size="lg" className="h-11 w-full font-bold">
                    <span>
                      {pickedTable.occupied
                        ? isAr
                          ? `انضم لترابيزة ${pickedTable.number}`
                          : `Join Table ${pickedTable.number}`
                        : isAr
                          ? `افتح ترابيزة ${pickedTable.number} الآن`
                          : `Seat at Table ${pickedTable.number}`}
                    </span>
                    <AppIcon
                      icon={ArrowRight02Icon}
                      data-icon="inline-end"
                      mirrorInRtl
                    />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STEP 2: SEATED AT TABLE -> Scrollable Visual Table + Items | Sticky Check
  // =========================================================================
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-status-ready-bg text-status-ready hover:bg-status-ready-bg">
              <AppIcon icon={CheckmarkCircle02Icon} size={13} />
              <span>
                {isAr
                  ? `قاعد على ترابيزة ${session.tableNumber}`
                  : `Seated · Table ${session.tableNumber}`}
              </span>
            </Badge>
            <Badge variant="outline" className="bg-card font-mono">
              PIN: {session.pin}
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
            {isAr
              ? `ترابيزة ${session.tableNumber} وحساب الترابيزة`
              : `Table ${session.tableNumber} Session`}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/menu"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            <AppIcon icon={Add01Icon} data-icon="inline-start" />
            <span>{isAr ? "أضف أطباق" : "Add Dishes"}</span>
          </Link>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              leaveTable();
              toast.add({
                type: "info",
                title: isAr ? "غادرت الترابيزة" : "Left table session",
              });
            }}
          >
            <AppIcon icon={Logout01Icon} data-icon="inline-start" />
            <span>{isAr ? "تغيير الترابيزة" : "Switch Table"}</span>
          </Button>
        </div>
      </div>

      {/* Balanced Sticky Layout: Left Scrollable Visual Table + Orders | Right Sticky Check */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left (7 cols): Mini-Game Seated Table Visual + Itemized Diner Orders */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <SeatedTableVisual
            tableNumber={session.tableNumber}
            shape={activeFloorTable?.shape ?? "round"}
            pin={session.pin}
            isAr={isAr}
          />

          {/* Shared Table Dishes List */}
          <div className="rounded-[32px] border border-border bg-card p-5 shadow-card-hover sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-lg font-extrabold tracking-tight text-foreground">
                {isAr ? "طلبات الترابيزة المشتركة" : "Shared Table Dishes"}
              </h2>
              <Link
                to="/menu"
                className="text-xs font-bold text-primary-ink hover:underline"
              >
                {isAr ? "+ تصفح المنيو" : "+ Browse Menu"}
              </Link>
            </div>

            {cart.length === 0 ? (
              <Empty className="border border-dashed border-border bg-surface-tint/60 py-10">
                <EmptyHeader>
                  <EmptyMedia>
                    <EmptySpotIcon variant="bag" className="size-12" />
                  </EmptyMedia>
                  <EmptyTitle className="text-base">
                    {isAr
                      ? "الترابيزة جاهزة لأول طبق!"
                      : "Your table is ready for its first dish!"}
                  </EmptyTitle>
                  <EmptyDescription className="text-xs">
                    {isAr
                      ? "افتح المنيو واختار أطباقك وكل فرد هنا هيشوفها لحظيا."
                      : "Open the menu to add smash burgers, stone-deck pizza, or charcoal grill."}
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Link
                    to="/menu"
                    className={buttonVariants({ variant: "default", size: "sm" })}
                  >
                    {isAr ? "افتح المنيو (20 طبق)" : "Explore Menu"}
                  </Link>
                </EmptyContent>
              </Empty>
            ) : (
              <div className="flex flex-col gap-3">
                {cart.map((item) => (
                  <div
                    key={item.lineId}
                    className="flex items-center gap-3.5 rounded-2xl border border-border bg-surface-tint/50 p-3"
                  >
                    <img
                      src={item.image}
                      alt={isAr ? item.nameAr : item.nameEn}
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-bold text-foreground">
                          {isAr ? item.nameAr : item.nameEn}
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[10px] font-semibold ring-1 ring-border">
                          <AvatarDot
                            avatarId={item.ownerAvatarId}
                            name={item.ownerName}
                            size="xs"
                            className="size-3.5"
                          />
                          <span>{item.ownerName}</span>
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {isAr
                          ? item.requiredOption.labelAr
                          : item.requiredOption.labelEn}
                        {item.extras.length > 0
                          ? ` + ${item.extras
                              .map((e) => (isAr ? e.labelAr : e.labelEn))
                              .join(", ")}`
                          : ""}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <bdi
                        dir="ltr"
                        className="font-mono text-xs font-extrabold text-foreground tabular-price"
                      >
                        {formatEgp(computeCartItemLinePiasters(item), locale)}
                      </bdi>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          aria-label={isAr ? "تقليل" : "Decrease"}
                          onClick={() => updateCartQty(item.lineId, -1)}
                        >
                          <AppIcon icon={MinusSignIcon} size={11} />
                        </Button>
                        <span className="min-w-5 text-center text-xs font-bold tabular-price">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon-xs"
                          aria-label={isAr ? "زيادة" : "Increase"}
                          onClick={() => updateCartQty(item.lineId, 1)}
                        >
                          <AppIcon icon={Add01Icon} size={11} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right (5 cols, FIXED/STICKY): Serrated Thermal Check & Split Panel */}
        <div className="lg:sticky lg:top-24 lg:col-span-5">
          <PaperReceiptCard>
            <div className="flex items-start justify-between gap-2 pb-4">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground">
                  {isAr
                    ? `${RESTAURANT_BRAND.nameAr} · المعادي شارع 9`
                    : `${RESTAURANT_BRAND.wordmarkEn} · MAADI RD 9`}
                </span>
                <h2 className="mt-1 text-lg font-extrabold tracking-tight text-foreground">
                  {isAr
                    ? `إيصال ترابيزة ${session.tableNumber}`
                    : `Table ${session.tableNumber} Check`}
                </h2>
              </div>
              <span className="flex size-9 items-center justify-center rounded-2xl bg-surface-tint text-foreground ring-1 ring-border">
                <AppIcon icon={Invoice02Icon} size={18} />
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center gap-3 border-t border-dashed border-border py-8 text-center">
                <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                  {isAr
                    ? "أول ما تضيف أطباقك من المنيو، الإيصال وخيارات تقسيم الفاتورة هتظهر هنا تلقائيا."
                    : "Once dishes are added from the menu, your live check total and split-bill calculator appear here."}
                </p>
                <Link
                  to="/menu"
                  className={buttonVariants({ variant: "default", size: "sm" })}
                >
                  <AppIcon icon={QrCode01Icon} data-icon="inline-start" />
                  <span>{isAr ? "تصفح المنيو" : "Open Menu"}</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-t border-dashed border-border py-3.5 text-sm">
                  <span className="font-medium text-muted-foreground">
                    {isAr ? "إجمالي الترابيزة" : "Table Total"}
                  </span>
                  <bdi
                    dir="ltr"
                    className="font-mono text-lg font-extrabold text-foreground tabular-price"
                  >
                    {formatEgp(effectiveTotal, locale)}
                  </bdi>
                </div>

                <div className="flex flex-col gap-3 border-t border-dashed border-border py-4">
                  <span className="text-xs font-bold text-foreground">
                    {isAr ? "طريقة تقسيم الحساب" : "How to split"}
                  </span>
                  <ToggleGroup
                    value={[splitMode]}
                    onValueChange={(values) => {
                      const next = values[0];
                      if (
                        next === "full" ||
                        next === "mine" ||
                        next === "split"
                      ) {
                        setSplitMode(next);
                      }
                    }}
                    variant="outline"
                    size="sm"
                    spacing={1}
                    className="w-full flex-wrap"
                  >
                    <ToggleGroupItem value="full" className="flex-1">
                      {isAr ? "كامل" : "Pay Full"}
                    </ToggleGroupItem>
                    <ToggleGroupItem value="mine" className="flex-1">
                      {isAr ? "أطباقي" : "My Items"}
                    </ToggleGroupItem>
                    <ToggleGroupItem value="split" className="flex-1">
                      {isAr ? "بالتساوي" : "Split"}
                    </ToggleGroupItem>
                  </ToggleGroup>

                  {splitMode === "split" ? (
                    <div className="flex items-center justify-between gap-2 rounded-2xl bg-surface-tint px-3.5 py-2.5 ring-1 ring-border/70">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                        <AppIcon icon={UserGroupIcon} size={15} />
                        <span>{isAr ? "عدد الأفراد" : "Diners"}</span>
                      </span>
                      <ToggleGroup
                        value={[String(effectiveDiners)]}
                        onValueChange={(values) => {
                          const next = Number(values[0]);
                          if (Number.isInteger(next) && next >= 2) {
                            setDinerCount(next);
                          }
                        }}
                        variant="outline"
                        size="sm"
                        spacing={0}
                      >
                        <ToggleGroupItem value="2">2</ToggleGroupItem>
                        <ToggleGroupItem value="3">3</ToggleGroupItem>
                        <ToggleGroupItem value="4">4</ToggleGroupItem>
                        <ToggleGroupItem value="5">5</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  ) : null}

                  <div className="flex items-baseline justify-between rounded-2xl bg-surface-tint px-4 py-3.5 ring-1 ring-border">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-muted-foreground">
                        {splitMode === "mine"
                          ? isAr
                            ? `أطباق ${activeName}`
                            : `${activeName}'s items`
                          : splitMode === "full"
                            ? isAr
                              ? "الإجمالي بالكامل"
                              : "Full check"
                            : isAr
                              ? `نصيب الفرد (÷ ${effectiveDiners})`
                              : `Your share (÷ ${effectiveDiners})`}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {isAr ? "دقة بالقرش" : "Integer-piaster exact"}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 text-2xl font-extrabold text-foreground">
                      <bdi dir="ltr" className="tabular-price">
                        <RollingNumber
                          value={activeSharePiasters / 100}
                          locales="en-EG"
                          format={{
                            minimumFractionDigits:
                              activeSharePiasters % 100 === 0 ? 0 : 2,
                            maximumFractionDigits: 2,
                          }}
                        />
                      </bdi>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {isAr ? "ج.م" : "EGP"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <SlideToConfirm
                    label={
                      isAr
                        ? "اسحب لإرسال الطلب للمطبخ"
                        : "Slide to Send to Kitchen"
                    }
                    loadingLabel={isAr ? "بيتبعت للمطبخ" : "Firing Ticket"}
                    confirmedLabel={isAr ? "وصل للمطبخ" : "Fired!"}
                    onConfirm={handleFireToKitchen}
                  />
                </div>
              </>
            )}
          </PaperReceiptCard>
        </div>
      </div>
    </div>
  );
}
