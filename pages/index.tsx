import type { NextPage } from 'next';
import { useProducts, useCollections } from "medusa-react";

import Catalog from '../components/Catalog';
import { CatalogProvider } from '../providers/CatalogProvider';

const Home: NextPage = () => {
  return (
    <CatalogProvider>
      <Catalog />
    </CatalogProvider>
  )
}

export default Home;
