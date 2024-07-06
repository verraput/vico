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
  const timeAgo = (date: string | number | Date): string => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    for (const { unit, seconds } of units) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return new Intl.RelativeTimeFormat("id", { numeric: "auto" }).format(
          -interval,
          unit
        );
      }
    }

    return "Baru saja"; // Untuk menangani kasus yang sangat baru
  };
  if ("self" === type) {
    return (
      <div className="flex items-start border-b pb-5 border-base-100">
        <div className="grow">
          <div className="mb-3 text-end">
            <h3 className="font-semibold text-xl">{name}</h3>
            <p className="text-xs">{timeAgo(timestamp)}</p>
          </div>
          <p className="w-full text-end">{message}</p>
        </div>
        <div className="avatar ms-4">
          <div className="mask mask-squircle w-14">
            <img
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
            <img
              height={200}
              width={200}
              alt="profile pengguna di deskripsi"
              src={profile}
            />
          </div>
        </div>

        <div className="grow">
          <div className="mb-3">
            <h3 className="font-semibold text-xl">{name}</h3>
            <p className="text-xs">{timeAgo(timestamp)}</p>
          </div>
          <p className="w-full">{message}</p>
        </div>
      </div>
    );
  }
};

export default ChatCard;
