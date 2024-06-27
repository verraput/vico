import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="mx-auto text-center h-screen flex items-center">
      <div className="overflow-hidden h-screen max-md:hidden grow">
        <Image alt="Orang belajar dengan menggunakan laptop" width={1000} height={1000} src="/windows.jpg" className="h-full object-cover w-full" />
      </div>
      <div className="flex flex-col gap-10 mx-20 max-md:mx-auto">
        <img />
        <div>
          <h1 className="text-3xl font-semibold">Masuk</h1>
          <h4 className="">Selamat datang kembali</h4>
        </div>
        <div className="space-y-2">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" className="grow" placeholder="Password" />
          </label>

          <div className="form-control">
            <label className="label cursor-pointer m-0 p-0 w-fit space-x-3">
              <input
                type="checkbox"
                defaultChecked={false}
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Ingat saya</span>
            </label>
          </div>

          <Link
            href={"/forgot-password"}
            className="text-sm underline pt-5 inline-block"
          >
            Lupa kata sandi? reset sekarang.
          </Link>
        </div>

        <div className="space-y-3">
          <button className="btn btn-default w-full">
            {/* TODO: Add loading class when fetching a login api */}
            <span className="loading-spinner" />
            Masuk
          </button>
          <Link href={"/register"} className="flex text-sm space-x-1">
            <p>Belum punya akun?,</p>
            <p className="underline">buat akun sekarang</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
