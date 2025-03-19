import { useAppForm } from "@/hooks/form-context";
import { createFileRoute } from "@tanstack/react-router";
import { isValid, parseISO } from "date-fns";
import { z } from "zod";

export const Route = createFileRoute("/invoices/")({
  component: Invoice,
});

const PreviewInvoice = () => {
  return (
    <div className="bg-white p-2 rounded-sm">
      <h2>Factura</h2>
    </div>
  );
};

const invoiceSchema = z.object({
  firstName: z.string(),
  invoiceDate: z.date(),
});

function Invoice() {
  const form = useAppForm({
    defaultValues: {
      firstName: "",
      invoiceDate: new Date(),
    },
    validators: {
      onChange: invoiceSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
    },
  });
  return (
    <div className="grid grid-cols-2 gap-2 bg-gray-200 rounded-sm p-4">
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="firstName"
          children={(field) => <field.TextField label="Nombre" />}
        />
        <form.AppField
          name="invoiceDate"
          children={(field) => <field.DateField label="Fecha de factura" />}
        />
        <form.AppForm>
          <form.SubmitButton>Submit</form.SubmitButton>
        </form.AppForm>
      </form>

      <PreviewInvoice />
    </div>
  );
}
