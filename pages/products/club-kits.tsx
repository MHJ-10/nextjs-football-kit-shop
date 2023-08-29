import ProductPage from "@/components/product/productsPage";
import { getClubKits } from "@/data/db";
import { GetStaticProps } from "next";
import { Products } from "../index";

function ClubKitsList({ products }: Products) {
  return <ProductPage products={products} category="کیت های باشگاهی" />;
}

export default ClubKitsList;

export const getStaticProps: GetStaticProps = async () => {
  const products = await getClubKits();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
