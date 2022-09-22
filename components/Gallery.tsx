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