import { useCart as useProviderCart, useGetCart } from "medusa-react";
import { useEffect, useState } from "react";
import store from "store2";

const useCart = () => {
  const cartProvider = useProviderCart();
  const [cartId, setCartId] = useState<string>(store.get("cartId"));

  const initialize = async () => { 
    try {
      if (!cartId) {
        const { cart } = await cartProvider.createCart.mutateAsync({
          region_id: "reg_01GEEME8TMVQNTYA2H6K842291"
        });
        store.set("cartId", cart.id);
        setCartId(cart.id);
      } else if (!cartProvider.cart?.id) {
        useGetCart(cartId, {
          onSuccess: ({ cart }) => {
            cartProvider.setCart(cart);
            setCartId(cart.id);
          }
        });
      }
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return {
    ...cartProvider,
    cartId
  };
}

export default useCart;