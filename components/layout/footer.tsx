import Link from "next/link";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="static bottom-0 bg-c4 text-c3 py-4 mt-12 grid mobileS:grid-rows-3 tabletS:grid-cols-3 tabletS:h-56 tabletS:text-base tabletL:text-lg ">
      <section className="flex flex-col items-center gap-2">
        <Link className="hover:text-c1" href="/">
          صفحه اصلی
        </Link>
        <Link className="hover:text-c1" href="/user">
          صفحه کاربر
        </Link>
        <Link className="hover:text-c1" href="/products">
          تمامی محصولات
        </Link>
        <Link className="hover:text-c1" href="products/club-kits">
          کیت های باشگاهی
        </Link>
        <Link className="hover:text-c1" href="/products/national-kits">
          کیت های ملی
        </Link>
        <hr className="border-c3 border-2 border-dotted w-2/3 my-2 mx-auto tabletS:invisible" />
      </section>
      <section className="flex flex-col items-center gap-6">
        <h1>منابع :</h1>
        <Link
          className="hover:text-c1"
          target="_blank"
          href="https://www.footballkitarchive.com"
        >
          تصاویر محصولات : footballkitarchive
        </Link>
        <Link
          className="hover:text-c1"
          target="_blank"
          href="https://www.hnfootballshop.com"
        >
          تصاویر اسلاید ها : hnfootballshop
        </Link>
        <hr className="border-c3 border-2 border-dotted w-2/3  mx-auto tabletS:invisible" />
      </section>
      <section className="flex flex-col items-center gap-2">
        <h1 className="mobileS:text-center mobileS:w-3/5 tabletS:w-full">
          این وبسایت صرفا یک نمونه کار می باشد که سعی شده در آن از اکثر ویژگی
          هایی که در یک سایت فروشگاهی مورد استفاده قرار می گیرد ، استفاده شود.
        </h1>
        <section className="flex flex-row justify-between">
          <h1 className="mt-1">شبکه های اجتماعی :</h1>
          <Link
            className="hover:text-c4 text-blue-800 bg-c1 py-1 px-1 rounded-full ms-4 text-2xl"
            target="_blank"
            href="https://www.linkedin.com/in/mhj10"
          >
            <FaLinkedin />
          </Link>
          <Link
            className="hover:text-c4 text-black text-2xl bg-c1 py-1 px-1 rounded-full ms-3"
            target="_blank"
            href="https://github.com/MHJ-10"
          >
            <FaGithub />
          </Link>
          <Link
            className="hover:text-c4 text-sky-700 text-2xl bg-c1 py-1 px-1 rounded-full ms-4"
            target="_blank"
            href="https://t.me/mhj10_official"
          >
            <FaTelegram />
          </Link>
        </section>
      </section>
    </footer>
  );
}

export default Footer;
