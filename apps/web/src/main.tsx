import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import { FeatureFlagProvider } from "./modules/FeatureFlags/index.tsx";
import { createProductsModule } from "./modules/Products/index.tsx";
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

(function start() {
  fetch("/config.json")
    .then((res) => res.json())
    .then((config) => {
      const { Provider: ProductsProvider } = createProductsModule();

      const root = createRoot(document.getElementById("root")!);
      return root.render(
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <MantineProvider>
              <FeatureFlagProvider value={config}>
                <ProductsProvider>
                  <App />
                </ProductsProvider>
              </FeatureFlagProvider>
            </MantineProvider>
          </QueryClientProvider>
        </StrictMode>
      );
    });
})();
