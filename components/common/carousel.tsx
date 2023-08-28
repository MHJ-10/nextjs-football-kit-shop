import Image from "next/image";
import { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { carouselImages } from "../../data/carouselImages";

function Carousel() {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="relative mt-14">
      <>
        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % carouselImages.length)
          }
          className="absolute top-1/2 ps-6"
        >
          <h1 className="bg-c1 py-1 px-1 rounded-full bg-opacity-30 mobileS:text-lg tabletS:text-xl ">
            <GrNext />
          </h1>
        </button>
        <Image
          className="w-full h-80"
          layout="responsive"
          width={200}
          height={200}
          src={carouselImages[current].src}
          alt="arsenal"
          quality={100}
          priority
        />
        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % carouselImages.length)
          }
          className="absolute top-1/2 end-0 pe-6"
        >
          <h1 className="bg-c1 py-1 px-1 rounded-full bg-opacity-30 mobileS:text-base tabletS:text-xl ">
            <GrPrevious />
          </h1>
        </button>
      </>
    </section>
  );
}

export default Carousel;
