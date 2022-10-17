import styles from "../styles/ShippingSelector.module.scss";
import Image from "next/image";
import { useCheckout } from "../providers/CheckoutProvider";

interface ShippingSelectorProps {
  rates: any[];
}

interface ShippingSelectorOptionProps {
  rate: any;
}

const ShippingSelectorOption = ({ rate }: ShippingSelectorOptionProps) => {
  const { selectedRate, setShipping } = useCheckout();

  return (
    <div 
      className={`${styles.optionContainer} ${selectedRate === rate.object_id && styles.selected}`}
      onClick={() => setShipping(rate.object_id)}
    >
      <Image
        src={rate.provider_image_200}
        width={75}
        height={75}
      />
      <div className={styles.provider}>{rate.provider}</div>
      <div className={styles.serviceLevel}>{rate.servicelevel.name}</div>
      <div className={styles.deliveryTime}>Estimated delivery - {rate.estimated_days} days</div>
      <div className={styles.price}>${rate.amount_local}</div>
    </div>
  )
}

const ShippingSelector = ({ rates }: ShippingSelectorProps) => {
  return (
    <div className={styles.container}>
      {rates.map((rate: any, i: number) => {
        return (
          <ShippingSelectorOption
            key={i}
            rate={rate}
          />
        )
      })}
    </div>
  )
}

export default ShippingSelector;