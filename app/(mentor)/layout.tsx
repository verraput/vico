import NavbarMentor from "@/components/NavbarMentor";
import React from "react";

const layout = ({
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

export default layout;
