import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 text-sm outline-none ring-0 placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:shadow-[0_18px_40px_-18px_rgba(40,157,185,0.2)]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
