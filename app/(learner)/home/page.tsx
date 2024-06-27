import CourseCard from "@/components/CourseCard";
import ResumeLearningCard from "@/components/ResumeLearningCard";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="container mx-auto space-y-5 my-10 px-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Lanjutkan belajarmu</h2>
        <Link href={"my-course"} className="underline">
          My course
        </Link>
      </div>
      <div className="flex flex-nowrap gap-x-10">
        <ResumeLearningCard />
        <ResumeLearningCard />
        <ResumeLearningCard />
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Course Lainnya</h2>
      </div>
      <div className="grid grid-cols-4 gap-7">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </main>
  );
};

export default page;
