import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { NextPage } from "next";
import styles from "../../styles/CartPage.module.scss";

const CartPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header returnButtonText="Continue shopping" />
      <Cart />
      <div>
        <div className={styles.total}>

        </div>
      </div>
    </div>
  )
}

export default CartPage;