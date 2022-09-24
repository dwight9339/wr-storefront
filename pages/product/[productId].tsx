import type { NextPage } from "next";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/ProductPage.module.scss";
import commonStyles from "../../styles/common.module.scss";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { Variant } from "../../components/types";

import VariantPicker from "../../components/VariantPicker";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;
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
  )
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
      <div className={styles.header}>
        <div className={styles.backToGalleryContainer}>
          <button>
            Return to gallery
          </button>
        </div>
        <div className={styles.logoContainer}>
          <Image
            src="/images/wr_logo_v1_light.svg"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.cartIconContainer}>
          <Image
            src="/images/icons/cart_light.svg"
            width={50}
            height={50}
          />
        </div>
      </div>
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
          <div className={commonStyles.button}>
            Add to cart
          </div>
        </div>
        <div className={styles.photoContainer}>
          <Image
            src={product.thumbnail}
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  )
};

export default ProductPage;