import { useCart as useProviderCart,
  useGetCart,
  useCreateLineItem,
  useDeleteLineItem
} from "medusa-react";
import { useEffect, useState } from "react";
import { LineItem } from "@medusajs/medusa";
import useRegion from "./useRegion";
import store from "store2";
import axios from "axios";
import { createCipheriv } from "crypto";

const useCart = () => {
  const cartProvider = useProviderCart();
  const [cartId, setCartId] = useState<string>(store.get("cartId"));
  const createLineItem = useCreateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);
  const { userRegion } = useRegion();

  const createCart = async () => {
    const { cart } = await cartProvider.createCart.mutateAsync({
      region_id: userRegion?.id
    });
    store.set("cartId", cart.id);
    setCartId(cart.id);

    return cart;
  }

  const loadCart = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/store/carts/${cartId}`
      );
      const { data: { cart } } = res;
  
      cartProvider.setCart(cart);
    } catch(err) {
      console.error(err);
    }
  }

  const addItem = async ({ variant_id, quantity }: LineItem) => {
    if (!cartId) {
      await createCart();
    }

    createLineItem.mutate({variant_id, quantity});
  }

  const removeItem = ({ id }: LineItem) => {
    deleteLineItem.mutate({lineId: id});
  }

  useEffect(() => {
    if (!cartProvider.cart?.id) {
      try {
        if (cartId) {
          loadCart();
        } else {
          createCart();
        }
      } catch(err) {
        console.error(err);
      }
    }
  }, []);

  return {
    ...cartProvider,
    addItem,
    removeItem
  };
}

export default useCart;