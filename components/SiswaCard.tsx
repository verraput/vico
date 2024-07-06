import { IlearnerinCourse } from "@/data/mentorInterface";
import Image from "next/image";
import React from "react";

const SiswaCard = ({
  learner,
  action,
}: {
  learner: IlearnerinCourse;
  action: () => void;
}) => {
  return (
    <div
      onClick={() => action()}
      className="bg-base-300 px-4 py-2 flex gap-4"
    >
      <div className="mask bg-black mask-squircle w-24">
        <img
          alt="profile pengguna"
          height={120}
          width={120}
          src={"/profile.png"}
        />
      </div>
      <div className="h-fit self-center w-full">
        <h3 className="text-xl">{learner.name}</h3>
        <p>{learner.username ?? ""}</p>
      </div>
      {/* <div className="badge badge-primary self-center whitespace-nowrap badge-md">
        Sudah terdaftar
      </div> */}
    </div>
  );
};

export default SiswaCard;
