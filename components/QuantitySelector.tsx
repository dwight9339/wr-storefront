import styles from "../styles/QuantitySelector.module.scss";

type QuantitySelectorProps = {
  currentQuantity: number;
  updateQuantity: Function;
}

const QuantitySelector = ({ 
  currentQuantity,
  updateQuantity
}: QuantitySelectorProps) => {
  return (
    <div className={styles.container}>
      
    </div>
  )
}

export default QuantitySelector;