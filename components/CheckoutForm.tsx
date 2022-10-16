import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import styles from "../styles/Checkout.module.scss";
import { useCheckout } from "../providers/CheckoutProvider";


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


  return (
    <div>
      <div>
        <AddressForm
          onSubmit={validateAddress}
        />
      </div>
      <div>
        
      </div>
      <div>
        <PaymentForm />
      </div>
    </div>
  )
}

export default CheckoutForm;