import AddressForm from "./AddressForm";
import styles from "../styles/Checkout.module.scss";
import { useCheckout } from "../providers/CheckoutProvider";
import { useCart } from "../providers/CartProvider";
import { useEffect } from "react";
import ShippingSelector from "./ShippingSelector";
import ActionButton from "./ActionButton";
import {
  useAddShippingMethodToCart,
  useCreatePaymentSession,
  useShippingOptions
 } from "medusa-react";
import axios from "axios";
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const { cart } = useCart();
  const router = useRouter();
  if (!cart) return <div></div>;
  const addShippingMethod = useAddShippingMethodToCart(cart.id);
  const createPaymentSession = useCreatePaymentSession(cart.id);
  const {
    isValidAddress,
    shippingRates,
    selectedRate,
    validateAddress,
    getShippingRates
  } = useCheckout();
  const { shipping_options } = useShippingOptions();

  useEffect(() => {
    console.log(`Selected rate: ${selectedRate}`);
  }, [selectedRate])

  useEffect(() => {
    if (isValidAddress) {
      getShippingRates();
    }
  }, [isValidAddress]);

  const doSubmit = () => {
    console.log("In doSubmit");
    if (!(isValidAddress && selectedRate && shipping_options)) return;

    try {
      const shippoOptionId = shipping_options.find((option) => option.name === "Shippo")?.id;
      const rate = shippingRates.find((shippingRate) => shippingRate.object_id === selectedRate);
      
      if (!shippoOptionId) throw new Error("No shipping option named 'Shippo'");
      if (!rate) throw new Error("Could not find selected shipping rate");

      addShippingMethod.mutate({
        option_id: shippoOptionId,
        data: {
          ...rate,
          price: (rate.amount * 100).toFixed(0)
        }
      }, {
        onSuccess: () => {
          createPaymentSession.mutate(undefined,{
            onSuccess: ({ cart }) => {
              axios.post("/api/create-checkout", {
                cart
              }).then(({ data: { redirect_url } }) => {
                router.push(redirect_url);
              })
            }
          })
        }
      })
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div>
        <AddressForm
          onSubmit={validateAddress}
        />
      </div>
      <div>
        {
          shippingRates.length > 0 &&
          <ShippingSelector
            rates={shippingRates}
          />
        }
      </div>
      <ActionButton
        text="Continue"
        action={doSubmit}
        disabled={
          !(
            isValidAddress
            && selectedRate
          )
        }
      />
    </div>
  )
}

export default CheckoutForm;