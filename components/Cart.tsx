import styles from "../styles/Cart.module.scss";
import Image from "next/image";
import useCart from "../hooks/useCart";
import { LineItem } from "@medusajs/medusa";

type CartRowProps = {
  item: LineItem;
}

const CartRow = ({ item }: CartRowProps) => {
  const { removeItem } = useCart();

  return (
    <div className={styles.rowContainer}>
      <Image
        src={item.thumbnail || ""}
        width={50}
        height={50}
      />
      <h2>{item.title}</h2>
      <div className={styles.deleteIcon}
        onClick={() => {
          removeItem(item);
        }}
      >
        <Image
          src="/images/icons/trash_icon.svg"
          width={30}
          height={30}
        />
      </div>
    </div>
  )
}

const Cart = () => {
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

export default Cart;