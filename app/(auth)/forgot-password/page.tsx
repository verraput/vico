import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="mx-auto text-center h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10 max-w-[20%]">
        <img />
        <div>
          <h1 className="text-3xl font-semibold">Lupa kata sandi</h1>
          <h4 className="">Kami ada disini untuk membantu anda kembali!</h4>
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
            <input
              type="text"
              className="grow"
              placeholder="Masukkan alamat Email"
            />
          </label>
        </div>

        <div className="space-y-3">
          <button className="btn btn-default w-full">
            {/* TODO: Add loading class when fetching a login api */}
            <span className="loading-spinner" />
            Masuk
          </button>
          <h5 className="font-semibold text-xl text-start pt-5">
            Setelah terkirim
          </h5>
          <p className="text-start pb-5 ">
            mohon cek email tertaut anda, lalu silahkan ikuti alur pemulihan
            akun sesuai dengan yang tertera pada email
          </p>
          <Link href={"/register"} className="flex text-sm space-x-1">
            <p>Belum punya akun?,</p>
            <p className="underline">buat akun sekarang</p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
