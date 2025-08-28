"use client"

import RoofingInquiryModal from "@/components/features/public/Home/roofing-inquiry-modal";
import Image from "next/image";
import React, { useState } from "react";

const services = [
  {
    id: "new-roof-installation",
    title: "New Roof Installation",
    description: "TPO, PVC, EPDM, and other commercial-grade materials installed by certified professionals.",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs1.png",
    alt: "New Roof Installation",
    serviceValue: "new-roof-installation",
  },
  {
    id: "roof-replacement",
    title: "Roof Replacement",
    description:
      "Full tear-off or TPO overlay options to suit your building's needs and budget.",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs2.png",
    alt: "Roof Replacement",
    serviceValue: "roof-replacement",
  },
  {
    id: "roof-coating",
    title: "Roof Coating & Restoration",
    description:
      "Silicone or acrylic coating solutions to extend roof life and improve energy efficiency.",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs3.png",
    alt: "Roof Coating & Restoration",
    serviceValue: "roof-coating",
  },
  {
    id: "insurance-claim-support",
    title: "Insurance Claim Support",
    description:
      "Comprehensive documentation and insurance liaison services for damage claims.",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs4.png",
    alt: "Insurance Claim Support",
    serviceValue: "insurance-claim-support",
  },
  {
    id: "drone-inspections",
    title: "Drone Inspections & Imaging",
    description:
      "High-resolution imaging for rapid, safe issue detection",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/cs/cs5.png",
    alt: "Drone Inspections & Imaging",
    serviceValue: "drone-inspections",
  },
  {
    id: "storm-damage-assessments",
    title: "Storm Damage Assessments",
    description:
      "Rapid response evaluations after severe weather events to prevent further damage.",
    button: "Get a Sale-Ready Roof Certification",
    imgSrc: "/images/cs/cs6.png",
    alt: "Storm Damage Assessments",
    serviceValue: "storm-damage-assessments",
  },
];

export default function CommercialServices() {
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
          Our Commercial Roofing Services
        </h2>
        <p className="text-[#2F2F2F] text-base sm:text-lg mt-3 max-w-4xl mx-auto">
          Comprehensive solutions for every commercial roofing need, with
          transparent pricing to help you make informed decisions.
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
            <div className="p-4">
              <h1 className="text-2xl font-semibold text-[#2A2A2A] mb-1">
                {service.title}
              </h1>
              <p className="text-[#68706A] mb-4">{service.description}</p>
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
