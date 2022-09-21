import styles from "../styles/Gallery.module.scss";
import { Product } from "./types";

type GalleryProps = {
  products: Product[];
}

const Gallery = ({ products }: GalleryProps) => {
  return (
    <div className={styles.container}>
      
    </div>
  )
}

export default Gallery;