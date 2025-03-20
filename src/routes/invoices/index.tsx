import { invoiceSchema } from "@/components/invoices/schema";
import { useAppForm } from "@/hooks/form-context";
import { updateInvoiceState } from "@/state/invoices/invoiceSlice";
import { invoiceSelector } from "@/state/invoices/selectors";
import { createFileRoute } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";

export const Route = createFileRoute("/invoices/")({
  component: Invoice,
});

const PreviewInvoice = () => {
  const invoice = useSelector(invoiceSelector);

  return (
    <div className="bg-white p-2 rounded-sm">
      <h2>Factura</h2>
      {invoice.name}
      {invoice.country}
    </div>
  );
};

function Invoice() {
  const dispatch = useDispatch();
  const form = useAppForm({
    defaultValues: {
      name: "",
      city: "",
      country: "",
      postalCode: "",
      clientName: "",
      clientCity: "",
      clientCountry: "",
      clientPostalCode: "",
      invoiceDate: new Date(),
      price: 0,
    },
    validators: {
      onChange: invoiceSchema,
    },
    onSubmit: ({ value }) => {
      dispatch(updateInvoiceState(value));
      console.log("Form submitted:", value);
    },
  });
  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-200 rounded-sm p-4">
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.AppField
          name="name"
          children={(field) => <field.TextField label="Nombre" />}
        />
        <form.AppField
          name="city"
          children={(field) => <field.TextField label="Ciudad" />}
        />
        <form.AppField
          name="country"
          children={(field) => <field.TextField label="Pais" />}
        />
        <form.AppField
          name="postalCode"
          children={(field) => <field.TextField label="Codigo Postal" />}
        />
        <form.AppField
          name="invoiceDate"
          children={(field) => <field.DateField label="Fecha de factura" />}
        />
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
        <form.AppField
          name="price"
          children={(field) => <field.NumberField label="Price" />}
        />
        <form.AppForm>
          <form.SubmitButton className="self-end justify-self-end col-span-2 min-w-28">
            Submit
          </form.SubmitButton>
        </form.AppForm>
      </form>
      <PreviewInvoice />
    </div>
  );
}
