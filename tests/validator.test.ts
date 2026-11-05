import { describe, it, expect } from "vitest";
import { createValidator } from "../src/index.js";

interface User {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    age: { type: "integer", minimum: 18 },
    isActive: { type: "boolean" }
  },
  required: ["name", "email", "age", "isActive"],
  additionalProperties: false
};

const validator = createValidator<User>(userSchema);

describe("SchemaGuard", () => {
  it("should accept a valid document", () => {
    const result = validator.validate({
      name: "Gaurav",
      email: "gaurav@example.com",
      age: 22,
      isActive: true
    });

    expect(result.valid).toBe(true);
  });

  it("should reject an invalid email", () => {
    const result = validator.validate({
      name: "Gaurav",
      email: "invalid-email",
      age: 22,
      isActive: true
    });

    expect(result.valid).toBe(false);
  });

  it("should reject missing required fields", () => {
    const result = validator.validate({
      name: "Gaurav",
      email: "gaurav@example.com",
      age: 22
    });

    expect(result.valid).toBe(false);
  });

  it("should reject unexpected properties", () => {
    const result = validator.validate({
      name: "Gaurav",
      email: "gaurav@example.com",
      age: 22,
      isActive: true,
      salary: 50000
    });

    expect(result.valid).toBe(false);
  });
});