import Image from "next/image";
import React from "react";

export default function WhyChooseBorrelliRoofing() {
  const features = [
    {
      title: "10-Year Labor Warranties",
      description:
        "Our work is backed by industry-leading warranties that protect your investment for a decade.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
        >
          <path
            d="M6.91699 14.3652C6.67372 13.2694 6.71108 12.1299 7.02558 11.0524C7.34009 9.97493 7.92157 8.99428 8.7161 8.2014C9.51064 7.40853 10.4925 6.82911 11.5707 6.51686C12.6488 6.20461 13.7884 6.16964 14.8837 6.4152C15.4865 5.47237 16.317 4.69647 17.2986 4.15901C18.2802 3.62156 19.3812 3.33984 20.5003 3.33984C21.6194 3.33984 22.7205 3.62156 23.7021 4.15901C24.6836 4.69647 25.5141 5.47237 26.117 6.4152C27.2139 6.16857 28.3554 6.20338 29.4353 6.51639C30.5152 6.8294 31.4984 7.41044 32.2934 8.20546C33.0884 9.00048 33.6695 9.98366 33.9825 11.0635C34.2955 12.1434 34.3303 13.2849 34.0837 14.3819C35.0265 14.9847 35.8024 15.8152 36.3398 16.7968C36.8773 17.7784 37.159 18.8794 37.159 19.9985C37.159 21.1176 36.8773 22.2187 36.3398 23.2003C35.8024 24.1819 35.0265 25.0124 34.0837 25.6152C34.3292 26.7105 34.2942 27.85 33.982 28.9282C33.6697 30.0064 33.0903 30.9882 32.2975 31.7828C31.5046 32.5773 30.5239 33.1588 29.4464 33.4733C28.3689 33.7878 27.2294 33.8251 26.1337 33.5819C25.5316 34.5283 24.7005 35.3075 23.7172 35.8474C22.7339 36.3873 21.6304 36.6703 20.5087 36.6703C19.3869 36.6703 18.2834 36.3873 17.3001 35.8474C16.3169 35.3075 15.4857 34.5283 14.8837 33.5819C13.7884 33.8274 12.6488 33.7925 11.5707 33.4802C10.4925 33.168 9.51064 32.5885 8.7161 31.7957C7.92157 31.0028 7.34009 30.0221 7.02558 28.9446C6.71108 27.8671 6.67372 26.7277 6.91699 25.6319C5.96692 25.0306 5.18434 24.1988 4.64207 23.2139C4.09979 22.229 3.81543 21.1229 3.81543 19.9985C3.81543 18.8742 4.09979 17.7681 4.64207 16.7832C5.18434 15.7982 5.96692 14.9665 6.91699 14.3652Z"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.5 20.0013L18.8333 23.3346L25.5 16.668"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Licensed & Insured",
      description:
        "We maintain all required licenses and insurance for your complete protection and peace of mind.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
        >
          <path
            d="M33.8337 21.6661C33.8337 29.9994 28.0003 34.1661 21.067 36.5828C20.7039 36.7058 20.3096 36.6999 19.9503 36.5661C13.0003 34.1661 7.16699 29.9994 7.16699 21.6661V9.99945C7.16699 9.55742 7.34259 9.1335 7.65515 8.82094C7.96771 8.50838 8.39163 8.33278 8.83366 8.33278C12.167 8.33278 16.3337 6.33278 19.2337 3.79945C19.5867 3.49778 20.0359 3.33203 20.5003 3.33203C20.9647 3.33203 21.4139 3.49778 21.767 3.79945C24.6837 6.34945 28.8337 8.33278 32.167 8.33278C32.609 8.33278 33.0329 8.50838 33.3455 8.82094C33.6581 9.1335 33.8337 9.55742 33.8337 9.99945V21.6661Z"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Family-Owned & Houston-Based",
      description:
        "We're proud to be a local, family-operated business serving our Houston community.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
        >
          <path
            d="M25.5 35V21.6667C25.5 21.2246 25.3244 20.8007 25.0118 20.4882C24.6993 20.1756 24.2754 20 23.8333 20H17.1667C16.7246 20 16.3007 20.1756 15.9882 20.4882C15.6756 20.8007 15.5 21.2246 15.5 21.6667V35"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 16.6684C5.49988 16.1835 5.60556 15.7044 5.80965 15.2646C6.01374 14.8248 6.31133 14.4347 6.68167 14.1217L18.3483 4.1234C18.95 3.61492 19.7123 3.33594 20.5 3.33594C21.2877 3.33594 22.05 3.61492 22.6517 4.1234L34.3183 14.1217C34.6887 14.4347 34.9863 14.8248 35.1904 15.2646C35.3944 15.7044 35.5001 16.1835 35.5 16.6684V31.6684C35.5 32.5525 35.1488 33.4003 34.5237 34.0254C33.8986 34.6505 33.0507 35.0017 32.1667 35.0017H8.83333C7.94928 35.0017 7.10143 34.6505 6.47631 34.0254C5.85119 33.4003 5.5 32.5525 5.5 31.6684V16.6684Z"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Fast Drone-Based Assessments",
      description:
        "Our advanced drone technology provides quick, accurate inspections without ladder climbing.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
        >
          <path
            d="M20.4997 36.6654C29.7044 36.6654 37.1663 29.2034 37.1663 19.9987C37.1663 10.794 29.7044 3.33203 20.4997 3.33203C11.2949 3.33203 3.83301 10.794 3.83301 19.9987C3.83301 29.2034 11.2949 36.6654 20.4997 36.6654Z"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.5 10V20L27.1667 23.3333"
            stroke="#2563EB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#F4F4F4] py-12">
      <div className="container mx-auto px-4 md:px-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#0B2F6B]">
            Why Choose Borrelli Roofing
          </h2>
          <p className="text-[#2F2F2F] text-base mt-2">
            With experience in serving Houston homeowners and business, we
            deliver quality, <br /> reliability, and innovation.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <Image
              src="/images/image8.jpg"
              alt="Roofing"
              width={900}
              height={900}
              className="h-full w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:w-1/2">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl h-[165px] shadow-2xl transition"
              >
                <div className="flex gap-3">
                  <div className="">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[#000] text-lg mb-1 ">
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
      </div>
    </section>
  );
}
