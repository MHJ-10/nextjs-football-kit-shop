import ProductPage from "@/components/product/productsPage";
import { getProducts, getProductsBrand } from "@/data/db";
import { Products } from "@/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

function BrandProducts({ products }: Products) {
  const router = useRouter();
  const { brand } = router.query;

  return <ProductPage products={products} category={`کیت های برند ${brand}`} />;
}

export default BrandProducts;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const brand = params?.brand;
  const products = await getProducts();
  const brandProducts = products?.filter((product) => product.brand === brand);
  return {
    props: {
      products: brandProducts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const brands = await getProductsBrand();
  if (!brands) {
    return {
      paths: [],
      fallback: true,
    };
  }
  const paths = brands.map((brand) => ({ params: { brand } }));

  return {
    paths,
    fallback: true,
  };
};
