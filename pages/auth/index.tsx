import AuthForm from "@/components/auth/authForm";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

function Auth() {
  return <AuthForm />;
}

export default Auth;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
