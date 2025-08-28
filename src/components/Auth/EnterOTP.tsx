"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { verifyOtpCode } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Validation schema
const formSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must only contain numbers"),
});

export default function EnterOTP() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
    const router = useRouter();

  // Load email from localStorage
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle typing
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const currentOtp = form.getValues("otp").split("");

    currentOtp[index] = value;
    const newOtp = currentOtp.join("").slice(0, 6);

    form.setValue("otp", newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // Handle backspace navigation
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  // Submit OTP
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
        await verifyOtpCode(email, values.otp);
      toast.success("🎉 OTP Verified Successfully!");
      setTimeout(() => {
        router.push("/reset-password");
      }, 2000);
    } catch {
      toast.error("❌ Invalid OTP, please try again");
    } finally {
      setLoading(false);
    }
  }

  // Sync values to each input
  const otpValue = form.watch("otp").split("");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <div className="relative w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center -mt-20 mb-6">
          <Image
            src="/Borrelli_Logo.svg"
            alt="Smarter Roofing Services"
            width={200}
            height={200}
            className="w-24 md:w-32 lg:w-40 h-auto"
            priority
          />
        </div>

        {/* Card */}
        <div className="w-full p-8 rounded-2xl shadow-xl bg-white">
          <h1 className="text-[#131313] text-3xl font-bold mb-1 text-left">
            Enter OTP
          </h1>
          <p className="text-[#424242] mb-8 text-left">
            We’ve sent a 6-digit code to your email:{" "}
            <span className="font-semibold">{email || "loading..."}</span>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={() => (
                  <FormItem>
                    <div className="flex justify-between gap-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <Input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={otpValue[index] || ""}
                          className="h-16 w-14 md:w-16 text-center text-2xl font-bold border-gray-300 focus:ring-2 focus:ring-[#0F3D68]"
                          ref={(el) => {
                            inputRefs.current[index] = el;
                          }}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="bg-[#0F3D68] hover:bg-[#0c2f50] text-white h-12 w-full rounded-xl text-base font-semibold shadow-md flex items-center justify-center cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
