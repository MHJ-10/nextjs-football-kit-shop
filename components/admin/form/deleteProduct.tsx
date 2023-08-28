import { findProduct } from "@/data/db";
import { deleteProduct } from "@/data/product";
import { Product } from "@/pages";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../common/input";

function DeleteProduct() {
  const [product, setProduct] = useState<Product>();
  const [showProduct, setShowProduct] = useState<boolean>(false);
  const idRef = useRef<HTMLInputElement>(null);

  async function handleFind() {
    const id = idRef.current?.value;
    const product: Product = await findProduct(id);
    if (product) {
      setProduct(product);
      setShowProduct(true);
    } else {
      toast.warn("محصول با آیدی وارد شده یافت نشد");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = idRef.current?.value;
    if (id) {
      const result = await deleteProduct(id);
      toast.info(result.message);
      idRef.current.value = "";
      setShowProduct(false);
    }
  }
  return (
    <form
      className="flex flex-col items-center mt-4 rounded-md border-8 border-double border-c4 bg-c2 mx-auto mobileS:w-full mobileL:w-5/6 tabletS:w-4/5 tabletL:w-4/5 desktop:w-3/5"
      onSubmit={handleSubmit}
    >
      <h1 className="text-c3 text-2xl py-1 px-5 mt-4 rounded-md border-2 border-c1 bg-c4">
        فرم حذف محصول
      </h1>
      <section className="flex py-5">
        <Input type="text" label="آیدی محصول" inputRef={idRef} />
        <button
          className="mt-8 ms-4 bg-c3 border-2 border-c4 text-c4 px-2 rounded-md"
          onClick={handleFind}
          type="button"
        >
          جستجو
        </button>
      </section>
      {showProduct && (
        <section className="flex flex-col">
          <h1 className="mobileS:text-base mobileL:text-lg py-3 text-c3 flex">
            نام محصول : <p className="ms-2 text-c1">{product?.name} </p>
          </h1>
          <button className="py-1 px-2 w-1/2 mx-auto my-4 bg-c4 text-lg text-c3 rounded-md hover:bg-c3 hover:text-c4">
            حذف محصول
          </button>
        </section>
      )}
    </form>
  );
}

export default DeleteProduct;
