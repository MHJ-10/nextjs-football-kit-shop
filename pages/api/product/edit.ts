import { supabase } from "@/data/db";
import { Product } from "@/pages";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const { id, name, team, brand, offeringYear, price, image, sizes }: Product =
    data;

  if (!id) {
    res.status(422).json({ message: "لطفا آیدی محصول را وارد کنید" });
  }

  const { data: product, error } = await supabase
    .from("products")
    .update({ name, team, price, brand, offeringYear, image, sizes })
    .eq("id", id)
    .select();

  if (error)
    res.status(402).json({ message: "درخواست شما با خطا مواجه شده است" });

  if (product) {
    res.status(201).json({ message: "محصول مورد نظر با موفقیت ویرایش شد" });
  }
}

export default handler;
