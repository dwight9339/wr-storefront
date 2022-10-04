import styles from "../styles/VariantPicker.module.scss";
import { ProductVariant as Variant } from "@medusajs/medusa";
import { useProduct } from "../providers/ProductProvider";

type VariantPickerItemProps = {
  variant: Variant;
  selected: Boolean;
}

const VariantPickerItem = ({ 
  variant,
  selected
}: VariantPickerItemProps) => {
  const { selectVariant } = useProduct();

  return (
    <div 
      className={`${styles.itemContainer} ${selected && styles.selected}`}
      onClick={() => selectVariant(variant)}  
    >
      <h3>{variant.title}</h3>
    </div>
  )
}

const VariantPicker = () => {
  const { product, selectedVariant } = useProduct();

  return (
    <div className={styles.pickerContainer}>
      {product && product.variants.map((variant, i) => {
        return <VariantPickerItem 
          key={i}
          variant={variant} 
          selected={variant.id === selectedVariant?.id}
        />;
      })} 
    </div>
  )
}

export default VariantPicker;