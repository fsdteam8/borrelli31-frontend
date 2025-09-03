"use client";
import RoofingInquiryModal from "@/components/features/public/Home/roofing-inquiry-modal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

 
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleFormSubmit = async ( ) => {
    // console.log("Custom form submission:", data);
    // Add your API call or processing logic here
  };
  return (
    <footer className="bg-[#131313] text-white p-6">
      <div className="container mx-auto px-4">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Section */}
          <div className="md:col-span-6 space-y-3">
            <Image
              src={"/Borrelli_Logo.svg"}
              alt="Borrelli Roofing Logo"
              height={40}
              width={100}
            />
            <h1 className="text-base text-[#FFF]">Borrelli Roofing</h1>
            <p className="text-base leading-relaxed text-[#FFF]/75">
              Houston&apos;s trusted roofing partner for residential and
              <br />
              commercial projects.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0F3D68] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0d3356] transition cursor-pointer"
            >
              Schedule My Inspection
            </button>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-3 space-y-3">
            <h1 className="text-lg font-semibold text-white">Contact Us</h1>
            <p className="flex items-center gap-2 text-[#FFF]/75 text-base cursor-pointer hover:underline">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  className="w-5 h-5"
                >
                  <path
                    d="M9.72101 11.044C9.85869 11.1073 10.0138 11.1217 10.1608 11.085C10.3078 11.0483 10.4379 10.9626 10.5297 10.842L10.7663 10.532C10.8905 10.3664 11.0516 10.232 11.2367 10.1395C11.4219 10.0469 11.626 9.9987 11.833 9.9987H13.833C14.1866 9.9987 14.5258 10.1392 14.7758 10.3892C15.0259 10.6393 15.1663 10.9784 15.1663 11.332V13.332C15.1663 13.6857 15.0259 14.0248 14.7758 14.2748C14.5258 14.5249 14.1866 14.6654 13.833 14.6654C10.6504 14.6654 7.59816 13.4011 5.34773 11.1506C3.09729 8.90021 1.83301 5.84796 1.83301 2.66536C1.83301 2.31174 1.97348 1.9726 2.22353 1.72256C2.47358 1.47251 2.81272 1.33203 3.16634 1.33203H5.16634C5.51996 1.33203 5.8591 1.47251 6.10915 1.72256C6.3592 1.9726 6.49967 2.31174 6.49967 2.66536V4.66536C6.49967 4.87236 6.45148 5.07651 6.35891 5.26165C6.26634 5.44679 6.13194 5.60784 5.96634 5.73203L5.65434 5.96603C5.53195 6.05948 5.44569 6.19242 5.4102 6.34227C5.37472 6.49211 5.3922 6.64962 5.45967 6.78803C6.3708 8.63861 7.86929 10.1352 9.72101 11.044Z"
                    stroke="#0F3D68"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{" "}
              <a href="tel:+18328885521">(832) 888-5521</a>
            </p>
            <p className="flex items-center gap-2 text-[#FFF]/75 text-sm cursor-pointer hover:underline">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  className="w-5 h-5"
                >
                  <path
                    d="M15.1663 4.66797L9.17234 8.48597C8.96894 8.60411 8.7379 8.66634 8.50267 8.66634C8.26745 8.66634 8.03641 8.60411 7.83301 8.48597L1.83301 4.66797"
                    stroke="#0F3D68"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.833 2.66797H3.16634C2.42996 2.66797 1.83301 3.26492 1.83301 4.0013V12.0013C1.83301 12.7377 2.42996 13.3346 3.16634 13.3346H13.833C14.5694 13.3346 15.1663 12.7377 15.1663 12.0013V4.0013C15.1663 3.26492 14.5694 2.66797 13.833 2.66797Z"
                    stroke="#0F3D68"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{" "}
              <a href="mailto:cb@borrelliroofing.com">cb@borrelliroofing.com</a>
            </p>
            <p className="flex items-center gap-2 text-[#FFF]/75 text-sm cursor-pointer hover:underline">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  className="w-5 h-5"
                >
                  <g clipPath="url(#clip0_27015_658)">
                    <path
                      d="M14.1568 2.34316C12.6458 0.832125 10.6369 0 8.5 0C6.36312 0 4.35413 0.832125 2.84316 2.34313C1.33213 3.85413 0.5 5.86312 0.5 8C0.5 10.1369 1.33213 12.1458 2.84316 13.6568C4.35413 15.1678 6.36312 16 8.5 16C10.6369 16 12.6458 15.1678 14.1569 13.6568C15.6678 12.1458 16.5 10.1368 16.5 7.99997C16.5 5.86309 15.6678 3.85413 14.1568 2.34316ZM3.50675 3.00675C4.21022 2.30328 5.03606 1.76672 5.93619 1.4165C5.69644 1.71581 5.47209 2.05984 5.2665 2.44678C5.02772 2.89616 4.82169 3.38969 4.65009 3.91684C4.05566 3.81819 3.50488 3.69688 3.01281 3.5545C3.16799 3.3636 3.33286 3.18078 3.50675 3.00675ZM2.44466 4.36203C3.02019 4.54631 3.67838 4.70172 4.39656 4.82481C4.19656 5.67375 4.07884 6.58728 4.05075 7.53078H1.45425C1.528 6.3985 1.86806 5.31788 2.44466 4.36203ZM2.39356 11.5512C1.84809 10.6168 1.52578 9.56741 1.45422 8.46922H4.05253C4.08322 9.38575 4.19859 10.2733 4.39184 11.1C3.65891 11.2188 2.98419 11.3703 2.39356 11.5512ZM3.50675 12.9932C3.30897 12.7954 3.12291 12.5861 2.94953 12.3665C3.45963 12.2251 4.02988 12.1053 4.64372 12.0092C4.81653 12.5437 5.02478 13.0438 5.26647 13.4987C5.49053 13.9203 5.73688 14.2908 6.00116 14.6082C5.07584 14.2587 4.22713 13.7136 3.50675 12.9932ZM8.03075 14.9411C7.318 14.7414 6.64375 14.0906 6.09525 13.0583C5.90341 12.6973 5.73491 12.3035 5.59056 11.8837C6.36337 11.7987 7.18572 11.7484 8.03075 11.7366V14.9411ZM8.03075 10.798C7.09362 10.8108 6.18022 10.8697 5.32481 10.9701C5.13613 10.1901 5.02259 9.34581 4.99144 8.46925H8.03078V10.798H8.03075ZM8.03075 7.53075H4.98966C5.01813 6.62969 5.13347 5.76184 5.32803 4.96197C6.17797 5.06822 7.08947 5.13284 8.03075 5.15134V7.53075ZM8.03075 4.21275C7.18244 4.19566 6.36191 4.14034 5.59456 4.05009C5.73803 3.63472 5.90522 3.24484 6.09525 2.88713C6.64372 1.85487 7.318 1.204 8.03075 1.00434V4.21275ZM14.5849 4.41187C15.1435 5.35541 15.4733 6.41809 15.5458 7.53075H12.9493C12.9215 6.59812 12.8061 5.69484 12.6103 4.85428C13.3332 4.73753 13.9995 4.589 14.5849 4.41187ZM13.4932 3.00675C13.6801 3.19386 13.8566 3.39114 14.0218 3.59769C13.5195 3.73484 12.9602 3.85125 12.3592 3.94494C12.1858 3.40719 11.9766 2.90416 11.7335 2.44678C11.5279 2.05984 11.3036 1.71581 11.0638 1.4165C11.9639 1.76672 12.7898 2.30328 13.4932 3.00675ZM8.96925 8.46925H12.0086C11.9772 9.35262 11.8622 10.2033 11.6708 10.9884C10.821 10.8827 9.90987 10.8187 8.96925 10.8007V8.46925ZM8.96925 7.53075V5.15447C9.90691 5.14216 10.821 5.08381 11.6772 4.98372C11.8687 5.77756 11.9821 6.63784 12.0103 7.53075H8.96925ZM8.96919 1.00434H8.96922C9.68197 1.204 10.3562 1.85487 10.9047 2.88713C11.0978 3.25047 11.2673 3.64706 11.4122 4.06987C10.6384 4.15462 9.81509 4.20453 8.96919 4.21594V1.00434ZM8.96925 14.9411V11.7393C9.81675 11.7559 10.6367 11.8107 11.4037 11.9004C11.2606 12.3139 11.094 12.7021 10.9047 13.0583C10.3562 14.0906 9.682 14.7414 8.96925 14.9411ZM13.4932 12.9932C12.7729 13.7136 11.9242 14.2587 10.9988 14.6082C11.2631 14.2908 11.5094 13.9203 11.7335 13.4987C11.9716 13.0505 12.1772 12.5584 12.3485 12.0329C12.9568 12.1333 13.5195 12.2574 14.0208 12.4035C13.8559 12.6096 13.6798 12.8065 13.4932 12.9932ZM14.5814 11.594C13.9991 11.4068 13.3314 11.2493 12.6025 11.125C12.7992 10.2912 12.9165 9.39497 12.9475 8.46925H15.5458C15.4731 9.58419 15.1422 10.649 14.5814 11.594Z"
                      fill="#0F3D68"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_27015_658">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <a
                href="https://www.borrelliroofing.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.borrelliroofing.com
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h1 className="text-lg font-semibold text-white">Quick Links</h1>
            {/* <p className="text-[#FFF]/80 text-sm cursor-pointer hover:underline">
              Commercial Roofing Services
            </p> */}
            <Link href={"/"}>
              <p className="text-[#FFF]/80 text-sm cursor-pointer hover:underline">
                Home
              </p>
            </Link>
            <Link href={"/commercial-services"}>
              <p className="text-[#FFF]/80 text-sm cursor-pointer hover:underline">
                Commercial Roofing Services
              </p>
            </Link>
            <Link href={"/residential-services"}>
              <p className="text-[#FFF]/80 text-sm cursor-pointer hover:underline">
                Residential Roofing Services
              </p>
            </Link>
            <Link href={"/about-borrelli-roofing"}>
              <p className="text-[#FFF]/80 text-sm cursor-pointer hover:underline">
                About Borrelli Roofing
              </p>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#D9D9D94D] mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-base text-[#FFF]">
            © {new Date().getFullYear()} Borrelli Roofing. All rights reserved.
          </span>
          <div className="flex items-center space-x-4 text-base text-[#FFF] mt-4 md:mt-0">
            <span className="cursor-pointer hover:underline">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:underline">
              Terms of Service
            </span>
          </div>
        </div>

        {/* Inquiry Modal */}
        <RoofingInquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </footer>
  );
};

export default Footer;
