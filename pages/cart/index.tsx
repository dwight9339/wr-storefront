import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { NextPage } from "next";
import styles from "../../styles/CartPage.module.scss";
import ActionButton from "../../components/ActionButton";
import { useCart } from "../../providers/CartProvider";
import { useRouter } from "next/router";

const CartPage: NextPage = () => {
  const router = useRouter();
  const { cart, loading } = useCart();

  const initiateCheckout = async () => {
    // Todo
  }

  return (
    <div className={styles.container}>
      <Header />
      <Cart />
      <ActionButton 
        text="Checkout"
        action={initiateCheckout}
        disabled={
          !cart?.items?.length
          || loading
        }
      />
    </div>
  )
}

export default CartPage;