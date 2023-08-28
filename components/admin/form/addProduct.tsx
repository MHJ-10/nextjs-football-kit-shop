import { handleProduct } from "@/data/product";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../common/input";
import MultiSelect from "../../common/multiSelect";

function AddProduct() {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const teamRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [sizes, setSizes] = useState<string[]>([]);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const id = idRef.current?.value;
    const name = nameRef.current?.value;
    const team = teamRef.current?.value;
    const brand = brandRef.current?.value;
    const price = priceRef.current?.value;
    const offeringYear = yearRef.current?.value;
    const image = imageRef.current?.value;
    if (
      id &&
      name &&
      team &&
      brand &&
      price &&
      offeringYear &&
      image &&
      sizes.length > 0
    ) {
      const result = await handleProduct(
        {
          id,
          name,
          team,
          price: parseInt(price),
          brand,
          offeringYear: parseInt(offeringYear),
          image,
          sizes,
        },
        "add"
      );
      toast.info(result.message);
      router.replace(`/products/${id}`);
    } else {
      toast.warn("تمامی فیلد ها را پر کنید");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mt-4 rounded-md border-8 border-double border-c4 bg-c2 mx-auto mobileS:w-full mobileL:w-5/6 tabletS:w-4/5 tabletL:w-4/5 desktop:w-3/5"
    >
      <h1 className="text-c3 text-2xl py-1 px-5 mt-4 rounded-md border-2 border-c1 bg-c4">
        فرم افزودن محصول
      </h1>
      <section className="grid mobileS:grid-cols-1 tabletL:grid-cols-2 gap-1">
        <Input type="text" label="آیدی محصول" inputRef={idRef} />
        <Input type="text" label="نام محصول" inputRef={nameRef} />
        <Input type="text" label="تیم" inputRef={teamRef} />
        <Input type="text" label="برند" inputRef={brandRef} />
        <Input type="number" label="قیمت" inputRef={priceRef} />
        <Input type="number" label="سال عرضه" inputRef={yearRef} />
        <Input type="url" label="آدرس url تصویر" inputRef={imageRef} />
        <MultiSelect sizes={sizes} setSizes={setSizes} />
      </section>
      <button className="py-1 px-3 my-4 bg-c4 text-lg text-c3 rounded-md hover:bg-c3 hover:text-c4">
        تایید
      </button>
    </form>
  );
}

export default AddProduct;
