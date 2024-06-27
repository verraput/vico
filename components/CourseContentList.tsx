import React from "react";
import SectionLearn from "./SectionLearn";

const CourseContentList = () => {
  return (
    <div className="w-full px-5 my-3">
      <h2 className="text-2xl font-medium">Course Content</h2>
      <div className="divider" />
      <SectionLearn />
      <SectionLearn />
      <SectionLearn />
    </div>
  );
};

export default CourseContentList;
