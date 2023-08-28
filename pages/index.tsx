import Carousel from "@/components/common/carousel";
import ProductCard from "@/components/product/productCard";
import { getProducts } from "@/data/db";
import { GetStaticProps } from "next";

export interface Products {
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  team: string;
  price: number;
  brand: string;
  sizes: string[];
  offeringYear: number;
  image: string;
}

export default function Home({ products }: Products) {
  return (
    <>
      <Carousel />
      <ProductCard products={products} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      products,
    },
  };
};
