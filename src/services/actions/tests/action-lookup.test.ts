import { describe, it, expect } from "vitest";

import { actionListSchema } from "../tools/action-lookup";

describe("Actions Models", () => {
  describe("actionListSchema", () => {
    it("should validate valid fields array", () => {
      const result = actionListSchema.shape.fields.safeParse(["name", "active", "created_at"]);
      expect(result.success).toBe(true);
    });

    it("should reject invalid fields", () => {
      const result = actionListSchema.shape.fields.safeParse(["invalid_field"]);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("Invalid enum value");
      }
    });

    it("should accept undefined fields", () => {
      const result = actionListSchema.shape.fields.safeParse(undefined);
      expect(result.success).toBe(true);
    });

    it("should validate complete valid object", () => {
      const validObject = {
        amount: 100,
        fields: ["name", "active", "created_at"],
      };
      const result = actionListSchema.safeParse(validObject);
      expect(result.success).toBe(true);
    });

    it("should transform name filter with wildcard matching", () => {
      const validInput = {
        filter: {
          name: "notification",
        },
      };
      const result = actionListSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      expect(result.data?.filter?.name).toBe("*notification*");
    });
  });
});
