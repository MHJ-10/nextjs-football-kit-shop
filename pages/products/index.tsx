import ProductPage from "@/components/product/productsPage";
import { getProducts } from "@/data/db";
import { GetStaticProps } from "next";
import { Products } from "../index";

function ProdcutsList({ products }: Products) {
  return <ProductPage products={products} category="همه محصولات" />;
}

export default ProdcutsList;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
};
