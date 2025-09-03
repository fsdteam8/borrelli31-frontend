"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Drone, FileText, MoveRight } from "lucide-react";
import React, { useState } from "react";
import RoofingInquiryModal from "../Home/roofing-inquiry-modal";
import { useQuery } from "@tanstack/react-query";
import { getRoofingServices } from "@/lib/api";

interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  btnText: string;
  imageUrl: string;
  serviceValue: string;
}

export default function HomeOwners() {
  const {
    data: Residential,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roofing"],
    queryFn: () => getRoofingServices(),
  });

  const filteredServices: Service[] =
    Residential?.data
      ?.filter((service: Service) => service.category === "Offers")
      .reverse() || [];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>("");

  const handleServiceSelect = (serviceValue: string) => {
    setPreselectedService(serviceValue);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading services...</div>;

  // Features for 2 different cards
  const featuresList = [
    [
      "High-resolution imagery of your entire roof system",
      "Detailed documentation of any damage or wear",
      "Professional assessment and recommendations",
    ],
    [
      "Official certification of roof condition and expected lifespan",
      "Documentation for insurance and mortgage approval",
      "Recommendations for repairs to maximize sale value",
    ],
  ];

  const featuresDescription = [
    "Our cutting-edge drone technology provides a detailed assessment of your roof's condition without the need for ladder climbs or walking on your roof. This non-invasive approach gives you:",
    "Perfect for realtors and home sellers, our roof certification service provides the documentation you need to complete your real estate transaction with confidence:",
  ];

  return (
    <section className="bg-[#E7E7E78F] py-8 lg:py-16">
      <div className="container">
        <div className="mt-20">
          <div className="text-center max-w-lg mx-auto space-y-2 lg:mb-12">
            <h3 className="text-2xl lg:text-4xl font-bold text-[#063668]">
              Exclusive Homeowner Offers
            </h3>
            <p>
              Special services designed specifically for Houston homeowners to
              provide peace of mind and exceptional value.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
            {filteredServices.map((service, index) => (
              <Card
                key={service._id}
                className="shadow-[0px_4px_32px_0px_#00000014] p-0 rounded-md flex-1"
              >
                <CardHeader className="bg-[#0F3D68] text-white rounded-t-md py-5 space-y-3 px-4">
                  {index === 0 ? (
                    <Drone className="h-8 w-8" />
                  ) : (
                    <FileText className="h-8 w-8" />
                  )}
                  <CardTitle className="lg:text-3xl text-xl font-bold">
                    {service.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="lg:space-y-10 pb-6 pr-6 px-4">
                  {/* description index অনুযায়ী */}
                  <p className="text-[#424242] text-[18px]">
                    {featuresDescription[index]}
                  </p>

                  {/* আলাদা features দেখাচ্ছি */}
                  <ul className="space-y-5 text-sm mt-2">
                    {featuresList[index]?.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="lg:w-7 w-4 lg:h-7 h-4 bg-[#DBEAFE] rounded-full p-1.5 text-[#1D4ED8]" />
                        <span className="lg:text-lg text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleServiceSelect(service._id)}
                    className="flex items-center space-x-2 h-12 bg-[#0F3D68] text-white w-72 hover:bg-[#0F3D68] cursor-pointer mx-auto lg:mx-0 mt-6"
                  >
                    {service.btnText} <MoveRight />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <RoofingInquiryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            preselectedService={preselectedService}
          />
        </div>
      </div>
    </section>
  );
}
