import { signOut } from "next-auth/react";
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import AddProduct from "./form/addProduct";
import DeleteProduct from "./form/deleteProduct";
import EditProduct from "./form/editProduct";
import Guidance from "./guidance";

function AdminMenu() {
  const [activeMenu, SetActiveMenu] = useState<string>("guide");
  const buttonStyles =
    " text-c1 py-1 w-3/4 px-3 rounded-lg border-c2 border-2 border-dashed hover:bg-c2";

  return (
    <section className="grid grid-cols-12 gap-1 mt-16">
      <nav className="flex flex-col items-center gap-4 my-8 ms-5 py-4 h-96 bg-c3 border-c4 border-4 border-dotted rounded-md mobileS:col-span-5 mobileS:text-xs mobileS:h-80 mobileM:col-span-4 mobileM:h-96 mobileM:text-sm mobileL:col-span-4 mobileL:h-80 tabletS:col-span-4 tabletS:text-base tabletL:col-span-3 desktop:col-span-2 desktop:h-96">
        <h1 className="flex bg-c2 text-c3 py-1 px-2 rounded-full">
          <p className="mt-1">
            <CgMenuGridO />
          </p>
          منو دسترسی ادمین
        </h1>
        <button
          onClick={() => SetActiveMenu("add")}
          className={`bg-${activeMenu === "add" ? "c2" : "c4"} ${buttonStyles}`}
        >
          افزودن محصول
        </button>
        <button
          onClick={() => SetActiveMenu("edit")}
          className={`bg-${
            activeMenu === "edit" ? "c2" : "c4"
          } ${buttonStyles}`}
        >
          ویرایش محصول
        </button>
        <button
          onClick={() => SetActiveMenu("delete")}
          className={`bg-${
            activeMenu === "delete" ? "c2" : "c4"
          } ${buttonStyles}`}
        >
          حذف محصول
        </button>
        <button
          onClick={() => SetActiveMenu("guide")}
          className={`bg-${
            activeMenu === "guide" ? "c2" : "c4"
          } ${buttonStyles}`}
        >
          راهنمایی
        </button>
        <button onClick={() => signOut()} className={`${buttonStyles} bg-c4`}>
          خروج از حساب کاربری
        </button>
      </nav>
      <main className="mobileS:col-span-7 mobileM:col-span-8 mobileL:col-span-8 tabletS:col-span-8 tabletL:col-span-9 desktop:col-span-10">
        {activeMenu === "add" && <AddProduct />}
        {activeMenu === "edit" && <EditProduct />}
        {activeMenu === "delete" && <DeleteProduct />}
        {activeMenu === "guide" && <Guidance />}
      </main>
    </section>
  );
}

export default AdminMenu;
