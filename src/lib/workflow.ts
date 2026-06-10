import type { AppDocumentStatus } from "@/lib/domain";

const transitions: Record<AppDocumentStatus, AppDocumentStatus[]> = {
  draft: ["input_hasil", "review"],
  input_hasil: ["review"],
  review: ["revisi", "approved"],
  revisi: ["input_hasil", "review"],
  approved: ["published"],
  published: ["revoked"],
  revoked: [],
};

const editableStatuses: AppDocumentStatus[] = ["draft", "input_hasil", "revisi"];

export function canTransitionStatus(
  currentStatus: AppDocumentStatus,
  nextStatus: AppDocumentStatus,
) {
  return transitions[currentStatus].includes(nextStatus);
}

export function getAllowedNextStatuses(currentStatus: AppDocumentStatus) {
  return transitions[currentStatus];
}

export function isEditableStatus(status: AppDocumentStatus) {
  return editableStatuses.includes(status);
}
