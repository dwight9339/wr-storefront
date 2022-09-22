import internal from "stream";

export interface Collection {
  title: string;
  id: string;
}

export interface Price {
  id: string;
  currency_code: string;
  amount: number;
}

export interface Variant {
  id: string;
  title: string;
  product_id: string;
  prices: Price;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  variants: Variant[];
}