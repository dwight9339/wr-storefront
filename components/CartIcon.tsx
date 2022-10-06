import Image from "next/image";
import Link from "next/link";
import styles from "../styles/CartIcon.module.scss";
import { useCart } from "../providers/CartProvider";

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <Link
          href="/cart"
        >
          <Image
            src="/images/icons/cart.svg"
            width={50}
            height={50}
          />
        </Link>
      </div> 
      {cart && cart.items.length !== 0 &&
        <div className={styles.itemCount}>
          {cart && cart.items.length}
        </div>
      }
    </div>
  )
}

export default CartIcon;