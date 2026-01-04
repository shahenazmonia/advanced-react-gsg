# Advanced React
This repository is a learning course. The goal is to teach scalable React architecture, modern tooling, and real-world best practices used in production applications.

## What You Will Learn
By the end of this course, you will understand:
- Modern React tooling and setup
- Feature-based (modular) architecture
- State management patterns
- API integration and data fetching
- Context, providers, and dependency inversion
- Scalable frontend design practices

## Tech Stack Overview

### Build Tool – Vite
Vite is a modern build tool designed to provide a fast and efficient development experience for web applications.

To create a TypeScript + React project, run: `pnpm create vite`
Then follow the official guide:
https://vite.dev/guide/

### UI Framework – Mantine Framework

Mantine is a modern, React-only component library built with TypeScript and CSS-in-JS.
We use Mantine to provide a consistent UI, speed up development, and avoid rebuilding common components from scratch.

Installation guide:
https://mantine.dev/getting-started/

###### Why Mantine?
- Highly customizable
- Excellent developer experience
- Built-in theming and dark mode support
- Rich set of hooks (forms, modals, notifications, etc.)
- Clean and modern default design

### Project Structure & Architecture
Why Architecture Matters?

As applications grow, poor structure leads to:
- Difficult maintenance
- Tight coupling
- Slow development
- Risky refactors

#### Traditional (Non-Modular) Structure
```js src/
├─ components/
├─ pages/
├─ hooks/
├─ services/
├─ styles/
```

* Problems with this approach:
    - Features are scattered across folders
    - Difficult to scale
    - Small changes require touching many files
    - Features are hard to remove or reuse

#### Modular (Feature-Based) Architecture
A modular architecture organizes code by features, not by technical layers.

* Each module has:
    - UI components
    - Hooks
    - State logic
    - API calls
    - Services
    - Tests

* Advantages:
    - Better feature isolation
    - Easier scalability
    - Cleaner dependencies
    - Supports parallel team work
    ```js
    src/
    ├─ modules/
    │  ├─ auth/
    │  │  ├─ views/
    │  │  ├─ apis/
    │  │  ├─ hooks/
    │  │  ├─ services/
    │  │  └─ index.tsx
    │  │
    │  ├─ products/
    │  │  ├─ views/
    │  │  ├─ apis/
    │  │  ├─ hooks/
    │  │  └─ services/
    │
    ├─ shared/
    │  ├─ components/
    │  ├─ hooks/
    │  └─ utils/
    │
    └─ App.jsx
    ```

### API Layer

We use the DummyJSON API? to simulate real-world CRUD operations.

Documentation:
https://dummyjson.com/docs

This allows you to focus on architecture and patterns without managing a backend.

### Providers and Context

What Problem Do They Solve?

Passing props deeply through the component tree (prop drilling) quickly becomes unmanageable.

Example of prop drilling:

```js 
<App user={user}>
  <Header user={user}>
    <UserMenu user={user}>
      <Avatar user={user} />
    </UserMenu>
  </Header>
</App>
```

##### Solution: Context & Providers
Context allows data to be shared globally.

A Provider supplies that data to the component tree.

* When to use them:
    - Cross-module communication
    - App-wide state (theme, authentication, feature flags)
    - Avoids prop drilling
    - Data needed by many unrelated components
    - Shared logic that should be centralized

### Dependency Inversion Principle
High-level modules (business logic and workflows) should not depend directly on low-level modules (implementation details).
Instead, both should depend on abstractions.
<img width="600" height="388" alt="HighLevelDesign" src="https://github.com/user-attachments/assets/4dd39e35-fd2d-4e69-a318-5818555b7f57" />


### TanStack Query

### Design Patterns

### Feature Flags

### Monorepo Architecture

### Design System
