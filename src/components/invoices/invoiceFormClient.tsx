import { invoiceSchema } from "@/components/invoices/schema";
import { useAppForm } from "@/hooks/form-context";

const clientInvoiceSchema = invoiceSchema.pick({
  clientName: true,
  clientCity: true,
  clientCountry: true,
  clientPostalCode: true,
});

export default function InvoiceFormClient() {
  const form = useAppForm({
    defaultValues: {
      clientName: "",
      clientCity: "",
      clientCountry: "",
      clientPostalCode: "",
    },
    validators: {
      onChange: clientInvoiceSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value);
    },
  });

  return (
    <form
      className="grid grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="clientName"
        children={(field) => <field.TextField label="Nombre" />}
      />
      <form.AppField
        name="clientCity"
        children={(field) => <field.TextField label="Ciudad" />}
      />
      <form.AppField
        name="clientCountry"
        children={(field) => <field.TextField label="Pais" />}
      />
      <form.AppField
        name="clientPostalCode"
        children={(field) => <field.TextField label="Codigo Postal" />}
      />
    </form>
  );
}
