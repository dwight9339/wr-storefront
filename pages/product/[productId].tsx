import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/ProductPage.module.scss";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ProductVariant as Variant } from "@medusajs/medusa";
import VariantPicker from "../../components/VariantPicker";
import Header from "../../components/Header";
import ActionButton from "../../components/ActionButton";
import { useSessionCart, useProduct } from "medusa-react";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { addItem, items } = useSessionCart();
  const { productId } = router.query;
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const { product, isLoading } = useProduct(`${productId}`);

  const currentPrice = useMemo(() => {
    const amt = selectedVariant
      ?.prices.find((price) => price.currency_code === "usd")
      ?.amount || 0;

    return (amt / 100).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [selectedVariant])

  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    console.log(`Cart: ${JSON.stringify(items)}`);
  }, [items]);

  const updateVariant = (variant: Variant) => {
    setSelectedVariant(() => variant);
  }

  const addToCart = () => {
    selectedVariant && addItem({
      variant: selectedVariant,
      quantity: 1
    });
  }

  if (!product) return <div></div>;

  return (
    <div className={styles.pageContainer}>
      <Header 
        returnButtonText="Back to gallery"
      />
      <div className={styles.contentContainer}>
        <div className={styles.infoContainer}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h3>${currentPrice}</h3>
          <VariantPicker 
            variants={product.variants}
            updateSelected={updateVariant}
            selectedId={
              selectedVariant
                ? selectedVariant.id
                : ""
            }
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
  )
};

export default ProductPage;