import { invoiceSchema } from "@/components/invoices/schema";
import { useAppForm } from "@/hooks/form-context";
import { updateInvoiceState } from "@/state/invoices/invoiceSlice";
import { useDispatch } from "react-redux";

const personalInvoiceSchema = invoiceSchema.pick({
  name: true,
  city: true,
  country: true,
  postalCode: true,
  invoiceDate: true,
});

export default function InvoiceFormPersonal() {
  const dispatch = useDispatch();
  const form = useAppForm({
    defaultValues: {
      name: "",
      city: "",
      country: "",
      postalCode: "",
      invoiceDate: new Date(),
    },
    validators: {
      onChange: personalInvoiceSchema,
    },
    onSubmit: ({ value }) => {
      dispatch(updateInvoiceState(value));
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
      <form.AppForm>
        <form.SubmitButton className="self-end justify-self-end col-span-2 min-w-28">
          Next
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
