import React from "react";
import { PhoneCall } from "lucide-react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const NoMaintenanceModel = () => {
  return (
    <section className="py-8 lg:py-20 bg-[#0F3D68] text-white">
      <div className="container">
        {/* Responsive grid: 1 col on mobile, 5 cols on large */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-2 col-span-5">
            <Image
              src="/images/cs/nomain.jpg"
              alt="No Maintenance"
              width={500}
              height={500}
              className="w-full aspect-[4/5] object-cover rounded-md"
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-3 col-span-5 space-y-5">
            <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold">
              Our No-Maintenance Model
            </h3>
            <p className="text-sm sm:text-base lg:text-lg">
              &quot;You call, we come!&quot; – It&apos;s that simple. No complicated
              maintenance contracts or schedules to manage.
            </p>

            <ul className="space-y-5">
              {/* On-Demand Service */}
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 lg:w-12 lg:h-12 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 lg:w-6 lg:h-6 text-[#1E40AF]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold">
                    On-Demand Service
                  </h4>
                  <p className="text-xs sm:text-sm lg:text-lg opacity-70">
                    Call us when you need us, and we&apos;ll be there within 24–48
                    hours.
                  </p>
                </div>
              </li>

              {/* No Hidden Fees */}
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 lg:w-12 lg:h-12 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <IoMdCheckmarkCircleOutline className="w-4 h-4 lg:w-6 lg:h-6 text-[#1E40AF]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base lg:text-lg font-bold">
                    No Hidden Fees
                  </h4>
                  <p className="text-xs sm:text-sm lg:text-lg opacity-70">
                    Transparent pricing with no surprise charges or mandatory
                    service plans.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoMaintenanceModel;
