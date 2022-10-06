import Image from "next/image";
import styles from "../styles/CartSlider.module.scss";
import ActionButton from "./ActionButton";
import Cart from "./Cart";

type CartSliderProps = {
  onClose: () => void;
}

const CartSlider = ({ onClose }: CartSliderProps) => {
  const initiateCheckout = () => {
    console.log("Proceeding to checkout");
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
      <ActionButton
        text="Checkout"
        action={initiateCheckout}
        disabled={false}
      />
    </div>
  )
}

export default CartSlider;