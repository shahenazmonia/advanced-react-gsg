import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import { createProductsModule } from "./modules/Products/index.tsx";

const { Provider: ProductsProvider } = createProductsModule();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </MantineProvider>
  </StrictMode>
);
