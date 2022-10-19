import AddressForm from "./AddressForm";
import styles from "../styles/Checkout.module.scss";
import { useCheckout } from "../providers/CheckoutProvider";
import { useCart } from "../providers/CartProvider";
import { useEffect, useState, useMemo } from "react";
import ShippingSelector from "./ShippingSelector";
import ActionButton from "./ActionButton";
import {
  useAddShippingMethodToCart,
  useCreatePaymentSession,
  useShippingOptions
 } from "medusa-react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "./Header";

const CheckoutForm = () => {
  const { cart, resetCart } = useCart();
  const router = useRouter();
  const addShippingMethod = useAddShippingMethodToCart(`${cart?.id}`);
  const createPaymentSession = useCreatePaymentSession(`${cart?.id}`);
  const {
    isValidAddress,
    shippingRates,
    selectedRate,
    validateAddress
  } = useCheckout();
  const { shipping_options } = useShippingOptions();

  const [stage, setStage] = useState<number>(1);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  useEffect(() => {
    const { checkout_complete } = router.query;
    if (checkout_complete) {
      setCheckoutComplete(true);
      resetCart();
    }
  }, [router.query])

  const onAddressSubmit = async (address: any) => {
    try {
      await validateAddress(address);
      setStage(2);
    } catch(err) {
      console.error(err);
    }
  }

  const NoCart = () => (
    <div className={styles.messageComponent}>
      <h1>
        It looks like you don't have anything in your cart. 
      </h1>
      <ActionButton
        text="Return to store"
        action={() => router.push("/")}
        disabled={false}
      />
    </div>
  );

  const ThankYou = () => (
    <div className={styles.messageComponent}>
      <h1>Thank you for your purchase!</h1>
      <h3>You should recieve an email confirmation shortly.</h3>
      <ActionButton
        text="Return to store"
        action={() => router.push("/")}
        disabled={false}
      />
    </div>
  )

  const doSubmit = () => {
    if (!(isValidAddress && selectedRate && shipping_options)) return;

    try {
      const shippoOptionId = shipping_options.find((option) => option.name === "Shippo")?.id;
      const rate = shippingRates.find((shippingRate) => shippingRate.object_id === selectedRate);
      
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
            onSuccess: ({ cart }) => {
              axios.post("/api/create-checkout", {
                cart
              }).then(({ data: { redirect_url } }) => {
                router.push(redirect_url);
              })
            }
          })
        }
      });
    } catch(err) {
      console.error(err);
    }
  }

  const pageContent = useMemo(() => {
    if (checkoutComplete) {
      return <ThankYou />;
    }
    
    if (!(cart && cart.items.length > 0)) {
      return <NoCart />;
    }

    return (
      <>
        <div className={
          stage === 1
          ? styles.sectionCardOpen
          : styles.sectionCardClosed
        }>
          <div 
            className={styles.cardTitle}
            onClick={() => {
              setStage(1);
            }}
          >
            Shipping Address
          </div>
          <div className={styles.cardContents}>
            <AddressForm
              onSubmit={onAddressSubmit}
            />
          </div>
        </div>
        <div 
          className={
            stage === 2
            ? styles.sectionCardOpen
            : styles.sectionCardClosed
          }
        >
          <div 
            className={styles.cardTitle}
            onClick={() => {
              if (isValidAddress) {
                setStage(2);
              }
            }}
          >
            Shipping Method
          </div>
          <div className={styles.cardContents}>
            {
              shippingRates.length > 0 &&
              <ShippingSelector
                rates={shippingRates}
              />
            }
          </div>
        </div>
        <div className={styles.continueButton}>
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
        </div>
      </>
    )
  }, [
    isValidAddress,
    selectedRate,
    shippingRates,
    stage,
    checkoutComplete,
    cart
  ]);

  return (
    <div className={styles.container}>
      <Header />
      {pageContent}
    </div>
  )
}

export default CheckoutForm;