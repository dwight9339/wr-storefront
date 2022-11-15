import type { Cart, LineItem } from "@medusajs/medusa";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  useCreateCart,
  useCreateLineItem,
  useDeleteLineItem,
  useUpdateLineItem,
  useCompleteCart,
  useCreatePaymentSession,
  useSetPaymentSession,
  useUpdateCart
} from "medusa-react";
import Medusa from "@medusajs/medusa-js";
import { useRegion } from "./RegionProvider";
import store from "store2";
import axios from "axios";

interface CartState {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined;
}

interface CartContext extends CartState {
  addItem: (item: LineItem) => void;
  removeItem: (item: LineItem) => void;
  updateQuantity: (item: LineItem, quantity: number) => void;
  startCheckout: () => void;
  setShippingAddress: (address: any) => void;
  resetCart: () => void;
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
  const [cart, setCart] = useState<Omit<Cart, "refundable_amount" | "refunded_total"> | undefined>();
  const createCart = useCreateCart();
  const createLineItem = useCreateLineItem(cart?.id || "");
  const deleteLineItem = useDeleteLineItem(cart?.id || "");
  const updateLineItem = useUpdateLineItem(cart?.id || "");
  const updateCart = useUpdateCart(cart?.id || "");
  const createPaymentSession = useCreatePaymentSession(cart?.id || "");
  const setPaymentSession = useSetPaymentSession(cart?.id || "");
  const completeCart = useCompleteCart(cart?.id || "");
  const medusa = new Medusa({
    maxRetries: 3,
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:9000"
  });
  const { userRegion } = useRegion();

  const fetchCart = async (cartId: string) => {
    const { cart } = await medusa.carts.retrieve(cartId);

    setCart(cart);
  }

  useEffect(() => {
    const cartId = store.get("cartId");

    if (!cartId) {
      createCart.mutate({
        region_id: userRegion?.id,
      }, {
        onSuccess: ({ cart }) => {
          setCart(cart);
          store.set("cartId", cart.id);
        },
        onError: (err) => {
          console.error(err);
        }
      })
    } else {
      fetchCart(cartId);
    }
  }, [cart, setCart, fetchCart]);

  const getAnonymousCustomer = async () => {
    try {
      const anonymousCustomerEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/store/customers/anonymous`;
      const { data: { customer } } = await axios.get(anonymousCustomerEndpoint);

      return {...customer};
    } catch(err) {
      console.error(err);
      return null;
    }
  }

  const addItem = (item: LineItem) => {
    if (!(userRegion && cart)) return;

    createLineItem.mutate({
      variant_id: item.variant_id, 
      quantity: item.quantity
    }, {
      onSuccess: ({ cart }) => {
        setCart(cart);
      }
    });
  }

  const removeItem = ({ id }: LineItem) => {
    deleteLineItem.mutate({lineId: id}, {
      onSuccess: ({ cart }) => {
        setCart(cart);
      }
    });
  }

  const updateQuantity = ({ id }: LineItem, quantity: number) => {
    updateLineItem.mutate({
      lineId: id,
      quantity
    }, {
      onSuccess: ({ cart }) => {
        setCart(cart);
      }
    });
  }

  const startCheckout = async () => {
    const { cart } = await createPaymentSession.mutateAsync();

    setCart(cart);
    if (cart.payment_session?.provider_id !== "Stripe") {
      const { cart } = await setPaymentSession.mutateAsync({
        provider_id: "Stripe"
      });
      return cart.payment_session;
    }

    return cart.payment_session;
  }

  const setShippingAddress = async (address: any) => {
    await updateCart.mutateAsync({
      shipping_address: {
        first_name: address.firstName,
        last_name: address.lastName,
        address_1: address.street1,
        address_2: address.street2,
        city: address.city,
        country_code: address.country,
        province: address.state,
        postal_code: address.zip
      }
    })
  }

  const resetCart = () => {
    store.set("cartId", null);
    setCart(undefined);
  }

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addItem,
        removeItem,
        updateQuantity,
        startCheckout,
        setShippingAddress,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}