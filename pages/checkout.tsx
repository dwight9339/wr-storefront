import { NextPage } from "next";
import { useCart } from "../providers/CartProvider";
import { useMemo } from "react";
import AddressForm from "../components/AddressForm";
import styles from "../styles/Checkout.module.scss";

const CheckoutPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <AddressForm 
        onSubmit={() => console.log("TBD")}
      />
    </div>
  )
}

export default CheckoutPage;