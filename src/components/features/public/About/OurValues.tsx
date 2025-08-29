import React from "react";

const features = [
  {
    title: "Quality",
    description:
      "We use only premium materials and proven techniques to ensure your roof stands the test of time.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M43.6012 19.999C44.5146 24.4816 43.8637 29.1418 41.7569 33.2026C39.6502 37.2633 36.215 40.4791 32.0243 42.3136C27.8335 44.1482 23.1405 44.4906 18.7278 43.2837C14.3152 42.0769 10.4496 39.3938 7.77577 35.6818C5.10194 31.9699 3.78147 27.4535 4.03455 22.8858C4.28763 18.3181 6.09898 13.9752 9.16652 10.5813C12.2341 7.18751 16.3724 4.94786 20.8914 4.23591C25.4103 3.52395 30.0368 4.38272 33.9992 6.669"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 22L24 28L44 8"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Responsiveness",
    description:
      "We understand roofing issues can't wait. Count on us for prompt communication and service",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M27.664 33.136C28.0771 33.3257 28.5424 33.369 28.9834 33.2589C29.4244 33.1487 29.8147 32.8916 30.09 32.53L30.8 31.6C31.1726 31.1032 31.6557 30.7 32.2111 30.4223C32.7666 30.1446 33.379 30 34 30H40C41.0609 30 42.0783 30.4214 42.8284 31.1716C43.5786 31.9217 44 32.9391 44 34V40C44 41.0609 43.5786 42.0783 42.8284 42.8284C42.0783 43.5786 41.0609 44 40 44C30.4522 44 21.2955 40.2072 14.5442 33.4558C7.79285 26.7045 4 17.5478 4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H14C15.0609 4 16.0783 4.42143 16.8284 5.17157C17.5786 5.92172 18 6.93913 18 8V14C18 14.621 17.8554 15.2334 17.5777 15.7889C17.3 16.3443 16.8968 16.8274 16.4 17.2L15.464 17.902C15.0968 18.1824 14.838 18.5812 14.7316 19.0307C14.6251 19.4802 14.6776 19.9528 14.88 20.368C17.6134 25.9197 22.1088 30.4096 27.664 33.136Z"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description:
      "No surprises or hidden costs. We provide clear, detailed estimates and regular project updates.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M30 4H18C16.8954 4 16 4.89543 16 6V10C16 11.1046 16.8954 12 18 12H30C31.1046 12 32 11.1046 32 10V6C32 4.89543 31.1046 4 30 4Z"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 8H36C37.0609 8 38.0783 8.42143 38.8284 9.17157C39.5786 9.92172 40 10.9391 40 12V40C40 41.0609 39.5786 42.0783 38.8284 42.8284C38.0783 43.5786 37.0609 44 36 44H12C10.9391 44 9.92172 43.5786 9.17157 42.8284C8.42143 42.0783 8 41.0609 8 40V12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8H16"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 28L22 32L30 24"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Safety & Cleanliness",
    description:
      "We maintain the highest safety standards and leave your property spotless after every job.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M40 26.0009C40 36.0009 33 41.0009 24.68 43.9009C24.2443 44.0485 23.7711 44.0415 23.34 43.8809C15 41.0009 8 36.0009 8 26.0009V12.0009C8 11.4705 8.21071 10.9618 8.58579 10.5867C8.96086 10.2116 9.46957 10.0009 10 10.0009C14 10.0009 19 7.6009 22.48 4.5609C22.9037 4.1989 23.4427 4 24 4C24.5573 4 25.0963 4.1989 25.52 4.5609C29.02 7.6209 34 10.0009 38 10.0009C38.5304 10.0009 39.0391 10.2116 39.4142 10.5867C39.7893 10.9618 40 11.4705 40 12.0009V26.0009Z"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 24L22 28L30 20"
          stroke="#1E40AF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function OurValues() {
  return (
    <section className="py-14 lg:py-24">
      <div className="mx-auto container">
        <div className="text-center  mb-10">
          <h1 className=" text-4xl font-bold text-[#063668] mb-2">
            Our Values
          </h1>
          <p className="text-[#2F2F2F]/80 text-[18px]">
            What We Stand For and Strive Towards
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4  md:p-0">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl h-[145px] shadow-xl transition"
            >
              <div className="flex gap-3">
                <div className="">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#000] text-base mb-2 ">
                    {feature.title}
                  </h3>
                  <p className="text-[#4B5563] text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
