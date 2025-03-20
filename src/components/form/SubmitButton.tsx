import { useStore } from "@tanstack/react-form";
import Button from "@/components/ui/Button";
import { useFormContext } from "@/hooks/form-context";

type SubmitButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button disabled={isSubmitting || !canSubmit} {...props}>
      {children}
    </Button>
  );
};
