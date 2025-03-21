import { InvoiceSchema } from "@/components/invoices/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InvoiceSchema = {
  city: "",
  country: "",
  postalCode: "",
  invoiceDate: new Date().toISOString(),
  clientName: "",
  clientCity: "",
  clientCountry: "",
  clientPostalCode: "",
  name: "",
  price: 0,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    updateInvoiceState: (
      state,
      action: PayloadAction<Partial<InvoiceSchema>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateInvoiceState } = invoiceSlice.actions;
export default invoiceSlice.reducer;
