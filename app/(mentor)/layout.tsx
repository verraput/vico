import NavbarMentor from "@/components/NavbarMentor";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavbarMentor />
      {children}
    </div>
  );
};

export default Layout;
