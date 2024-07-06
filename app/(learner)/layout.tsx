import NavbarLearner from "@/components/NavbarLearner";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-screen flex flex-col">
      <NavbarLearner />
      <div className="h-fill grow">{children}</div>
    </div>
  );
};

export default Layout;
