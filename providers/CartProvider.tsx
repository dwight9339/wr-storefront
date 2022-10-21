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
  useUpdateCart
} from "medusa-react";
import { useRegion } from "./RegionProvider";
import store from "store2";
import axios from "axios";

interface CartState {
  cart?: Omit<Cart, "refundable_amount" | "refunded_total"> | undefined;
  loading: boolean;
}

interface CartContext extends CartState {
  addItem: (item: LineItem) => void;
  removeItem: (item: LineItem) => void;
  updateQuantity: (item: LineItem, quantity: number) => void;
  getPaymentSessions: () => void;
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
  const [cartId, setCartId] = useState<string>(store.get("cartId"));
  const { cart, isLoading, refetch } = useGetCart(cartId);
  const createCart = useCreateCart();
  const createLineItem = useCreateLineItem(cartId);
  const deleteLineItem = useDeleteLineItem(cartId);
  const updateLineItem = useUpdateLineItem(cartId);
  const updateCart = useUpdateCart(cartId);
  const createPaymentSession = useCreatePaymentSession(cartId);
  const setPaymentSession = useSetPaymentSession(cartId);
  const completeCart = useCompleteCart(cartId);
  const { userRegion } = useRegion();

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
    if (!userRegion) return;

    if (!cartId) {
      createCart.mutate({
        region_id: userRegion.id,
        items: [item]
      }, {
        onSuccess: async ({ cart }) => {
          setCartId(cart.id);
          store.set("cartId", cart.id);

          const customer = await getAnonymousCustomer();
          if (customer) {
            await updateCart.mutateAsync({
              customer_id: customer.id
            });
          }
          
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

  const getPaymentSessions = () => {
    createPaymentSession.mutate();
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
    setCartId("");
  }

  return (
    <CartContext.Provider
      value={{
        cart: cartId ? cart : undefined,
        loading: isLoading,
        addItem,
        removeItem,
        updateQuantity,
        getPaymentSessions,
        setShippingAddress,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}