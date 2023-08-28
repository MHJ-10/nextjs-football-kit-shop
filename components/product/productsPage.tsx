import { Product } from "@/pages";
import { useState } from "react";
import FilterBar from "../common/filterBar";
import ProductCard from "./productCard";

interface Props {
  products: Product[];
  category: string;
}

function ProductPage({ products, category }: Props) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  return (
    <div className="mt-24">
      <h1 className="text-c4 text-2xl text-center my-5">{category}</h1>
      <FilterBar products={products} setProducts={setFilteredProducts} />
      <ProductCard products={filteredProducts} />
    </div>
  );
}

export default ProductPage;
