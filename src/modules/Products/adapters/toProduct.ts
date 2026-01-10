import type { ProductDto } from "../dto/Product";
import type { Product } from "../entities/Product";

export const toProduct = (products: ProductDto[]): Product[] => {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.thumbnail,
      isAvailable: product.stock > 0,
      hasDiscounts: false,
      reviews: product.reviews.map((review) => {
        return {
          rating: review.rating,
          comment: review.comment,
          date: review.date,
          reviewer: {
            name: review.reviewerName,
            email: review.reviewerEmail,
          },
        };
      }),
    };
  });
};
