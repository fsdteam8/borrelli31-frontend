"use client";

import React, { useState } from "react";
import {
  Settings,
  LogOut,
  LayoutDashboard,
  MessageCircle,
  Star,
  SearchCode,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const menu = [
  { id: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "/dashboard/assessment", label: "Assessment", icon: SearchCode },
  { id: "/dashboard/reviews", label: "Reviews", icon: Star },
  { id: "/dashboard/message", label: "Message", icon: MessageCircle },
  { id: "/dashboard/setting", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const [collapsed] = useState(false);
  const [active, setActive] = useState("/dashboard");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setActive(path);
    router.push(path);
  };

  const handleLogout = async () => {
    setOpenLogoutDialog(false);

    await signOut({ redirect: false });
    toast.success("You have successfully logged out.");

    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <>
      <aside
        className={`flex flex-col fixed bg-white border-r transition-all duration-200 ease-in-out
          ${collapsed ? "w-16" : "w-60"} shrink-0 h-screen`}
      >
        {/* Logo */}
        <div
          className="flex justify-center items-center px-4 py-6 border-b cursor-pointer"
          onClick={() => handleNavigation("/dashboard")}
        >
          <div className="relative w-12 h-12">
            <Image
              src="/Borrelli_Logo.svg"
              alt="Borrelli Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-5 py-3 ">
          <ul className="space-y-1">
            {menu.map((m) => {
              const isActive = active === m.id;
              const Icon = m.icon;
              return (
                <li key={m.id}>
                  <button
                    onClick={() => handleNavigation(m.id)}
                    className={`group relative flex items-center gap-3 w-full text-left px-3 py-2 rounded-md mx-2 transition-colors duration-150 cursor-pointer
                      ${
                        isActive
                          ? "bg-[#0F3D68] text-[18px] text-white"
                          : "text-[#131313] text-[18px] font-bold hover:bg-gray-100"
                      }`}
                  >
                    <span
                      className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-md
                        ${
                          isActive
                            ? "bg-indigo-100 text-indigo-600"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    {!collapsed && (
                      <span className="flex-1 truncate">{m.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4  ">
          <button
            onClick={() => setOpenLogoutDialog(true)}
            className="group relative flex items-center gap-3 w-full text-left px-3 py-2 rounded-md bg-red-100 text-red-700 cursor-pointer hover:bg-red-200 transition-colors"
          >
            <span className="flex items-center justify-center shrink-0 w-7 h-7 rounded-md text-red-700 group-hover:text-red-800">
              <LogOut className="w-4 h-4" />
            </span>
            {!collapsed && (
              <span className="flex-1 truncate font-medium">Logout</span>
            )}
            {collapsed && (
              <span className="absolute  left-full ml-2 px-2 py-1 text-xs rounded-md cursor-pointer bg-gray-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onOpenChange={setOpenLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will be redirected to the
              homepage.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenLogoutDialog(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="cursor-pointer">
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
