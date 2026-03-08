export interface Product {
  id: string;
  description: string;
  images: string[];
  price: number;
  oldPrice?: number | null;
  slug: string;
  tags: string[];
  title: string;
  category: string;
  categoryId: string;
  isPublished: boolean;
  downloadUrl: string;

  hasPhysical: boolean;
  physicalPrice?: number | null;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  format: 'digital' | 'physical';
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}