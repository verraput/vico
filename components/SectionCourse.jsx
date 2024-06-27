import React from "react";
import VideoListCourse from "./VideoListCourse";

const SectionCourse = () => {
  return (
    <div className="collapse bg-base-300 collapse-arrow">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Title Section</div>
      <div className="collapse-content bg-base-200">
        <p className="mt-4">Deskripsi dari title section yang ada</p>
        <div className="divider" />
        <div className="">
          <VideoListCourse />
          <VideoListCourse />
          <VideoListCourse />
          <VideoListCourse />
          <VideoListCourse />
          <VideoListCourse />
        </div>
      </div>
    </div>
  );
};

export default SectionCourse;
