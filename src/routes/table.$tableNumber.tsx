import { createFileRoute } from "@tanstack/react-router";
import { TableShellView } from "@/features/table/TableShellView";

function TableNumberPage() {
  const { tableNumber } = Route.useParams();
  return <TableShellView initialTable={tableNumber} />;
}

export const Route = createFileRoute("/table/$tableNumber")({
  component: TableNumberPage,
});
