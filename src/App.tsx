import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes";

const router = createRouter({ routeTree, notFoundMode: "root" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
