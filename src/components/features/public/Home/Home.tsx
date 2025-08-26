"use client";

import ServiceCard from "@/components/shared/ServiceCard/ServiceCard";
import HomeHero from "./home-hero";
import WhyChooseBorrelliRoofing from "./WhyChooseBorrelliRoofing/WhyChooseBorrelliRoofing";
import InquiryForm from "./inquiry-form";

export default function Home() {
  return (
    <div>
      {/* Hero Hero Secetion */}
      <HomeHero />
      <ServiceCard />
      <InquiryForm />
      <WhyChooseBorrelliRoofing />
    </div>
  );
}
