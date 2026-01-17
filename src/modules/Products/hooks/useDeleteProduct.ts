import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";
import { useGetAllProducts } from "./useGetAllProducts";

export const useDeleteProduct = ({ onSuccess }: { onSuccess: () => void }) => {
  const { delete: deleteProduct } = useProducts();

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_data, productId) => {
      queryClient.setQueryData(
        [useGetAllProducts.queryKey],
        (old: Product[]) => {
          return old.filter((product) => product.id !== productId);
        }
      );
      onSuccess();
    },
  });

  return {
    deleteProduct: mutate,
    isError,
    isPending,
    isSuccess,
  };
};
