import { Product } from "@/pages";
import { toast } from "react-toastify";

export async function deleteProduct(id: string) {
  const response = await fetch("/api/product/delete", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    toast.error("مشکلی به وجود آمده");
  }
  return data;
}

export async function handleProduct(
  { id, name, team, brand, offeringYear, price, image, sizes }: Product,
  type: string
) {
  const response = await fetch(`/api/product/${type}`, {
    method: "POST",
    body: JSON.stringify({
      id,
      name,
      team,
      brand,
      offeringYear,
      price,
      image,
      sizes,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    toast.error("مشکلی به وجود آمده");
  } else {
    return data;
  }
}
