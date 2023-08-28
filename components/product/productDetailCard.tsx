import { addToShoppingCart, findUser } from "@/data/db";
import { deleteProduct } from "@/data/product";
import { Product } from "@/pages";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

interface ProductDetailProps {
  product: Product;
  handleModal: () => void;
}

function ProductDetailCard({ product, handleModal }: ProductDetailProps) {
  const { data: session } = useSession();
  const [size, setSize] = useState<string>();
  const [disable, setDisable] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function handleDisable() {
      if (session?.user?.email && !session.user.image) {
        const user = await findUser(session.user.email);
        const AddedProduct = user?.shoppingCart.find(
          (p) => p.id === product.id
        );
        if (AddedProduct) setDisable(true);
      }
    }
    handleDisable();
    if (!session) setDisable(true);
  }, [session?.user?.email]);

  async function handleDelete() {
    await deleteProduct(product.id);
    toast.info("محصول مورد نظر با موفقیت حذف شد");
    setTimeout(() => router.replace("/"), 1200);
  }

  async function handleAdd(id: string) {
    if (id) {
      await addToShoppingCart({
        email: session?.user?.email,
        addedProduct: {
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          size: size ? size : product.sizes[0],
        },
      });
      toast.success("محصول به سبد خرید اضافه شد");
      router.reload();
    } else {
      toast.warning("سایز مورد نظر را انتخاب کنید");
    }
  }

  if (!product)
    return <p className="text-center text-xl mt-4 text-c4">محصول یافت نشد!</p>;

  return (
    <div className="grid grid-cols-2 mt-24 bg-white rounded-md border-4 border-c2 shadow-lg shadow-gray-600 my-5 mx-auto mobileS:w-full  mobileM:w-full mobileL:w-4/5 tabletS:w-4/5 tabletL:w-3/5 desktop:w-3/5 ">
      <section className="col-span-1">
        <Image
          className="h-96 px-4 py-4"
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          priority
        />
      </section>
      <div className="col-span-1 flex flex-col items-center text-center mobileS:text-base mobileM:text-base mobileL:text-lg tabletS:text-lg tabletL:text-xl desktop:text-xl  py-5 px-5 bg-c4">
        <h1 className="text-c1 py-4 tracking-wide font-bold">{product.name}</h1>
        <section className="flex flex-row pt-4">
          <p className="text-c3 pe-3">قیمت :</p>
          <p className="text-c1">{product.price} تومان</p>
        </section>
        <section className="flex flex-row py-2">
          <p className="text-c3 pe-3">سال عرضه :</p>
          <p className="text-c1"> {product.offeringYear}</p>
        </section>
        <section className="flex flex-row pt-4">
          <label className="text-c3 pe-3 mt-1">انتخاب سایز :</label>
          <select
            className="bg-c3 text-c4 rounded-lg border-2 border-c4 px-2 focus:border-c2"
            value={size}
            defaultValue={product.sizes[0]}
            onChange={(e) => setSize(e.currentTarget.value)}
          >
            {product.sizes?.map((size) => (
              <option value={size} className="text-c4 rounded-lg">
                {size}
              </option>
            ))}
          </select>
        </section>
        {!session?.user?.image ? (
          <button
            className="bg-c2 flex rounded-md px-5 mt-8 ms-5 py-1 border-2 border-dotted border-c3 text-c3 disabled:opacity-40"
            onClick={() => handleAdd(product.id)}
            disabled={disable}
          >
            <p>افزودن به</p>
            <p className="mt-1 ms-1">
              <MdShoppingCart />
            </p>
          </button>
        ) : (
          <section className="flex">
            <button
              onClick={handleModal}
              className="bg-c2 flex rounded-md px-2 mt-8 ms-5 py-1 border-2 border-dotted border-c3 text-c3 mobileS:w-5/12  tabletS:w-3/4"
            >
              <p>ویرایش</p>
              <p className="mt-1 ms-1">
                <MdEdit />
              </p>
            </button>
            <button
              onClick={handleDelete}
              className="bg-c2 flex rounded-md px-2 mt-8 ms-5 py-1 border-2 border-dotted border-c3 text-c3 mobileS:w-1/3 tabletS:w-3/4"
            >
              <p className="">حذف</p>
              <p className="mt-1 ms-1">
                <MdDelete />
              </p>
            </button>
          </section>
        )}

        <section className="flex mt-12 text-c1 mobileS:text-xs mobileM:text-xs mobileL:text-xs tabletS:text-base tabletL:text-base desktop:text-xl">
          <h1 className="text-c2">دسته :</h1>
          <Link
            className="hover:text-c3 mobileS:ms-1 mobileM:ms-4"
            href={`/products/team/${product.id.replace(/\d+|gk/g, "")}`}
          >
            {product.team}
          </Link>
          <Link
            className="hover:text-c3 mobileS:ms-1 mobileM:ms-4"
            href={`/products/brand/${product.brand}`}
          >
            {product.brand}
          </Link>
          <Link
            className="hover:text-c3 mobileS:ms-1 mobileM:ms-4"
            href={`/products/year/${product.offeringYear}`}
          >
            {product.offeringYear}
          </Link>
        </section>
      </div>
    </div>
  );
}

export default ProductDetailCard;
