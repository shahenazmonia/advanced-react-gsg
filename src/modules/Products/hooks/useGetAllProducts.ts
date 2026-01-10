import { useEffect, useState } from "react";
import { useProducts } from "..";
import type { Product } from "../entities/Product";

export const useGetAllProducts = () => {
  const { getAll } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAll().then((products) => {
      setProducts(products);
    });
  }, []);

  return {
    products,
  };
};
