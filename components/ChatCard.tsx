import Image from "next/image";
import React from "react";

const ChatCard = ({
  type,
  profile,
  name,
  timestamp,
  message,
}: {
  type: string;
  profile: string;
  name: string;
  timestamp: string;
  message: string;
}) => {
  if ("self".includes(type)) {
    return (
      <div className="flex items-start border-b pb-5 border-base-100">
        <div>
          <div className="flex gap-3 items-baseline justify-end">
            <p className="text-xs">{timestamp}</p>
            <h3 className="font-semibold text-xl">{name}</h3>
          </div>
          <p className="w-full text-end">{message}</p>
        </div>
        <div className="avatar ms-4">
          <div className="mask mask-squircle w-14">
            <Image
              height={200}
              width={200}
              alt="profile pengguna di deskripsi"
              src={profile}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-start border-b pb-5 border-base-100">
        <div className="avatar me-4">
          <div className="mask mask-squircle w-14">
            <Image
              height={200}
              width={200}
              alt="profile pengguna di deskripsi"
              src={profile}
            />
          </div>
        </div>

        <div>
          <div className="flex gap-3 items-baseline">
            <h3 className="font-semibold text-xl">{name}</h3>
            <p className="text-xs">{timestamp}</p>
          </div>
          <p className="w-full">{message}</p>
        </div>
      </div>
    );
  }
};

export default ChatCard;
