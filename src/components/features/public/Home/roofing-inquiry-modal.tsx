"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { createAssessment, getRoofingServices } from "@/lib/api";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  service: string;
}

interface RoofingInquiryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: FormData) => Promise<void> | void;
  preselectedService?: string;
}

export default function RoofingInquiryModal({
  isOpen = true,
  onClose = () => {},
  preselectedService,
}: RoofingInquiryModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    service: "",
  });

  const {
    data,
    // isLoading,
    // isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => getRoofingServices(),
    select: (data) => data?.data,
  });

  console.log("this is card data", data);

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService && isOpen) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.address || formData.address.length < 5) {
      newErrors.address = "Please enter a valid property address";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const assessmentData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      propertyAddress: formData.address,
      service: formData.service,
    };
    console.log(assessmentData)

    try {
      const response = await createAssessment(assessmentData);
      console.log("Assessment created successfully:", response);
      toast.success("Your request has been submitted successfully!");

      onClose();
    } catch (error) {
      console.error("Error creating assessment:", error);
      toast.error("There was an error submitting your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-full h-screen p-0 m-0 rounded-none max-w-none overflow-auto">
        <div className="relative min-h-screen flex">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/image7.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white/50 hover:bg-white/30 rounded-full p-2 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-[90vh] container mx-auto lg:min-h-0 lg:h-screen overflow-y-auto lg:overflow-hidden">
            {/* Left Side - Title and Benefits */}
            <div className="flex-2 p-4 pt-16 flex flex-col justify-center">
              <div className="">
                {/* Main Title */}
                <DialogTitle className=" text-3xl md:text-4xl lg:text-5xl cursor-pointer font-bold text-white mb-4 lg:mb-6 leading-tight">
                  Get Your Free Roof Assessment Inquiry Form Section
                </DialogTitle>

                <p className="text-gray-200 text-base lg:text-lg mb-6 lg:mb-8 leading-relaxed max-w-[563px] font-inter tracking-[0%]">
                  Fill out the form and our team will get back to you within 24
                  hours to schedule your free drone inspection.
                </p>

                {/* Benefits Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl lg:rounded-2xl p-6 lg:p-8 shadow-xl w-full mx-auto lg:mx-0">
                  <h3 className="text-[#1E40AF] font-bold mb-4 lg:mb-6 text-lg lg:text-xl">
                    Why Request an Inspection?
                  </h3>

                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex items-start gap-3 lg:gap-4">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                      </div>
                      <span className="text-[#000000] text-sm lg:text-base leading-relaxed">
                        No-obligation assessment of your roof&apos;s condition
                      </span>
                    </div>

                    <div className="flex items-start gap-3 lg:gap-4">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                      </div>
                      <span className="text-[#000000] text-sm lg:text-base leading-relaxed">
                        High-resolution drone imagery for accurate evaluation
                      </span>
                    </div>

                    <div className="flex items-start gap-3 lg:gap-4">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                      </div>
                      <span className="text-[#000000] text-sm lg:text-base leading-relaxed">
                        Detailed report of findings and recommendations
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-4 pb-8 lg:p-12 flex items-center justify-center lg:justify-end">
              <div className=" w-[600px]">
                <div className="bg-white rounded-lg lg:rounded-xl p-6 lg:p-8 shadow-2xl">
                  <div className="space-y-4 lg:space-y-6">
                    {/* Full Name */}
                    <div>
                      <Label
                        htmlFor="fullName"
                        className="text-[#374151] font-semibold text-sm lg:text-base mb-1 lg:mb-2 block"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="John Doe"
                        className="h-10 lg:h-12 text-sm lg:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 "
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs lg:text-sm mt-1 lg:mt-2">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-[#374151] font-semibold text-sm lg:text-base mb-1 lg:mb-2 block"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="john@example.com"
                          className="h-10 lg:h-12 text-sm lg:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs lg:text-sm mt-1 lg:mt-2">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-[#374151] font-semibold text-sm lg:text-base mb-1 lg:mb-2 block"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="(555) 123-4567"
                          className="h-10 lg:h-12 text-sm lg:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs lg:text-sm mt-1 lg:mt-2">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Property Address */}
                    <div>
                      <Label
                        htmlFor="address"
                        className="text-[#374151] font-semibold text-sm lg:text-base mb-1 lg:mb-2 block"
                      >
                        Property Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="123 Main St, Houston, TX"
                        className="h-10 lg:h-12 text-sm lg:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs lg:text-sm mt-1 lg:mt-2">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Service Needed */}
                    <div>
                      <Label
                        htmlFor="service"
                        className="text-[#374151] font-semibold text-sm lg:text-base mb-1 lg:mb-2 block"
                      >
                        Service Needed
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("service", value)
                        }
                        value={formData.service}
                        defaultValue={preselectedService}
                      >
                        <SelectTrigger className="h-10 w-full lg:!h-[49px] cursor-pointer py-3 text-sm lg:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent className="py-3">
                          {data?.map((item: { _id: string; name: string }) => (
                            <SelectItem value={item._id} key={item._id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-red-500 text-xs lg:text-sm mt-1 lg:mt-2">
                          {errors.service}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleFormSubmit}
                      className="w-full bg-[#0F3D68] cursor-pointer hover:bg-[#175896] h-12 text-white py-3 lg:py-4 text-base lg:text-lg font-semibold rounded-lg lg:rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
