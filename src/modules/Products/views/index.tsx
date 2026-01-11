import { Grid, Title } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { Product } from "./Product";

export const Products = () => {
  const {
    isEmpty,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
  } = useGetAllProducts();

  if (isEmpty) {
    return <Title> No products available </Title>;
  }

  return (
    <>
      <Title>Products with Discount Higher Than 10%</Title>
      <Grid>
        {productsWithDiscountHigherThan10.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </Grid>
      <Title>Products with Discount Lower Than 10%</Title>
      <Grid>
        {productsWithDiscountLowerThan10.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </Grid>
    </>
  );
};
