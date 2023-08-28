import { ReactNode } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
