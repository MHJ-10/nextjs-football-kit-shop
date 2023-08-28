import UserMenu from "@/components/user/userMenu";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

function UserPage() {
  return <UserMenu />;
}

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  if (session.user?.image) {
    return {
      redirect: {
        destination: "/admin",
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
