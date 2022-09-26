import { useState } from "react";
import { ProductVariant as Variant } from "@medusajs/medusa";

const useCart = () => {
  const [cart, setCart] = useState<Variant[]>([]);

  const addItem = (item: Variant) => {
    setCart((prev) => [...prev, item]);
  };
  const removeItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }

  return {
    cart,
    addItem,
    removeItem
  }
}

export default useCart;