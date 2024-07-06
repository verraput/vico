"use client";
import NavbarLearner from "@/components/NavbarLearner";
import NavbarMentor from "@/components/NavbarMentor";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({
  user,
  photo,
  closeAccount,
  security,
}: Readonly<{
  children: React.ReactNode;
  user: React.ReactNode;
  photo: React.ReactNode;
  closeAccount: React.ReactNode;
  security: React.ReactNode;
}>) => {
  const [tab, setTab] = useState("profile");
  const router = useRouter();
  const setNewTab = (tab: React.SetStateAction<string>) => {
    setTab(tab);
  };

  const profileData = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        if (profileData.user_type === "" || profileData.user_type === null) {
          dispatch(getProfileAsync());
        }
      } else {
        router.replace("/login");
      }
    }
  }, []);

  const handleLogOut = () => {
    router.replace("/login");
  };

  return (
    <>
      {"mentor" === profileData.user_type ? <NavbarMentor /> : null}
      {"learner" === profileData.user_type ? <NavbarLearner /> : null}
      <div className="container mx-auto flex">
        <div className="bg-base-300 flex flex-col sticky top-0 h-screen max-w-[300px]">
          <div className="mx-auto mt-10 mb-5">
            <div className="mask mask-squircle w-24">
              <Image
                alt="profile pengguna"
                height={120}
                width={120}
                src={profileData.profile_picture ?? "/profile.png"}
              />
            </div>
          </div>
          <h3 className="font-medium text-2xl text-center px-4">
            {profileData.name}
          </h3>

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
          {"profile".includes(tab) ? user : null}
          {"photo".includes(tab) ? photo : null}
          {"security".includes(tab) ? security : null}
          {"closeAccount".includes(tab) ? closeAccount : null}
        </div>
      </div>
    </>
  );
};

export default Layout;
