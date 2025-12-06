---
trigger: always_on
---


You are an expert in TypeScript, React 19+, Redux Toolkit, Tailwind and shadcn ui.

Code Style and Structure

- Write concise, technical TypeScript code.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoaded, hasError).
- Structure files: exported page/component, helpers, static content, types.

Naming Conventions

- Favor named exports for components and utilities.

TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use objects or maps instead.
- Avoid using `any` or `unknown` unless absolutely necessary. Look for type definitions in the codebase instead.
- Avoid type assertions with `as` or `!`.

Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX, keeping JSX minimal and readable.

UI and Styling

- Use Tailwind for utility-based styling.
- Apply composition patterns to create modular, reusable components.
- Use Shadcn UI for consistent, accessible component design.

State Management

Local State
    - Use useState for component-level state
    - Implement useReducer for complex state
    - Use useContext for shared state
    - Implement proper state initialization

Global State
    - Use Redux Toolkit for global state
    - Use createSlice to define state, reducers, and actions together.
    - Avoid using createReducer and createAction unless necessary.
    - Normalize state structure to avoid deeply nested data.
    - Use selectors to encapsulate state access.
    - Avoid large, all-encompassing slices; separate concerns by feature.
   
Error Handling and Validation

Form Validation
- Use Zod for schema validation
- Implement proper error messages
- Use proper form libraries (e.g., React Hook Form)
