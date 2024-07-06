import { IcourseDetailVideo } from "@/data/learnerInterface";
import React from "react";

const VideoListCourse = (video: IcourseDetailVideo) => {
  const convertToHoursMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursStr = String(hours).padStart(2, "0");
    const minutesStr = String(remainingMinutes).padStart(2, "0");

    return `${hoursStr}:${minutesStr}`;
  };
  return (
    <div className="flex gap-5 px-2 py-1 items-center hover:bg-base-300 cursor-pointer">
      <button className="btn btn-circle btn-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4"
        >
          <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
        </svg>
      </button>
      <p className="grow">{video.title}</p>
      <p>{convertToHoursMinutes(video.duration)}</p>
    </div>
  );
};

export default VideoListCourse;
