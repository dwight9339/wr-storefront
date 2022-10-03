import styles from "../styles/QuantitySelector.module.scss";
import Image from "next/image";

const QuantitySelector = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/images/icons/left_arrow.svg"
        width={10}
        height={10}
      />
      <div className={styles.quantity}>
        1
      </div>
      <Image
        src="/images/icons/right_arrow.svg"
        width={10}
        height={10}
      />
    </div>
  )
}

export default QuantitySelector;