"use client";

import ServiceCard from "@/components/shared/ServiceCard/ServiceCard";
import HomeHero from "./home-hero";

export default function Home() {
  return (
    <div>
      {/* Hero Hero Secetion */}
      <HomeHero />
      <ServiceCard />
    </div>
  );
}
