import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { AppShell } from "@/app/AppShell";
import { RouteErrorFallback } from "@/components/feedback/RouteErrorFallback";
import { RouteNotFound } from "@/components/feedback/RouteNotFound";

const TanStackRouterDevtools =
  import.meta.env.DEV && import.meta.env.VITE_SHOW_ROUTER_DEVTOOLS === "true"
    ? lazy(() =>
        import("@tanstack/react-router-devtools").then((module) => ({
          default: module.TanStackRouterDevtools,
        })),
      )
    : () => null;

function RootLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isKitchenPass = pathname === "/kds" || pathname.startsWith("/kds/");

  return (
    <>
      {isKitchenPass ? (
        <Outlet />
      ) : (
        <AppShell>
          <Outlet />
        </AppShell>
      )}
      <Suspense fallback={null}>
        <TanStackRouterDevtools position="bottom-left" />
      </Suspense>
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RouteErrorFallback,
  notFoundComponent: RouteNotFound,
});
