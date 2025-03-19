import { createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "@/components/form/TextField";
import { createFormHook } from "@tanstack/react-form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { DateField } from "@/components/form/DateField";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    DateField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
