import { Cart, LineItem } from "@medusajs/medusa";
import { createContext, useContext, useState } from "react";
import { 
  useCreateCart,
  useGetCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem
} from "medusa-react";
import useRegion from "../hooks/useRegion";
import store from "store2";

interface CartState {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined;
  loading: boolean;
}

interface CartContext extends CartState {
  addItem: (item: LineItem) => void;
  removeItem: (item: LineItem) => void;
  updateQuantity: (item: LineItem, quantity: number) => void;
}

const CartContext = createContext<CartContext | null>(null);

interface ProviderProps {
  children: JSX.Element;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

export const CartProvider = ({ children }: ProviderProps) => {
  const [cartId, setCartId] = useState<string>(store.get("cartId"));
  const { cart, isLoading, refetch } = useGetCart(cartId);
  const createCart = useCreateCart();
  const createLineItem = useCreateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);
  const updateLineItem = useUpdateLineItem(cartId);
  const { userRegion } = useRegion();

  const addItem = (item: LineItem) => {
    if (!cartId) {
      createCart.mutate({
        region_id: userRegion.id,
        items: [item]
      }, {
        onSuccess: ({ cart }) => {
          setCartId(cart.id);
          store.set("cartId", cart.id);
        }
      });
    } else {
      createLineItem.mutate({
        variant_id: item.variant_id, 
        quantity: item.quantity
      }, {
        onSuccess: ({ cart }) => {
          setCartId(cart.id);
        }
      });
    }
  }

  const removeItem = ({ id }: LineItem) => {
    deleteLineItem.mutate({lineId: id}, {
      onSuccess: () => refetch()
    });
  }

  const updateQuantity = ({ id }: LineItem, quantity: number) => {
    updateLineItem.mutate({
      lineId: id,
      quantity
    }, {
      onSuccess: () => refetch()
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading: isLoading,
        addItem,
        removeItem,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}