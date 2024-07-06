"use client";
import { Alert } from "@/components/Alert";
import React from "react";

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed top-20 start-10 z-[2000]">
        <Alert />
      </div>
      {children}
    </div>
  );
}
