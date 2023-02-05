interface Category {
  id: number;
  name: string;
  image: string;
}

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
}

export type Product = Pick<
  ApiProduct,
  "id" | "title" | "description" | "price"
>;

export interface AutocompleteSuggestion {
  id: number;
  text: string;
}
