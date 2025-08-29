"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Save, X } from "lucide-react"; // ✅ Save + Cancel icons
import { changePassword } from "@/lib/api";
import { useRouter } from "next/navigation"; // ✅ Router import

// ✅ Zod Schema aligned with frontend labels
const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[@$!%*?&]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password must be different",
    path: ["newPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = async (data: PasswordFormData) => {
    try {
      const res = await changePassword({
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      console.log("Password changed:", res);
    } catch (error) {
      console.error("Password change failed:", error);
    }
  };

  return (
    <div className="bg-[#EDEEF1] border-y border-[#B6B6B6] flex items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 mx-auto container rounded-lg py-20"
      >
        <h1 className="text-[#131313] text-[18px] font-semibold">Change Password</h1>

        {/* 3 input fields side by side */}
        <div className="flex flex-col md:flex-row gap-6">
          {[
            {
              id: "oldPassword",
              label: "Current Password",
              field: "oldPassword",
              visible: showPasswords.old,
              toggle: () => togglePasswordVisibility("old"),
            },
            {
              id: "newPassword",
              label: "New Password",
              field: "newPassword",
              visible: showPasswords.new,
              toggle: () => togglePasswordVisibility("new"),
              helpText:
                "Minimum 8 characters with uppercase, lowercase, number, and special character",
            },
            {
              id: "confirmPassword",
              label: "Confirm New Password",
              field: "confirmPassword",
              visible: showPasswords.confirm,
              toggle: () => togglePasswordVisibility("confirm"),
            },
          ].map(({ id, label, field, visible, toggle, helpText }) => (
            <div key={id} className="flex-1">
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <div className="relative">
                <Input
                  id={id}
                  type={visible ? "text" : "password"}
                  {...register(field as keyof PasswordFormData)}
                  className="pr-10 h-12 rounded-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {helpText && (
                <p className="text-xs text-gray-500 mt-1">{helpText}</p>
              )}
              {errors[field as keyof PasswordFormData] && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[field as keyof PasswordFormData]?.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Save + Cancel buttons */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => router.push("/dashboard/setting")}
          >
            <X size={16} /> Cancel
          </Button>

          <Button
            type="submit"
            className="cursor-pointer flex items-center gap-2"
          >
            <Save size={16} /> Save
          </Button>
        </div>
      </form>
    </div>
  );
}
