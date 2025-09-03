"use client";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import RoofingInquiryModal from "../Home/roofing-inquiry-modal";

 
export default function CommercialBanner() {
  const features = [
    "Minimal business disruption during installation and repairs",
    "Comprehensive safety protocols for every project",
    "Advanced drone documentation and inspection",
  ];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleFormSubmit = async () => {
    // console.log("Custom form submission:", data);
    // Add your API call or processing logic here
  };

  return (
    <section className="min-h-[calc(100vh-150px)] flex items-center justify-center bg-[#0F3D68] py-10 lg:py-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white items-center">
          <div className="space-y-4 lg:space-y-8 lg:pr-16">
            <h2 className="lg:text-5xl font-bold text-2xl">
              Your Partner in{" "}
              <span className="text-[#D62D27]">Commercial Roofing</span> Across
              Houston
            </h2>
            <p className="lg:text-xl text-base">
              Expert commercial roofing solutions designed for minimal business
              disruption and maximum protection.
            </p>
            <ul className="space-y-3">
              {features?.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <IoMdCheckmarkCircleOutline className="lg:w-7 w-4 lg:h-7 h-4 text-[#4ADE80]" />
                  <span className="lg:text-lg text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 h-12 bg-white text-[#0F3D68] w-80 hover:bg-[#F3F4F6] cursor-pointer mx-auto lg:mx-0"
            >
              Get a Free Drone Inspection & Estimate <MoveRight />
            </Button>
          </div>
          <Image
            src="/images/cs-banner.jpg"
            alt="Commercial Roofing Banner"
            width={1000}
            height={1000}
            className="w-full aspect-[5/4] rounded-lg object-cover"
          />
        </div>

        {/* Inquiry Modal */}
        <RoofingInquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </section>
  );
}
