"use client";

import RoofingInquiryModal from "@/components/features/public/Home/roofing-inquiry-modal";
import Image from "next/image";
import React, { useState } from "react";

const services = [
  {
    id: "new-roof-installation",
    title: "New Roof Installations",
    features: [
      "Premium Asphalt Shingle Roofs",
      "Durable Metal Roofing Systems",
      "Synthetic & Specialty Materials",
    ],
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs1.png",
    alt: "New Roof Installations",
    serviceValue: "new-roof-installation",
  },
  {
    id: "roof-repairs",
    title: "Roof Repairs",
    features: [
      "Leak Detection & Repair",
      "Flashing & Vent Boot Replacement",
      "Missing/Damaged Shingle Replacement",
    ],
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs2.png",
    alt: "Roof Repairs",
    serviceValue: "roof-repairs",
  },
  {
    id: "storm-damage-assessments",
    title: "Storm Damage Assessments",
    features: [
      "Comprehensive Damage Evaluation",
      "Insurance Claim Assistance",
      "Emergency Tarp Services",
    ],
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs3.png",
    alt: "Storm Damage Assessments",
    serviceValue: "storm-damage-assessments",
  },
  {
    id: "real-estate-certifications",
    title: "Real Estate Certifications",
    features: [
      "Premium Asphalt Shingle Roofs",
      "Sale-Ready Roof Certifications",
      "Buyer's Inspection Reports",
    ],
    button: "Get Insurance Claim Support",
    imgSrc: "/images/cs/cs4.png",
    alt: "Real Estate Certifications",
    serviceValue: "real-estate-certifications",
  },
  {
    id: "gutter-services",
    title: "Gutter Services",
    features: [
      "Seamless Gutter Installation",
      "Gutter Repair & Maintenance",
      "Premium Gutter Guard Systems",
    ],
    button: "Get a Free Drone Inspection",
    imgSrc: "/images/cs/cs5.png",
    alt: "Gutter Services",
    serviceValue: "gutter-services",
  },
];

export default function ResidentialServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>("");

  const handleServiceSelect = (serviceValue: string) => {
    setPreselectedService(serviceValue);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    console.log("Form submission:", data);
    // Add your custom API call or processing logic here
  };

  return (
    <section className="bg-[#F4F4F4] py-8 lg:py-20">
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0B2F6B]">
          Our Residential Roofing Services
        </h2>
        <p className="text-[#2F2F2F] text-base sm:text-lg mt-3 max-w-4xl mx-auto">
          From new installations to repairs and maintenance, we provide
          comprehensive roofing solutions for Houston homeowners.
        </p>
      </div>

      <div className="mx-auto container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl overflow-hidden p-4"
          >
            <div className="relative w-full h-64">
              <Image
                src={service.imgSrc}
                alt={service.alt}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="p-4 space-y-3">
              <h1 className="text-2xl font-semibold text-[#2A2A2A] mb-1">
                {service.title}
              </h1>
              <ul>
                {service?.features?.map((feature) => (
                  <li
                    key={feature}
                    className="text-[#4F4F4F] mb-1 list-disc list-inside"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleServiceSelect(service.serviceValue)}
                className="bg-[#23547B] hover:bg-[#183c5a] duration-300 text-white px-6 py-2 rounded-md mb-2 cursor-pointer"
              >
                {service.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for inquiry form */}
      <RoofingInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        preselectedService={preselectedService}
      />
    </section>
  );
}
