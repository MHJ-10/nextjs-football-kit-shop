import ProductPage from "@/components/product/productsPage";
import { getNationalKits } from "@/data/db";
import { GetStaticProps } from "next";
import { Products } from "../index";

function NationalKitsList({ products }: Products) {
  return <ProductPage products={products} category="کیت های ملی" />;
}

export default NationalKitsList;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getNationalKits();
  return {
    props: {
      products,
    },
  };
};
