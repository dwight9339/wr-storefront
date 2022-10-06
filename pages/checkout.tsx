import { NextPage } from "next";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../providers/CartProvider";
import { useMemo } from "react";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

const CheckoutPage: NextPage = () => {
  const { cart } = useCart();

  const content = useMemo(() => {
    const clientSecret = cart?.payment_session?.data.client_secret;

    if (clientSecret) {
      return (
        <Elements 
          stripe={stripePromise}
          options={{
            clientSecret: `${clientSecret}`
          }}
        >
          <CheckoutForm />
        </Elements>
      )
    }
  }, [cart]);

  return (
    <div>
      {content}
    </div>
  )
}

export default CheckoutPage;