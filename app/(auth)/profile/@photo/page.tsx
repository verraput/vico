"use client";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="mx-20">
      <div className="mb-10 text-center mt-10">
        <h2 className="text-3xl font-semibold">Photo</h2>
        <h4 className="text-xl">
          Add a nice photo of yourself for your profile{" "}
        </h4>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-xl">Image preview</h4>

        <Image
          height={320}
          width={320}
          src=""
          className="mx-auto border bg-base-300 border-base-100"
          alt="Preview profile user"
        />

        <h4 className="font-medium text-xl">Change image</h4>

        <input type="file" className="file-input file-input-bordered w-full" />

        <div className="flex justify-end">
          <button className="btn btn-neutral">Simpan</button>
        </div>
      </div>
    </div>
  );
};

export default Page;
