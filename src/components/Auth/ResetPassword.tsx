"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { resetPassword } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Validation Schema
const formSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  // 🔹 Load email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      try {
        setEmail(JSON.parse(storedEmail));
      } catch {
        setEmail(storedEmail);
      }
    }
  }, []);

  // 🔹 Submit Handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await resetPassword(email, values.newPassword);
      toast.success("🎉 Password Changed Successfully!");
      localStorage.removeItem("email");
      setOpen(true);
    } catch   {
      toast.error("❌ Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <div className="relative w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center -mt-20 mb-6">
          <Image
            src="/Borrelli_Logo.svg"
            alt="Smarter Roofing Services"
            width={120}
            height={120}
            className="w-28 h-28 sm:w-32 sm:h-32"
            priority
          />
        </div>

        {/* Card */}
        <div className="w-full p-8 rounded-2xl shadow-xl bg-white">
          <h1 className="text-3xl font-bold text-left text-gray-800 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600 text-left mb-6">
            Create your new password
          </p>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      {...field}
                      className="h-12 w-full border-gray-300 focus:ring-2 focus:ring-[#0F3D68] pr-10"
                    />
                    <span
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </span>
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      {...field}
                      className="h-12 w-full border-gray-300 focus:ring-2 focus:ring-[#0F3D68] pr-10"
                    />
                    <span
                      className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </span>
                  </FormItem>
                )}
              />

              {/* Continue Button */}
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#0F3D68] hover:bg-[#0c2f50] text-white h-12 w-full rounded-xl text-base font-semibold shadow-md flex items-center justify-center cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Success Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/success_logo.svg"
                  alt="Success"
                  width={100}
                  height={100}
                />
              </div>
              <DialogTitle className="text-4xl text-center">
                Password Changed Successfully
              </DialogTitle>
              <DialogDescription className="text-center">
                Your password has been updated successfully.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="bg-[#0F3D68] hover:bg-[#0c2f50] text-white h-10 w-full rounded-md text-base font-semibold shadow-md cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  router.replace("/login");
                }}
              >
                Back to Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
