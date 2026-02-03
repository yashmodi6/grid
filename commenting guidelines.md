# Commenting Guidelines

## Philosophy
- **Code explains WHAT**; **Comments explain WHY**.
- Keep comments concise and up-to-date.
- If code is unclear, refactor it first.

## Rules

### 1. Exported Symbols (JSDoc)
All exported functions, classes, and types must have JSDoc comments.
- Explain the purpose.
- Document parameters (`@param`) and return values (`@returns`) if not obvious.
- Mention side effects (e.g., redirects, throws).

**Example:**
```ts
/**
 * Verifies success of a DAL operation.
 * Redirects to /login if no user found.
 * 
 * @param dalReturn - The result object from a DAL operation.
 * @returns The successful data T.
 */
export function dalVerifySuccess<T>(dalReturn: DalReturn<T>): T { ... }
```

### 2. Complex Logic (Inline)
Use `//` for inline comments to explain non-obvious logic, specific business rules, or "magic" values.

**Example:**
```ts
// Redirects to root if access denied, otherwise returns original error
if (dalReturn.error.type === "no-access") return redirect(redirectPath)
```

### 3. TODOs & FIXMEs
Use `// TODO:` or `// FIXME:` to track technical debt or known issues.

```ts
// TODO: Implement role-based access control
```
