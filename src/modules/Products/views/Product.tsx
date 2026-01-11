import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Pill,
  Text,
} from "@mantine/core";
import type { Product as ProductProps } from "../entities/Product";

export const Product = ({ product }: { product: ProductProps }) => {
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
};
