import { NextPage } from "next";
import { CheckoutProvider } from "../providers/CheckoutProvider";
import CheckoutForm from "../components/CheckoutForm";

const CheckoutPage: NextPage = () => {
  return (
    <CheckoutProvider>
      <CheckoutForm />
    </CheckoutProvider>
  )
}

export default CheckoutPage;