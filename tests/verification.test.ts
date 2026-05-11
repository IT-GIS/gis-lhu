import { describe, expect, it } from "vitest";

import { getVerificationView } from "@/lib/verification";

describe("verification view state", () => {
  it("returns invalid when token is not found", () => {
    expect(getVerificationView({ tokenExists: false, isActive: false }).state).toBe("invalid");
  });

  it("returns revoked when token exists but is not active", () => {
    expect(getVerificationView({ tokenExists: true, isActive: false }).state).toBe("revoked");
  });

  it("returns valid when token exists and is active", () => {
    expect(getVerificationView({ tokenExists: true, isActive: true }).state).toBe("valid");
  });
});
