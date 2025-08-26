"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must only contain numbers"),
});

export default function EnterOTP() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const currentOtp = form.getValues("otp").split("");

    currentOtp[index] = value;
    const newOtp = currentOtp.join("").slice(0, 6);

    form.setValue("otp", newOtp);

    // auto-focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Entered OTP:", values.otp);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <div className="relative w-full max-w-xl">
        {/* Logo outside card */}
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
          {/* Heading */}
          <h1 className="text-[#131313] text-3xl font-bold mb-1 text-left">
            Enter OTP
          </h1>
          <p className="text-[#424242] mb-8 text-left">
            We have shared a code to your registered email address{" "}
            <span className="font-semibold">robertfox@example.com</span>
          </p>

          {/* Form */}
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
                          className="h-16 w-16 text-center text-5xl font-bold border-gray-300 focus:ring-2 focus:ring-[#0F3D68]"
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
                className="bg-[#0F3D68] hover:bg-[#0c2f50] text-white h-12 w-full rounded-md text-base font-semibold shadow-md cursor-pointer"
              >
                Verify
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
