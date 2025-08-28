"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export function CustomPagination({
  currentPage,
  totalPages,
  perPage,
  totalItems,
  onPageChange,
}: PaginationProps) {
  // Add proper fallbacks and validation
  const safeCurrentPage = currentPage || 1;
  const safePerPage = perPage || 2; // Use 2 as default since that's your limit
  const safeTotalItems = totalItems || 0;
  const safeTotalPages = totalPages || 1;

  // Dynamic calculation based on actual data
  const startItem =
    safeTotalItems > 0 ? (safeCurrentPage - 1) * safePerPage + 1 : 0;
  const endItem =
    safeTotalItems > 0
      ? Math.min(safeCurrentPage * safePerPage, safeTotalItems)
      : 0;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (safeTotalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (safeCurrentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Show pages around current page
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(safeTotalPages - 1, safeCurrentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (safeCurrentPage < safeTotalPages - 2) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      if (safeTotalPages > 1) {
        pages.push(safeTotalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="w-full flex justify-between">
      {/* Left side - showing items */}
      <div className="text-sm text-gray-600 hidden md:block">
        {safeTotalItems > 0
          ? `Showing ${startItem} to ${endItem} of ${safeTotalItems} results`
          : "No results found"}
      </div>

      {/* Right side - pagination */}
      <Pagination className="justify-end">
        <PaginationContent className="flex items-end space-x-1 ">
          <PaginationItem>
            <PaginationPrevious
              size="sm"
              onClick={() =>
                safeCurrentPage > 1 && onPageChange(safeCurrentPage - 1)
              }
              className={
                safeCurrentPage <= 1
                  ? "pointer-events-none opacity-50 border border-[#0F3D68] "
                  : "cursor-pointer border border-[#0F3D68] "
              }
            />
          </PaginationItem>

          {visiblePages.map((page, index) => (
            <PaginationItem key={index} className="justify-end">
              {typeof page === "number" ? (
                <PaginationLink
                  size="sm"
                  onClick={() => onPageChange(page)}
                  isActive={safeCurrentPage === page}
                  className={`cursor-pointer border border-[#0F3D68]  ${
                    safeCurrentPage === page ? "bg-[#0F3D68] text-white border" : ""
                  }`}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              size="sm"
              onClick={() =>
                safeCurrentPage < safeTotalPages &&
                onPageChange(safeCurrentPage + 1)
              }
              className={
                safeCurrentPage >= safeTotalPages
                  ? "pointer-events-none opacity-50 border border-[#0F3D68] "
                  : "cursor-pointer border border-[#0F3D68] "
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
