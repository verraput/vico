import Image from "next/image";
import React from "react";

const CheckoutCard = () => {
  return (
    <div className="flex gap-5 items-center">
      <Image
        height={720}
        width={1080}
        alt="thumbnail course"
        src={""}
        className="aspect-video w-32 border border-base-100"
      />
      <h3 className="text-2xl grow font-medium">Title dari course yang ada</h3>
      <h3 className="text-2xl">Rp. 99.000,00-</h3>
    </div>
  );
};

export default CheckoutCard;
