"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { ArrowDownToLine } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const assessments = [
  {
    id: "#QU-2056-263",
    name: "Wade Warren",
    email: "john@example.com",
    status: "Progress",
  },
  {
    id: "#QU-2056-263",
    name: "Jane Cooper",
    email: "john@example.com",
    status: "Progress",
  },
  {
    id: "#QU-2056-263",
    name: "Kristin Watson",
    email: "john@example.com",
    status: "Completed",
  },
  {
    id: "#QU-2056-263",
    name: "Courtney Henry",
    email: "john@example.com",
    status: "Completed",
  },
  {
    id: "#QU-2056-263",
    name: "Jenny Wilson",
    email: "john@example.com",
    status: "Completed",
  },
  {
    id: "#QU-2056-263",
    name: "Eleanor Pena",
    email: "john@example.com",
    status: "Completed",
  },
  {
    id: "#QU-2056-263",
    name: "Cameron Williamson",
    email: "john@example.com",
    status: "Completed",
  },
];

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>You are not logged in.</div>;

  return (
    <div className="bg-[#F4F4F4] min-h-screen py-10">
      <div className="mx-auto container">
        <div className=" pb-20 pt-10">
          <div className="border border-[#0F3D68] rounded-2xl p-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="border bg-0 border-[#0F3D68] shadow-xl">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
                    <Image
                      src="/images/Group1.svg"
                      alt="Assessment Icon 1"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-[#787878]">
                      Total Assessment
                    </p>
                    <p className="text-2xl font-bold text-[#2A2A2A]">2,651</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-0 border-[#0F3D68] shadow-xl">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
                    <Image
                      src="/images/Group2.svg"
                      alt="Assessment Icon 2"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-[#787878]">
                      Completed Assessment
                    </p>
                    <p className="text-2xl font-bold text-[#2A2A2A]">1,432</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-0 border-[#0F3D68] shadow-xl">
                <CardContent className="flex items-center p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
                    <Image
                      src="/images/Group3.svg"
                      alt="Assessment Icon 3"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-base font-medium text-[#787878]">
                      Pending Assessment
                    </p>
                    <p className="text-2xl font-bold text-[#2A2A2A]">1,219</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="border border-[#0F3D68]  rounded-2xl p-6 mb-6">
          <div className="rounded-2xl p-6 mb-6">
            <h1 className="text-lg font-semibold">Free Roof Assessment:</h1>
          </div>

          <div className="overflow-x-auto ">
            <table className="min-w-full border border-[#0F3D68] rounded-2xl p-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Assessment ID</th>
                  <th className="px-4 py-2 text-left">User Name</th>
                  <th className="px-4 py-2 text-left">Email Address</th>
                  <th className="px-4 py-2 text-left">Assessment Status</th>
                  <th className="px-4 py-2 text-left">Assessment Info</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a, idx) => (
                  <tr key={idx} className="border border-[#0F3D68]">
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.id}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.name}
                    </td>
                    <td className="px-4 py-2 border border-[#0F3D68]">
                      {a.email}
                    </td>
                    <td className="px-4 py-2 flex gap-2 ">
                      <span
                        className={`px-2 py-1 rounded text-white text-sm ${
                          a.status === "Completed"
                            ? "bg-green-600"
                            : "bg-orange-400"
                        }`}
                      >
                        {a.status}
                      </span>
                      <span className="px-2 py-1 rounded border border-gray-300 text-sm text-gray-700">
                        Progress
                      </span>
                    </td>
                    <td className="border border-[#0F3D68]">
                      <td className="px-4 py-2 flex items-center gap-2 text-[#424242] font-bold underline cursor-pointer text-md">
                        <span>View Details</span>
                        <ArrowDownToLine
                          size={36} // increase icon size
                          className="bg-[#016102] text-white p-2 rounded-md border border-[#016102]"
                        />
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
