import { describe, it, expect } from "vitest";
import { createValidator } from "../src/index.js";

const schema = {
  type: "object",
  properties: {
    address: {
      type: "object",
      properties: {
        pincode: { type: "integer" }
      },
      required: ["pincode"],
      additionalProperties: false
    },
    skills: {
      type: "array",
      items: { type: "string" }
    }
  },
  required: ["address", "skills"]
};

const validator = createValidator(schema);

describe("Error Reporting", () => {
  it("should return nested field paths", () => {
    const result = validator.validate({
      address: {
        pincode: "wrong"
      },
      skills: ["React"]
    });

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors[0].path).toBe("address.pincode");
    }
  });

  it("should identify missing properties", () => {
    const result = validator.validate({
      address: {},
      skills: ["React"]
    });

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors.some(
        error => error.path === "address.pincode"
      )).toBe(true);
    }
  });

  it("should identify additional properties", () => {
    const result = validator.validate({
      address: {
        pincode: 110008,
        country: "India"
      },
      skills: ["React"]
    });

    expect(result.valid).toBe(false);

    if (!result.valid) {
      expect(result.errors.some(
        error => error.path === "address.country"
      )).toBe(true);
    }
  });
});