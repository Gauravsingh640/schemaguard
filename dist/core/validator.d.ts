import type { AnySchema } from "ajv";
import type { ValidationResult, BatchValidationResult } from "../types/index.js";
export declare function createValidator<T>(schema: AnySchema): {
    validate: (document: unknown) => ValidationResult<T>;
    validateMany: (documents: unknown[]) => BatchValidationResult<T>;
};
