import React from "react";
import { FieldErrors } from "./FieldErrors";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useFieldContext } from "@/hooks/form-context";

type NumberFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const NumberField = ({ label, ...inputProps }: NumberFieldProps) => {
  const field = useFieldContext<number>();

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={field.name}>{label}</Label>
        <Input
          id={field.name}
          type="number"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.valueAsNumber)}
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
