import styles from "../styles/ProductPage.module.scss";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { LineItem, ProductVariant as Variant } from "@medusajs/medusa";
import VariantPicker from "../components/VariantPicker";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import QuantitySelector from "../components/QuantitySelector";
import { useProduct } from "../providers/ProductProvider";
import { useCart } from "../providers/CartProvider";
import CartSlider from "./CartSlider";

const ProductPage = () => {
  const { addItem } = useCart();
  const {
    product,
    selectedVariant,
    quantity,
    incrementQuantity,
    decrementQuantity
  } = useProduct();
  const [showCartSlider, setShowCartSlider] = useState<boolean>(false);

  const toggleShowCartSlider = () => setShowCartSlider((current) => !current);

  const currentPrice = useMemo(() => {
    const amt = selectedVariant
      ?.prices.find((price) => price.currency_code === "usd")
      ?.amount || 0;

    return (amt / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [selectedVariant])

  const addToCart = async () => {
    if (!selectedVariant) return;

    try {
      addItem({
        variant_id: selectedVariant.id,
        quantity: quantity
      } as LineItem);
      toggleShowCartSlider();
    } catch(err) {
      console.error(err);
    }
  };

  if (!product) return <div></div>;

  return (
    <>
      <div className={styles.pageContainer}>
        <Header />
        <div className={styles.contentContainer}>
          <div className={styles.infoContainer}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <h3>${currentPrice}</h3>
            <VariantPicker />
            <QuantitySelector 
              quantity={quantity}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
            <ActionButton 
              text="Add to cart"
              action={addToCart}
              disabled={false}
            />
          </div>
          <div className={styles.photoContainer}>
            <Image
              src={product.thumbnail || ""}
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
      {showCartSlider && <CartSlider
        onClose={toggleShowCartSlider}
      />}
    </>
  )
};

export default ProductPage;