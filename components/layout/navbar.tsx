import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const name = session?.user?.name;

  return (
    <nav className="fixed w-full top-0 z-50 bg-c4 py-4 px-5 text-c1 text-xl shadow-md shadow-c3 ">
      <div className="flex flex-row justify-between items-center px-4">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="tabletS:hidden outline py-1 px-1 outline-offset-2 outline-2 outline-c3 rounded-md"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <Link className="hover:text-c2 mobileS:hidden tabletS:block" href="/">
          صفحه اصلی
        </Link>
        <Link
          className="hover:text-c2 mobileS:hidden tabletS:block"
          href="/products/club-kits"
        >
          کیت های باشگاهی
        </Link>
        <Link
          className="hover:text-c2 mobileS:hidden tabletS:block"
          href="/products/national-kits"
        >
          کیت های ملی
        </Link>
        <Link
          className="hover:text-c2 mobileS:hidden tabletS:block"
          href="/products/gk-kits"
        >
          کیت های دروازبانی
        </Link>

        {session && status === "authenticated" ? (
          <Link href="/user" className="text-c3 text-lg underline hover:text-c1 underline-offset-8">
            {session.user?.image ? `${name} (ادمین)` : `${name}`}
          </Link>
        ) : (
          <Link
            href="/auth"
            className="bg-c1 border-2 border-double hover:bg-c2 border-c3 text-c4 rounded-md py-1 px-3"
          >
            ثبت نام
          </Link>
        )}
      </div>
      {open && (
        <div className="flex flex-col gap-1 text-base tracking-widest divide-y-2 divide-dashed divide-c3 items-center tabletS:hidden">
          <Link
            className="hover:text-c2"
            href="/"
            onClick={() => setOpen(false)}
          >
            صفحه اصلی
          </Link>
          <Link
            className="hover:text-c2"
            href="/products/club-kits"
            onClick={() => setOpen(false)}
          >
            کیت های باشگاهی
          </Link>
          <Link
            className="hover:text-c2"
            href="/products/national-kits"
            onClick={() => setOpen(false)}
          >
            کیت های ملی
          </Link>
          <Link
            className="hover:text-c2"
            href="/products/gk-kits"
            onClick={() => setOpen(false)}
          >
            کیت های دروازبانی
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
