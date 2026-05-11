import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-95 shadow-glow",
        secondary: "bg-white/80 text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-white",
        ghost: "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
        outline: "border border-[var(--color-border)] bg-white text-[var(--color-foreground)] hover:bg-[var(--color-muted)]",
        success: "bg-[var(--color-success)] text-[var(--color-success-foreground)] hover:opacity-95",
        destructive: "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] hover:opacity-95",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-xl px-4",
        lg: "h-12 rounded-2xl px-6",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
