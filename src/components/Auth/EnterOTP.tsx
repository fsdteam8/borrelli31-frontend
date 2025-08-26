"use client";

import React from "react";
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
  FormLabel,
  FormControl,
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Entered OTP:", values);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <div className="relative w-full max-w-md">
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
              {/* OTP Input */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter 6-digit code"
                        className="h-12 w-full text-center tracking-widest text-lg font-bold border-gray-300 focus:ring-2 focus:ring-[#0F3D68]"
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Verify Button */}
              <Button
                type="submit"
                className="bg-[#0F3D68] hover:bg-[#0c2f50] text-white h-12 w-full rounded-xl text-base font-semibold shadow-md cursor-pointer"
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
