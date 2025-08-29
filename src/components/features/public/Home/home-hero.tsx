"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import RoofingInquiryModal from "./roofing-inquiry-modal";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

// --- Types ---
interface FormData {
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
  selectedService?: string;
}

export default function HomeHero() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFormSubmit = async (data: FormData) => {
    console.log("Custom form submission:", data);
    // Add your API call or processing logic here
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/images/HeroImage1.jpg)",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-[957px]">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center">
                <Image
                  src={"/images/sparkle-icon.svg"}
                  alt="Company Logo"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-primary font-medium text-lg manrope">
                Smarter Roofing Services
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Houston&apos;s Trusted{" "}
              <span className="text-primary">Roofing</span> Partner for
              Residential & Commercial Projects
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
              Free Drone Inspections | Sale-Ready Roof Certifications | Storm
              Damage Claim Assistance & Documentation
            </p>

            {/* CTA Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary cursor-pointer hover:bg-primary-dark 
             h-[48px] sm:h-[56px] 
             text-white !px-4 sm:!px-8 py-2 sm:py-4 
             text-base sm:text-lg font-semibold 
             rounded-lg transition-colors duration-200 
             flex items-center gap-2"
            >
              Get a Free Drone Inspection & Estimate
              <FaArrowRightLong className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <RoofingInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </>
  );
}
