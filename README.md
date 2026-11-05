# SchemaGuard 🛡️

**Lightweight schema validation toolkit for JavaScript and TypeScript applications.**

SchemaGuard helps developers validate objects against JSON Schemas with clean validation results, detailed error messages, and batch validation support.

## ✨ Features

- Schema-based object validation
- Built with TypeScript
- Powered by [Ajv](https://ajv.js.org/)
- Nested object validation
- Array and enum validation
- Detailed validation errors with field paths
- Batch validation for multiple documents
- ESM and CommonJS support

## 📦 Installation

```bash
npm install schemaguard
```

## 🚀 Quick Start

```typescript
import { createValidator } from "schemaguard";

interface User {
  name: string;
  email: string;
  age: number;
}

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

const userValidator = createValidator<User>(userSchema);

const result = userValidator.validate({
  name: "Gaurav",
  email: "gaurav@example.com",
  age: 22
});

console.log(result);
```

## 📋 Validation Result

**Valid document:**

```typescript
{
  valid: true,
  data: {
    name: "Gaurav",
    email: "gaurav@example.com",
    age: 22
  },
  errors: []
}
```

**Invalid document:**

```typescript
{
  valid: false,
  data: null,
  errors: [
    {
      path: "email",
      message: "must match format \"email\"",
      keyword: "format"
    }
  ]
}
```

## 📚 Batch Validation

Validate multiple documents using `validateMany()`.

```typescript
const users = [
  {
    name: "Gaurav",
    email: "gaurav@example.com",
    age: 22
  },
  {
    name: "Alex",
    email: "invalid-email",
    age: 17
  }
];

const result = userValidator.validateMany(users);

console.log(result);
```

The batch result includes:

- `total` – Total number of documents
- `validCount` – Number of valid documents
- `invalidCount` – Number of invalid documents
- `results` – Individual validation results

## 🧩 Tech Stack

- TypeScript
- Node.js
- Ajv
- Ajv Formats
- Vitest
- tsup

## 🛠️ Development

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd schemaguard
```

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm test
```

Build the package:

```bash
npm run build
```

## 🗺️ Roadmap

- [x] Core schema validation
- [x] Nested object validation
- [x] Array and enum validation
- [x] Batch validation
- [x] Detailed validation errors
- [ ] MongoDB ObjectId validation
- [ ] Mongoose integration
- [ ] CLI support
- [ ] Schema inference

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

---

**SchemaGuard** — Validate with confidence. 🛡️