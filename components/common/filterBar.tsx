import { Product } from "@/pages";
import { SetStateAction, useRef } from "react";
import { MdSort } from "react-icons/md";

interface FilterProducts {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
}

function FilterBar({ products, setProducts }: FilterProducts) {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleByYear() {
    const sortedProducts: Product[] = products
      .slice()
      .sort((a, b) => b.offeringYear - a.offeringYear);
    setProducts(sortedProducts);
  }

  function handleAscendingPrice() {
    const sortedProducts = products.slice().sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  }

  function handleDecendingPrice() {
    const sortedProducts = products.slice().sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  }

  function handleSearch() {
    const searched = searchRef.current?.value;
    if (searched) {
      const filtered = products.filter((product) =>
        product.name.includes(searched)
      );
      filtered.length !== 0 ? setProducts(filtered) : setProducts(products);
    }
  }

  return (
    <nav className="bg-c4 text-c1 border-2 border-c3 border-dotted mx-auto py-2 rounded-lg  ps-2 mobileS:w-full mobileS:text-xs mobileM:w-full mobileL:w-11/12 mobileL:text-sm tabletS:w-4/5 tabletS:text-base tabletL:w-3/4 desktop:w-3/4">
      <ul className="flex flex-row justify-around">
        <section className="flex">
          <li>
            <input
              className="rounded-md bg-c2 py-1 px-2 placeholder:text-c3"
              placeholder="جستجو..."
              ref={searchRef}
            />
          </li>
          <li>
            <button
              className="bg-c1 px-2 mt-1 ms-2 text-c2 rounded-md border-2 border-c3"
              onClick={handleSearch}
            >
              جستجو
            </button>
          </li>
        </section>

        <section className="flex mt-1 text-c3">
          <li className="px-1 mobileS:mt-1">
            <MdSort />
          </li>
          <li>
            <h1>مرتب سازی :</h1>
          </li>
        </section>
        <li>
          <button onClick={handleByYear} className="hover:text-c3 mt-1">
            جدیدترین
          </button>
        </li>
        <li>
          <button onClick={handleAscendingPrice} className="hover:text-c3 mt-1">
            ارزان ترین
          </button>
        </li>
        <li>
          <button onClick={handleDecendingPrice} className="hover:text-c3 mt-1">
            گران ترین
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default FilterBar;
