"use client";
import { usePathname } from "next/navigation";
import Nav from "./Navbar";
import Footer from "./Footer";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isAdmin = pathName.startsWith("/admin");
  return (
    <div>
      {!isAdmin && <Nav />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </div>
  );
}
