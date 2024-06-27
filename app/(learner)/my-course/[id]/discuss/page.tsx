import ChatCard from "@/components/ChatCard";
import Image from "next/image";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="container flex flex-col mx-auto max-w-[50%] px-5 py-3 bg-base-300">
      <h3 className="text-3xl font-semibold">Diskusi</h3>
      
      <div className="space-y-5 my-5 overflow-y-hidden grow">
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="self"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="self"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="self"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="self"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="self"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="self"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="other"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="other"
        />
        <ChatCard
          message="Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euturpis molestie, dictum est a lacinia. Aliquam in elementum tellus."
          name="Verra"
          profile="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          timestamp="12.45"
          type="self"
        />
      </div>

      <div className="mt-5 sticky bottom-5">
        <label className="input input-bordered flex items-center gap-2 pe-0">
          <input type="text" className="grow" placeholder="Tanyakan sesuatu" />
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </label>
      </div>
    </div>
  );
};

export default page;
