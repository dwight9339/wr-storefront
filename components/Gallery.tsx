import styles from "../styles/Gallery.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCatalog } from "../providers/CatalogProvider";
import type { Product } from "@medusajs/medusa";

interface GalleryItemProps {
  product: Product;
}

const GalleryItem = ({ product }: GalleryItemProps) => {
  const router = useRouter();
  const prices = product.variants.map(({ prices }) => prices[0]);
  const startingPrice = Math.floor(Math.min(...prices.map(({ amount }) => amount)) / 100);
  const formattedPrice = startingPrice.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div 
      className={styles.galleryItemContainer}
      onClick={() => router.push(`/product/${product.id}`)}  
    >
      <div className={styles.thumbnailContainer}>
        <Image
          src={product.thumbnail || ""}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.itemInfo}>
        <h1>{product.title}</h1>
        <h2>Starting at ${formattedPrice}</h2>
      </div>
    </div>
  )
}

const Gallery = () => {
  const { products, hasNext, hasPrev, nextPage, prevPage } = useCatalog();
  const pageTurnerSize = {
    width: 20,
    height: 22
  };

  return (
    <div className={styles.container}>
      <div className={styles.tileContainer}>
        {products && products.map((product, i) => <GalleryItem key={i} product={product} />)}
      </div>
      <div className={styles.pageTurners}>
        <div
          className={styles.pageTurner}
          onClick={prevPage}  
        >
          <Image
            src="/images/icons/left_arrow_light.svg"
            width={pageTurnerSize.width}
            height={pageTurnerSize.height}
          />
        </div>
        <div
          className={styles.pageTurner}
          onClick={nextPage}
        >
          <Image
            src="/images/icons/right_arrow_light.svg"
            width={pageTurnerSize.width}
            height={pageTurnerSize.height}
          />
        </div>
      </div>
    </div>
  )
}

export default Gallery;