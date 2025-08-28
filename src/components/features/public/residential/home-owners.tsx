import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Drone, FileText, MoveRight } from "lucide-react";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function HomeOwners() {
  return (
    <section className="bg-[#E7E7E78F] py-8 lg:py-20">
      <div className="container">
        <div className="mt-20">
          <div className="text-center max-w-lg mx-auto space-y-2 lg:mb-12">
            <h3 className="text-2xl lg:text-4xl font-bold text-[#063668]">
              Exclusive Homeowner Offers
            </h3>
            <p>
              Special services designed specifically for Houston homeowners to
              provide peace of mind and exceptional value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-[0px_4px_32px_0px_#00000014] p-0 rounded-md">
              <CardHeader className="bg-[#0F3D68] text-white rounded-t-md py-5 space-y-3">
                <Drone className="h-8 w-8" />
                <CardTitle className="lg:text-5xl text-xl font-bold">
                  Free Drone Inspections
                </CardTitle>
              </CardHeader>
              <CardContent className="lg:space-y-10 pb-6 pr-16">
                <p className="lg:text-lg text-sm">
                  Our cutting-edge drone technology provides a detailed
                  assessment of your roof's condition without the need for
                  ladder climbs or walking on your roof. This non-invasive
                  approach gives you:
                </p>
                <ul className="space-y-5 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="lg:w-7 w-4 lg:h-7 h-4 bg-[#DBEAFE] rounded-full p-1.5 text-[#1D4ED8]" />
                    <span className="lg:text-lg text-sm">
                      High-resolution imagery of your entire roof system
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="lg:w-7 w-4 lg:h-7 h-4 bg-[#DBEAFE] rounded-full p-1.5 text-[#1D4ED8]" />
                    <span className="lg:text-lg text-sm">
                      Detailed documentation of any damage or wear
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="lg:w-7 w-4 lg:h-7 h-4 bg-[#DBEAFE] rounded-full p-1.5 text-[#1D4ED8]" />
                    <span className="lg:text-lg text-sm">
                      Professional assessment and recommendations
                    </span>
                  </li>
                </ul>
                <Button className="flex items-center space-x-2 h-12 bg-[#0F3D68] text-white w-80 hover:bg-[#0F3D68] cursor-pointer mx-auto lg:mx-0">
                  Get a Free Drone Inspection & Estimate <MoveRight />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-[0px_4px_32px_0px_#00000014] p-0 rounded-md">
              <CardHeader className="bg-[#0F3D68] text-white rounded-t-md py-5 space-y-3">
                <FileText className="h-8 w-8" />
                <CardTitle className="lg:text-5xl text-xl font-bold">
                  Sale-Ready Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="lg:space-y-10 pb-6 pr-16">
                <p className="lg:text-lg text-sm">
                  Perfect for realtors and home sellers, our roof certification
                  service provides the documentation you need to complete your
                  real estate transaction with confidence:
                </p>
                <ul className="space-y-5 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="lg:w-7 w-4 lg:h-7 h-4 bg-[#DBEAFE] rounded-full p-1.5 text-[#1D4ED8]" />
                    <span className="lg:text-lg text-sm">
                      Official certification of roof condition and expected
                      lifespan
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="lg:w-7 w-4 lg:h-7 h-4 bg-[#DBEAFE] rounded-full p-1.5 text-[#1D4ED8]" />
                    <span className="lg:text-lg text-sm">
                      Documentation for insurance and mortgage approval
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="lg:w-7 w-4 lg:h-7 h-4 bg-[#DBEAFE] rounded-full p-1.5 text-[#1D4ED8]" />
                    <span className="lg:text-lg text-sm">
                      Recommendations for repairs to maximize sale value
                    </span>
                  </li>
                </ul>
                <Button className="flex items-center space-x-2 h-12 bg-[#0F3D68] text-white w-80 hover:bg-[#0F3D68] cursor-pointer mx-auto lg:mx-0">
                  Request Certification <MoveRight />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
