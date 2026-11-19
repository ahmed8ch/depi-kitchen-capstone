import { createRouter } from "@tanstack/react-router";
import { RouteErrorFallback } from "@/components/feedback/RouteErrorFallback";
import { RouteNotFound } from "@/components/feedback/RouteNotFound";
import { routeTree } from "@/routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultErrorComponent: RouteErrorFallback,
  defaultNotFoundComponent: RouteNotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
