import Image from "next/image";
import React from "react";

export default function FounderPresident() {
  return (
    <div className="bg-[#0F3D68] py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left Side - Image */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 max-w-md md:max-w-lg mx-auto">
            <Image
              src="/images/founderImage.png"
              alt="Founder & President"
              width={500}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Right Side - Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Meet Constantino Borrelli – Founder & President
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              As a Houston native with deep roots in the community, Constantino
              Borrelli founded Borrelli Roofing with a simple mission: to help
              property owners protect their most valuable asset with quality
              roofing solutions.
              <br />
              <br />
              Constantino takes a hands-on approach to every project, personally
              overseeing operations to ensure the highest standards of quality
              and customer satisfaction. His passion for roofing excellence and
              commitment to the Houston community has made Borrelli Roofing a
              trusted name in the industry.
              <br />
              <br />
              With experience in the roofing industry, Constantino has built a
              team that shares his dedication to exceptional craftsmanship and
              customer service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
