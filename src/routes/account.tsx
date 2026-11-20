import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAppAppearance } from "@/app/locale-context";
import { useKraveStore } from "@/app/store-context";
import {
  AppIcon,
  ArrowRight02Icon,
  FavouriteIcon,
  Globe02Icon,
  HistoryIcon,
  Login01Icon,
  Logout01Icon,
  Moon02Icon,
  Settings02Icon,
  Sun03Icon,
  UserCircleIcon,
} from "@/components/icons";
import {
  AVATAR_DOT_PRESETS,
  AvatarDot,
} from "@/components/shared/AvatarDot";
import { EmptySpotIcon } from "@/components/shared/EmptySpotIcon";
import { FavoriteDishButton } from "@/components/shared/FavoriteDishButton";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/toast";
import { MENU_DISHES } from "@/data/menu-catalog";
import { formatEgp } from "@/domain/money";
import { cn } from "@/lib/utils";

function AccountPage() {
  const navigate = useNavigate();
  const { locale, setLocale, theme, toggleTheme } = useAppAppearance();
  const {
    account,
    favoriteDishIds,
    orders,
    signIn,
    signUp,
    signOut,
    updateAccount,
    reorderFromOrder,
  } = useKraveStore();
  const isAr = locale === "ar";

  // Auth form state
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarId, setAvatarId] = useState(0);

  // Settings form state
  const [editName, setEditName] = useState(account?.name ?? "");
  const [editAvatar, setEditAvatar] = useState(account?.avatarId ?? 0);
  const [editDietary, setEditDietary] = useState(account?.dietaryNote ?? "");

  const favoriteDishes = MENU_DISHES.filter((dish) =>
    favoriteDishIds.includes(dish.id),
  );

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      return;
    }
    if (authMode === "signup") {
      const finalName = name.trim() || "Krave Member";
      signUp(finalName, email, avatarId);
      setEditName(finalName);
      setEditAvatar(avatarId);
      toast.add({
        type: "success",
        title: isAr ? `أهلا بك في كريف يا ${finalName}` : `Welcome to Krave, ${finalName}!`,
        description: isAr
          ? "حسابك جاهز والمفضلة وسجل طلباتك محفوظين."
          : "Your favorites and order history are now synced.",
      });
    } else {
      signIn(email);
      const derived = email.split("@")[0] ?? "Member";
      setEditName(derived);
      toast.add({
        type: "success",
        title: isAr ? "تم تسجيل الدخول بنجاح" : "Signed in successfully",
      });
    }
  };

  const handleSaveSettings = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateAccount({
      name: editName,
      avatarId: editAvatar,
      dietaryNote: editDietary,
    });
    toast.add({
      type: "success",
      title: isAr ? "تم حفظ إعدادات الحساب" : "Account settings saved",
    });
  };

  if (!account) {
    return (
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <AppIcon icon={UserCircleIcon} size={24} />
          </span>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em]">
            {isAr ? "حسابك في كريف" : "Your Krave Account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAr
              ? "اختياري بالكامل — سجل دخولك عشان تحفظ أطباقك المفضلة وتعيد طلباتك القديمة بضغطة واحدة."
              : "Always optional — sign in to sync saved favorites, order history, and your seat avatar."}
          </p>
        </div>

        <div className="rounded-[32px] border border-border bg-card p-6 shadow-card-hover">
          <div className="mb-5 grid grid-cols-2 rounded-full bg-surface-tint p-1">
            <button
              type="button"
              onClick={() => setAuthMode("signin")}
              className={cn(
                "rounded-full py-2 text-xs font-bold transition-colors",
                authMode === "signin"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isAr ? "تسجيل الدخول" : "Sign In"}
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("signup")}
              className={cn(
                "rounded-full py-2 text-xs font-bold transition-colors",
                authMode === "signup"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isAr ? "إنشاء حساب" : "Create Account"}
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            <FieldGroup className="gap-4">
              {authMode === "signup" ? (
                <>
                  <Field>
                    <FieldLabel htmlFor="acct-name">
                      {isAr ? "الاسم" : "Full Name"}
                    </FieldLabel>
                    <Input
                      id="acct-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isAr ? "مثال: أحمد علي" : "e.g. Ahmed Ali"}
                    />
                  </Field>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      {isAr ? "اختر الأفاتار بتاعك" : "Choose your avatar"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_DOT_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setAvatarId(preset.id)}
                          className={cn(
                            "rounded-full p-0.5 transition-transform",
                            avatarId === preset.id
                              ? "scale-110 ring-2 ring-foreground"
                              : "opacity-75 hover:opacity-100",
                          )}
                        >
                          <AvatarDot avatarId={preset.id} size="sm" />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}

              <Field>
                <FieldLabel htmlFor="acct-email">
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </FieldLabel>
                <Input
                  id="acct-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="acct-password">
                  {isAr ? "كلمة المرور" : "Password"}
                </FieldLabel>
                <Input
                  id="acct-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </Field>
            </FieldGroup>

            <Button type="submit" size="lg" className="mt-1 h-11 w-full font-bold">
              <AppIcon icon={Login01Icon} data-icon="inline-start" />
              <span>
                {authMode === "signup"
                  ? isAr
                    ? "إنشاء الحساب"
                    : "Create Account"
                  : isAr
                    ? "دخول"
                    : "Sign In"}
              </span>
            </Button>

            <button
              type="button"
              onClick={() => {
                signUp("Omar Sherif", "omar@krave.eg", 1);
                setEditName("Omar Sherif");
                setEditAvatar(1);
                toast.add({
                  type: "success",
                  title: isAr ? "أهلا يا عمر!" : "Signed in as Omar Sherif",
                });
              }}
              className="mt-1 text-center text-xs font-semibold text-primary-ink hover:underline"
            >
              {isAr
                ? "دخول سريع بحساب تجريبي (عمر)"
                : "Quick one-click sign in as Omar Sherif"}
            </button>
          </form>
        </div>

        <Link
          to="/menu"
          className="text-center text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          {isAr
            ? "أو كمل كضيف بدون حساب ←"
            : "Or continue dining as a guest →"}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      {/* Member Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-border bg-card p-6 shadow-card-hover">
        <div className="flex items-center gap-4">
          <AvatarDot avatarId={account.avatarId} name={account.name} size="lg" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              {account.name}
            </h1>
            <span className="text-xs text-muted-foreground">{account.email}</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            signOut();
            toast.add({
              type: "info",
              title: isAr ? "تم تسجيل الخروج" : "Signed out",
            });
          }}
        >
          <AppIcon icon={Logout01Icon} data-icon="inline-start" />
          <span>{isAr ? "تسجيل الخروج" : "Sign Out"}</span>
        </Button>
      </div>

      {/* Member Tabs: Favorites / Order History / Settings */}
      <Tabs defaultValue="favorites">
        <TabsList>
          <TabsTrigger value="favorites">
            <AppIcon icon={FavouriteIcon} size={15} />
            <span>
              {isAr
                ? `المفضلة (${favoriteDishes.length})`
                : `Favorites (${favoriteDishes.length})`}
            </span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <AppIcon icon={HistoryIcon} size={15} />
            <span>
              {isAr
                ? `سجل الطلبات (${orders.length})`
                : `Order History (${orders.length})`}
            </span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <AppIcon icon={Settings02Icon} size={15} />
            <span>{isAr ? "الإعدادات" : "Settings"}</span>
          </TabsTrigger>
        </TabsList>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="mt-6">
          {favoriteDishes.length === 0 ? (
            <Empty className="border border-border bg-card py-14">
              <EmptyHeader>
                <EmptyMedia>
                  <EmptySpotIcon variant="bag" />
                </EmptyMedia>
                <EmptyTitle>
                  {isAr ? "مفيش أطباق في المفضلة" : "No saved favorites yet"}
                </EmptyTitle>
                <EmptyDescription>
                  {isAr
                    ? "اضغط على علامة القلب على أي طبق في المنيو عشان تحفظه هنا."
                    : "Tap the heart icon on any dish card to build your go-to list."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Link to="/menu" className={buttonVariants({ variant: "default" })}>
                  {isAr ? "تصفح المنيو" : "Explore Menu"}
                </Link>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex flex-col overflow-hidden rounded-[26px] border border-border bg-card p-3"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={dish.image}
                      alt={isAr ? dish.nameAr : dish.nameEn}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="absolute end-2.5 top-2.5">
                      <FavoriteDishButton
                        dishId={dish.id}
                        dishNameEn={dish.nameEn}
                        dishNameAr={dish.nameAr}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-1.5 pt-3.5 pb-1">
                    <div>
                      <h2 className="text-sm font-bold text-foreground">
                        {isAr ? dish.nameAr : dish.nameEn}
                      </h2>
                      <bdi
                        dir="ltr"
                        className="text-xs font-extrabold text-primary-ink tabular-price"
                      >
                        {formatEgp(dish.pricePiasters, locale)}
                      </bdi>
                    </div>
                    <Link
                      to="/menu"
                      search={{ dish: dish.slug }}
                      className={buttonVariants({ variant: "default", size: "sm" })}
                    >
                      {isAr ? "اطلب" : "Order"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Order History Tab */}
        <TabsContent value="history" className="mt-6">
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-border bg-card p-5"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <bdi dir="ltr" className="font-mono text-base font-extrabold tabular-price">
                      #{order.id}
                    </bdi>
                    <Badge variant="secondary">
                      {isAr ? `ترابيزة ${order.tableNumber}` : `Table ${order.tableNumber}`}
                    </Badge>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {order.items
                      .map((i) => `${i.quantity}× ${isAr ? i.nameAr : i.nameEn}`)
                      .join(" · ")}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <bdi dir="ltr" className="font-mono text-base font-extrabold tabular-price">
                    {formatEgp(order.totalPiasters, locale)}
                  </bdi>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    onClick={() => {
                      const count = reorderFromOrder(order.id);
                      if (count > 0) {
                        toast.add({
                          type: "success",
                          title: isAr
                            ? `أضفنا ${count} أطباق للسلة`
                            : `Added ${count} items to your bag`,
                        });
                        void navigate({ to: "/table" });
                      }
                    }}
                  >
                    {isAr ? "إعادة الطلب" : "Reorder"}
                  </Button>
                  <Link
                    to="/track/$orderId"
                    params={{ orderId: order.id }}
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    <span>{isAr ? "متابعة" : "Track"}</span>
                    <AppIcon icon={ArrowRight02Icon} size={13} mirrorInRtl />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <form
              onSubmit={handleSaveSettings}
              className="flex flex-col gap-5 rounded-[30px] border border-border bg-card p-6 lg:col-span-7"
            >
              <h2 className="text-lg font-extrabold">
                {isAr ? "بيانات الملف الشخصي" : "Profile Details"}
              </h2>

              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel htmlFor="set-name">
                    {isAr ? "الاسم الظاهر على الترابيزة" : "Display Name"}
                  </FieldLabel>
                  <Input
                    id="set-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="set-diet">
                    {isAr ? "ملاحظة غذائية أو حساسية محفوظة" : "Saved Dietary / Allergy Note"}
                  </FieldLabel>
                  <Input
                    id="set-diet"
                    value={editDietary}
                    onChange={(e) => setEditDietary(e.target.value)}
                    placeholder={
                      isAr
                        ? "مثال: بدون مخلل أو حساسية مكسرات"
                        : "e.g. No pickles, nut allergy"
                    }
                  />
                </Field>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold">
                    {isAr ? "لون الأفاتار" : "Avatar Color"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_DOT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setEditAvatar(preset.id)}
                        className={cn(
                          "rounded-full p-0.5 transition-transform",
                          editAvatar === preset.id
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

              <Button type="submit" className="w-fit px-6 font-bold">
                {isAr ? "حفظ التغييرات" : "Save Changes"}
              </Button>
            </form>

            <div className="flex flex-col gap-4 rounded-[30px] border border-border bg-card p-6 lg:col-span-5">
              <h2 className="text-lg font-extrabold">
                {isAr ? "المظهر واللغة" : "Appearance & Language"}
              </h2>

              <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-tint p-4">
                <div className="flex items-center gap-2.5">
                  <AppIcon
                    icon={theme === "dark" ? Moon02Icon : Sun03Icon}
                    size={18}
                    className="text-primary"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      {isAr ? "المظهر" : "Theme"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {theme === "dark"
                        ? isAr
                          ? "داكن مريح للعين"
                          : "Soft Charcoal Dark"
                        : isAr
                          ? "نهاري دافئ"
                          : "Warm Daylight"}
                    </span>
                  </div>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={toggleTheme}>
                  {theme === "dark"
                    ? isAr
                      ? "تفعيل النهاري"
                      : "Light"
                    : isAr
                      ? "تفعيل الداكن"
                      : "Dark"}
                </Button>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border bg-surface-tint p-4">
                <div className="flex items-center gap-2.5">
                  <AppIcon icon={Globe02Icon} size={18} className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">
                      {isAr ? "اللغة" : "Language"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {isAr ? "العربية (مصر)" : "English"}
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setLocale(isAr ? "en" : "ar")}
                >
                  {isAr ? "English" : "عربي"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const Route = createFileRoute("/account")({
  component: AccountPage,
});
