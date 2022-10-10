import { NextPage } from "next";
import { useCart } from "../providers/CartProvider";
import { useMemo } from "react";
import AddressForm from "../components/AddressForm";

const CheckoutPage: NextPage = () => {


  return (
    <div>
      <AddressForm 
        onSubmit={() => console.log("TBD")}
      />
    </div>
  )
}

export default CheckoutPage;