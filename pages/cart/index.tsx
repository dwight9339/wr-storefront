import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { NextPage } from "next";
import styles from "../../styles/CartPage.module.scss";
import ActionButton from "../../components/ActionButton";

const CartPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header returnButtonText="Continue shopping" />
      <Cart />
      <ActionButton 
        text="Checkout"
        action={() => console.log("Proceed to checkout")}
      />
    </div>
  )
}

export default CartPage;