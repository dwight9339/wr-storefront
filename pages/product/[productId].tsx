import type { NextPage } from "next";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "ProductPage.module.scss";

const ProductPage: NextPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: product } = useQuery(
    ["getProduct", productId],
    async () => {
      try {
        const res = await axios.get(`http://localhost:9000/products/${productId}`);
        return res.data.product;
      } catch(err) {
        console.error(err);
        return null;
      }
    }
  )

  return (
    <div className={styles.pageContainer}>

    </div>
  )
};

export default ProductPage;