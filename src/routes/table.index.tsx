import { createFileRoute } from "@tanstack/react-router";
import { TableShellView } from "@/features/table/TableShellView";

function TableIndexPage() {
  return <TableShellView />;
}

export const Route = createFileRoute("/table/")({
  component: TableIndexPage,
});
