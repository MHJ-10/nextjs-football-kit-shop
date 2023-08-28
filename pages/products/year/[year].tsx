import ProductPage from "@/components/product/productsPage";
import { getProducts, getproductsYear } from "@/data/db";
import { Products } from "@/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

function ProductsByYear({ products }: Products) {
  const router = useRouter();
  const { year } = router.query;

  return <ProductPage products={products} category={`کیت های سال ${year}`} />;
}

export default ProductsByYear;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year;
  const products = await getProducts();
  const yearProducts = products?.filter(
    (product) => product.offeringYear.toString() === year
  );
  return {
    props: {
      products: yearProducts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const years = await getproductsYear();
  if (!years) {
    return {
      paths: [],
      fallback: true,
    };
  }
  const paths = years.map((year) => ({ params: { year } }));

  return {
    paths,
    fallback: true,
  };
};
