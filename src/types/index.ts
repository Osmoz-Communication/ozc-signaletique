export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceHT?: number;
  priceTTC?: number;
  sku: string; // UGS - Unité de Gestion de Stock
  category: string;
  subcategory?: string;
  specialty?: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}