import { describe, expect, it } from "vitest";

import {
  canCreateDocument,
  canDeleteDocument,
  canEditDocument,
  canPublishDocument,
  canReviewDocument,
  canRevokeDocument,
  canSubmitForReview,
} from "@/lib/permissions";

describe("permission helpers", () => {
  it("grants create access to operational roles", () => {
    expect(canCreateDocument("SUPER_ADMIN")).toBe(true);
    expect(canCreateDocument("ADMIN_LAB")).toBe(true);
    expect(canCreateDocument("FRONTDESK")).toBe(true);
    expect(canCreateDocument("ANALIS")).toBe(false);
  });

  it("restricts document editing by role and status", () => {
    expect(canEditDocument("FRONTDESK", "draft")).toBe(true);
    expect(canEditDocument("FRONTDESK", "revisi")).toBe(false);
    expect(canEditDocument("ANALIS", "revisi")).toBe(true);
    expect(canEditDocument("VIEWER_AUDITOR", "draft")).toBe(false);
  });

  it("requires the right roles for review and publication", () => {
    expect(canSubmitForReview("ANALIS", "input_hasil")).toBe(true);
    expect(canSubmitForReview("FRONTDESK", "draft")).toBe(false);
    expect(canReviewDocument("QA_SUPERVISOR")).toBe(true);
    expect(canPublishDocument("ADMIN_LAB")).toBe(true);
    expect(canPublishDocument("QA_SUPERVISOR")).toBe(false);
    expect(canRevokeDocument("SUPER_ADMIN")).toBe(true);
  });

  it("restricts permanent delete to admin roles", () => {
    expect(canDeleteDocument("SUPER_ADMIN")).toBe(true);
    expect(canDeleteDocument("ADMIN_LAB")).toBe(true);
    expect(canDeleteDocument("QA_SUPERVISOR")).toBe(false);
    expect(canDeleteDocument("FRONTDESK")).toBe(false);
  });
});
