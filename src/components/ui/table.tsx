import * as React from "react";
import { cn } from "@/lib/utils";

export function TableContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900",
        className,
      )}
      {...props}
    />
  );
}

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("w-full text-left text-sm", className)} {...props} />;
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-slate-50 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 [&_tr]:border-b [&_tr]:border-slate-200 dark:[&_tr]:border-slate-700",
        className,
      )}
      {...props}
    />
  );
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn(
        "divide-y divide-slate-100 dark:divide-slate-800 [&_tr:last-child]:border-0",
        className,
      )}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-slate-100 transition-colors hover:bg-slate-50/50 dark:border-slate-800 dark:hover:bg-slate-800/50",
        className,
      )}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-14 whitespace-nowrap border-r border-slate-200 px-4 py-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-slate-700 last:border-r-0 dark:border-slate-700 dark:text-slate-300",
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "border-r border-slate-100 px-4 py-3.5 align-middle last:border-r-0 dark:border-slate-800",
        className,
      )}
      {...props}
    />
  );
}
