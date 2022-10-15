import axios from "axios";
import Image from "next/image";
import styles from "../styles/CartSlider.module.scss";
import ActionButton from "./ActionButton";
import Cart from "./Cart";
import { useCart } from "../providers/CartProvider";

type CartSliderProps = {
  onClose: () => void;
}

const CartSlider = ({ onClose }: CartSliderProps) => {
  const { cart } = useCart();
  
  const initiateCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:9000/store/create-checkout", {
        cartId: cart?.id
      })
    } catch(err) {
      console.error(err);
    }
  }
  
  return (
    <div className={styles.container}>
      <div
        className={styles.closeButton}
        onClick={onClose}
      >
        <Image
          src="/images/icons/close_icon.svg"
          width={30}
          height={30}
        />
      </div>
      <Cart />
      {
        cart?.items.length > 0 &&
        <ActionButton
          text="Checkout"
          action={initiateCheckout}
          disabled={false}
        />
      }
    </div>
  )
}

export default CartSlider;