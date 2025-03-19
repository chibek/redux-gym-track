import IncomeCard from "@/components/home/IncomesCard";
import InvoiceRow from "@/components/invoices/InvoiceRow";
import { createFileRoute, Link } from "@tanstack/react-router";
import Button from "@/components/ui/Button";
import { PlusIcon } from "@radix-ui/react-icons";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <IncomeCard />
        <div className="flex items-end justify-end">
          <Link to="/invoices">
            <Button size="md" endIcon={<PlusIcon />}>
              Nueva factura
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 bg-orange-200/60 rounded-md p-4">
        <p>
          Borradores de facturas. Cuando emitas las facturas deben de empezar a
          contar como ingreso, aunque no las hayas cobrado.
        </p>
        <InvoiceRow />
      </div>
    </div>
  );
}
