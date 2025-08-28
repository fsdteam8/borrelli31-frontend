import React from "react";

export default function Industries() {
  const IndustriesData = [
    {
      id: 1,
      title: "Warehouses",
      desc: "Durable solutions for distribution centers and storage facilities.",
      image: "/images/cs/ind1.jpg",
    },
    {
      id: 2,
      title: "Strip Malls & Retail",
      desc: "Minimize disruption to your tenants and customers.",
      image: "/images/cs/ind2.jpg",
    },
    {
      id: 3,
      title: "Schools",
      desc: "Safe, long-lasting roofing for educational facilities.",
      image: "/images/cs/ind3.jpg",
    },
    {
      id: 4,
      title: "Churches",
      desc: "Specialized solutions for unique architectural requirements.",
      image: "/images/cs/ind4.jpg",
    },
    {
      id: 5,
      title: "Apartment Complexes",
      desc: "Protect residents with reliable, weather-resistant roofing.",
      image: "/images/cs/ind5.jpg",
    },
    {
      id: 6,
      title: "Office Buildings",
      desc: "Energy-efficient options for modern corporate spaces.",
      image: "/images/cs/ind6.jpg",
    },
  ];

  return (
    <section className="py-8 lg:py-20">
      <div className="container">
        {/* Section Title */}
        <div className="text-center max-w-lg mx-auto space-y-3">
          <h2 className="text-[#063668] lg:text-4xl text-2xl font-bold">
            Industries We Serve
          </h2>
          <p className="text-[#2F2F2F]">
            We provide specialized roofing solutions for a wide range of
            commercial properties across Houston.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-3 lg:gap-6 mt-10">
          {IndustriesData.map((industry) => (
            <div
              key={industry.id}
              style={{
                backgroundImage: `url(${industry.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="relative rounded-lg shadow-lg overflow-hidden aspect-[4/3] flex items-end"
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative z-10 text-white p-4 lg:p-6">
                <h3 className="text-lg font-semibold">{industry.title}</h3>
                <p className="text-sm opacity-90">{industry.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
