"use client";
import { Icart } from "@/data/learnerInterface";
import {
  getCartAsync,
  removeFromCartAsync,
} from "@/lib/features/learner/learnerSlice";
import { useAppDispatch } from "@/lib/hooks";
import { alertService } from "@/services";
import Image from "next/image";
import React from "react";

const CartCard = (cart: Icart) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(false);
  const totalVideos = (sections: typeof cart.course.sections) => {
    return sections.reduce(
      (count, section) => count + section.videos.length,
      0
    );
  };

  const totalDuration = (sections: typeof cart.course.sections) => {
    return Math.round(
      sections.reduce((total, section) => {
        const sectionDuration = section.videos.reduce(
          (sum, video) => sum + video.duration,
          0
        );
        return total + sectionDuration;
      }, 0) / 60
    );
  };

  const handleDeleteCart = () => {
    setLoading(true);
    dispatch(removeFromCartAsync(cart.course_id)).then((res: any) => {
      if (res.payload.code !== 200) {
        alertService.error(res.payload.message);
      } else {
        alertService.success(res.payload.message);
        dispatch(getCartAsync());
      }
      setLoading(false);
    });
  };

  return (
    <div className="flex gap-5">
      <img
        height={720}
        width={1080}
        alt="thumbnail course"
        src={cart.course.thumbnail ?? "/placeholder.avif"}
        className="aspect-video w-52 border border-base-100"
      />
      <div className="grow flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-2xl font-medium">{cart.course.title}</h3>
          <div
            className="tooltip tooltip-error tooltip-left"
            data-tip="Hapus Course"
          >
            <button
              onClick={() => handleDeleteCart()}
              className="btn btn-circle btn-outline btn-error"
            >
              {loading ? (
                <span className={"loading loading-spinner"} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <h4 className="font-medium grow">by {cart.course.user.name}</h4>
        <p>
          {totalDuration(cart.course.sections)} Total Hours -{" "}
          {totalVideos(cart.course.sections)} Materials - {cart.course.level}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
