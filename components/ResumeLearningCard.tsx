import { IcourseLearner } from "@/data/learnerInterface";
import Link from "next/link";
import React from "react";

const ResumeLearningCard = ({ course }: { course: IcourseLearner }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl image-full h-52 overflow-hidden">
      <img
        className="object-cover h-full w-full"
        src={
          course.course.thumbnail ??
          "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        }
        alt="Shoes"
      />
      <div className="card-body">
        <h2 className="card-title">{course.course.title}</h2>
        <p>{course.course.user.name}</p>
        <div className="card-actions justify-end">
          <Link href={`/my-course/${course.id}/learn`}>
            <button className="btn btn-primary">Lanjutkan belajar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeLearningCard;
