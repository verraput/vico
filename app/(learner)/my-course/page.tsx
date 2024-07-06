"use client";
import MyCourseCard from "@/components/MyCourseCard";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import {
  getAllCourseLearnerAsync,
  selectAllCourseLearner,
} from "@/lib/features/learner/learnerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const MyCourse = () => {
  const router = useRouter();

  const profile = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectAllCourseLearner);
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
    dispatch(getAllCourseLearnerAsync());
  }, []);
  return (
    <main className="container mx-auto space-y-5 my-10 px-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">My Course</h2>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {courses.data.map((course, index) => (
          <MyCourseCard course={course} key={`course-${course.id}-${index}`} />
        ))}
      </div>
    </main>
  );
};

export default MyCourse;
