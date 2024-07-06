"use client";
import { clearLogin } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NavbarMentor = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    router.replace("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(clearLogin());
  };

  return (
    <nav className="bg-base-300 sticky top-0 z-[1000]">
      <div className="navbar container mx-auto gap-x-10">
        <div className="flex-1">
          <Link href={"/courses"} className="btn bg-transparent text-xl">
            <img src="./favicon.ico" className="aspect-square h-10" />
          </Link>
        </div>
        <div className="w-full flex gap-x-5">
          <Link href={"/courses"} className="hover:underline whitespace-nowrap">
            Courses
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label className="swap py-1 px-2 h-fit btn btn-sm">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    className="theme-controller"
                    value={"corporate"}
                  />

                  {/* sun icon */}
                  <div className="swap-on flex gap-3 items-center justify-center">
                    <p className="whitespace-nowrap">Light Mode</p>
                    <svg
                      className="h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                  </div>

                  {/* moon icon */}
                  <div className="swap-off flex gap-3 items-center justify-center">
                    <p className="whitespace-nowrap">Dark Mode</p>
                    <svg
                      className="h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </div>
                </label>
              </li>
              <div className="divider my-1" />
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li onClick={() => handleLogout()}>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarMentor;
