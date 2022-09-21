import type { NextPage } from 'next';
import { useQuery } from "react-query";
import axios from "axios";

import Catalog from '../components/Catalog';

const Home: NextPage = () => {
  const { data: collections } = useQuery(
    ["getCollections"],
    async () => {
      const res = await axios.get("http://localhost:9000/store/collections");
      return res.data.collections;
    }
  );
  const { data: products } = useQuery(
    ["getProducts"],
    async () => {
      const res = await axios.get("http://localhost:9000/store/products");
      return res.data.products;
    }
  );

  if (!collections || !products) return <div></div>;
  
  return <Catalog collections={collections} products={products}/>
}

export default Home;
