import { describe, it, expect } from "vitest";
import { createValidator } from "../src/index.js";

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    address: {
      type: "object",
      properties: {
        city: { type: "string" },
        pincode: { type: "integer" }
      },
      required: ["city", "pincode"],
      additionalProperties: false
    },
    skills: {
      type: "array",
      items: { type: "string" },
      minItems: 1
    },
    role: {
      type: "string",
      enum: ["admin", "user", "moderator"]
    }
  },
  required: ["name", "address", "skills", "role"],
  additionalProperties: false
};

const validator = createValidator(userSchema);

describe("Nested Validation", () => {
  it("should accept valid nested documents", () => {
    const result = validator.validate({
      name: "Gaurav",
      address: {
        city: "Delhi",
        pincode: 110008
      },
      skills: ["React", "Node.js"],
      role: "admin"
    });

    expect(result.valid).toBe(true);
  });

  it("should reject invalid nested properties", () => {
    const result = validator.validate({
      name: "Gaurav",
      address: {
        city: "Delhi",
        pincode: "wrong"
      },
      skills: ["React"],
      role: "admin"
    });

    expect(result.valid).toBe(false);
  });

  it("should reject invalid array elements", () => {
    const result = validator.validate({
      name: "Gaurav",
      address: {
        city: "Delhi",
        pincode: 110008
      },
      skills: ["React", 123],
      role: "admin"
    });

    expect(result.valid).toBe(false);
  });

  it("should reject invalid enum values", () => {
    const result = validator.validate({
      name: "Gaurav",
      address: {
        city: "Delhi",
        pincode: 110008
      },
      skills: ["React"],
      role: "superadmin"
    });

    expect(result.valid).toBe(false);
  });
});