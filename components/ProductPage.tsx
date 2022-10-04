import styles from "../styles/ProductPage.module.scss";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { LineItem, ProductVariant as Variant } from "@medusajs/medusa";
import VariantPicker from "../components/VariantPicker";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import useCart from "../hooks/useCart";
import QuantitySelector from "../components/QuantitySelector";
import { useProduct } from "../providers/ProductProvider";

const ProductPage = () => {
  const { addItem } = useCart();
  const { product, selectedVariant } = useProduct();

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
        quantity: 1
      } as LineItem);
    } catch(err) {
      console.error(err);
    }
  };

  if (!product) return <div></div>;

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h3>${currentPrice}</h3>
          <VariantPicker />
          <QuantitySelector />
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
  )
};

export default ProductPage;