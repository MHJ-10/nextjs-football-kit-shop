import ProductPage from "@/components/product/productsPage";
import { getProducts, getTeamsName } from "@/data/db";
import { GetStaticPaths, GetStaticProps } from "next";
import { Products } from "../..";
import { useRouter } from "next/router";

function TeamProducts({ products }: Products) {
  const router = useRouter();
  const { teamName } = router.query;
  
  return (
    <ProductPage products={products} category={`کیت های تیم ${teamName}`} />
  );
}

export default TeamProducts;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ProductTeamName = params?.teamName;
  const products = await getProducts();
  const teamProducts = products?.filter(
    (product) => product.id.replace(/\d+|gk/g, "") === ProductTeamName
  );
  return {
    props: {
      products: teamProducts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const teamsName = await getTeamsName();
  if (!teamsName) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = teamsName.map((name: string) => ({
    params: { teamName: name },
  }));
  return {
    paths,
    fallback: true,
  };
};
