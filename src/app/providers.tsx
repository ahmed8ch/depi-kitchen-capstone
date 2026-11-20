import { RouterProvider } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { LocaleDirectionProvider } from "@/app/locale-context";
import { router } from "@/app/router";
import { KraveStoreProvider } from "@/app/store-context";
import { Toaster } from "@/components/ui/toast";

export function AppProviders() {
  return (
    <MotionConfig reducedMotion="user">
      <LocaleDirectionProvider>
        <KraveStoreProvider>
          <RouterProvider router={router} />
          <Toaster />
        </KraveStoreProvider>
      </LocaleDirectionProvider>
    </MotionConfig>
  );
}
