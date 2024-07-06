import React from "react";
import VideoListCourse from "./VideoListCourse";
import { IcourseDetailSection } from "@/data/learnerInterface";

const SectionCourse = ({
  section,
  pos,
}: {
  section: IcourseDetailSection;
  pos: string;
}) => {
  return (
    <div
      className={`collapse bg-base-300 collapse-arrow ${
        pos === "first"
          ? "rounded-t-2xl rounded-none"
          : pos === "last"
          ? "rounded-b-2xl rounded-none"
          : "rounded-none"
      }`}
    >
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{section.title}</div>
      <div className="collapse-content bg-base-200">
        <p className="mt-4">{section.desc}</p>
        <div className="divider" />
        <div>
          {section.videos.map((video, index) => (
            <VideoListCourse
              duration={video.duration}
              title={video.title}
              key={`video-${video.title}-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCourse;
