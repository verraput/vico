"use client";
import CourseCard from "@/components/CourseCard";
import ResumeLearningCard from "@/components/ResumeLearningCard";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import {
  getAllCourseAsync,
  selectHomeCourse,
} from "@/lib/features/learner/learnerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();

  const profile = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const homeCourse = useAppSelector(selectHomeCourse);
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
    dispatch(getAllCourseAsync());
  }, []);

  return (
    <main className="container mx-auto space-y-5 my-10 px-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Lanjutkan belajarmu</h2>
        <Link href={"my-course"} className="underline">
          My course
        </Link>
      </div>
      <div className="flex flex-nowrap gap-x-10">
        {homeCourse.data.learner_progress.map((course, i) => (
          <ResumeLearningCard
            course={course}
            key={`course-${course.id}-${i}`}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">Course Lainnya</h2>
      </div>
      <div className="grid grid-cols-4 gap-7">
        {homeCourse.data.course.map((course, i) => (
          <CourseCard
            author={course.author}
            createdAt={course.createdAt}
            description={course.description}
            id={course.id}
            level={course.level}
            price={course.price}
            thumbnail={course.thumbnail}
            title={course.title}
            updatedAt={course.updatedAt}
            user={course.user}
            user_courses={course.user_courses}
            key={`${i}-${course.id}`}
          />
        ))}
      </div>
    </main>
  );
};

export default page;
