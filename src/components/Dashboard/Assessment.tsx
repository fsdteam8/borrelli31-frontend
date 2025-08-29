"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getAssessmentsPagination } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CustomPagination } from "../shared/Pagination/CustomPagination";

// --- Type Definitions ---
interface Service {
  name: string;
}

export interface AssessmentType {
  id: string; // mapped from _id
  inquiryId: string;
  fullName: string;
  phone?: string;
  email?: string;
  propertyAddress?: string;
  service?: Service;
  status: "COMPLETED" | "PENDING" | string;
}

interface PaginationMeta {
  totalPages: number;
  totalData: number;
}

interface AssessmentPaginationData {
  items: AssessmentType[];
  meta: PaginationMeta;
}

interface AssessmentPaginationResponse {
  status: boolean;
  message: string;
  data: AssessmentPaginationData;
}

export default function Assessment() {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<AssessmentType | null>(null);
  const [open, setOpen] = useState(false);

  // --- Pagination state ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 6;

  const { data, isLoading, isError } = useQuery<AssessmentPaginationResponse>({
    queryKey: ["assessments", currentPage, limit],
    queryFn: () => getAssessmentsPagination(currentPage, limit),
  });

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>You are not logged in.</div>;
  if (isLoading) return <div>Loading assessments...</div>;
  if (isError) return <div>Failed to load assessments.</div>;

  // --- Map API data to AssessmentType safely ---
  const assessments: AssessmentType[] = (data?.data?.items ?? []).map((item) => ({
    id: item.id || item.id,
    inquiryId: item.inquiryId,
    fullName: item.fullName,
    phone: item.phone,
    email: item.email,
    propertyAddress: item.propertyAddress,
    service: item.service,
    status: item.status,
  }));

  const totalItems = data?.data?.meta?.totalData ?? assessments.length;
  const completedCount = assessments.filter((a) => a.status === "COMPLETED").length;
  const pendingCount = assessments.filter((a) => a.status === "PENDING").length;

  // --- PDF download ---
  const handleDownload = (row: AssessmentType) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Assessment Details", 105, 20, { align: "center" });

    autoTable(doc, {
      startY: 30,
      theme: "grid",
      styles: { halign: "center" },
      head: [["Field", "Value"]],
      body: [
        ["Assessment ID", row.inquiryId || "N/A"],
        ["Full Name", row.fullName || "N/A"],
        ["Phone", row.phone || "N/A"],
        ["Email", row.email || "N/A"],
        ["Property Address", row.propertyAddress || "N/A"],
        ["Service Needed", row.service?.name || "N/A"],
        ["Status", row.status || "N/A"],
      ],
    });

    doc.save(`${row.inquiryId || "assessment"}.pdf`);
  };

  // --- Page change ---
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen py-10">
      <div className="mx-auto container">
        {/* --- Stats Cards --- */}
        <div className="pb-20 pt-10">
          <div className=" border border-[#0F3D68] rounded-2xl p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { title: "Total Assessment", count: totalItems, icon: "/images/Group1.svg" },
                { title: "Completed Assessment", count: completedCount, icon: "/images/Group2.svg" },
                { title: "Pending Assessment", count: pendingCount, icon: "/images/Group3.svg" },
              ].map((card, idx) => (
                <Card key={idx} className="bg-none border border-[#0F3D68] shadow-xl rounded-xl">
                  <CardContent className="flex items-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
                      <Image src={card.icon} alt="icon" height={24} width={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-[#787878]">{card.title}</p>
                      <p className="text-2xl font-bold text-[#2A2A2A]">{card.count}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="border border-[#0F3D68] rounded-2xl p-5 mb-6">
          <h1 className="text-2xl font-semibold mb-5">Latest Assessments:</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#0F3D68] rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  {["Assessment ID", "User Name", "Email Address", "Assessment Status", "Assessment Info"].map(
                    (header, idx) => (
                      <th key={idx} className="px-4 py-2 border border-[#0F3D68] text-center">{header}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {assessments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No assessments found
                    </td>
                  </tr>
                ) : (
                  assessments.map((a) => (
                    <tr key={a.id} className="border border-[#0F3D68]">
                      <td className="px-4 py-2 border border-[#0F3D68]">{a.inquiryId}</td>
                      <td className="px-4 py-2 border border-[#0F3D68]">{a.fullName}</td>
                      <td className="px-4 py-2 border border-[#0F3D68]">{a.email || "N/A"}</td>
                      <td className="px-4 py-2 border border-[#0F3D68] text-center">
                        <span className={`px-2 py-1 rounded text-white text-sm ${a.status === "COMPLETED" ? "bg-[#016102]" : "bg-[#E2BF64]"}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border border-[#0F3D68] text-center flex justify-center gap-3">
                        <button onClick={() => { setSelected(a); setOpen(true); }} className="text-[#424242] hover:text-[#016102] font-semibold underline cursor-pointer">
                          View Details
                        </button>
                        <button onClick={() => handleDownload(a)} className="text-white bg-[#016102] p-1 px-2 py-2 rounded-sm font-semibold underline flex items-center gap-1 cursor-pointer">
                          <ArrowDownToLine size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Pagination --- */}
        {data?.data?.meta && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={data.data.meta.totalPages}
            perPage={limit}
            totalItems={data.data.meta.totalData}
            onPageChange={handlePageChange}
          />
        )}

        {/* --- Modal --- */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg p-8 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">Assessment Details</DialogTitle>
            </DialogHeader>
            {selected && (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-[#0F3D68] rounded-lg">
                  <tbody>
                    {[
                      ["Assessment ID", selected.inquiryId],
                      ["Full Name", selected.fullName],
                      ["Phone", selected.phone],
                      ["Email", selected.email],
                      ["Property Address", selected.propertyAddress],
                      ["Service Needed", selected.service?.name],
                    ].map(([key, value], idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 border border-[#0F3D68] font-semibold">{key}</td>
                        <td className="px-4 py-2 border border-[#0F3D68]">{value || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 flex justify-center">
                  <Button className="w-full bg-[#0F3D68] cursor-pointer text-white" onClick={() => handleDownload(selected)}>
                    Download
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
