import { NextPage } from "next";
import { useMemo } from "react";
import AddressForm from "../components/AddressForm";
import styles from "../styles/Checkout.module.scss";
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