import { toProduct } from "../adapters/toProduct";
import type { Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductsRepository";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(`${Base_URL}?limit=100`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json().then((data) => toProduct(data.products));
    },
  };
};
