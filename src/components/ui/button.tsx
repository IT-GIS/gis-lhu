import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[var(--color-gis-blue)] to-cyan-500 text-white shadow-glow hover:-translate-y-0.5 hover:opacity-95",
        secondary: "border border-white/80 bg-white/80 text-[var(--color-foreground)] hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-900",
        ghost: "text-[var(--color-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-gis-blue)]",
        outline: "border border-[var(--color-border)] bg-white/80 text-[var(--color-foreground)] hover:bg-white hover:text-[var(--color-gis-blue)]",
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
