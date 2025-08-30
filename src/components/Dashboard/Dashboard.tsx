"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAssessments } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AssessmentDetails from "./AssessmentDetails";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, LogOut, FileWarning, Database } from "lucide-react";

// --- Types ---
interface Service {
  name: string;
}

interface Assessment {
  id: string;
  inquiryId: string;
  fullName: string;
  phone?: string;
  email?: string;
  propertyAddress?: string;
  service?: Service;
  status: "COMPLETED" | "PENDING" | string;
}

interface AssessmentsResponse {
  data: {
    items: Assessment[];
  };
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<Assessment | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, isError } = useQuery<AssessmentsResponse>({
    queryKey: ["assessments"],
    queryFn: getAssessments,
  });

  if (!mounted) {
    // prevent SSR/CSR mismatch
    return null;
  }

  if (status === "loading")
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Alert className="max-w-md text-center border-blue-400 bg-blue-50">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600 mx-auto mb-2" />
          <AlertTitle className="font-semibold text-blue-700">
            Loading session...
          </AlertTitle>
          <AlertDescription className="text-sm text-blue-500">
            Please wait while we check your account.
          </AlertDescription>
        </Alert>
      </div>
    );

  if (!session)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Alert className="max-w-md text-center border-red-400 bg-red-50">
          <LogOut className="h-6 w-6 text-red-600 mx-auto mb-2" />
          <AlertTitle className="font-semibold text-red-700">
            You are not logged in
          </AlertTitle>
          <AlertDescription className="text-sm text-red-500">
            Please sign in to access your dashboard.
          </AlertDescription>
        </Alert>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Alert className="max-w-md text-center border-indigo-400 bg-indigo-50">
          <Database className="h-6 w-6 animate-bounce text-indigo-600 mx-auto mb-2" />
          <AlertTitle className="font-semibold text-indigo-700">
            Loading assessments...
          </AlertTitle>
          <AlertDescription className="text-sm text-indigo-500">
            Fetching your recent assessments, please hold on.
          </AlertDescription>
        </Alert>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Alert className="max-w-md text-center border-orange-400 bg-orange-50">
          <FileWarning className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <AlertTitle className="font-semibold text-orange-700">
            Failed to load assessments
          </AlertTitle>
          <AlertDescription className="text-sm text-orange-500">
            Something went wrong. Please refresh the page or try again later.
          </AlertDescription>
        </Alert>
      </div>
    );

  const assessments = (data?.data.items ?? []).slice(-6).reverse();

  // --- PDF download ---
  const handleDownload = (row: Assessment) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Assessment Details", 105, 20, { align: "center" });

    autoTable(doc, {
      startY: 30,
      theme: "grid",
      styles: { halign: "center" },
      head: [["Field", "Value"]],
      body: [
        ["Assessment ID", row.inquiryId],
        ["Full Name", row.fullName],
        ["Phone", row.phone ?? "N/A"],
        ["Email", row.email ?? "N/A"],
        ["Property Address", row.propertyAddress ?? "N/A"],
        ["Service Needed", row.service?.name ?? "N/A"],
        ["Status", row.status],
      ],
    });

    doc.save(`${row.inquiryId || "assessment"}.pdf`);
  };

  const totalItems = data?.data.items.length ?? 0;
  const completedCount =
    data?.data.items.filter((a) => a.status === "COMPLETED").length ?? 0;
  const pendingCount =
    data?.data.items.filter((a) => a.status === "PENDING").length ?? 0;

  return (
    <div className="bg-[#F4F4F4] min-h-screen py-10">
      <div className="mx-auto container">
        {/* --- Top Stats Cards --- */}
        <div className="pb-20 pt-10">
          <div className="border border-[#0F3D68] rounded-2xl p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Total Assessment",
                  count: totalItems,
                  icon: "/images/Group1.svg",
                },
                {
                  title: "Completed Assessment",
                  count: completedCount,
                  icon: "/images/Group2.svg",
                },
                {
                  title: "Pending Assessment",
                  count: pendingCount,
                  icon: "/images/Group3.svg",
                },
              ].map((card, idx) => (
                <Card
                  key={idx}
                  className="border bg-0 border-[#0F3D68] shadow-xl rounded-xl"
                >
                  <CardContent className="flex items-center p-6">
                    <div className="flex h-16 w-16  items-center justify-center rounded-full bg-[#0F3D68]">
                      <Image
                        src={card.icon}
                        alt={`icon-${idx}`}
                        height={24}
                        width={24}
                        priority
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-[#787878]">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold text-[#2A2A2A]">
                        {card.count}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="border border-[#0F3D68] rounded-2xl p-5 mb-6">
          <div className="rounded-2xl p-5 mb-6">
            <h1 className="text-2xl font-semibold">Free Roof Assessment:</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#0F3D68] rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Assessment ID",
                    "User Name",
                    "Email Address",
                    "Assessment Status",
                    "Assessment Info",
                  ].map((header, idx) => (
                    <th key={idx} className="px-4 py-2 border border-[#0F3D68]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id} className="border border-[#0F3D68]">
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.inquiryId}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.fullName}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.email ?? "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68] text-center">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          a.status === "COMPLETED"
                            ? "bg-[#016102]"
                            : "bg-[#E2BF64]"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68] text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setSelected(a);
                            setOpen(true);
                          }}
                          className="text-[#424242] hover:text-[#016102] font-semibold underline cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDownload(a)}
                          className="text-white bg-[#016102] p-1 px-2 py-2 rounded-sm font-semibold underline flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowDownToLine size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <AssessmentDetails />
        </div>

        {/* --- Modal --- */}
        <Dialog open={open} onOpenChange={setOpen}>
          {mounted && (
            <DialogContent className="max-w-lg p-8 rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  Assessment Details
                </DialogTitle>
              </DialogHeader>
              {selected && (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-[#0F3D68] rounded-lg">
                    <tbody>
                      {[
                        ["Assessment ID", selected.inquiryId],
                        ["Full Name", selected.fullName],
                        ["Phone", selected.phone ?? "N/A"],
                        ["Email", selected.email ?? "N/A"],
                        ["Property Address", selected.propertyAddress ?? "N/A"],
                        ["Service Needed", selected.service?.name ?? "N/A"],
                      ].map(([key, value], idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 border border-[#0F3D68] font-semibold">
                            {key}
                          </td>
                          <td className="px-4 py-2 border border-[#0F3D68]">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-6 flex justify-center">
                    <Button
                      className="w-full bg-[#0F3D68] cursor-pointer text-white"
                      onClick={() => handleDownload(selected)}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
