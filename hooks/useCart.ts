import { useContext, useState } from "react";
import CartContext from "../contexts/CartContext";
import useCookieManager from "./useCookieManager";
import axios from "axios";
import {
  ProductVariant as Variant,
  LineItem as Item
} from "@medusajs/medusa";

const useCart = () => {
  const { setCookie, getCookie } = useCookieManager();
  const { cart, setCart } = useContext(CartContext);

  const addItem = async (item: Variant, quantity: number) => {
    const cartId = getCookie("cartId");
    const url = cartId
      ? `${process.env.BACKEND_HOST}/store/carts/${cartId}/line-items`
      : `${process.env.BACKEND_HOST}/stor/carts`;
    const itemPayload = {
      variantId: item.id,
      quantity
    };
    
    try {
      const res = await axios.post(url, cartId
        ? itemPayload
        : {
          items: [itemPayload]
        }  
      );
      const { data: { cartObj } } = res;
      if (!cartId) setCookie("cartId", cartObj.id);
      setCart(cartObj.items);
    } catch(err) {
      console.error(err);
    }
  }

  const removeItem = (itemId: string) => {
    
  }

  return { cart, addItem, removeItem } 
}

export default useCart;