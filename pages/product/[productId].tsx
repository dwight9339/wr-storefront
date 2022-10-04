import type { NextPage } from "next";
import { useRouter } from "next/router";
import ProductPage from "../../components/ProductPage";
import { ProductProvider } from "../../providers/ProductProvider";

const ViewProduct: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <ProductProvider productId={`${productId}`}>
      <ProductPage />
    </ProductProvider>
  )
}

export default ViewProduct;