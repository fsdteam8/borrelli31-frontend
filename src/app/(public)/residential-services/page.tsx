import HomeOwners from "@/components/features/public/residential/home-owners";
import ResidentialServices from "@/components/features/public/residential/residential-services";
import { ReviewForm } from "@/components/features/public/residential/review-form";
import RsBanner from "@/components/features/public/residential/rs-banner";
import React from "react";

export default function page() {
  return (
    <main>
      <RsBanner />
      <ResidentialServices />
      <HomeOwners />
      <ReviewForm />
    </main>
  );
}
