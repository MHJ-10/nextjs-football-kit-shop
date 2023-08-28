import Input from "@/components/common/input";
import MultiSelect from "@/components/common/multiSelect";
import { handleProduct } from "@/data/product";
import { Product } from "@/pages";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

interface editModalProps {
  product: Product;
  closeModal: () => void;
}

function EditModal({ product, closeModal }: editModalProps) {
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
    const id = product?.id;
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
      await handleProduct(
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
        "edit"
      );
      toast.info("محصول مورد نظر با موفقیت ویرایش شد");
      closeModal();
      setTimeout(() => router.reload(), 1200);
    } else {
      toast.warn("سایز های موجود را وارد نمایید");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" mt-4 rounded-md border-8 border-double border-c1 bg-c4 mx-auto mobileS:w-full mobileL:w-5/6 tabletS:w-4/5 tabletL:w-4/5 desktop:w-3/5"
    >
      <h1 className="text-c1 w-1/2 mx-auto text-center mobileS:text-sm mobileM:text-base tabletS:text-xl py-1 px-5 mt-4 rounded-md border-2 border-c1 bg-c2">
        ویرایش {product.name}
      </h1>

      <section className="grid mobileS:grid-cols-1 mobileS:w-3/4 mobileS:ms-4 mobileL:w-full mobileL:ms-0  mobileL:grid-cols-2 gap-1 text-c4">
        <Input
          type="text"
          label="نام محصول"
          defaultValue={product?.name}
          inputRef={nameRef}
        />
        <Input
          type="text"
          label="تیم"
          defaultValue={product?.team}
          inputRef={teamRef}
        />
        <Input
          type="text"
          label="برند"
          defaultValue={product?.brand}
          inputRef={brandRef}
        />
        <Input
          type="number"
          label="قیمت"
          defaultValue={product?.price}
          inputRef={priceRef}
        />
        <Input
          type="number"
          label="سال عرضه"
          defaultValue={product?.offeringYear}
          inputRef={yearRef}
        />
        <Input
          type="url"
          label="آدرس url تصویر"
          defaultValue={product?.image}
          inputRef={imageRef}
        />
        <MultiSelect sizes={sizes} setSizes={setSizes} />
      </section>
      <section className="flex flex-row justify-center">
        <button
          className="py-1 px-3 my-4 mx-4 bg-c2 text-lg text-c3 rounded-md hover:bg-c3 hover:text-c4"
          onClick={closeModal}
          type="button"
        >
          بازگشت
        </button>
        <button className="py-1 px-3 my-4 mx-4 bg-c2 text-lg text-c3 rounded-md hover:bg-c3 hover:text-c4">
          ثبت ویرایش
        </button>
      </section>
    </form>
  );
}

export default EditModal;
