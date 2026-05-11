import type { AppFormType } from "@/lib/domain";
import { formTypeLabels } from "@/lib/domain";

export function FormTypeBadge({ formType }: { formType: AppFormType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-900">
      {formTypeLabels[formType]}
    </span>
  );
}
