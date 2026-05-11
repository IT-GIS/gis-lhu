import { describe, expect, it } from "vitest";

import { canTransitionStatus, isEditableStatus } from "@/lib/workflow";

describe("workflow transitions", () => {
  it("allows the expected happy-path transitions", () => {
    expect(canTransitionStatus("draft", "input_hasil")).toBe(true);
    expect(canTransitionStatus("input_hasil", "review")).toBe(true);
    expect(canTransitionStatus("review", "approved")).toBe(true);
    expect(canTransitionStatus("approved", "published")).toBe(true);
    expect(canTransitionStatus("published", "revoked")).toBe(true);
  });

  it("blocks invalid jumps", () => {
    expect(canTransitionStatus("draft", "approved")).toBe(false);
    expect(canTransitionStatus("revisi", "published")).toBe(false);
    expect(canTransitionStatus("revoked", "draft")).toBe(false);
  });

  it("marks only working states as editable", () => {
    expect(isEditableStatus("draft")).toBe(true);
    expect(isEditableStatus("input_hasil")).toBe(true);
    expect(isEditableStatus("revisi")).toBe(true);
    expect(isEditableStatus("review")).toBe(false);
    expect(isEditableStatus("published")).toBe(false);
  });
});
