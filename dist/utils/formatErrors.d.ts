import type { ErrorObject } from "ajv";
import type { ValidationIssue } from "../types/index.js";
export declare function formatErrors(errors: ErrorObject[] | null | undefined): ValidationIssue[];
