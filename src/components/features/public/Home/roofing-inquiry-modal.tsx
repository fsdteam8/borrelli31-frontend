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

    try {
      await createAssessment(assessmentData);
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
      <DialogContent className="min-w-full h-screen p-0 m-0 rounded-none max-w-none overflow-hidden">
        <div className="relative min-h-screen flex">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/image7.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50 md:bg-black/40" />
          </div>

          {/* Close Button - Fixed positioning for mobile */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-white/80 hover:bg-white/60 rounded-full p-2 cursor-pointer transition-colors shadow-lg"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          </button>

          {/* Content Container - Mobile optimized */}
          <div className="relative z-10 flex flex-col w-full min-h-screen overflow-y-auto">
            
            {/* Mobile Layout: Title Section */}
            <div className="lg:hidden px-4 pt-12 pb-6">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Get Your Free Roof Assessment
              </DialogTitle>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours to schedule your free drone inspection.
              </p>
            </div>

            {/* Desktop Layout Container */}
            <div className="hidden lg:flex lg:flex-row w-full h-full container mx-auto">
              {/* Left Side - Title and Benefits (Desktop only) */}
              <div className="flex-2 p-8 xl:p-12 flex flex-col justify-center">
                <div className="max-w-2xl">
                  {/* Main Title */}
                  <DialogTitle className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-6 leading-tight">
                    Get Your Free Roof Assessment Inquiry Form Section
                  </DialogTitle>

                  <p className="text-gray-200 text-lg xl:text-xl mb-8 leading-relaxed max-w-[563px] font-inter">
                    Fill out the form and our team will get back to you within 24 hours to schedule your free drone inspection.
                  </p>

                  {/* Benefits Card */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <h3 className="text-[#1E40AF] font-bold mb-6 text-xl">
                      Why Request an Inspection?
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[#000000] text-base leading-relaxed">
                          No-obligation assessment of your roof&apos;s condition
                        </span>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[#000000] text-base leading-relaxed">
                          High-resolution drone imagery for accurate evaluation
                        </span>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[#000000] text-base leading-relaxed">
                          Detailed report of findings and recommendations
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form (Desktop) */}
              <div className="flex-1 p-8 xl:p-12 flex items-center justify-center">
                <div className="w-full max-w-[600px]">
                  <div className="bg-white rounded-xl p-8 shadow-2xl">
                    <div className="space-y-6">
                      {/* Form Fields */}
                      {/* Full Name */}
                      <div>
                        <Label
                          htmlFor="fullName"
                          className="text-[#374151] font-semibold text-base mb-2 block"
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
                          className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Email and Phone */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-[#374151] font-semibold text-base mb-2 block"
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
                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-[#374151] font-semibold text-base mb-2 block"
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
                            className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Property Address */}
                      <div>
                        <Label
                          htmlFor="address"
                          className="text-[#374151] font-semibold text-base mb-2 block"
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
                          className="h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* Service Needed */}
                      <div>
                        <Label
                          htmlFor="service"
                          className="text-[#374151] font-semibold text-base mb-2 block"
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
                          <SelectTrigger className="h-12 w-full cursor-pointer py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500">
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
                          <p className="text-red-500 text-sm mt-2">
                            {errors.service}
                          </p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="button"
                        disabled={isSubmitting}
                        onClick={handleFormSubmit}
                        className="w-full bg-[#0F3D68] cursor-pointer hover:bg-[#175896] h-12 text-white py-4 text-lg font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Form Container */}
            <div className="lg:hidden flex-1 px-4 pb-8">
              {/* Mobile Benefits Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 mb-6 shadow-xl">
                <h3 className="text-[#1E40AF] font-bold mb-4 text-base">
                  Why Request an Inspection?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[#000000] text-sm leading-relaxed">
                      No-obligation assessment of your roof&apos;s condition
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[#000000] text-sm leading-relaxed">
                      High-resolution drone imagery for accurate evaluation
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[#000000] text-sm leading-relaxed">
                      Detailed report of findings and recommendations
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Form */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-2xl">
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <Label
                      htmlFor="fullName-mobile"
                      className="text-[#374151] font-semibold text-sm mb-2 block"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName-mobile"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="John Doe"
                      className="h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email-mobile"
                      className="text-[#374151] font-semibold text-sm mb-2 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email-mobile"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="john@example.com"
                      className="h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label
                      htmlFor="phone-mobile"
                      className="text-[#374151] font-semibold text-sm mb-2 block"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone-mobile"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="(555) 123-4567"
                      className="h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Property Address */}
                  <div>
                    <Label
                      htmlFor="address-mobile"
                      className="text-[#374151] font-semibold text-sm mb-2 block"
                    >
                      Property Address
                    </Label>
                    <Input
                      id="address-mobile"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="123 Main St, Houston, TX"
                      className="h-10 sm:h-12 text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Service Needed */}
                  <div>
                    <Label
                      htmlFor="service-mobile"
                      className="text-[#374151] font-semibold text-sm mb-2 block"
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
                      <SelectTrigger className="h-10 sm:h-12 w-full cursor-pointer py-3 text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500">
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
                      <p className="text-red-500 text-xs mt-1">
                        {errors.service}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleFormSubmit}
                    className="w-full bg-[#0F3D68] cursor-pointer hover:bg-[#175896] h-11 sm:h-12 text-white py-3 text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mt-6"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}