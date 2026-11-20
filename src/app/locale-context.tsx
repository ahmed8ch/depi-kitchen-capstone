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
export type AppTheme = "light" | "dark";

const LOCALE_STORAGE_KEY = "krave-locale";
const THEME_STORAGE_KEY = "krave-theme";

function readStoredLocale(): AppLocale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

function readStoredTheme(): AppTheme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

interface AppAppearanceContextValue {
  readonly locale: AppLocale;
  readonly setLocale: (next: AppLocale) => void;
  readonly dir: "ltr" | "rtl";
  readonly theme: AppTheme;
  readonly setTheme: (next: AppTheme) => void;
  readonly toggleTheme: () => void;
}

const AppAppearanceContext = createContext<AppAppearanceContextValue | null>(
  null,
);

export function LocaleDirectionProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<AppLocale>(readStoredLocale);
  const [theme, setThemeState] = useState<AppTheme>(readStoredTheme);
  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale === "ar" ? "ar-EG" : "en";
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Ignore restricted storage errors.
    }
  }, [dir, locale]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore restricted storage errors.
    }
  }, [theme]);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
  }, []);

  const setTheme = useCallback((next: AppTheme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<AppAppearanceContextValue>(
    () => ({
      locale,
      setLocale,
      dir,
      theme,
      setTheme,
      toggleTheme,
    }),
    [locale, setLocale, dir, theme, setTheme, toggleTheme],
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
