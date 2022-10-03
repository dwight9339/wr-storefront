import type { NextPage } from 'next';
import { CatalogProvider } from '../providers/CatalogProvider';
import Catalog from '../components/Catalog';

const Home: NextPage = () => {
  return (
    <CatalogProvider>
      <Catalog />
    </CatalogProvider>
  )
}

export default Home;
