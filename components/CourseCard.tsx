import { IcourseHome } from "@/data/learnerInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = (course: IcourseHome) => {
  const isDateInLastWeek = (inputDate: string) => {
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const dateToCheck = new Date(inputDate);

    return dateToCheck >= oneWeekAgo && dateToCheck <= now;
  };

  const convertToRupiah = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };
  return (
    <Link href={`/course/${course.id}`}>
      <div className="card w-full bg-base-100 shadow-xl transition-all active:scale-95">
        <figure>
          <img
            height={300}
            width={400}
            src={
              course.thumbnail ??
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt="thumbnail course"
          />
        </figure>
        <div className="card-body">
          <div>
            <h2 className="card-title">
              {course.title}
              {isDateInLastWeek(course.createdAt) ? (
                <div className="badge badge-secondary">NEW</div>
              ) : null}
            </h2>
            <p className="text-xs">{course.user.name}</p>
          </div>
          <p className="line-clamp-2 text-sm">{course.description}</p>
          <p className="font-semibold text-xl text-end">
            {convertToRupiah(course.price)}
          </p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{course.level}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
