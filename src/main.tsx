import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { ProductsProvider } from "./modules/Products/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <ProductsProvider value="My Products Context">
        <App />
      </ProductsProvider>
    </MantineProvider>
  </StrictMode>
);
