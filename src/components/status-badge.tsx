import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";
import type { AppDocumentStatus } from "@/lib/domain";

const labels: Record<AppDocumentStatus, string> = {
  draft: "Draft",
  input_hasil: "Input Hasil",
  review: "Review",
  revisi: "Revisi",
  approved: "Approved",
  published: "Published",
  revoked: "Revoked",
};

export function StatusBadge({ status }: { status: AppDocumentStatus | string }) {
  const label = labels[status as AppDocumentStatus] ?? status;
  const color = getStatusColor(status as AppDocumentStatus);
  return <Badge className={color}>{label}</Badge>;
}
