import { comparePassword } from "@/data/auth";
import { supabase } from "@/data/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("email", email);
        if (error || data.length === 0) {
          throw new Error("کاربری با ایمیل وارد شده یافت نشد");
        }
        const user = data[0];

        const isVaild = await comparePassword(password, user.password);
        if (!isVaild) {
          throw new Error("رمز عبور وارد شده نادرست است");
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.isAdmin,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
