import CommercialServices from "@/components/features/public/commercial/commercial-services";
import CommercialBanner from "@/components/features/public/commercial/cs-banner";
import React from "react";

export default function page() {
  return (
    <main>
      <CommercialBanner />
      <CommercialServices />
    </main>
  );
}
