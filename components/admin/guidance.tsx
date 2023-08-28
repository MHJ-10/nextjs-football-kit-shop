function Guidance() {
  return (
    <section className="mt-4 rounded-md border-8 border-double border-c4 text-c4 bg-c2 mx-auto px-4 py-2 mobileS:w-full mobileS:text-xs mobileM:w-11/12 mobileL:w-5/6 mobileL:text-sm tabletS:w-4/5 tabletL:w-4/5 tabletL:text-base desktop:w-3/5">
      <h1 className="text-c3 font-bold text-lg py-1 px-5 mt-4 rounded-md border-2 border-c1 bg-c4 text-center mx-auto mobileS:w-full mobileL:w-3/4 tabletS:w-2/3 tabletL:w-1/2 desktop:w-1/2">
        راهنمای تغییر محصولات
      </h1>
      <section className="grid grid-rows-2 gap-4 mt-4 ">
        <nav className="row-span-1 bg-c3 px-2 py-2 rounded-md border-4 border-c4 border-dashed">
          <h1 className="text-xl text-c2">افزودن</h1>
          <ul className="list-disc list-inside">
            <li>
              آیدی محصول باید به صورت مقابل باشد : برای مثال اگر شما قصد افزودن
              لباس دوم بارسلونا برای سال 2024 را دارید آیدی محصول باید به صورت
              barcelona20242 باشد.
            </li>
            <li>
              آیدی لباس های دروزبانی هم با پسوند gk است. برای مثال آیدی لباس
              دروزبانی آرسنال برای سال 2023 arsenal2023gk می باشد.
            </li>
            <li>
              قسمت برند را به زبان انگلیسی و قسمت نام تیم را به زبان فارسی وارد
              کنید.
            </li>
            <li>
              آدرس تصویری که وارد می کنید می بایست از سایت footballkitarchive
              باشد.
            </li>
          </ul>
        </nav>
        <section className="row-span-1 grid grid-cols-2 gap-4">
          <nav className="col-span-1 bg-c3 px-2 py-2 rounded-md border-4 border-c4 border-dashed">
            <h1 className="text-xl text-c2">ویرایش</h1>
            <ul className="list-disc list-inside">
              <li>
                برای ویرایش ، آیدی محصول را به درستی وارد کنید و سپس تغییرات را
                اعمال کنید.
              </li>
              <li>در انتهای ویرایش سایز های موجود را مجددا انتخاب کنید.</li>
            </ul>
          </nav>
          <nav className="col-span-1 bg-c3 px-2 py-2 rounded-md border-4 border-c4 border-dashed">
            <h1 className="text-xl text-c2">حذف</h1>
            <ul className="list-disc list-inside">
              <li>
                در ابتدا آیدی محصول را وارد کنید تا نام محصول برای شما نمایش
                داده شود و صورت مطمئن بودن اقدام به حذف محصول کنید.
              </li>
            </ul>
          </nav>
        </section>
      </section>
    </section>
  );
}

export default Guidance;
