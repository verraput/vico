import React from "react";
import SectionLearn from "./SectionLearn";
import { IsectionDetailCourseLearner } from "@/data/learnerInterface";

const CourseContentList = ({
  sections,
}: {
  sections: Array<IsectionDetailCourseLearner>;
}) => {
  return (
    <div className="w-full px-5 my-3">
      <h2 className="text-2xl font-medium">Course Content</h2>
      <div className="divider" />
      {sections.map((section, index) => {
        let position = "";
        if (index === 0) {
          position = "first";
        } else if (index === sections.length - 1) {
          position = "last";
        } else {
          position = "middle";
        }
        return (
          <SectionLearn
            pos={position}
            section={section}
            key={`section-${section.id}-${index}`}
          />
        );
      })}
    </div>
  );
};

export default CourseContentList;
