"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createValidator: () => createValidator
});
module.exports = __toCommonJS(index_exports);

// src/core/engine.ts
var import_ajv = require("ajv");
var import_ajv_formats = __toESM(require("ajv-formats"), 1);
var ajv = new import_ajv.Ajv({
  allErrors: true,
  strict: true
});
(0, import_ajv_formats.default)(ajv);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createValidator
});
