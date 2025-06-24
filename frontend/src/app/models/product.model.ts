export interface CategoryRef {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  specifications: string;
  price: number;
  quantity: number;
  category: CategoryRef;
  subcategory: CategoryRef;
  featuredImage: string;
  images: string[];
}
