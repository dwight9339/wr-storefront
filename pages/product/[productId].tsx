import type { NextPage } from "next";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/ProductPage.module.scss";
import commonStyles from "../../styles/common.module.scss";
import Image from "next/image";
import { useState, useEffect, useMemo, useContext } from "react";
import { ProductVariant as Variant } from "@medusajs/medusa";
import VariantPicker from "../../components/VariantPicker";
import ReturnButton from "../../components/ReturnButton";
import CartContext from "../../contexts/CartContext";
import Header from "../../components/Header";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { cart, addItem } = useContext(CartContext);
  const [selectedVariant, setSelectedVariant] = useState<Variant>();
  const { data: product } = useQuery(
    ["getProduct", productId],
    async () => {
      try {
        const res = await axios.get(`http://localhost:9000/store/products/${productId}`);
        return res.data.product;
      } catch(err) {
        console.error(err);
        return null;
      }
    }
  );

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
          <div 
            className={commonStyles.actionButton}
            onClick={() => addItem(selectedVariant)}
          >
            Add to cart
          </div>
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