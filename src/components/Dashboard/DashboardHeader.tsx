"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";

export default function DashboardHeader() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dummy user data
  const user = {
    name: "FSD",
    email: "fsd@example.com",
    role: "Admin",
    avatar: "/images/founderImage.png", // replace with your image
  };

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

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Profile */}
      <div ref={dropdownRef} className="relative">
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => setOpen(!open)}
        >
          <span className="font-medium">{user.name}</span>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
            <Image src={user.avatar} alt="Profile" width={40} height={40} />
          </div>
          {/* <span className="font-medium">{user.name}</span> */}
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 border-b">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-xs text-gray-400 uppercase">{user.role}</p>
            </div>
            <button
              onClick={() => alert("Logging out")}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
