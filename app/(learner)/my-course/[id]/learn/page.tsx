"use client";
import CourseContentList from "@/components/CourseContentList";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const handleToDiscussion = () => {
    router.push("/my-course/ini-idnya/discuss");
  };
  return (
    <div className="flex">
      <div className="w-fit">
        <video className="w-full min-h-[90vh]" controls>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="p-5 w-full">
          <div className="flex justify-between">
            <h3 className="text-2xl font-medium">Title dari video yang ada</h3>
            <button
              onClick={() => {
                handleToDiscussion();
              }}
              className="btn btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              Ke diskusi
            </button>
          </div>
          <h5 className="text-lg font-semibold mt-8">Deskripsi</h5>
          <p className="w-0 min-w-full">
            Deskripsi dari video yang ada disini Deskripsi dari video yang ada
            disiniDeskripsi dari video yang ada disiniDeskripsi dari video yang
            ada disiniDeskripsi dari video yang ada disiniDeskripsi dari video
            yang ada disiniDeskripsi dari video yang ada disiniDeskripsi dari
            video yang ada disiniDeskripsi dari video yang ada disiniDeskripsi
            dari video yang ada disiniDeskripsi dari video yang ada
            disiniDeskripsi dari video yang ada disiniDeskripsi dari video yang
            ada disiniDeskripsi dari video yang ada disiniDeskripsi dari video
            yang ada disiniDeskripsi dari video yang ada disiniDeskripsi dari
            video yang ada disiniDeskripsi dari video yang ada disiniDeskripsi
            dari video yang ada disiniDeskripsi dari video yang ada
            disiniDeskripsi dari video yang ada disiniDeskripsi dari video yang
            ada disini
          </p>
        </div>
      </div>
      <div className="grow">
        <CourseContentList />
      </div>
    </div>
  );
};

export default Page;
