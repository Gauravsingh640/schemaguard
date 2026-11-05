import type { AnySchema } from "ajv";
import ajv from "./engine.js";
import { formatErrors } from "../utils/formatErrors.js";
import type {
  ValidationResult,
  BatchValidationResult
} from "../types/index.js";

export function createValidator<T>(schema: AnySchema) {
  const validate = ajv.compile(schema);

  function validateDocument(document: unknown): ValidationResult<T> {
    const valid = validate(document);

    if (valid) {
      return {
        valid: true,
        data: document as T,
        errors: []
      };
    }

    return {
      valid: false,
      data: null,
      errors: formatErrors(validate.errors)
    };
  }

  function validateMany(
    documents: unknown[]
  ): BatchValidationResult<T> {
    const results = documents.map(validateDocument);

    const validCount = results.filter(
      result => result.valid
    ).length;

    return {
      total: documents.length,
      validCount,
      invalidCount: documents.length - validCount,
      results
    };
  }

  return {
    validate: validateDocument,
    validateMany
  };
}