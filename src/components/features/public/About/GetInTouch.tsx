"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { createMessages, MessagePayload } from "@/lib/api";
import { toast } from "sonner";

// ✅ Validation schema
const FormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// ✅ Infer Type from Zod schema
type FormValues = z.infer<typeof FormSchema>;

export default function GetInTouch() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Call the API
      const response = await createMessages(values as MessagePayload);
      console.log("Message created:", response);

      // Optional: reset form after submission
      form.reset();

      // Optional: show success message
      // alert("Message sent successfully!");
      toast.success("Message sent successfully!");
    } catch {
      toast.error("Failed to send message");
      // alert("Failed to send message");
    }
  };
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold text-[#0F3D68] mb-4">
            Get In Touch With Us
          </h1>
          <p className="text-[#424242]/80 text-[18px] mb-6">
            Have questions, feedback, or ideas to share? Our team is ready to
            assist you. Whether you need support, want to collaborate, or simply
            wish to say hello, we’d love to hear from you. Reach out today and
            let’s start the conversation.
          </p>

          {/* Email */}
          <div className="flex gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 7L13.009 12.727C12.7039 12.9042 12.3573 12.9976 12.0045 12.9976C11.6517 12.9976 11.3051 12.9042 11 12.727L2 7"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h2 className="font-semibold text-[#000]">Email</h2>
              <p className="text-[#4B5563] text-base">cb@borrelliroofing.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C15.2261 22 10.6477 20.1036 7.27208 16.7279C3.89642 13.3523 2 8.7739 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C8.80668 12.9599 11.0544 15.2048 13.832 16.568Z"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h2 className="font-semibold text-[#000]">Phone</h2>
              <p className="text-[#4B5563] text-base">(832) 888-5521</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex gap-3 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V12L16 14"
                stroke="#1E40AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <h2 className="font-semibold text-[#000]">Office Hours</h2>
              <p className="text-[#4B5563] text-base">
                Monday – Friday: 8:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-base text-[#1E40AF] mb-2">
              Why Choose Borrelli Roofing?
            </h2>
            <p className="text-[#000] text-sm">
              When you work with us, you&apos;re working directly with the
              owner. Constantino personally oversees every project to ensure the
              highest quality standards are met. <br /> <br />
              We&apos;re committed to providing exceptional service, transparent
              communication, and lasting results for every client.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 bg-[#F9FAFB] shadow-md rounded-lg p-6"
            >
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email + Phone in 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="h-12 w-full"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="h-12 w-full"
                          placeholder="(555) 123-4567"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Write Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write here..."
                        rows={10}
                        className="h-48"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-[#0F3D68] text-white cursor-pointer">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
