import AddressForm from "./AddressForm";
// import PaymentForm from "./PaymentForm";
import styles from "../styles/Checkout.module.scss";
import { useCheckout } from "../providers/CheckoutProvider";
import { useEffect } from "react";
import ShippingSelector from "./ShippingSelector";


const CheckoutForm = () => {
  const {
    isValidAddress,
    shippingRates,
    selectedRate,
    validateAddress,
    getShippingRates,
    setShipping,
    completeCheckout
  } = useCheckout();

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
        {/* <PaymentForm /> */}
      </div>
    </div>
  )
}

export default CheckoutForm;