import styles from "../styles/Gallery.module.scss";
import { Product } from "./types";
import Image from "next/image";

type GalleryProps = {
  products: Product[];
}

type GalleryItemProps = {
  product: Product;
}

const GalleryItem = ({ product }: GalleryItemProps) => {
  return (
    <div className={styles.galleryItemContainer}>
      <div className={styles.itemInfo}>
        <h1>{product.title}</h1>
      </div>
      <div className={styles.thumbnailContainer}>
        <Image
          src={product.thumbnail}
          width={300}
          height={300}
        />
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