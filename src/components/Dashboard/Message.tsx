"use client";

import { getMessages } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { CustomPagination } from "../shared/Pagination/CustomPagination";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import MessageSkeleton from "./MessageSkeleton";

export default function Message() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages", currentPage, limit],
    queryFn: () => getMessages({ page: currentPage, limit }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (item: any) => {
    setSelected(item);
    setOpen(true);
  };

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

  if (isLoading) return <div>
    <MessageSkeleton />
  </div>;
  if (isError) return <div>Error loading messages.</div>;

  const messages = data.data.items;

  return (
    <div className="p-4">
      <div className="border border-[#0F3D68] rounded-2xl p-5 mb-6">
        <h1 className="text-2xl font-semibold mb-5">Contacts:</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#0F3D68] rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                {["Full Name", "Email Address", "Message Info"].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-2 border border-[#0F3D68] text-center"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No messages found
                  </td>
                </tr>
              ) : (
                messages.map((m: any) => (
                  <tr key={m._id} className="border border-[#0F3D68]">
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {m.fullName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {m.email || "N/A"}
                    </td>
                    <td className="px-4 py-2 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleViewDetails(m)}
                        className="text-[#424242] hover:text-[#016102] font-semibold underline cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <CustomPagination
          currentPage={currentPage}
          totalPages={data.data.meta.totalPages}
          perPage={limit}
          totalItems={data.data.meta.totalData}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg p-8 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">
              Message Info
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <tbody>
                  {[
                    ["Full Name", selected.fullName],
                    ["Phone Number", selected.phone],
                    ["Email", selected.email],
                    ["Message", selected.message],
                  ].map(([key, value], idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 border font-semibold">{key}</td>
                      <td className="px-4 py-2 border">{value || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 flex justify-center">
                <Button
                  className="w-full bg-[#0F3D68] text-white cursor-pointer"
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
  );
}
