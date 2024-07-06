"use client";
import MentorCourseCard from "@/components/MentorCourseCard";
import { IcourseMentor } from "@/data/mentorInterface";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import {
  deleteCourseAsync,
  getAllCourseAsync,
  selectCourses,
} from "@/lib/features/mentor/mentorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { alertService } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const Courses = () => {
  const dialogDeleteRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [course, setCourse] = React.useState<IcourseMentor>();
  const profile = useAppSelector(selectLogin);
  const courses = useAppSelector(selectCourses);

  const dispatch = useAppDispatch();
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

  const handleDeleteVideo = () => {
    dispatch(deleteCourseAsync(course!.id)).then((res: any) => {
      if (res.payload.code !== 200) {
        alertService.error(res.payload.message);
      } else {
        dispatch(getAllCourseAsync());
        alertService.success(res.payload.message);
      }
      dialogDeleteRef.current?.close();
    });
  };

  const handleDialogDelete = (course: IcourseMentor) => {
    setCourse(course);
    dialogDeleteRef.current?.showModal();
  };

  return (
    <div className="mx-auto container">
      <h2 className="text-3xl font-medium pb-4 mt-5">Course Saya</h2>
      <div className="w-full grid grid-cols-2 gap-5">
        <Link href={"/courses/create-course"}>
          <div className="flex gap-5 bg-primary justify-center items-center py-10 transition-all active:scale-95 rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <h4 className="text-2xl">Buat Course</h4>
          </div>
        </Link>

        {courses.data.map((course, i) => (
          <MentorCourseCard
            course={course}
            action={() => handleDialogDelete(course)}
            key={`${i}-${course.id}`}
          />
        ))}
      </div>
      <dialog
        ref={dialogDeleteRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hapus Data</h3>
          <p className="py-4">
            Apakah anda yakin ingin menghapus course ini? Semua pilihan yang
            telah dijalankan tidak dapat dikembalikan.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Tutup</button>
            </form>
            <button
              onClick={() => handleDeleteVideo()}
              className="btn  btn-error"
            >
              Tetap Hapus
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Courses;
