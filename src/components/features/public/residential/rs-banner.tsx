import { Button } from "@/components/ui/button";
import {   Clock, MoveRight, Shield, StickyNote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RsBanner() {
  return (
    <section className="min-h-[calc(100vh-150px)] py-8 lg:py-20 flex items-center justify-center bg-[#0F3D68]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white items-center">
          <div className="space-y-4 lg:space-y-8 lg:pr-16">
            <h2 className="lg:text-5xl font-bold text-2xl">
              <span className="text-[#D62D27]">Protecting</span> Houston Homes
              with Quality <span className="text-[#D62D27]">Roofing</span>
            </h2>
            <p className="lg:text-xl text-base">
              Houston&apos;s trusted roofing experts providing peace of mind through
              quality craftsmanship, transparent communication, and exceptional
              service.
            </p>
            <Link href="/">
              <Button className="flex items-center space-x-2 h-12 bg-white text-[#0F3D68] w-80 hover:bg-[#F3F4F6] cursor-pointer mx-auto lg:mx-0">
                Get a Free Drone Inspection & Estimate <MoveRight />
              </Button>
            </Link>
          </div>
          <Image
            src="/images/cs-banner.jpg"
            alt="Commercial Roofing Banner"
            width={1000}
            height={1000}
            className="w-full aspect-[5/4] rounded-lg object-cover"
          />
        </div>
        <div className="grid lg:grid-cols-3 gap-6 lg:pt-12 pt-6">
          <div className="flex space-x-2 lg:p-8 p-4 bg-[#FFFFFF33] rounded-md">
            <Shield className="shrink-0 h-10 w-10 text-[#2563EB]" />
            <div className="text-white space-y-3">
              <h3 className="text-lg lg:text-xl font-bold">
                Industry Leading Warranties
              </h3>
              <p className="text-base text-[#E7E7E7]">
                Backed by manufacturer guarantees and our own workmanship
                warranty for your peace of mind
              </p>
            </div>
          </div>
          <div className="flex space-x-2 lg:p-8 p-4 bg-[#FFFFFF33] rounded-md">
            <Clock className="shrink-0 h-10 w-10 text-[#2563EB]" />
            <div className="text-white space-y-3">
              <h3 className="text-lg lg:text-xl font-bold">
                Detailed Drone Reports
              </h3>
              <p className="text-base text-[#E7E7E7]">
                Advanced drone technology provides comprehensive visual
                documentation of your roof&apos;s condition.
              </p>
            </div>
          </div>
          <div className="flex space-x-2 lg:p-8 p-4 bg-[#FFFFFF33] rounded-md">
            <StickyNote className="shrink-0 h-10 w-10 text-[#2563EB]" />
            <div className="text-white space-y-3">
              <h3 className="text-lg lg:text-xl font-bold">
                Insurance Support
              </h3>
              <p className="text-base text-[#E7E7E7]">
                Expert assistance navigating insurance claims to maximize your
                coverage for storm damage repairs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
