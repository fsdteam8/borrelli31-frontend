import RoofingInquiryModal from "@/components/features/public/Home/roofing-inquiry-modal";
import Image from "next/image";
import React, { useState } from "react";

const services = [
  {
    id: "drone-inspection",
    title: "Free Drone Inspections & Estimates",
    description: "Roof assessments without ladder climbing.",
    button: "Get a Free Drone Inspection & Estimate",
    imgSrc: "/images/image1.png",
    alt: "Drone inspection",
    serviceValue: "drone-inspection",
  },
  {
    id: "sale-ready",
    title: "Sale-Ready Roof Certifications",
    description:
      "Professional documentation for real estate transactions and peace of mind.",
    button: "Get a Sale-Ready Roof Certification",
    imgSrc: "/images/image2.png",
    alt: "Roof certification",
    serviceValue: "sale-ready-certification",
  },
  {
    id: "commercial",
    title: "Commercial Roof Installations",
    description:
      "Expert installation for businesses, warehouses, and commercial properties.",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/image3.png",
    alt: "Commercial Roof Installations",
    serviceValue: "commercial-installation",
  },
  {
    id: "residential",
    title: "Residential Roof Installations",
    description:
      "Quality materials and craftsmanship for homes of all sizes and styles.",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/image4.png",
    alt: "Residential Roof Installations",
    serviceValue: "residential-installation",
  },
  {
    id: "repairs",
    title: "Residential Repairs & Gutters",
    description:
      "Prompt repair services and gutter solutions to protect your home.",
    button: "Get a Free Inspection & Estimate",
    imgSrc: "/images/image5.png",
    alt: "Residential Repairs & Gutters",
    serviceValue: "residential-repairs",
  },
  {
    id: "insurance",
    title: "Insurance Photos & Claim Support",
    description:
      "Documentation and assistance with insurance claims after storm damage.",
    button: "Get a Sale-Ready Roof Certification",
    imgSrc: "/images/image6.png",
    alt: "Get Insurance Claim Support",
    serviceValue: "insurance-claim-support",
  },
];



export default function ServiceCard() {
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
    <section className="bg-[#F4F4F4]">
      <div className="text-center mb-10 pt-20 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0B2F6B]">
          Our Roofing Services
        </h2>
        <p className="text-[#2F2F2F] text-base sm:text-lg mt-2">
          Comprehensive roofing solutions for residential and commercial
          properties in Houston <br /> and surrounding areas.
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
