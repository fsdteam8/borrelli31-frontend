import FounderPresident from "@/components/features/public/About/FounderPresident";
import GetInTouch from "@/components/features/public/About/GetInTouch";
import OurValues from "@/components/features/public/About/OurValues";
import ServiceArea from "@/components/features/public/About/ServiceArea";
import React from "react";

export default function page() {
  return (
    <div>
      <FounderPresident />
      <OurValues />
      <ServiceArea />
      <GetInTouch />
    </div>
  );
}
