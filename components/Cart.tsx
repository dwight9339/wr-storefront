import CartContext from "../contexts/CartContext";
import { useContext } from "react";

const Cart = () => {
  const {
    cart,
    addItem,
    removeItem
  } = useContext(CartContext);

  return (
    <div></div>
  )
}

export default Cart;