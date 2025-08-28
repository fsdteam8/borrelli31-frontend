"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
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
// PDF lib
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["assessments"],
    queryFn: getAssessments,
  });

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>You are not logged in.</div>;
  if (isLoading) return <div>Loading assessments...</div>;
  if (isError) return <div>Failed to load assessments.</div>;

  // latest 6 data
  const assessments = (data?.data?.items ?? []).slice(-6).reverse();

  // --- Download as PDF ---
  const handleDownload = (row: any) => {
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
        ["Phone", row.phone],
        ["Email", row.email],
        ["Property Address", row.propertyAddress],
        ["Service Needed", row.service?.name],
        ["Status", row.status],
      ],
    });

    doc.save(`${row.inquiryId || "assessment"}.pdf`);
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen py-10">
      <div className="mx-auto container">
        {/* --- Top Stats Cards --- */}
        <div className="pb-20 pt-10">
          <div className="border border-[#0F3D68] rounded-2xl p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border bg-0 border-[#0F3D68] shadow-xl rounded-xl">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
                    <Image
                      src="/images/Group1.svg"
                      alt="icon1"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-[#787878]">
                      Total Assessment
                    </p>
                    <p className="text-2xl font-bold text-[#2A2A2A]">
                      {data.data.items.length}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-0 border-[#0F3D68] shadow-xl rounded-xl">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
                    <Image
                      src="/images/Group2.svg"
                      alt="icon2"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-[#787878]">
                      Completed Assessment
                    </p>
                    <p className="text-2xl font-bold text-[#2A2A2A]">
                      {
                        data.data.items.filter((a: any) => a.status === "COMPLETED")
                          .length
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-0 border-[#0F3D68] shadow-xl rounded-xl">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
                    <Image
                      src="/images/Group3.svg"
                      alt="icon3"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-[#787878]">
                      Pending Assessment
                    </p>
                    <p className="text-2xl font-bold text-[#2A2A2A]">
                      {
                        data.data.items.filter((a: any) => a.status === "PENDING")
                          .length
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="border border-[#0F3D68] rounded-2xl p-5 mb-6">
          <div className="rounded-2xl p-5 mb-6">
            <h1 className="text-2xl font-semibold">Latest Assessments:</h1>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-[#0F3D68] rounded-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border border-[#0F3D68]">
                    Assessment ID
                  </th>
                  <th className="px-4 py-2 border border-[#0F3D68]">
                    User Name
                  </th>
                  <th className="px-4 py-2 border border-[#0F3D68]">
                    Email Address
                  </th>
                  <th className="px-4 py-2 border border-[#0F3D68] text-center">
                    Assessment Status
                  </th>
                  <th className="px-4 py-2 border border-[#0F3D68] text-center">
                    Assessment Info
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a: any, idx: number) => (
                  <tr key={idx} className="border border-[#0F3D68]">
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.inquiryId}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.fullName}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.email}
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

        {/* --- Modal --- */}
        <Dialog open={open} onOpenChange={setOpen}>
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
                    <tr>
                      <td className="px-4 py-2 border border-[#0F3D68] font-semibold">
                        Assessment ID
                      </td>
                      <td className="px-4 py-2 border border-[#0F3D68]">
                        {selected.inquiryId}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-[#0F3D68] font-semibold">
                        Full Name
                      </td>
                      <td className="px-4 py-2 border border-[#0F3D68]">
                        {selected.fullName}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-[#0F3D68] font-semibold">
                        Phone
                      </td>
                      <td className="px-4 py-2 border border-[#0F3D68]">
                        {selected.phone}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-[#0F3D68] font-semibold">
                        Email
                      </td>
                      <td className="px-4 py-2 border border-[#0F3D68]">
                        {selected.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-[#0F3D68] font-semibold">
                        Property Address
                      </td>
                      <td className="px-4 py-2 border border-[#0F3D68]">
                        {selected.propertyAddress}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-[#0F3D68] font-semibold">
                        Service Needed
                      </td>
                      <td className="px-4 py-2 border border-[#0F3D68]">
                        {selected.service?.name}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6 flex justify-center">
                  <Button
                    className="w-full bg-[#0F3D68]  cursor-pointer text-white"
                    onClick={() => handleDownload(selected)}
                  >
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
