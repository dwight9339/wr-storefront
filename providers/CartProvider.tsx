import { Cart, LineItem, PaymentProvider } from "@medusajs/medusa";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  useCreateCart,
  useGetCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
  useCompleteCart,
  useCreatePaymentSession,
  useSetPaymentSession,
  useUpdateCart,
  useCreateCustomer
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
  startCheckout: () => void;
  setShippingAddress: (address: any) => void;
  finishCheckout: () => void;
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
  const createCustomer = useCreateCustomer();
  const createLineItem = useCreateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);
  const updateLineItem = useUpdateLineItem(cartId);
  const updateCart = useUpdateCart(cartId);
  const createPaymentSession = useCreatePaymentSession(cartId);
  const setPaymentSession = useSetPaymentSession(cartId);
  const completeCart = useCompleteCart(cartId);
  const { userRegion } = useRegion();

  useEffect(() => {
    // To do: Figure out how to set anon customer better
    if (cart && !cart.customer_id) {
      updateCart.mutate({
        customer_id: "cus_01GFNRP1AR95D1QSC5C18SA1NR"
      });
    }
  }, [cart]);

  const addItem = (item: LineItem) => {
    if (!cartId) {
      createCart.mutate({
        region_id: userRegion.id,
        items: [item]
      }, {
        onSuccess: async ({ cart }) => {
          setCartId(cart.id);
          store.set("cartId", cart.id);
          refetch();
        }
      });
    } else {
      createLineItem.mutate({
        variant_id: item.variant_id, 
        quantity: item.quantity
      }, {
        onSuccess: ({ cart }) => {
          setCartId(cart.id);
          refetch();
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

  const startCheckout = async () => {
    const { cart } = await createPaymentSession.mutateAsync();

    if (cart.payment_session?.provider_id !== "manual") {
      await setPaymentSession.mutateAsync({
        provider_id: "manual"
      });
    }
  }

  const setShippingAddress = async (address: any) => {
    await updateCart.mutateAsync({
      shipping_address: {
        first_name: address.name.split(" ")[0],
        last_name: address.name.split(" ")[1],
        address_1: address.street1,
        address_2: address.street2,
        city: address.city,
        country_code: address.country,
        province: address.state,
        postal_code: address.zip
      }
    })
  }

  const finishCheckout = () => {
    completeCart.mutate();
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading: isLoading,
        addItem,
        removeItem,
        updateQuantity,
        startCheckout,
        setShippingAddress,
        finishCheckout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}