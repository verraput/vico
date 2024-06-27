import Image from "next/image";
import React from "react";
import SectionCourse from "@/components/SectionCourse";
const page = () => {
  return (
    <main className="container mx-auto px-5 my-10">
      <div className="flex gap-5 justify-between max-w-[80%] mx-auto">
        <div>
          <h2 className="text-3xl font-medium">Title dari course</h2>
          <p>
            Cara mudah memahami integral hanya dengan menonton video serta
            mengikuti tutor yang telah disediakan dari sini
          </p>
          <div className="flex gap-2">
            <div className="badge badge-primary my-4">100 Learner</div>
            <div className="badge badge-primary my-4">2 Section</div>
            <div className="badge badge-primary my-4">30 Video</div>
            <div className="badge badge-primary my-4">200 Menit Belajar</div>
          </div>
          <p className="text-sm">
            Created by
            <span className="underline px-1">Teguh Dwi Cahya Kusuma</span>
          </p>
        </div>
        <div className="max-w-96">
          <Image
            src="/placeholder.avif"
            alt="hero"
            className="rounded-lg"
            width={500}
            height={500}
          />
          <h3 className="text-2xl font-semibold my-4">Rp. 125.000,00-</h3>
          <button className="btn btn-primary w-full">Add to cart</button>
        </div>
      </div>
      <div className="divider max-w-[80%] mx-auto" />
      <div className="max-w-[80%] mx-auto">
        <h3 className="text-2xl font-semibold my-4 px-5">Course content</h3>

        <div>
            <SectionCourse />
            <SectionCourse />
            <SectionCourse />
            <SectionCourse />
        </div>
      </div>
    </main>
  );
};

export default page;
