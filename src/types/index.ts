export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
  description: string;
}

export interface Account {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categoryName: string;
  stock: number;
  batchPrice?: string;
  description: string;
  features?: string[];
  deliveryMethod: string;
  verificationMethod: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
} 