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
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Forgot Password Data:", values);
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
            Forgot Password
          </h1>
          <p className="text-[#424242] text-base mb-8 text-left">
            Enter your registered email address. We’ll send you a code to reset
            your password.
          </p>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="h-12 w-full border-gray-300 focus:ring-2 focus:ring-[#0F3D68]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Button */}
              <Button
                type="submit"
                className="bg-[#0F3D68] hover:bg-[#0c2f50] text-white h-12 w-full rounded-sm text-base font-semibold shadow-md cursor-pointer"
              >
                Send OTP
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
