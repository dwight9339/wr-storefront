import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handlePayment = async (e: any) => {
    e.preventDefault();

    
  }

  return (
    <form>
      <PaymentElement 
        options={{
          fields: {
            billingDetails: {
              address: "never",
              phone: "never"
            }
          }
        }}
      />
      <button 
        onClick={handlePayment}
        disabled={!stripe}
      >
        Submit
      </button>
    </form>
  )
}

export default CheckoutForm;