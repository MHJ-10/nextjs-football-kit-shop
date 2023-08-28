import Menu from "@/components/admin/adminMenu";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

function AdminDashboard() {
  return <Menu />;
}

export default AdminDashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session?.user?.image) {
    return {
      redirect: {
        destination: "/user",
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
