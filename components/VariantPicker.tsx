import { Variant } from "./types";
import styles from "../styles/VariantPicker.module.scss";

type VariantPickerItemProps = {
  variant: Variant;
  updateSelected: Function;
  selected: Boolean;
}

type VariantPickerProps = {
  variants: Variant[];
  updateSelected: Function;
  selectedId: string;
}

const VariantPickerItem = ({ 
  variant,
  updateSelected,
  selected
}: VariantPickerItemProps) => {
  return (
    <div 
      className={`${styles.itemContainer} ${selected && styles.selected}`}
      onClick={() => updateSelected(variant)}  
    >
      <h3>{variant.title}</h3>
    </div>
  )
}

const VariantPicker = ({ variants, updateSelected, selectedId }: VariantPickerProps) => {
  return (
    <div className={styles.pickerContainer}>
      {variants.map((variant, i) => {
        return <VariantPickerItem 
          key={i}
          variant={variant} 
          updateSelected={updateSelected} 
          selected={variant.id === selectedId}
        />;
      })} 
    </div>
  )
}

export default VariantPicker;