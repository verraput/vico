import Link from "next/link";
import React from "react";

const MyCourseCard = () => {
  return (
    <Link href={"/my-course/idnyaini/learn"}>
      <div className="card card-compact bg-base-100 w-fill shadow-xl transition-all active:scale-95">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Cara Mudah memahami integral</h2>
          <p>Burhanuddin harahap</p>
          <progress className="progress w-fill" value="86" max="100"></progress>
        </div>
      </div>
    </Link>
  );
};

export default MyCourseCard;
