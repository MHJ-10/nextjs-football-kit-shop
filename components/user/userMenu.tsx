import { signOut } from "next-auth/react";
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import ShoppingCartPage from "./shoppingCart";

function UserMenu() {
  const [activeMenu, SetActiveMenu] = useState<string>("");
  const buttonStyles =
    " text-c1 py-1 w-11/12 px-3 rounded-lg border-c2 border-2 border-dashed hover:bg-c2";

  return (
    <div className="grid grid-cols-12 gap-1 mt-16">
      <section className="flex flex-col items-center bg-c3 border-c4 border-4 border-dotted rounded-md  gap-4 my-8 ms-5 py-4 mobileS:col-span-5 mobileS:text-sm mobileS:h-44 mobileM:col-span-4 mobileL:col-span-4 mobileL:text-base tabletS:col-span-4 tabletL:col-span-3 tabletL:text-lg tabletL:h-48 desktop:col-span-2 desktop:h-52">
        <h1 className="flex bg-c2 text-c3 py-1 px-2 rounded-full">
          <p className="mt-1">
            <CgMenuGridO />
          </p>
          منو دسترسی کاربر
        </h1>
        <button
          onClick={() => SetActiveMenu("shoppingCart")}
          className={`bg-${
            activeMenu === "shoppingCart" ? "c2" : "c4"
          } ${buttonStyles}`}
        >
          سبد خرید
        </button>
        <button onClick={() => signOut()} className={`${buttonStyles} bg-c4`}>
          خروج از حساب کاربری
        </button>
      </section>
      <section className="mobileS:col-span-7 mobileM:col-span-8 mobileL:col-span-8 tabletS:col-span-8 tabletL:col-span-9 desktop:col-span-10">
        {activeMenu === "shoppingCart" && <ShoppingCartPage />}
      </section>
    </div>
  );
}

export default UserMenu;
