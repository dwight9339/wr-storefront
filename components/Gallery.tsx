import styles from "../styles/Gallery.module.scss";
import { Product } from "./types";
import Image from "next/image";
import { useRouter } from "next/router";

type GalleryProps = {
  products: Product[];
}

type GalleryItemProps = {
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
          src={product.thumbnail}
          width={500}
          height={500}
        />
      </div>
      <div className={styles.itemInfo}>
        <h1>{product.title}</h1>
        <h1>Starting at ${formattedPrice}</h1>
      </div>
    </div>
  )
}

const Gallery = ({ products }: GalleryProps) => {
  return (
    <div className={styles.container}>
      {products.map((product, i) => <GalleryItem key={i} product={product} />)}
    </div>
  )
}

export default Gallery;