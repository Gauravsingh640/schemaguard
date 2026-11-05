import type { ErrorObject } from "ajv";
export interface ValidationIssue {
    path: string;
    message: string;
    keyword: string;
    value?: unknown;
}
export type ValidationResult<T> = {
    valid: true;
    data: T;
    errors: [];
} | {
    valid: false;
    data: null;
    errors: ValidationIssue[];
};
export interface BatchValidationResult<T> {
    total: number;
    validCount: number;
    invalidCount: number;
    results: ValidationResult<T>[];
}
export type AjvErrors = ErrorObject[];
