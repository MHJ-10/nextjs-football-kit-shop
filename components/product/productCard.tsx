import Image from "next/image";
import Link from "next/link";
import { Products } from "../../pages/index";

function ProductCard({ products }: Products) {
  return (
    <div className="grid grid-cols-3 gap-3 w-4/5 py-5 mx-auto mobileM:grid-cols-2 mobileS:grid-cols-2 mobileS:max-11/12mobileS:gap-4 mobileM:w-5/6 mobileL:grid-cols-3 mobileL:gap-3 mobileL:w-11/12 tabletS:grid-cols-3 tabletL:grid-cols-4 desktop:grid-cols-4 desktop:gap-5 ">
      {products?.map((product) => (
        <div className="bg-c2 shadow-gray-500 shadow-lg bg-opacity-40 pt-2">
          <Image
            className="border-8 border-c2 border-double px-1 py-1 w-4/5 h-64 rounded-lg mx-auto"
            width={200}
            height={200}
            src={product.image}
            alt={product.name}
            priority
          />
          <section className="flex flex-col items-center py-2">
            <h1 className="text-c2 font-bold text-xl tabletL:text-lg mobileL:text-base mobileM:text-base mobileS:text-sm">
              {product.name}
            </h1>
            <section className=" text-c4 py-2 text-xl tabletL:text-lg mobileL:text-base mobileM:text-base mobileS:text-sm">
              <p>قیمت:{product.price.toLocaleString()}تومان</p>
              <p>سال عرضه:{product.offeringYear}</p>
            </section>
            <Link
              href={`/products/${product.id}`}
              className="bg-c2 text-c1 border-2 border-c4 rounded-lg hover:text-c3 hover:bg-c4 hover:border-c1 px-3 text-xl tabletL:text-lg mobileL:text-base mobileM:text-base mobileS:text-sm"
            >
              مشاهده جزئیات
            </Link>
          </section>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
