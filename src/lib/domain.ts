export const roles = [
  "SUPER_ADMIN",
  "ADMIN_LAB",
  "FRONTDESK",
  "ANALIS",
  "QA_SUPERVISOR",
  "VIEWER_AUDITOR",
] as const;

export const formTypes = ["TYPE_1", "TYPE_2", "TYPE_3"] as const;

export const documentStatuses = [
  "draft",
  "input_hasil",
  "review",
  "revisi",
  "approved",
  "published",
  "revoked",
] as const;

export type AppRole = (typeof roles)[number];
export type AppFormType = (typeof formTypes)[number];
export type AppDocumentStatus = (typeof documentStatuses)[number];

export const roleLabels: Record<AppRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN_LAB: "Admin Laboratorium",
  FRONTDESK: "Frontdesk",
  ANALIS: "Analis",
  QA_SUPERVISOR: "QA / Supervisor",
  VIEWER_AUDITOR: "Viewer / Auditor",
};

export const formTypeLabels: Record<AppFormType, string> = {
  TYPE_1: "Form Tipe 1",
  TYPE_2: "Form Tipe 2",
  TYPE_3: "Form Tipe 3",
};

export const statusLabels: Record<AppDocumentStatus, string> = {
  draft: "Draft",
  input_hasil: "Input Hasil",
  review: "Review",
  revisi: "Revisi",
  approved: "Approved",
  published: "Published",
  revoked: "Revoked",
};
