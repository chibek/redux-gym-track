import React from "react";
import { FieldErrors } from "./FieldErrors";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useFieldContext } from "@/hooks/form-context";
import { updateInvoiceState } from "@/state/invoices/invoiceSlice";
import { useDispatch } from "react-redux";

type TextFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({ label, ...inputProps }: TextFieldProps) => {
  const dispatch = useDispatch();
  const field = useFieldContext<string>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name}>{label}</Label>
        <Input
          id={field.name}
          value={field.state.value}
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
