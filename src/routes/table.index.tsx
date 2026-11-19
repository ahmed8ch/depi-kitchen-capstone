import { createFileRoute } from "@tanstack/react-router";
import { TableShellView } from "@/features/table/TableShellView";

function TableIndexPage() {
  return <TableShellView initialTable="1" />;
}

export const Route = createFileRoute("/table/")({
  component: TableIndexPage,
});
