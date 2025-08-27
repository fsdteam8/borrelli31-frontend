import CommercialServices from "@/components/features/public/commercial/commercial-services";
import CommercialBanner from "@/components/features/public/commercial/cs-banner";
import Industries from "@/components/features/public/commercial/industries";
import NoMaintenanceModel from "@/components/features/public/commercial/no-maintenance";
import InquiryForm from "@/components/features/public/Home/inquiry-form";
import React from "react";

export default function page() {
  return (
    <main>
      <CommercialBanner />
      <CommercialServices />
      <NoMaintenanceModel />
      <Industries />
      <InquiryForm />
    </main>
  );
}
