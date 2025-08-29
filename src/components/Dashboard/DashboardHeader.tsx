"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/api";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // API call
  const {
    data: userResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getUserProfile,
  });

  const user = userResponse?.data;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Loading...</p>
      </header>
    );
  }

  if (isError || !user) {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-red-500">Failed to load profile</p>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-6 py-6 bg-white border-b">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Profile */}
      <div ref={dropdownRef} className="relative">
        <div
          className="flex items-center  gap-2"
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-col text-end">
            <span className="font-medium">{user.name}</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={ "/images/founderImage.png"}
              alt="Profile"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
