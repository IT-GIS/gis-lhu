import type { AppFormType } from "@/lib/domain";
import { formTypeLabels } from "@/lib/domain";

export function FormTypeBadge({ formType }: { formType: AppFormType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-800">
      {formTypeLabels[formType]}
    </span>
  );
}
