import { Product } from "@/pages";
import { createClient } from "@supabase/supabase-js";

interface userProduct {
  id: string;
  name: string;
  price: number;
  size: string;
  image: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  id: number;
  shoppingCart: userProduct[];
}

interface addToShoppingCartProps {
  email?: string | null;
  addedProduct?: userProduct;
}

const supabaseURL = "https://zalxglvdphllozyrijbm.supabase.co";
const supabaseKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbHhnbHZkcGhsbG96eXJpamJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwNjI4NjQsImV4cCI6MjAwNjYzODg2NH0.gZRmkDEuURsqCiWnNYuvm5TaJrvhihB0HP3LzZ_UZ1M";

export const supabase = createClient(supabaseURL, supabaseKEY);

export async function getProducts() {
  const { data, error } = await supabase.from("products").select();
  if (data) {
    const products: Product[] = data.sort((a, b) => 0.5 - Math.random());
    return products;
  }
  console.log(error);
}

export async function getClubKits() {
  const { data, error } = await supabase
    .from("products")
    .select()
    .not("name", "ilike", "%ملی%");
  if (data) {
    const clubKits: Product[] = data.sort((a, b) => 0.5 - Math.random());
    return clubKits;
  }
  console.log(error);
}

export async function getNationalKits() {
  const { data, error } = await supabase
    .from("products")
    .select()
    .like("name", "%ملی%");
  if (data) {
    const nationalKits: Product[] = data.sort((a, b) => 0.5 - Math.random());
    return nationalKits;
  }
  console.log(error);
}

export async function getGKKits() {
  const { data, error } = await supabase
    .from("products")
    .select()
    .like("name", "%دروازبانی%");
  if (data) {
    const gkKits: Product[] = data.sort((a, b) => 0.5 - Math.random());
    return gkKits;
  }
  console.log(error);
}

export async function findProduct(productId: string | string[] | undefined) {
  const { data, error } = await supabase.from("products").select();
  if (data) {
    const product = data.find((product) => product.id === productId);
    return product;
  }
  console.log(error);
}

export async function getTeamsName() {
  const { data, error } = await supabase.from("products").select("id");
  if (data) {
    const ids: string[] = data.map((product) => product.id);
    const teamsName = ids.map((id) => id.replace(/\d+|gk/g, ""));
    return teamsName;
  }
  console.log(error);
}

export async function getproductsYear() {
  const { data, error } = await supabase
    .from("products")
    .select("offeringYear");
  if (data) {
    const years: string[] = data.map((product) =>
      product.offeringYear.toString()
    );
    return years;
  }
  console.log(error);
}

export async function getProductsBrand() {
  const { data, error } = await supabase.from("products").select("brand");
  if (data) {
    const brands: string[] = data.map((product) => product.brand);
    return brands;
  }
  console.log(error);
}

export async function getProductsId() {
  const { data, error } = await supabase.from("products").select("id");
  if (data) {
    const ids: string[] = data.map((product) => product.id);
    return ids;
  }
  console.log(error);
}

export async function findUser(email?: string | null) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email);
  if (data) {
    const user: User = data[0];
    return user;
  }
  console.log(error);
}

export async function removeFromShoppingCart(email?: string, id?: string) {
  const user = await findUser(email);
  const updatedShoppingCart = user?.shoppingCart.filter(
    (product) => product.id !== id
  );
  const { data, error } = await supabase
    .from("users")
    .update({ shoppingCart: updatedShoppingCart })
    .eq("email", email);
  if (data) return data;
  console.log(error);
}

export async function addToShoppingCart({
  email,
  addedProduct,
}: addToShoppingCartProps) {
  const user = await findUser(email);
  if (addedProduct && user) {
    const updatedShoppingCart = [...user.shoppingCart, addedProduct];
    const { data, error } = await supabase
      .from("users")
      .update({ shoppingCart: updatedShoppingCart })
      .eq("email", email);
    if (data) return data;
    console.log(error);
  }
}
