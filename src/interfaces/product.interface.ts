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
  categoryId: string
  isPublished: boolean;

  isPremiumUI?: boolean;
  rating: number;
  reviewCount:number;

  downloadUrl:string;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}


export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

