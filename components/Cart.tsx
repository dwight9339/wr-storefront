import CartContext from "../contexts/CartContext";
import { useContext } from "react";
import styles from "../styles/Cart.module.scss";
import { ProductVariant as Variant } from "@medusajs/medusa";
import Image from "next/image";

type LineItemProps = {

}

const LineItem = () => {
  return (
    <div className={styles.itemContainer}>

    </div>
  )
}

const Cart = () => {
  const {
    cart,
    addItem,
    removeItem
  } = useContext(CartContext);

  return (
    <div className={styles.container}>
      { cart.length === 0 
        ? <div className={styles.emptyCartMessage}>Cart is empty</div>
        : <div></div>
      }
    </div>
  )
}

export default Cart;