import UserCart from "../../components/UserCart";
import Header from "../../components/Header";
import { NextPage } from "next";
import styles from "../../styles/CartPage.module.scss";
import ActionButton from "../../components/ActionButton";
import { useCart } from "medusa-react";

const CartPage: NextPage = () => {
  const { cart } = useCart();

  return (
    <div className={styles.container}>
      <Header returnButtonText="Continue shopping" />
      <UserCart />
      <ActionButton 
        text="Checkout"
        action={() => console.log("Proceed to checkout")}
        disabled={false}
      />
    </div>
  )
}

export default CartPage;