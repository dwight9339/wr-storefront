import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { NextPage } from "next";
import styles from "../../styles/CartPage.module.scss";
import ActionButton from "../../components/ActionButton";
import useCart from "../../hooks/useCart";
import { useRouter } from "next/router";

const CartPage: NextPage = () => {
  const router = useRouter();
  const { cart, loading, startCheckout } = useCart();

  const initiateCheckout = async () => {
    const { cart } = await startCheckout.mutateAsync();
    console.log(`Client secret: ${cart.payment_session?.data.client_secret}`);

    router.push("/checkout");
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
          && loading
        }
      />
    </div>
  )
}

export default CartPage;