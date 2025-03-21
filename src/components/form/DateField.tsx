import React from "react";
import { FieldErrors } from "./FieldErrors";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useFieldContext } from "@/hooks/form-context";
import { format, isValid } from "date-fns";
import { updateInvoiceState } from "@/state/invoices/invoiceSlice";
import { useDispatch } from "react-redux";

type DateFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const DateField = ({ label, ...inputProps }: DateFieldProps) => {
  const field = useFieldContext<string>();
  const dispatch = useDispatch();

  const formattedValue =
    field.state.value && isValid(new Date(field.state.value))
      ? format(new Date(field.state.value), "yyyy-MM-dd")
      : "";
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name}>{label}</Label>
        <Input
          id={field.name}
          type="date"
          value={formattedValue}
          onChange={(e) => {
            dispatch(updateInvoiceState({ [field.name]: e.target.value }));
            field.handleChange(e.target.value);
          }}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
