import CartCard from "@/components/CartCard";
import CheckoutCard from "@/components/CheckoutCard";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="container flex mx-auto pt-4 pb-10 px-5 bg-base-300 gap-5">
      <div className="grow">
        <h2 className="text-3xl font-semibold border-b pb-4 border-b-base-200">
          Checkout
        </h2>
        <p>
          Untuk selanjutnya, kamu akan diarahkan ke whatsapp mentor course,
          silahkan lakukan pembayaran melalui whatsapp dan kirim bukti
          pembayarannya ke whatsapp mentor agar dapat dilakukan verifikasi serta
          pemberian course
        </p>

        <h4 className="text-xl font-semibold mt-5">Order Details</h4>

        <div className="space-y-4 mt-5">
          <CheckoutCard />
        </div>
      </div>
      <div className="sticky top-16 h-fit">
        <h4 className="text-2xl font-medium">Total:</h4>
        <h5 className="text-3xl font-semibold">Rp. 75.000,00-</h5>
        <button className="btn btn-primary btn-wide mt-5">
          Go to Whatsapp
        </button>
      </div>
    </div>
  );
};

export default Page;
