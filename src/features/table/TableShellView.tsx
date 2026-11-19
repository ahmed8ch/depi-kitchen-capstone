import { RollingNumber } from "@kitlangton/rolling-number/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import {
  AppIcon,
  ArrowRight02Icon,
  Invoice02Icon,
  QrCode01Icon,
  UserGroupIcon,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { splitEquallyPiasters } from "@/domain/money";

const TABLE_NUMBERS: ReadonlyArray<string> = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
];

export function TableShellView({
  initialTable = "1",
}: {
  initialTable?: string;
}) {
  const { locale } = useAppAppearance();
  const isAr = locale === "ar";
  const [selectedTable, setSelectedTable] = useState(
    TABLE_NUMBERS.includes(initialTable) ? initialTable : "1",
  );
  const [pin, setPin] = useState("");
  const [guestName, setGuestName] = useState("");
  const [splitMode, setSplitMode] = useState("split");
  const [dinerCount, setDinerCount] = useState(3);

  const sampleTableTotalPiasters = 100_000;
  const splitShares = splitEquallyPiasters(
    sampleTableTotalPiasters,
    dinerCount,
  );
  const activeSharePiasters =
    splitMode === "full"
      ? sampleTableTotalPiasters
      : splitMode === "mine"
        ? 34_000
        : (splitShares[0] ?? sampleTableTotalPiasters);

  const handleJoinSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pin.length !== 4 || guestName.trim().length === 0) {
      toast.add({
        type: "warning",
        title: isAr ? "أكمل بيانات الترابيزة" : "Enter PIN and first name",
        description: isAr
          ? "اكتب كود الترابيزة المكون من 4 أرقام واسمك الأول."
          : "Enter the 4-digit table PIN and your first name.",
      });
      return;
    }

    toast.add({
      type: "success",
      title: isAr
        ? `تم الانضمام لترابيزة ${selectedTable}`
        : `Joined Table ${selectedTable}`,
      description: isAr
        ? `أهلا ${guestName.trim()}، الطلب مشترك الآن.`
        : `Welcome ${guestName.trim()}, shared bag is synced.`,
    });
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {isAr
            ? `انضم لترابيزة ${selectedTable}`
            : `Join Table ${selectedTable}`}
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          {isAr
            ? "بدون حساب أو كلمة مرور. اكتب اسمك وكود الترابيزة فقط."
            : "No account required. Enter the 4-digit table PIN and your first name."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="mb-1 flex items-center justify-between gap-2">
              <CardTitle>
                {isAr ? "تفعيل الجلسة المشتركة" : "Table Check-In"}
              </CardTitle>
              <Badge variant="secondary">
                <AppIcon icon={QrCode01Icon} size={13} />
                <span>{isAr ? `ترابيزة ${selectedTable}` : `Table ${selectedTable}`}</span>
              </Badge>
            </div>
            <CardDescription>
              {isAr
                ? "اختار رقم الترابيزة وأدخل الكود الظاهر على الكارت."
                : "Select your table number and enter the 4-digit PIN on the table card."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="table-join-form"
              onSubmit={handleJoinSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  {isAr ? "رقم الترابيزة" : "Table Number"}
                </span>
                <ToggleGroup
                  value={[selectedTable]}
                  onValueChange={(values) => {
                    const next = values[0];
                    if (next) {
                      setSelectedTable(next);
                    }
                  }}
                  variant="outline"
                  spacing={1}
                  className="flex-wrap"
                >
                  {TABLE_NUMBERS.map((num) => (
                    <ToggleGroupItem key={num} value={num}>
                      {num}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="table-pin-input">
                    {isAr ? "كود الترابيزة (4 أرقام)" : "4-Digit Table PIN"}
                  </FieldLabel>
                  <InputOTP
                    id="table-pin-input"
                    maxLength={4}
                    value={pin}
                    onChange={setPin}
                    aria-label={isAr ? "كود الترابيزة" : "Table PIN"}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FieldDescription>
                    {isAr
                      ? "موجود في ركن الكارت المطبوع على الترابيزة."
                      : "Printed on the corner of your table tent."}
                  </FieldDescription>
                </Field>

                <Field>
                  <FieldLabel htmlFor="guest-first-name">
                    {isAr ? "الاسم الأول" : "First Name"}
                  </FieldLabel>
                  <Input
                    id="guest-first-name"
                    value={guestName}
                    onChange={(event) => setGuestName(event.target.value)}
                    placeholder={isAr ? "مثال: عمر" : "e.g. Omar"}
                    autoComplete="given-name"
                  />
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="justify-between gap-3">
            <Button type="submit" form="table-join-form">
              <span>{isAr ? "دخول للترابيزة" : "Join Table"}</span>
              <AppIcon
                icon={ArrowRight02Icon}
                data-icon="inline-end"
                mirrorInRtl
              />
            </Button>
            <Link
              to="/track/$orderId"
              params={{ orderId: "FL-204" }}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              {isAr ? "متابعة أوردر" : "Track Order"}
            </Link>
          </CardFooter>
        </Card>

        <Card className="bg-surface-tint">
          <CardHeader>
            <div className="mb-1 flex items-center justify-between gap-2">
              <CardTitle>
                {isAr ? "تقسيم الفاتورة بدقة القرش" : "Precision Split-Bill"}
              </CardTitle>
              <AppIcon icon={Invoice02Icon} size={18} />
            </div>
            <CardDescription>
              {isAr
                ? "اختار طريقة الدفع المناسبة لك بدون كسور."
                : "Exact integer-piaster calculation with zero rounding drift."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <ToggleGroup
              value={[splitMode]}
              onValueChange={(values) => {
                const next = values[0];
                if (next) {
                  setSplitMode(next);
                }
              }}
              variant="outline"
              spacing={1}
              className="flex-wrap"
            >
              <ToggleGroupItem value="full">
                {isAr ? "دفع كامل" : "Pay Full"}
              </ToggleGroupItem>
              <ToggleGroupItem value="mine">
                {isAr ? "أطباقي فقط" : "My Items"}
              </ToggleGroupItem>
              <ToggleGroupItem value="split">
                {isAr ? "تقسيم بالتساوي" : "Split Equally"}
              </ToggleGroupItem>
            </ToggleGroup>

            {splitMode === "split" ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AppIcon icon={UserGroupIcon} size={18} />
                  <span>{isAr ? "عدد الأفراد" : "Diners at table"}</span>
                </div>
                <ToggleGroup
                  value={[String(dinerCount)]}
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

            <div className="flex items-baseline justify-between rounded-2xl border border-border bg-background px-5 py-4">
              <span className="text-sm text-muted-foreground">
                {isAr ? "حسابك الآن" : "Your share"}
              </span>
              <div className="flex items-baseline gap-1.5 text-2xl font-bold">
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
                <span className="text-sm font-medium text-muted-foreground">
                  {isAr ? "ج.م" : "EGP"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
