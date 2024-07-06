import {
  IsectionDetailCourseLearner,
  IvideoDetailCourseLearner,
} from "@/data/learnerInterface";
import { setVideoDetail } from "@/lib/features/learner/learnerSlice";
import { useAppDispatch } from "@/lib/hooks";
import React from "react";

const SectionLearn = ({
  section,
  pos,
}: {
  section: IsectionDetailCourseLearner;
  pos: string;
}) => {
  const dispatch = useAppDispatch();
  const convertToHoursMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hoursStr = String(hours).padStart(2, "0");
    const minutesStr = String(remainingMinutes).padStart(2, "0");

    return `${hoursStr}:${minutesStr}`;
  };
  const handleSelectVideo = (video: IvideoDetailCourseLearner) => {
    dispatch(setVideoDetail(video));
  };
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
        <p className="mt-5">{section.desc}</p>
        <div className="divider" />
        <div>
          {section.videos.map((video, index) => (
            <div
              onClick={() => handleSelectVideo(video)}
              key={`${video.id}-${index}`}
              className="flex items-center py-2 px-2 gap-4 cursor-pointer"
            >
              <input type="checkbox" className="checkbox checkbox-sm" />
              <h3 className="grow">{video.title}</h3>
              <p>{convertToHoursMinutes(video.duration)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionLearn;
