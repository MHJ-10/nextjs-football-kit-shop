import Toast from "@/components/common/toast";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>سایت فروش کیت های فوتبال</title>
        </Head>
        <Layout>
          <Toast />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}
