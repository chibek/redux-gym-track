import { invoiceSchema } from "@/components/invoices/schema";
import { useAppForm } from "@/hooks/form-context";
import { generateInvoiceNumber } from "@/lib/utils";
import { invoiceSelector } from "@/state/invoices/selectors";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import { format } from "date-fns";

export const Route = createFileRoute("/invoices/")({
  component: Invoice,
});

interface PreviewInvoiceProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PreviewInvoice = ({ contentRef }: PreviewInvoiceProps) => {
  const invoice = useSelector(invoiceSelector);
  const invoiceNumber = generateInvoiceNumber(invoice.invoiceDate);

  return (
    <div ref={contentRef} className="bg-white rounded-sm">
      <div className="bg-gray-300 p-10 flex flex-col gap-2 items-start">
        <h2 className="text-4xl">Factura</h2>
        <span className="border p-1">{invoiceNumber}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 divide-x-2 divide-gray-300 p-4">
        <div className="flex flex-col gap-2">
          <h3>Datos personales</h3>
          <span>{invoice.name}</span>
          <span>{invoice.country}</span>
          <span>{invoice.city}</span>
          <span>{invoice.postalCode}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h3>Datos del cliente</h3>
          <span>{invoice.clientName}</span>
          <span>{invoice.clientCountry}</span>
          <span>{invoice.clientCity}</span>
          <span>{invoice.clientPostalCode}</span>
        </div>
      </div>
    </div>
  );
};

function Invoice() {
  const reportTemplateRef = useRef<HTMLDivElement | null>(null);

  const handleGeneratePdf = () => {
    if (!reportTemplateRef.current) {
      console.log("error", reportTemplateRef);

      return;
    }
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };
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
      invoiceDate: format(new Date(), "yyyy-MM-dd"),
      price: 0,
    },
    validators: {
      onChange: invoiceSchema,
    },
    onSubmit: ({ value }) => {
      handleGeneratePdf();
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
      <PreviewInvoice contentRef={reportTemplateRef} />
    </div>
  );
}
