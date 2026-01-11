import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Pill,
  Text,
  Title,
} from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

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
          return (
            <Grid.Col span={4} key={product.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src={product.image} height={160} alt={product.name} />
                </Card.Section>
                {product.isAvailable && <Pill>Available</Pill>}
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{product.name}</Text>
                  <Badge color="pink">On Sale</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  {product.description}
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md">
                  Order Now
                </Button>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      <Title>Products with Discount Lower Than 10%</Title>
      <Grid>
        {productsWithDiscountLowerThan10.map((product) => {
          return (
            <Grid.Col span={4} key={product.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src={product.image} height={160} alt={product.name} />
                </Card.Section>
                {product.isAvailable && <Pill>Available</Pill>}
                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>{product.name}</Text>
                  <Badge color="pink">On Sale</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  {product.description}
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md">
                  Order Now
                </Button>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};
