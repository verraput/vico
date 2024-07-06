"use client";
import React from "react";

const Page = () => {
  return (
    <div className="mx-20">
      <div className="mb-10 text-center mt-10">
        <h2 className="text-3xl font-semibold">Close Account</h2>
        <h4 className="text-xl">Close your account permanently.</h4>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-xl">
          Warning: If you close your account, you will be unsubscribed from all
          your X courses, and will lose access forever.
        </h4>

        <button className="btn btn-error">Close account</button>
      </div>
    </div>
  );
};

export default Page;
