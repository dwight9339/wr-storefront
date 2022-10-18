import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import styles from "../styles/Checkout.module.scss";
import { useCheckout } from "../providers/CheckoutProvider";
import { useCart } from "../providers/CartProvider";
import { useEffect } from "react";
import ShippingSelector from "./ShippingSelector";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ActionButton from "./ActionButton";
import {
  useAddShippingMethodToCart,
  useCreatePaymentSession,
  useCompleteCart,
  useShippingOptions
 } from "medusa-react";

// const stripePromise = loadStripe(
//   `${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`
// );

const CheckoutForm = () => {
  const { cart } = useCart();
  if (!cart) return <div></div>;
  const addShippingMethod = useAddShippingMethodToCart(cart.id);
  const createPaymentSession = useCreatePaymentSession(cart.id);
  const completeCart = useCompleteCart(cart.id);
  const {
    isValidAddress,
    shippingRates,
    selectedRate,
    validateAddress,
    getShippingRates,
    completeCheckout
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
      console.log(`Shippo option id: ${shippoOptionId}`);
      console.log(`Selected rate: ${JSON.stringify(rate)}`);
      
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
            onSuccess: () => {
              completeCart.mutate();
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
      {/* <div>
        <>
          {
            cart?.payment_session?.data.client_secret &&
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret: `${cart.payment_session.data.client_secret}`
              }}
            >
              <PaymentForm />
            </Elements>
          }
        </>
      </div> */}
    </div>
  )
}

export default CheckoutForm;