import { createUser } from "@/data/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import Input from "../common/input";

function AuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleLogin() {
    setIsLogin((prev) => !prev);
  }

  function resetInput() {
    if (userNameRef.current && emailRef.current && passwordRef.current) {
      userNameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  }

  function handlePass() {
    setShowPassword((prev) => !prev);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const username = userNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (isLogin) {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (result?.ok) {
        toast.success("ورود موفقیت آمیز");
        router.replace("/");
      } else {
        toast.error(result?.error);
      }
    } else {
      if (username && email && password) {
        const result = await createUser(username, email, password);
        toast.success(result.message);
        resetInput();
        setIsLogin(true);
      } else {
        toast.error("درخواست شما با خطا مواجه شده است");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto  bg-c2 flex flex-col items-center rounded-md border-8 border-c4 border-double mt-24 mb-16 py-5 mobileS:w-3/4 mobileL:w-1/2"
    >
      <h1 className="text-c3 text-4xl py-1 px-5 rounded-md border-2 border-c1 bg-c4">
        {isLogin ? "فرم ورود" : "فرم ثبت نام"}
      </h1>
      {!isLogin && <Input label="نام" type="text" inputRef={userNameRef} />}
      <Input label="ایمیل" type="email" inputRef={emailRef} />
      <Input
        label="رمز عبور"
        type={showPassword ? "text" : "password"}
        inputRef={passwordRef}
        passwordIcon={showPassword ? <MdVisibilityOff /> : <MdVisibility />}
        handlePass={handlePass}
      />
      <button className="bg-c1 text-c4 rounded-md px-6 mt-8 text-2xl border-2 border-c3 hover:bg-c3 hover:text-c4">
        {isLogin ? "ورود" : "ثبت نام"}
      </button>
      <h1
        onClick={handleLogin}
        className="underline underline-offset-5 text-xl pt-4 text-c1 hover:text-c3"
      >
        {isLogin ? "ساخت حساب کاربری جدید" : "ورود با حساب کاربری موجود"}
      </h1>
    </form>
  );
}

export default AuthForm;
