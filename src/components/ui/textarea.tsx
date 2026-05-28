import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full rounded-2xl border border-[var(--color-border)] bg-white/85 px-4 py-3 text-sm outline-none transition placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-gis-blue)] focus:shadow-[0_18px_40px_-18px_rgba(0,112,243,0.24)] dark:bg-slate-950/70",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
