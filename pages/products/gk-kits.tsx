import ProductPage from "@/components/product/productsPage";
import { getGKKits } from "@/data/db";
import { GetStaticProps } from "next";
import { Products } from "../index";

function GKKitsList({ products }: Products) {
  return <ProductPage products={products} category="کیت های دروازبانی" />;
}

export default GKKitsList;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getGKKits();
  return {
    props: {
      products,
    },
  };
};
