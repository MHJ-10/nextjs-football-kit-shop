import { compare, hash } from "bcryptjs";
import { toast } from "react-toastify";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return compare(password, hashedPassword);
}

export async function createUser(
  username?: string,
  email?: string,
  password?: string
) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    toast.warning("لطفا تمامی فیلد ها را به درستی پر کنید");
  } else {
    return data;
  }
}


