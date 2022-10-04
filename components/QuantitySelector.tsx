import styles from "../styles/QuantitySelector.module.scss";
import Image from "next/image";
import { useProduct } from "../providers/ProductProvider";

type QuantitySelectorProps = {
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const QuantitySelector = ({
  quantity,
  incrementQuantity,
  decrementQuantity
}: QuantitySelectorProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.arrow}>
          <Image
            src="/images/icons/left_arrow.svg"
            width={15}
            height={15}
            onClick={decrementQuantity}
          />
        </div>
        <div className={styles.quantity}>
          {`${quantity}`}
        </div>
        <div className={styles.arrow}>
          <Image
            src="/images/icons/right_arrow.svg"
            width={15}
            height={15}
            onClick={incrementQuantity}
          />
        </div>
      </div>
    </div>
  )
}

export default QuantitySelector;