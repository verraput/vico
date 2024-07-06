"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import SectionCourse from "@/components/SectionCourse";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import {
  addToCartAsync,
  getCourseDetailAsync,
  selectAddToCart,
  selectCourseDetail,
} from "@/lib/features/learner/learnerSlice";
import { alertService } from "@/services";
const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const profile = useAppSelector(selectLogin);
  const courseDetail = useAppSelector(selectCourseDetail);
  const addToCartStatus = useAppSelector(selectAddToCart);
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
    dispatch(getCourseDetailAsync(parseInt(params.id)));
  }, []);

  const totalVideos = (sections: typeof courseDetail.data.sections) => {
    return sections.reduce(
      (count, section) => count + section.videos.length,
      0
    );
  };

  const totalDuration = (sections: typeof courseDetail.data.sections) => {
    return sections.reduce((total, section) => {
      const sectionDuration = section.videos.reduce(
        (sum, video) => sum + video.duration,
        0
      );
      return total + sectionDuration;
    }, 0);
  };

  const convertToRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  const handleAddToCart = () => {
    dispatch(addToCartAsync(parseInt(params.id))).then((res: any) => {
      if (res.payload.code === 201) {
        alertService.success(res.payload.message);
      } else if (res.payload.code === 409) {
        alertService.info(res.payload.message);
      } else {
        alertService.error(res.payload.message);
      }
    });
  };
  return (
    <main className="container mx-auto px-5 my-10">
      <div className="flex gap-5 justify-between max-w-[80%] mx-auto">
        <div>
          <h2 className="text-3xl font-medium">
            {courseDetail.data.title ?? ""}
          </h2>
          <p>{courseDetail.data.description ?? ""}</p>
          <div className="flex gap-2">
            <div className="badge badge-primary my-4">
              {courseDetail.data.user_courses.length ?? ""} Learner
            </div>
            <div className="badge badge-primary my-4">
              {courseDetail.data.sections.length ?? ""} Section
            </div>
            <div className="badge badge-primary my-4">
              {totalVideos(courseDetail.data.sections) ?? ""} Video
            </div>
            <div className="badge badge-primary my-4">
              {totalDuration(courseDetail.data.sections) ?? ""} Menit Belajar
            </div>
          </div>
          <p className="text-sm">
            Created by
            <span className="underline px-1">
              {courseDetail.data.user.name ?? ""}
            </span>
          </p>
        </div>
        <div className="max-w-96">
          <img
            src={courseDetail.data.thumbnail ?? "/placeholder.avif"}
            alt="hero"
            className="rounded-lg"
            width={500}
            height={500}
          />
          <h3 className="text-2xl font-semibold my-4">
            {convertToRupiah(parseInt(courseDetail.data.price)) ?? ""}
          </h3>
          <button
            onClick={() => handleAddToCart()}
            className="btn btn-primary w-full"
          >
            <span
              className={`${
                addToCartStatus.status === "loading" ? "loading" : ""
              } loading-spinner`}
            />
            Add to cart
          </button>
        </div>
      </div>
      <div className="divider max-w-[80%] mx-auto" />
      <div className="max-w-[80%] mx-auto">
        <h3 className="text-2xl font-semibold my-4 px-5">Course content</h3>
        <div>
          {courseDetail.data.sections.map((section, index) => {
            let position = "";
            if (index === 0) {
              position = "first";
            } else if (index === courseDetail.data.sections.length - 1) {
              position = "last";
            } else {
              position = "middle";
            }
            return (
              <SectionCourse
                pos={position}
                section={section}
                key={`${section.title}-${index}`}
              />
            );
          }) ?? ""}
        </div>
      </div>
    </main>
  );
};

export default Page;
