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

### Dependency Inversion Principle (DIP)
The Dependency Inversion Principle states that high-level modules should not depend on low-level implementation details.
Instead, both should depend on abstractions.

In React terms
* High-level modules → React components, hooks, pages, business logic
* Low-level modules → API clients, fetch, axios, localStorage, analytics
* Abstractions → TypeScript interfaces, types, contracts, adapters

* Why this matters

By applying DIP, React components remain unaware of how data is fetched or stored — they only know what they need.
They only depend on well-defined interfaces, allowing implementations to change without affecting the UI.


As a summary: in a React + TypeScript project, Dependency Inversion means your components and hooks depend on TypeScript interfaces, while concrete implementations (API, storage) are injected from the outside.

Benefits of Applying DIP in React
- Enhanced Flexibility: With components not directly tied to specific implementations, changes in one part of an application have a reduced risk of unintentionally affecting other parts.
- Improved Testability: Components that depend on abstractions can easily be tested by mocking these abstractions.
- Increased Modularity: When components are decoupled, they can be developed, tested, and scaled independently, promoting a more modular application architecture.

<img width="600" height="388" alt="HighLevelDesign" src="https://github.com/user-attachments/assets/4dd39e35-fd2d-4e69-a318-5818555b7f57" />


##### Data Transfer Object
DTO is an object that is used to encapsulate data. DTOs and mappers are key tools that enforce DIP by preventing domain and UI layers from depending on external data formats. Basically, it isolates the UI and domain logic from external API response formats

<img width="1186" height="714" alt="Screenshot 2026-01-05 at 5 06 57 PM" src="https://github.com/user-attachments/assets/5f832fb9-7f2d-48e5-8b57-ddb5db7e91d7" />

<img width="1222" height="998" alt="Screenshot 2026-01-05 at 5 06 39 PM" src="https://github.com/user-attachments/assets/0c63d570-708b-4c77-a79a-37f3d81cafcc" />

<img width="872" height="630" alt="Screenshot 2026-01-05 at 5 08 28 PM" src="https://github.com/user-attachments/assets/4f2e8dcf-398e-4827-97f8-fbcfc4770a43" />

<img width="1014" height="494" alt="Screenshot 2026-01-05 at 5 07 33 PM" src="https://github.com/user-attachments/assets/7ed91783-5976-4eb0-95ca-3c8ac4f26847" />


### TanStack Query
TanStack Query (formerly React Query) is a server-state management library for modern web apps. It solves a very specific problem: fetching, caching, synchronizing, and updating asynchronous data from a server, without you having to manually manage loading states, caching logic, retries, or background updates.


##### What Tanstack Query solves:
- Data fetched from APIs
- Can become stale
- Needs caching
- Needs refetching
- Needs background syncing
- Needs error & loading handling

##### Setup

```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

##### Query (read operation)

```js
const { data, error, isLoading, isFetching } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 1000 * 60, // 1 minute
  refetchOnWindowFocus: false
})
```

##### Mutations (Write Operations)

A mutation is a create/update/delete operation.

Mutations keep server data and UI state synchronized by invalidating and refetching affected queries.

```js
const queryClient = useQueryClient()

const { data, isLoading } = useMutation({
  mutationFn: deleteProduct,
  onSuccess: () => {
    queryClient.invalidateQueries(['products'])
  },
 onError: (_err, _newTodo, context) => {
   queryClient.setQueryData(['products'], context.previous)
},
})
```


##### Infinite Scroll 
Supports pagination and infinite scrolling with built-in cache management.

```js
   const { data, isLoading } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    })
```

##### Devtools
Provides insight into cache state, query lifecycles, and background refetching.

```js
<ReactQueryDevtools />
```

### Design Patterns

### Feature Flags

### Monorepo Architecture

### Design System
