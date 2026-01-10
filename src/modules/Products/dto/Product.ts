export type ProductDto = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  stock: number;
  reviews: ReviewDto[];
};

export type ReviewDto = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
