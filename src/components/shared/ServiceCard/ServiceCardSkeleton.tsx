import React from "react";

export default function ServiceCardSkeleton() {
  return (
    <section className="bg-[#F4F4F4] py-8 lg:py-20">
      <div className="text-center mb-10 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#0B2F6B] bg-gray-300 h-10 w-3/4 mx-auto mb-4"></h2>
        <p className="text-[#2F2F2F] text-base sm:text-lg mt-3 max-w-4xl mx-auto bg-gray-300 h-6 w-5/6"></p>
      </div>

      <div className="mx-auto container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Skeleton items */}
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 animate-pulse"
            >
              <div className="relative w-full h-64 bg-gray-300 rounded-2xl"></div>
              <div className="p-4 space-y-3">
                <h1 className="text-2xl font-semibold text-[#2A2A2A] mb-1 bg-gray-300 h-6 w-3/4"></h1>
                <div className="text-[#4F4F4F] mb-4 bg-gray-300 h-4 w-full"></div>
                <div className="bg-gray-300 h-8 w-1/2 rounded-md"></div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
