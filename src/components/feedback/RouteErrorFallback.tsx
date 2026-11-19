import { Link, type ErrorComponentProps } from "@tanstack/react-router";
import { Alert02Icon, AppIcon, ArrowLeft02Icon } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";

export function RouteErrorFallback({ error, reset }: ErrorComponentProps) {
  const message =
    error instanceof Error
      ? error.message
      : "An unexpected issue interrupted this view.";

  return (
    <div className="mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center px-6 py-16">
      <Alert variant="destructive" className="w-full">
        <AppIcon icon={Alert02Icon} size={18} />
        <AlertTitle>Unable to load this page</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" onClick={reset}>
          Try Again
        </Button>
        <Link to="/" className={buttonVariants({ variant: "outline" })}>
          <AppIcon
            icon={ArrowLeft02Icon}
            data-icon="inline-start"
            mirrorInRtl
          />
          Back Home
        </Link>
      </div>
    </div>
  );
}
