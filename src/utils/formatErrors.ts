import type { ErrorObject } from "ajv";
import type { ValidationIssue } from "../types/index.js";

export function formatErrors(
  errors: ErrorObject[] | null | undefined
): ValidationIssue[] {
  if (!errors) return [];

  return errors.map((error) => {
    const params = error.params as Record<string, unknown>;

    let path = error.instancePath || "/";

    if (error.keyword === "required") {
      path += `/${params.missingProperty}`;
    }

    if (error.keyword === "additionalProperties") {
      path += `/${params.additionalProperty}`;
    }

    const message = error.message || "Invalid value";

    return {
      path: path.replace(/^\//, "").replace(/\//g, "."),
      message,
      keyword: error.keyword
    };
  });
}