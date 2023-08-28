import { supabase } from "@/data/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const { id } = data;

  if (!id) {
    res.status(422).json({ message: "لطفا آیدی محصول را وارد کنید" });
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    res.status(402).json({ message: "درخواست شما با خطا مواجه شده است" });
  }

  if (!error) {
    res.status(201).json({ message: "محصول مورد نظر با موفقیت حذف شد" });
  }
}

export default handler;
