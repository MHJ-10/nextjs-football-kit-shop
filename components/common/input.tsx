import { ChangeEventHandler, MouseEvent, ReactNode, RefObject } from "react";

interface Props {
  label: string;
  type: "text" | "number" | "email" | "password" | "url";
  inputRef?: RefObject<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string | number;
  passwordIcon?: ReactNode;
  handlePass?: (e: MouseEvent<HTMLDivElement>) => void;
}

function Input({
  label,
  type,
  inputRef,
  defaultValue,
  onChange,
  passwordIcon,
  handlePass,
}: Props) {
  return (
    <section className="flex flex-row pt-8 relative">
      <label className="mobileS:text-base tabletS:text-lg text-c3 mx-1">
        {label}
      </label>
      <input
        dir="ltr"
        className="bg-c3 rounded-lg border-2 border-c4 h-8 mobileS:w-2/3 ps-1"
        type={type}
        ref={inputRef}
        onChange={onChange}
        defaultValue={defaultValue}
        required
      />
      {passwordIcon && (
        <div onClick={handlePass} className="absolute top-10 start-1/4 text-c2">
          {passwordIcon}
        </div>
      )}
    </section>
  );
}

export default Input;
