import { Link } from "@tanstack/react-router";
import { AppIcon, ArrowLeft02Icon, Restaurant01Icon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function RouteNotFound() {
  return (
    <div className="mx-auto flex min-h-[65dvh] w-full max-w-xl items-center justify-center px-6 py-16">
      <Empty className="border border-border bg-card">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AppIcon icon={Restaurant01Icon} size={22} />
          </EmptyMedia>
          <EmptyTitle>Table route not found</EmptyTitle>
          <EmptyDescription>
            This address is not on the floor plan. Return to the main kitchen or
            browse the menu.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className={buttonVariants({ variant: "default" })}>
              <AppIcon
                icon={ArrowLeft02Icon}
                data-icon="inline-start"
                mirrorInRtl
              />
              Return Home
            </Link>
            <Link to="/menu" className={buttonVariants({ variant: "outline" })}>
              Explore Menu
            </Link>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}
