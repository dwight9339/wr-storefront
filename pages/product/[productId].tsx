import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/ProductPage.module.scss";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ProductVariant as Variant } from "@medusajs/medusa";
import VariantPicker from "../../components/VariantPicker";
import Header from "../../components/Header";
import ActionButton from "../../components/ActionButton";
import QuantitySelector from "../../components/QuantitySelector";
import { useProduct } from "medusa-react";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const [quantity, setQuantity] = useState<number>(0);
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

  const updateVariant = (variant: Variant) => {
    setSelectedVariant(() => variant);
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
          <QuantitySelector
            currentQuantity={quantity}
            updateQuantity={setQuantity}
          />
          <ActionButton 
            text="Add to cart"
            action={() => console.log("It works")}
            disabled={false}
          />
        </div>
        <div className={styles.photoContainer}>
          <Image
            src={product.thumbnail}
            width={700}
            height={700}
          />
        </div>
      </div>
    </div>
  )
};

export default ProductPage;