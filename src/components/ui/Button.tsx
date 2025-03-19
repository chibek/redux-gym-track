import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex cursor-pointer hover:bg-blue-500 hover:text-white items-center rounded-lg justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-blue-200/60 text-blue-600 px-2 py-1 text-sm font-semibold",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
        outline:
          "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
      },
      size: {
        xs: "text-xs py-1 px-2",
        sm: "text-sm py-1.5 px-3",
        md: "text-base py-2 px-4",
        lg: "text-lg py-2.5 px-5",
        xl: "text-xl py-3 px-6",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        size: "xs",
        className: "border-dashed",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  size,
  fullWidth,
  disabled = false,
  startIcon,
  endIcon,
  ...props
}) => {
  const classes = buttonVariants({
    variant,
    size: size,
    fullWidth,
    className: cn(className),
  });

  return (
    <button className={classes} disabled={disabled} {...props}>
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
