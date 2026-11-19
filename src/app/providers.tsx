import { RouterProvider } from "@tanstack/react-router";
import { LocaleDirectionProvider } from "@/app/locale-context";
import { router } from "@/app/router";
import { Toaster } from "@/components/ui/toast";

export function AppProviders() {
  return (
    <LocaleDirectionProvider>
      <RouterProvider router={router} />
      <Toaster />
    </LocaleDirectionProvider>
  );
}
