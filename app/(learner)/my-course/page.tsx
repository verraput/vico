import MyCourseCard from "@/components/MyCourseCard";
import React from "react";

const MyCourse = () => {
  return (
    <main className="container mx-auto space-y-5 my-10 px-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">My Course</h2>
    </div>
      <div className="grid grid-cols-4 gap-5">
        <MyCourseCard />
        <MyCourseCard />
        <MyCourseCard />
        <MyCourseCard />
        <MyCourseCard />
        <MyCourseCard />
        <MyCourseCard />
      </div>
    </main>
  );
};

export default MyCourse;
