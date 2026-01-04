import { createContext, useContext, type PropsWithChildren } from "react";

const ProductsContext = createContext<string | null>(null);

type ProductsProviderProps = PropsWithChildren<{
  value: string;
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
