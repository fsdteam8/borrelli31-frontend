"use client";

import RoofingInquiryModal from "@/components/features/public/Home/roofing-inquiry-modal";
import { getRoofingServices } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import ResidentialServicesSkeleton from "./residential-services-skeleton";
import image23 from "../../../../../public/images/image23.jpg";
import image24 from "../../../../../public/images/image24.jpg";
import image25 from "../../../../../public/images/image25.png";
import image26 from "../../../../../public/images/image26.jpg";
import image27 from "../../../../../public/images/image27.jpg";


// --- Types ---
interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  btnText: string;
  imageUrl: string;
  serviceValue: string;
}

const commercialRoofing = [
  image23,
  image24,
  image25,
  image26,
  image26,
  image27,
];


export default function ResidentialServices() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>("");

  const {
    data: Residential,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roofing"],
    queryFn: () => getRoofingServices(),
  });

  // Filter services based on the "Residential" category and reverse the order
  const filteredServices = Residential?.data
    ?.filter((service: Service) => service.category === "Residential")
    .reverse();

  const handleServiceSelect = (serviceValue: string) => {
    setPreselectedService(serviceValue);
    setIsModalOpen(true);
  };

  if (isLoading) return <div><ResidentialServicesSkeleton /></div>;
  if (isError) return <div>Error ....</div>;

  // প্রথম ৩টা service
  const firstRow = filteredServices?.slice(0, 3) || [];
  // শেষের ২টা service
  const secondRow = filteredServices?.slice(3, 5) || [];

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

      {/* First Row - 3 columns */}
      <div className="mx-auto container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {firstRow.map((service: Service, i: number) => (
          <div
            key={service._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden p-4"
          >
            <div className="relative w-full h-64">
              <Image
                src={commercialRoofing[i] || "/images/placeholder.png"}
                alt={service.name}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="p-4 space-y-3">
              <h1 className="text-2xl font-semibold text-[#2A2A2A] mb-1">
                {service.name}
              </h1>
              <div
                className="text-[#4F4F4F] mb-4"
                dangerouslySetInnerHTML={{
                  __html: service.description,
                }}
              />
              <button
                onClick={() => handleServiceSelect(service._id)}
                className="bg-[#23547B] hover:bg-[#183c5a] duration-300 text-white px-6 py-2 rounded-md mb-2 cursor-pointer"
              >
                {service.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row - 2 items centered */}
      <div className="mx-auto container flex flex-wrap justify-center gap-4">
        {secondRow.map((service: Service) => (
          <div
            key={service._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 w-full sm:w-[48%] lg:w-[30%]"
          >
            <div className="relative w-full h-64">
              <Image
                src={service.imageUrl || "/images/placeholder.png"}
                alt={service.name}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="p-4 space-y-3">
              <h1 className="text-2xl font-semibold text-[#2A2A2A] mb-1">
                {service.name}
              </h1>
              <div
                className="text-[#4F4F4F] mb-4"
                dangerouslySetInnerHTML={{
                  __html: service.description,
                }}
              />
              <button
                onClick={() => handleServiceSelect(service._id)}
                className="bg-[#23547B] hover:bg-[#183c5a] duration-300 text-white px-6 py-2 rounded-md mb-2 cursor-pointer"
              >
                {service.btnText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for inquiry form */}
      <RoofingInquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedService={preselectedService}
      />
    </section>
  );
}
