import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DirectionProvider } from "@/components/ui/direction";

export type AppLocale = "en" | "ar";
export type AppAccent = "crimson" | "coral";

interface AppAppearanceContextValue {
  locale: AppLocale;
  setLocale: (next: AppLocale) => void;
  dir: "ltr" | "rtl";
  accent: AppAccent;
  setAccent: (next: AppAccent) => void;
}

const AppAppearanceContext = createContext<AppAppearanceContextValue | null>(
  null,
);

export function LocaleDirectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<AppLocale>("en");
  const [accent, setAccentState] = useState<AppAccent>("crimson");
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale === "ar" ? "ar-EG" : "en";
  }, [dir, locale]);

  useEffect(() => {
    if (accent === "coral") {
      document.documentElement.dataset.accent = "coral";
    } else {
      delete document.documentElement.dataset.accent;
    }
  }, [accent]);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
  }, []);

  const setAccent = useCallback((next: AppAccent) => {
    setAccentState(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      dir,
      accent,
      setAccent,
    }),
    [locale, setLocale, dir, accent, setAccent],
  );

  return (
    <AppAppearanceContext.Provider value={value}>
      <DirectionProvider direction={dir}>{children}</DirectionProvider>
    </AppAppearanceContext.Provider>
  );
}

export function useAppAppearance(): AppAppearanceContextValue {
  const context = useContext(AppAppearanceContext);
  if (!context) {
    throw new Error(
      "useAppAppearance must be used within LocaleDirectionProvider.",
    );
  }
  return context;
}
