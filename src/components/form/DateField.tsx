import React from "react";
import { FieldErrors } from "./FieldErrors";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useFieldContext } from "@/hooks/form-context";
import { format, isValid, parseISO } from "date-fns";

type DateFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const DateField = ({ label, ...inputProps }: DateFieldProps) => {
  const field = useFieldContext<Date>();

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
          onChange={(e) => field.handleChange(parseISO(e.target.value))}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
