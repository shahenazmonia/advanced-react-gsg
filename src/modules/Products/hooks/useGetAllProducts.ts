import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";

type SelectQueryData = {
  all: Product[];
  productsWithDiscountHigherThan10: Product[];
  productsWithDiscountLowerThan10: Product[];
};

const Get_ALL_PRODUCTS_QUERY_KEY = "products";

export const useGetAllProducts = () => {
  const { getAll } = useProducts();
  const {
    data = {
      all: [],
      productsWithDiscountHigherThan10: [],
      productsWithDiscountLowerThan10: [],
    },
    error,
    isLoading,
  } = useQuery({
    queryKey: [Get_ALL_PRODUCTS_QUERY_KEY],
    queryFn: getAll,
    staleTime: 1000 * 60,
    select: (data: Product[]): SelectQueryData => {
      return {
        all: data,
        productsWithDiscountHigherThan10: data.filter(
          (product) => product.hasDiscounts && product.discountPercentage > 10
        ),

        productsWithDiscountLowerThan10: data.filter(
          (product) => product.hasDiscounts && product.discountPercentage <= 10
        ),
      };
    },
  });

  return {
    productsWithDiscountHigherThan10: data.productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10: data.productsWithDiscountLowerThan10,
    isEmpty: error,
    isLoading,
  };
};

useGetAllProducts.queryKey = Get_ALL_PRODUCTS_QUERY_KEY;
