import styles from "../styles/Cart.module.scss";
import Image from "next/image";
import { LineItem } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";
import { useRegion } from "../providers/RegionProvider";
import { useMemo } from "react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../providers/CartProvider";

type CartRowProps = {
  item: LineItem;
}

const CartRow = ({ item }: CartRowProps) => {
  const { removeItem, updateQuantity } = useCart();
  const { userRegion } = useRegion();
  const price = userRegion ? formatAmount({
    amount: item.total || 0,
    region: userRegion
  }) : "Unable to get price";

  const incrementQuantity = () => {
    updateQuantity(item, item.quantity + 1);
  }

  const decrementQuantity = () => {
    if (item.quantity === 1) return;
    updateQuantity(item, item.quantity - 1);
  }

  return (
    <div className={styles.rowContainer}>
      <div className={styles.productInfo}>
        <Image
          src={item.thumbnail || ""}
          width={50}
          height={50}
        />
        <div className={styles.productTitle}>{item.title}</div>
        <div className={styles.variantTitle}>{item.variant.title}</div>
      </div>
      <div className={styles.quantitySelectorContainer}>
        <QuantitySelector
          quantity={item.quantity}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.price}>{price}</div>
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
    </div>
  )
}

const Cart = () => {
  const { cart } = useCart();
  const { userRegion } = useRegion();
  const total = userRegion ? formatAmount({
      amount: cart?.total || 0,
      region: userRegion
  }) : "Unable to get amount";

  const content = useMemo(() => {
    if (!cart) return;
    if (cart?.items?.length) {
      return (
        <>
          <div className={styles.itemsContainer}>
            { 
              cart?.items.map((item: LineItem, i: number) => {
                return <CartRow key={i} item={item} />;
              })
            }
          </div>
          <div className={styles.totalContainer}>
            <h2>Total: {total}</h2>
          </div>
        </>
      )
    }

    return (
      <div className={styles.noItems}>
        Cart is empty
      </div>
    )
  }, [cart, total])

  return (
    <div className={styles.container}>
      {content}
    </div>
  )
}

export default Cart;