import Image from "next/image";
import React from "react";

const CartCard = () => {
  return (
    <div className="flex gap-5">
      <Image
        height={720}
        width={1080}
        alt="thumbnail course"
        src={""}
        className="aspect-video w-52 border border-base-100"
      />
      <div className="grow flex flex-col">
        <h3 className="text-2xl font-medium">Title dari course yang ada</h3>
        <h4 className="font-medium grow">by Verra</h4>
        <p>8 Total Hours - 30 Materials - Novice</p>
      </div>
    </div>
  );
};

export default CartCard;
