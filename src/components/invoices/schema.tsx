import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  clientName: z.string().min(1),
  clientCity: z.string().min(1),
  clientCountry: z.string().min(1),
  clientPostalCode: z.string().min(1),
  invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  price: z.number(),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;
