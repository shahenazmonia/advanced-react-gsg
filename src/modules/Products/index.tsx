import { createContext, useContext, type PropsWithChildren } from "react";
import type { ProductsRepository } from "./repository/ProductsRepository";
import { restProducts } from "./repository/restProducts";

const ProductsContext = createContext<ProductsRepository | null>(null);

type ProductsProviderProps = PropsWithChildren<{
  value: ProductsRepository;
}>;

export const ProductsProvider = ({
  value,
  children,
}: ProductsProviderProps) => {
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === null) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }

  return context;
};

export const createProductsModule = () => {
  const value = restProducts();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <ProductsProvider value={value}>{children}</ProductsProvider>
    ),
  };
};
