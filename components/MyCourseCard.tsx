import { IcourseLearner } from "@/data/learnerInterface";
import Link from "next/link";
import React from "react";

const MyCourseCard = ({ course }: { course: IcourseLearner }) => {
  return (
    <Link href={`/my-course/${course.id}/learn`}>
      <div className="card card-compact bg-base-100 w-fill shadow-xl transition-all active:scale-95">
        <figure>
          <img
            src={
              course.course.thumbnail ??
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{course.course.title}</h2>
          <p>{course.course.user.name}</p>
          <progress className="progress w-fill" value="86" max="100"></progress>
        </div>
      </div>
    </Link>
  );
};

export default MyCourseCard;
