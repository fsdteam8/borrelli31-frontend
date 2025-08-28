import React from "react";

export default function MessageSkeleton() {
  const skeletonRows = Array.from({ length: 10 });

  return (
    <div className="p-4">
      <div className="border border-[#0F3D68] rounded-2xl p-5 mb-6">
        <h1 className="text-2xl font-semibold mb-5">Contacts:</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#0F3D68] rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                {["Full Name", "Email Address", "Message Info"].map((header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2 border border-[#0F3D68] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skeletonRows.map((_, idx) => (
                <tr key={idx} className="border border-[#0F3D68] animate-pulse">
                  <td className="px-4 py-2 border border-[#0F3D68]">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  </td>
                  <td className="px-4 py-2 border border-[#0F3D68]">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  </td>
                  <td className="px-4 py-2 border border-[#0F3D68] text-center">
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
