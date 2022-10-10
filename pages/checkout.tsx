import { NextPage } from "next";
import { useCart } from "../providers/CartProvider";
import { useMemo, useState } from "react";
import AddressForm from "../components/AddressForm";
import styles from "../styles/Checkout.module.scss";
import axios from "axios";

const CheckoutPage: NextPage = () => {
  const { cart } = useCart();
  const [processing, setProcessing] = useState<boolean>(false);
  const [customerAddressId, setCustomerAddressId] = useState<string>();
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState<string>();

  const createAddress = async (address: any) => {
    try {
      const { data } = await axios.post("/api/create-address", {address});
      if (!data.isValid) {
        throw { message: "Invalid address" };
      }
      setIsValidAddress(true);
      setCustomerAddressId(data.id);
    } catch(err) {
      console.error(err);
    }
  }

  const getShippingOptions = async () => {
    try {
      const res = await axios.post("/api/get-shipping-options", {
        toAddressId: customerAddressId,
        items: cart?.items
      });
      setShippingOptions(res.data.options);
    } catch(err) {
      console.error(err);
    }
  }

  const contents = useMemo(() => {
    if (processing) return (
      <h1>Processing...</h1>
    );

    if (!isValidAddress) return <AddressForm onSubmit={createAddress} />;

    if (shippingOptions) return (
      <form>
        <fieldset>
          {shippingOptions.map((option: any) => {
            return (
              <label>
                {option.name}
                <input
                  type="radio"
                  name="shippingOption"
                  value={option.id}
                />;
              </label>
            )
          })}
        </fieldset>
      </form>
    )
  }, [processing, isValidAddress, shippingOptions, selectedShippingOption]);
  
  return (
    <div className={styles.container}>
      { contents }
    </div>
  )
}

export default CheckoutPage;