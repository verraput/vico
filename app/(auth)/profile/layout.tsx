"use client";
import NavbarMentor from "@/components/NavbarMentor";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({
  profile,
  photo,
  closeAccount,
  security,
}: Readonly<{
  children: React.ReactNode;
  profile: React.ReactNode;
  photo: React.ReactNode;
  closeAccount: React.ReactNode;
  security: React.ReactNode;
}>) => {
  const [tab, setTab] = useState("profile");
  const router = useRouter();
  const setNewTab = (tab: React.SetStateAction<string>) => {
    setTab(tab);
  };

  const handleLogOut = () => {
    router.replace("/login")
  };

  return (
    <div className="container mx-auto flex">
      <div className="bg-base-300 sticky top-0 h-screen">
        <div className="avatar mx-20 mt-10">
          <div className="mask mask-squircle w-24">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <h3 className="font-medium text-2xl text-center">Verra Putri</h3>

        <div className="mt-10 mx-4">
          <h3
            className="link link-hover text-xl"
            onClick={() => setNewTab("profile")}
          >
            Profile
          </h3>
          <h3
            className="link link-hover text-xl"
            onClick={() => setNewTab("photo")}
          >
            Photo
          </h3>
          <h3
            className="link link-hover text-xl"
            onClick={() => setNewTab("security")}
          >
            Security
          </h3>
          <h3
            className="link link-hover text-xl"
            onClick={() => setNewTab("closeAccount")}
          >
            Close Account
          </h3>
          <h3
            onClick={() => {
              handleLogOut();
            }}
            className="link link-hover text-xl mt-14 text-red-500"
          >
            Log Out
          </h3>
        </div>
      </div>
      <div className="bg-base-200 grow">
        {"profile".includes(tab) ? profile : null}
        {"photo".includes(tab) ? photo : null}
        {"security".includes(tab) ? security : null}
        {"closeAccount".includes(tab) ? closeAccount : null}
      </div>
    </div>
  );
};

export default Layout;
