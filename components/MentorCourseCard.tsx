"use client";
import { IcourseMentor } from "@/data/mentorInterface";
import { deleteCourseAsync } from "@/lib/features/mentor/mentorSlice";
import { useAppDispatch } from "@/lib/hooks";
import { alertService } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const MentorCourseCard = ({
  course,
  action,
}: {
  course: IcourseMentor;
  action: () => void;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const totalDuration =
    course.sections.reduce((total, section) => {
      const sectionDuration = section.videos.reduce(
        (sum, video) => sum + video.duration,
        0
      );
      return total + sectionDuration;
    }, 0) / 60;

  const totalVideos = course.sections.reduce(
    (count, section) => count + section.videos.length,
    0
  );

  return (
    <div className="flex gap-5">
      <img
        alt="thumbnail course"
        src={
          course.thumbnail ??
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        }
        className="aspect-video w-52 border border-base-300"
      />
      <div className="flex gap-2 grow">
        <div className="grow flex flex-col">
          <h3 className="text-2xl font-medium">{course.title}</h3>
          <h4 className="font-medium">{}</h4>
          <p className="text-sm grow">
            {totalDuration.toFixed(0)} Total Hours - {totalVideos} Materials -{" "}
            {course.level.toUpperCase()}
          </p>
        </div>
        <div className="dropdown dropdown-end">
          <button
            tabIndex={course.id}
            className="btn btn-primary btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </button>
          <ul
            tabIndex={course.id}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-1 gap-1 shadow"
          >
            <Link
              href={`/courses/${course.id}/edit-course`}
              className="btn btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
              </svg>
              Edit Course
            </Link>
            <Link
              className="btn btn-ghost btn-sm"
              href={`/courses/${course.id}/add-learner`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
              </svg>
              Tambah Siswa
            </Link>
            <button
              onClick={() => action()}
              className="btn btn-error btn-outline btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              Delete Course
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MentorCourseCard;
