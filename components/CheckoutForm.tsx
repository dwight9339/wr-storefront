import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import styles from "../styles/Checkout.module.scss";
import { useCheckout } from "../providers/CheckoutProvider";
import { useCart } from "../providers/CartProvider";
import { useEffect } from "react";
import ShippingSelector from "./ShippingSelector";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`
);

const CheckoutForm = () => {
  const { cart, startCheckout } = useCart();
  const {
    isValidAddress,
    shippingRates,
    selectedRate,
    validateAddress,
    getShippingRates,
    completeCheckout
  } = useCheckout();

  useEffect(() => {
    if (!cart?.payment_session) {
      startCheckout();
    }
  }, [cart]);

  useEffect(() => {
    if (isValidAddress) {
      getShippingRates();
    }
  }, [isValidAddress]);

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
      <div>
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
      </div>
    </div>
  )
}

export default CheckoutForm;