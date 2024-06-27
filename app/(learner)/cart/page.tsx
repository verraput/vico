import CartCard from "@/components/CartCard";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container flex mx-auto pt-4 pb-10 px-5 bg-base-300 gap-5">
      <div className="grow">
        <h2 className="text-3xl font-semibold border-b pb-4 border-b-base-200">
          Shipping Cart
        </h2>

        <div className="space-y-4 mt-5">
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
        </div>
      </div>
      <div className="sticky top-16 h-fit">
        <h4 className="text-2xl font-medium">Total:</h4>
        <h5 className="text-3xl font-semibold">Rp. 75.000,00-</h5>
        <Link href={"/cart/asdasd/checkout"}>
        <button className="btn btn-primary btn-wide mt-5">Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default page;
