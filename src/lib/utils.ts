import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: string | Date | null) {
  if (!date) return "-";
  const parsed = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function formatNumber(value?: number | null, fractionDigits = 2) {
  if (value === undefined || value === null) return "-";
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function trimToNull(value: FormDataEntryValue | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const str = typeof value === "string" ? value.trim() : "";
  return str.length > 0 ? str : null;
}

export function buildMessageUrl(path: string, key: string, message: string) {
  const url = new URL(path, "http://localhost");
  url.searchParams.set(key, message);
  return `${url.pathname}${url.search}`;
}

export function getStatusColor(
  status:
    | "draft"
    | "input_hasil"
    | "review"
    | "revisi"
    | "approved"
    | "published"
    | "revoked"
) {
  switch (status) {
    case "draft":
      return "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]";
    case "input_hasil":
      return "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]";
    case "review":
      return "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]";
    case "revisi":
      return "bg-amber-100 text-amber-800";
    case "approved":
      return "bg-emerald-50 text-emerald-700";
    case "published":
      return "bg-sky-50 text-sky-700";
    case "revoked":
      return "bg-red-50 text-red-700";
    default:
      return "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]";
  }
}
