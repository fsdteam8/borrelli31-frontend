"use client";

import RoofingInquiryModal from "@/components/features/public/Home/roofing-inquiry-modal";
import { getRoofingServices } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import CommercialServicesSkeleton from "./commercial-services-skeleton";

// --- Types ---
interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  btnText: string;
  imageUrl: string;
  alt: string;
  serviceValue: string;
}

 

export default function CommercialServices() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>("");

  const {
    data: commercial,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roofing"],
    queryFn: () => getRoofingServices(),
  });

  // Filter services based on the "Commercial" category
  const filteredServices = commercial?.data
    ?.filter((service: Service) => service.category === "Commercial")
    .reverse();

  const handleServiceSelect = (serviceId: string) => {
    setPreselectedService(serviceId);
    setIsModalOpen(true);
  };

  if(isLoading) return <div><CommercialServicesSkeleton /></div>
  if(isError) return <div>Error ....</div>
 
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

      <div className="mx-auto container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices?.map((service: Service) => (
          <div
            key={service._id}
            className="bg-white rounded-3xl shadow-xl overflow-hidden p-4"
          >
            <div className="relative w-full h-64">
              <Image
                src={service.imageUrl || "/images/placeholder.png"}
                alt={service.name}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="p-4">
              <h1 className="text-2xl font-semibold text-[#2A2A2A] mb-1">
                {service.name}
              </h1>
              <p className="text-[#68706A] mb-4">{service.description}</p>
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
