import { Dispatch, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface MultiSelectProps {
  sizes: string[];
  setSizes: Dispatch<React.SetStateAction<string[]>>;
}

function MultiSelect({ sizes, setSizes }: MultiSelectProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const allSize: string[] = ["S", "M", "L", "XL", "2XL"];

  function handleDropdown() {
    setShowDropdown((prev) => !prev);
  }

  function handleSizes(size: string) {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  }

  return (
    <section className="pt-8 flex flex-row">
      <label className="mobileS:text-base tabletS:text-lg text-c3 mx-4 h-8">
        سایز های موجود
      </label>
      <div className="flex flex-col">
        <div
          onClick={handleDropdown}
          className="bg-c3 rounded-lg text-c2 text-xl"
        >
          <h1 className="flex flex-row justify-center py-1 px-3 mobileS:text-base tabletS:text-lg">
            انتخاب کنید
            <p className="mt-1">
              <RiArrowDropDownLine />
            </p>
          </h1>
        </div>
        {showDropdown && (
          <div className="border-2 border-dashed border-c4 h-10 ">
            <ul className="divide-y-2 divide-dashed bg-c3 divide-c4">
              {allSize.map((size) => (
                <li>
                  <section className="bg-c3 flex flex-row items-center py-1 ">
                    <input
                      onClick={() => handleSizes(size)}
                      type="checkbox"
                      className="w-4 h-4 ms-1"
                    />
                    <label className="ms-2">{size}</label>
                  </section>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default MultiSelect;
