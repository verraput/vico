"use client";
import ChatCard from "@/components/ChatCard";
import { getProfileAsync, selectLogin } from "@/lib/features/auth/authSlice";
import {
  getDiskusiAsync,
  postDiskusiAsync,
  selectDiskusi,
  selectPostDiskusi,
} from "@/lib/features/learner/learnerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { alertService } from "@/services";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const profile = useAppSelector(selectLogin);
  const diskusi = useAppSelector(selectDiskusi);
  const { status: isSending } = useAppSelector(selectPostDiskusi);
  const inputDescRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        if (profile.user_type === null || profile.user_type === "") {
          dispatch(getProfileAsync());
        }
      } else {
        router.replace("/login");
      }
    }
    if (diskusi.data.length === 0) {
      dispatch(getDiskusiAsync(parseInt(params.id)));
    }
  }, []);

  const handleSendDiscussion = () => {
    if (inputDescRef.current?.value || inputDescRef.current?.value !== "") {
      dispatch(
        postDiskusiAsync({
          idCourse: parseInt(params.id),
          message: inputDescRef.current?.value as string,
        })
      ).then((res: any) => {
        if (res.payload.code !== 201) {
          alertService.error(res.payload.message);
        } else {
          inputDescRef.current!.value = "";
          dispatch(getDiskusiAsync(parseInt(params.id)));
        }
      });
    }
  };
  return (
    <div className="container flex flex-col mx-auto max-w-[50%] px-5 py-3 bg-base-300">
      <h3 className="text-3xl font-semibold">Diskusi</h3>

      <div className="space-y-5 my-5 overflow-y-hidden grow">
        {diskusi.data.map((item, index) => (
          <ChatCard
            message={item.message}
            name={item.user.name}
            profile={item.user.profile_picture}
            timestamp={item.createdAt}
            type={profile.uuid === item.user.uuid ? "self" : "other"}
          />
        ))}
      </div>

      <div className="mt-5 sticky bottom-5">
        <label className="input input-bordered flex items-center gap-2 pe-0">
          <input
            ref={inputDescRef}
            type="text"
            className="grow"
            placeholder="Tanyakan sesuatu"
          />
          <button
            disabled={isSending === "loading"}
            onClick={() => handleSendDiscussion()}
            className="btn btn-square btn-ghost"
          >
            {isSending === "loading" ? (
              <span className={"loading loading-spinner"} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            )}
          </button>
        </label>
      </div>
    </div>
  );
};

export default page;
