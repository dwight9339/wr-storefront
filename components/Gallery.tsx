import styles from "../styles/Gallery.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCatalog } from "../providers/CatalogProvider";
import type { Product } from "@medusajs/medusa";

interface GalleryItemProps {
  product: Product;
}

const GalleryItem = ({ product }: GalleryItemProps) => {
  const { products } = useCatalog();
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
  const { products } = useCatalog();

  return (
    <div className={styles.container}>
      {products && products.map((product, i) => <GalleryItem key={i} product={product} />)}
    </div>
  )
}

export default Gallery;