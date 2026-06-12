import type { AppDocumentStatus, AppRole } from "@/lib/domain";

export function canCreateDocument(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB", "FRONTDESK"].includes(role);
}

export function canEditDocument(role: AppRole, status: AppDocumentStatus) {
  if (role === "SUPER_ADMIN" || role === "ADMIN_LAB") {
    return ["draft", "input_hasil", "revisi"].includes(status);
  }

  if (role === "FRONTDESK") {
    return ["draft", "input_hasil"].includes(status);
  }

  if (role === "ANALIS") {
    return ["input_hasil", "revisi"].includes(status);
  }

  return false;
}

export function canSubmitForReview(role: AppRole, status: AppDocumentStatus) {
  if (role === "SUPER_ADMIN" || role === "ADMIN_LAB") {
    return ["draft", "input_hasil", "revisi"].includes(status);
  }

  if (role === "FRONTDESK" || role === "ANALIS") {
    return ["input_hasil", "revisi"].includes(status);
  }

  return false;
}

export function canReviewDocument(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB", "QA_SUPERVISOR"].includes(role);
}

export function canPublishDocument(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB"].includes(role);
}

export function canRevokeDocument(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB"].includes(role);
}

export function canDeleteDocument(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB"].includes(role);
}

export function canViewAuditLogs(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB", "VIEWER_AUDITOR", "QA_SUPERVISOR"].includes(role);
}

export function canManageBlogPosts(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB"].includes(role);
}
export function canViewContactMessages(role: AppRole) {
  return ["SUPER_ADMIN", "ADMIN_LAB", "FRONTDESK"].includes(role);
}
