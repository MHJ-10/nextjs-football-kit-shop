import EditModal from "@/components/admin/form/editModal";
import ProductDetailCard from "@/components/product/productDetailCard";
import { findProduct, getProductsId } from "@/data/db";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { Product } from "..";

interface ProductDetailsPageProps {
  product: Product;
}

function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="relative">
      <div className={showModal ? "opacity-30" : null + "fixed"}>
        <ProductDetailCard
          product={product}
          handleModal={() => setShowModal(true)}
        />
      </div>
      <div className="fixed top-20 w-full">
        {showModal && (
          <EditModal closeModal={() => setShowModal(false)} product={product} />
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.productId;
  const product = await findProduct(productId);

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getProductsId();
  if (!ids) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = ids.map((id: string) => ({ params: { productId: id } }));
  return {
    paths,
    fallback: true,
  };
};
