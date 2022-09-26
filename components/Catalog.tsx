import Sidebar from "../components/Sidebar";
import Gallery from '../components/Gallery';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import {
  ProductCollection as Collection, 
  Product
} from "@medusajs/medusa";

type CatalogProps = {
  collections: Collection[];
  products: Product[];
}

const Catalog = ({ collections, products }: CatalogProps) => {
  return (
    <div>
      <Head>
        <title>Winter Riddle Store</title>
        <meta name="description" content="Official online store of Winter Riddle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <Sidebar collections={collections} />
          <Gallery products={products} />
      </main>
    </div>
  )
};

export default Catalog;