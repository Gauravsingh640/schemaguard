// src/core/engine.ts
import { Ajv } from "ajv";
import addFormats from "ajv-formats";
var ajv = new Ajv({
  allErrors: true,
  strict: true
});
addFormats(ajv);
var engine_default = ajv;

// src/utils/formatErrors.ts
function formatErrors(errors) {
  if (!errors) return [];
  return errors.map((error) => {
    const params = error.params;
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

// src/core/validator.ts
function createValidator(schema) {
  const validate = engine_default.compile(schema);
  function validateDocument(document) {
    const valid = validate(document);
    if (valid) {
      return {
        valid: true,
        data: document,
        errors: []
      };
    }
    return {
      valid: false,
      data: null,
      errors: formatErrors(validate.errors)
    };
  }
  function validateMany(documents) {
    const results = documents.map(validateDocument);
    const validCount = results.filter(
      (result) => result.valid
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
export {
  createValidator
};
