import styles from "../styles/Cart.module.scss";
import Image from "next/image";
import useCart from "../hooks/useCart";
import { LineItem } from "@medusajs/medusa";

type CartRowProps = {
  item: LineItem;
}

const CartRow = ({ item }: CartRowProps) => {
  return (
    <div>
      <Image
        src={item.thumbnail || ""}
        width={50}
        height={50}
      />
      <h2>{item.title}</h2>
    </div>
  )
}

const UserCart = () => {
  const { cart } = useCart();

  return (
    <div className={styles.container}>
      { cart?.items.length 
        ? cart?.items.map((item: LineItem, i: number) => {
          return <CartRow key={i} item={item} />;
        })
        : <div className={styles.noItems}>Cart is empty</div>
      }
    </div>
  )
}

export default UserCart;