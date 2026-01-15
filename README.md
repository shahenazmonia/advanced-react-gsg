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
* High-level modules → React components, hooks, and pages
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

<img width="716" height="281" alt="Dependency_inversion" src="https://github.com/user-attachments/assets/eff87e4d-e9f8-4161-897a-166368132a41" />

![https___dev-to-uploads s3 amazonaws com_uploads_articles_56xle6db4bhlr5hdonqz](https://github.com/user-attachments/assets/8bb3f04d-28da-47c5-af17-d84c2366f9a1)


#### Data Transfer Object
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

Documentation: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
```js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

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
  select: (data: TData) => unknown
// This option can be used to transform or select a part of the data returned by the query function. It affects the returned data value, but does not affect what gets stored in the query cache.
})
```

##### Mutations (Write Operations)

A mutation is a create/update/delete operation.

Mutations keep server data and UI state synchronized by invalidating and refetching affected queries.

```js
const queryClient = useQueryClient()

const { mutate, isError, isPending } = useMutation({
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
Provides insight into cache state, query lifecycle, and background refetching.

```js
<ReactQueryDevtools />
```

### Tanstack Router
Type-safe Routing for React and Solid applications

A powerful React router for client-side. Fully type-safe APIs, first-class search-params for managing state in the URL and seamless integration with the existing React ecosystem

Documentation: https://tanstack.com/router/latest

Its core goals are:

- Full TypeScript safety
- Predictable routing
- First-class data loading
- Tight integration with TanStack Query
- Explicit architecture over magic

Unlike React Router, TanStack Router treats routing as part of your application architecture, not just URL matching.

```js
const userRoute = createRoute({
  path: '/users/$userId',
})

// userId is typed everywhere. You cannot navigate incorrectly

navigate({ to: '/users/$userId', params: { userId: '123' } })

```

```js
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => <Navigate to="/" />,
});

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Products,
});

const routeTree = rootRoute.addChildren([productsRoute])

const router = createRouter({ routeTree, notFoundMode: "root" })

export default function App() {
  return <RouterProvider router={router} />
}
```

Registering the Router Type (Required for Type Safety)

To enable full type safety in TanStack Router, you must explicitly register the router instance with TypeScript.

TanStack Router relies on TypeScript module augmentation to understand:

- Which routes exist
- What parameters each route requires
- Which paths are valid navigation targets

Without this registration, hooks like useNavigate fall back to untyped behavior, allowing any string to be used as a route.

```js
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
```

This declaration tells TypeScript:

“This is the router instance used by the application — use its route definitions to type navigation, params, and loaders.”

### Design Patterns

Design patterns in React are proven, reusable ways to structure components and manage logic so your app stays scalable, readable, and easy to maintain.

#### Some name of Design Patterns
- Compound Components
- Hooks Composition
- Higher-Order Components (HOC)
- Context Provider Pattern
- Dependency Injection (via Context)
- Lifting State Up
- Polling Pattern
- Memoization (React.memo, useMemo, useCallback)
- Headless Component Pattern



Slot / Children-as-API Pattern
Examples: https://refine.dev/blog/react-design-patterns/#introduction


### Feature Flags

Feature flags (also known as feature toggles or feature switches) are a software development technique that allows you to enable or disable features in your application without deploying new code. They act as conditional statements that control whether specific functionality is visible or active for users.

#### What Are Feature Flags?

At their core, feature flags are simple boolean conditions wrapped around features:

```js
function ProductList() {
  const { isEnabled } = useFeatureFlag('new-product-ui');
  
  if (isEnabled) {
    return <NewProductList />;
  }
  
  return <OldProductList />;
}
```

Feature flags decouple deployment from release — you can deploy code with features turned off, then enable them remotely when ready.

#### Types of Feature Flags

1. **Release Flags (Temporary)**
   - Control gradual rollout of new features
   - Should be removed after full release
   - Example: Rolling out a redesigned checkout page

2. **Experiment Flags (Temporary)**
   - Used for A/B testing and experiments
   - Measure impact of different implementations
   - Removed after experiment concludes
   - Example: Testing two different pricing displays

3. **Permission Flags (Long-lived)**
   - Control access based on user roles or subscriptions
   - Example: Premium features, beta access, regional availability


#### Why Use Feature Flags?

**Benefits:**

 **Reduced Risk**
   - Test features with small user groups before full release
   - Instant rollback without code deployment
   - No need for hotfix deployments

 **Faster Development**
   - Merge code continuously without waiting for feature completion
   - Multiple teams work on different features in parallel
   - No long-lived feature branches


**Basic Implementation:**

```js
import { createContext, useContext } from 'react';

type FeatureFlags = {
  isNewProductsUIEnabled: boolean;
};

const FeatureFlagContext = createContext<FeatureFlags | null>(null);

export function FeatureFlagProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>({
    isNewProductsUIEnabled: false
  });
  
  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(setFlags);
  }, []);
  
  return (
    <FeatureFlagContext.Provider value={flags}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlag(flagName: keyof FeatureFlags) {
  const flags = useContext(FeatureFlagContext);
  if (!flags) throw new Error('useFeatureFlag must be used within FeatureFlagProvider');
  return flags[flagName];
}
```

**Usage in Components:**

```js
function ProductPage() {
  const newUIEnabled = useFeatureFlag('isNewProductsUIEnabled');
  
  return (
    <div>
      {newUIEnabled ? (
        <NewProductInterface />
      ) : (
        <LegacyProductInterface />
      )}
    </div>
  );
}
```

### Monorepo Architecture

### Design System
