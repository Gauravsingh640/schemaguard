import { describe, it, expect } from "vitest";
import { createValidator } from "../src/index.js";

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    age: { type: "integer", minimum: 18 }
  },
  required: ["name", "email", "age"],
  additionalProperties: false
};

const validator = createValidator<{
  name: string;
  email: string;
  age: number;
}>(userSchema);

describe("Batch Validation", () => {
  it("should validate multiple documents", () => {
    const result = validator.validateMany([
      {
        name: "Gaurav",
        email: "gaurav@example.com",
        age: 22
      },
      {
        name: "Rahul",
        email: "rahul@example.com",
        age: 25
      }
    ]);

    expect(result.total).toBe(2);
    expect(result.validCount).toBe(2);
    expect(result.invalidCount).toBe(0);
  });

  it("should identify invalid documents", () => {
    const result = validator.validateMany([
      {
        name: "Gaurav",
        email: "gaurav@example.com",
        age: 22
      },
      {
        name: "Rahul",
        email: "wrong-email",
        age: 17
      }
    ]);

    expect(result.total).toBe(2);
    expect(result.validCount).toBe(1);
    expect(result.invalidCount).toBe(1);
  });

  it("should handle empty arrays", () => {
    const result = validator.validateMany([]);

    expect(result.total).toBe(0);
    expect(result.validCount).toBe(0);
    expect(result.invalidCount).toBe(0);
  });
});