import { useState, createContext, useContext, useEffect } from "react";
import { useCart } from "./CartProvider";
import axios from "axios";

interface CheckoutState {
  isValidAddress: boolean;
  shippingRates: any[];
  selectedRate: string | undefined;
}

interface CheckoutContext extends CheckoutState {
  validateAddress: (address: any) => Promise<void>;
  getShippingRates: () => Promise<void>;
  setShipping: (rateId: string) => void;
  completeCheckout: () => Promise<void>;
}

const CheckoutContext = createContext<CheckoutContext | null>(null);

interface ProviderProps {
  children: JSX.Element;
}

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }

  return context;
}

export const CheckoutProvider = ({ children }: ProviderProps) => {
  const { cart, setShippingAddress } = useCart();
  const [addressId, setAddressId] = useState<string>();
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedRate, setSelectedRate] = useState<string>();

  useEffect(() => {
    if (isValidAddress) {
      getShippingRates();
    }
  }, [addressId]);

  const validateAddress = async (address: any) => {
    const { data: { addressId, isValid } } = await axios.post("/api/create-address", {
      address: {
        ...address,
        name: `${address.firstName} ${address.lastName}`
      }
    });
    if (!isValid) throw new Error("Invalid address");
    setAddressId(addressId);
    setIsValidAddress(isValid);
    setShippingAddress(address);
  }

  const getShippingRates = async () => {
    const { data: { rates } } = await axios.post("/api/create-shipment", {
      addressId,
      items: cart?.items.map((item) => {
        return {
          height: item.variant.height,
          width: item.variant.width,
          length: item.variant.length,
          weight: item.variant.weight,
          distance_unit: "in",
          mass_unit: "lb"
        }
      })
    });
    setShippingRates(rates);
  }

  const setShipping = (rateId: string) => {
    setSelectedRate(rateId);
  }

  // const 

  const completeCheckout = async  () => {
    // To do
  }

  return (
    <CheckoutContext.Provider value={{
      isValidAddress,
      shippingRates,
      selectedRate,
      validateAddress,
      getShippingRates,
      setShipping,
      completeCheckout
    }}>
      {children}
    </CheckoutContext.Provider>
  )
}