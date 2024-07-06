"use client";
import CourseContentList from "@/components/CourseContentList";
import { IvideoDetailCourseLearner } from "@/data/learnerInterface";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import {
  getDiskusiAsync,
  getOneCourseLearnerAsync,
  selectDetailCourseLearner,
  selectDiskusi,
  selectSelectedVideoDetail,
  setVideoDetail,
} from "@/lib/features/learner/learnerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();
  const handleToDiscussion = () => {
    dispatch(getDiskusiAsync(course.data.course.id)).then((res: any) => {
      router.push(`/my-course/${course.data.course.id}/discuss`);
    });
  };

  const profile = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const video = useAppSelector(selectSelectedVideoDetail);
  const course = useAppSelector(selectDetailCourseLearner);
  const { status: diskusiStatus } = useAppSelector(selectDiskusi);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        if (profile.user_type === null || profile.user_type === "") {
          dispatch(getProfileAsync());
        }
      } else {
        router.replace("/login");
      }
    }
    dispatch(getOneCourseLearnerAsync(parseInt(params.id)));
  }, []);
  return (
    <div className="flex">
      <div className="w-fit">
        <iframe
          width={560}
          height={315}
          className="w-full min-h-[90vh] aspect-video"
          src={`https://www.youtube.com/embed/${video?.url}`}
        >
          Your browser does not support the video tag.
        </iframe>
        <div className="p-5 w-full">
          <div className="flex justify-between">
            <h3 className="text-2xl font-medium">{video?.title}</h3>
            <button
              onClick={() => {
                handleToDiscussion();
              }}
              className="btn btn-primary"
            >
              {diskusiStatus === "loading" ? (
                <span
                  className={"loading loading-spinner"}
                />
              ) : (
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
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              )}
              Ke diskusi
            </button>
          </div>
          <h5 className="text-lg font-semibold mt-8">Deskripsi</h5>
          <p className="w-0 min-w-full">{video?.desc}</p>
        </div>
      </div>
      <div className="grow">
        <CourseContentList sections={course.data.course.sections} />
      </div>
    </div>
  );
};

export default Page;
