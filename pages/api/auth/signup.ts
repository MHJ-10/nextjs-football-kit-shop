import { hashPassword } from "@/data/auth";
import { supabase, User } from "@/data/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    const { username, email, password }: User = data;

    if (
      !username ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 8
    ) {
      res
        .status(422)
        .json({ message: "لطفا تمامی فیلد ها را به درستی پر کنید" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const { error } = await supabase.from("users").insert<User>({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      shoppingCart: [],
    });
    if (error) {
      res.status(402).json({ message: "مشکلی به وجود آمده" });
      return;
    }

    res.status(201).json({ message: `ثبت نام ${username} با موفقیت انجام شد` });
  }
}

export default handler;
