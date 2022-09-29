import type { NextPage } from 'next';
import { useProducts, useCollections } from "medusa-react";

import Catalog from '../components/Catalog';

const Home: NextPage = () => {
  const { collections } = useCollections();
  const { products } = useProducts();

  if (!collections || !products) return <div></div>;
  
  return <Catalog collections={collections} products={products}/>
}

export default Home;
