import { useCart as useProviderCart,
  useGetCart,
  useCreateLineItem,
  useDeleteLineItem
} from "medusa-react";
import { useEffect, useState } from "react";
import { LineItem } from "@medusajs/medusa";
import useRegion from "./useRegion";
import store from "store2";

const useCart = () => {
  const cartProvider = useProviderCart();
  const [cartId, setCartId] = useState<string>(store.get("cartId"));
  const createLineItem = useCreateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);
  const { cart, isLoading, refetch } = useGetCart(cartId);
  const { userRegion } = useRegion();

  const createCart = async () => {
    const { cart } = await cartProvider.createCart.mutateAsync({
      region_id: userRegion?.id
    });
    store.set("cartId", cart.id);
    setCartId(cart.id);

    return cart;
  }

  const addItem = async ({ variant_id, quantity }: LineItem) => {
    if (!cartId) {
      await createCart();
    }

    createLineItem.mutate({variant_id, quantity});
  }

  const removeItem = ({ id }: LineItem) => {
    deleteLineItem.mutate({lineId: id}, {
      onSuccess: () => {
        refetch();
      }
    });
  }

  return {
    ...cartProvider,
    cart,
    loading: isLoading,
    addItem,
    removeItem
  };
}

export default useCart;