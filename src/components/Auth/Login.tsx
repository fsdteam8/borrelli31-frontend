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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Data:", values);
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
          {/* Welcome Text */}
          <h1 className="text-[#131313] text-3xl font-bold mb-1 text-left">
            Welcome 👋
          </h1>
          <p className="text-[#424242] mb-8 text-left">
            Please login to continue
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
                        placeholder="Enter your email"
                        className="h-12 w-full border-gray-300 focus:ring-2 focus:ring-[#0F3D68]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="h-12 w-full border-gray-300 focus:ring-2 focus:ring-[#0F3D68]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          className="cursor-pointer"
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="m-0 cursor-pointer text-gray-600">
                        Remember Me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <a
                  href="/forgot-password"
                  className="text-[#0F3D68] cursor-pointer hover:underline font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="bg-[#0F3D68] hover:bg-[#0c2f50] text-white h-12 w-full rounded-sm text-base font-semibold shadow-md cursor-pointer"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
