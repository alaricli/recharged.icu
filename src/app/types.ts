export type Product = {
  id: number;
  name: string;
  active: boolean;
  created: string; // ISO date string (e.g., "2025-03-01T12:14:11.267443")
  brand: string;
  condition: string;
  color: string;
  blurb: string;
  description: string;
  notes: string;
  category: string;
  subCategory: string;
  unitCost: number;
  unitPrice: number;
  stripeProductId: string;
  stripePriceId: string;
  stripeTaxCodeId: string | null;
  stripeStatementDescription: string | null;
  stock: number;
  sku: string;
  modelNumber: string;
  serialNumber: string;
  tags: string[];
  productImages: string[];
  mainImage: string;
};

export type Cart = {
  cartId: number;
  items: CartItem[];
  lastUpdated: string;
  cartSubTotal: number;
};

export type CartItem = {
  id: number;
  productId: number;
  sku: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
};

export type LocalUser = {
  id: number;
  username: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl: string;
};

export type PriceRangeData = {
  min: number;
  max: number;
};

export type BrandsData = {
  brands: string[];
};

export type CountsData = {
  items: number;
  pages: number;
};

export type Order = {
  id: number;
  orderItems: OrderItem[];
  stripeSessionId: string;
  orderStatus: string;
  created: string;
};

export type OrderItem = {
  product: Product;
  unitPrice: number;
  quantity: number;
};
