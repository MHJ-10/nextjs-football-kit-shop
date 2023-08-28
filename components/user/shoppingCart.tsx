import { findUser, removeFromShoppingCart, User } from "@/data/db";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ShoppingCartPage() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const totalPrice = user?.shoppingCart.reduce((accumulator, product) => {
    return accumulator + product.price;
  }, 0);

  useEffect(() => {
    async function getUser() {
      const user = await findUser(session?.user?.email);
      if (user) {
        setUser(user);
      }
    }
    getUser();
  }, []);

  async function handleRemove(id: string) {
    if (id) {
      await removeFromShoppingCart(user?.email, id);
      toast.success("محصول از سبد خرید شما حذف شد");
      setTimeout(() => router.reload(), 1500);
    }
  }

  function SubmitOrder() {
    toast.info(
      `${user?.username} عزیز ، سفارش شما به مبلغ ${totalPrice} تومان با موفقیت ثبت شد.`,
      {
        className: "w-96 h-24",
        autoClose: 3000,
      }
    );
  }

  if (!user) {
    return (
      <p className="text-c4 text-2xl text-center mt-10">
        در حال پردازش سبد خرید شما ...
      </p>
    );
  }

  if (user.shoppingCart.length === 0) {
    return (
      <p className="text-c4 text-2xl text-center mt-10">
        سبد خرید شما خالی است.
      </p>
    );
  }

  return (
    <>
      <section className="flex flex-col items-center rounded-md border-4 border-c2 border-double my-5 bg-c3 mx-auto mobileS:w-5/6 mobileS:text-sm mobileM:w-3/4 mobileM:text-base mobileL:w-2/3 tabletS:text-lg tabletL:w-1/2 desktop:text-xl">
        <h1>تعداد محصولات : {user.shoppingCart.length}</h1>
        <h1>قیمت نهایی : {totalPrice} تومان</h1>
        <button
          onClick={SubmitOrder}
          className="bg-c2 px-2 text-c1 py-1 rounded-lg border-2 border-c3"
        >
          ثبت سفارش
        </button>
      </section>
      <div className="grid tabletL:grid-cols-2 desktop:grid-cols-2 gap-4 py-5 px-2">
        {user.shoppingCart.map((product) => (
          <div className="grid grid-cols-3 bg-c4 border-4 border-c2 border-dashed mobileS:h-48 mobileS:text-xs mobileM:h-52 mobileM:text-sm mobileL:h-52 mobileL:text-base tabletS:h-52 tabletS:text-xl tabletL:h-56 tabletL:text-base desktop:h-60 desktop:text-xl">
            <section className="col-span-1">
              <Image
                width={180}
                height={180}
                src={product.image}
                alt={product.name}
                className=" border-2 my-1 ms-1 border-c3 mobileS:h-44 mobileM:h-48 mobileL:h-48 tabletS:h-48 tabletL:h-52 desktop:h-56"
              />
            </section>
            <section className="col-span-2 flex flex-col text-c3 gap-4 py-5">
              <h1 className="text-center">{product.name}</h1>
              <h1 className="text-center">قیمت : {product.price} تومان</h1>
              <h1 className="text-center">سایز : {product.size}</h1>
              <section className="flex flex-row justify-evenly text-c1">
                <Link
                  href={`products/${product.id}`}
                  className="bg-c2  py-1 rounded-lg border-2 border-c3"
                >
                  مشاهده محصول
                </Link>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-400 hover:bg-red-500 py-1 rounded-lg border-2 border-c3"
                >
                  حذف از سبد خرید
                </button>
              </section>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShoppingCartPage;
