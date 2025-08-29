"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReview, getReviewsStats, updateReviewStatus } from "@/lib/api";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star, Search } from "lucide-react";
import { toast } from "sonner";

// --- Types ---
interface ReviewItem {
  _id: string;
  fullName: string;
  email?: string;
  description: string;
  rating: number;
  status: "Pending" | "Approved" | "Declined";
  createdAt: string;
}

interface ReviewsResponse {
  data: {
    items: ReviewItem[];
    meta: {
      totalData: number;
      totalPages: number;
    };
  };
}

export default function Reviews() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<ReviewsResponse>({
    queryKey: ["reviewsStats", 1, 10],
    queryFn: ({ queryKey }) => {
      const [, page, limit] = queryKey;
      return getReviewsStats(page as number, limit as number);
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto container">
        <p className="text-center py-10">Loading reviews...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto container">
        <p className="text-center py-10 text-red-500">
          Failed to load reviews.
        </p>
      </div>
    );
  }

  const items: ReviewItem[] = data.data.items;

  const handleApprove = async (reviewId: string) => {
    try {
      await updateReviewStatus(reviewId, "Approved");

      // Show toast separately
      toast.success("Review approved successfully");

      // Optimistic UI update
      queryClient.setQueryData(
        ["reviewsStats", 1, 10],
        (oldData: ReviewsResponse | undefined) => {
          if (!oldData) return oldData;
          const newItems = oldData.data.items.map((r) =>
            r._id === reviewId ? { ...r, status: "Approved" } : r
          );
          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: newItems,
            },
          };
        }
      );
    } catch (err) {
      console.error("Failed to approve review:", err);
      toast.error("Failed to approve review");
    }
  };

  const handleDecline = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);

      // Show toast
      toast.warning("Review deleted successfully");

      // Optimistic UI update
      queryClient.setQueryData(
        ["reviewsStats", 1, 10],
        (oldData: ReviewsResponse | undefined) => {
          if (!oldData) return oldData;

          const newItems = oldData.data.items.filter((r) => r._id !== reviewId);

          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: newItems,
              meta: {
                ...oldData.data.meta,
                totalData: oldData.data.meta.totalData - 1,  
              },
            },
          };
        }
      );
    } catch (err) {
      console.error("Failed to delete review:", err);
      toast.error("Failed to delete review");
    }
  };

  const pendingItems = items.filter((r) => r.status === "Pending");

  const filteredItems = pendingItems.filter(
    (r) =>
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalReviews = data.data.meta.totalData;
  const approvedReviews = items.filter((r) => r.status === "Approved").length;
  const pendingReviews = pendingItems.length;

  return (
    <div className="mx-auto container py-10 space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-transparent border border-[#0F3D68] shadow-xl rounded-xl">
          <CardContent className="flex items-center p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
              <Image
                src="/images/Group1.svg"
                alt="Total"
                width={24}
                height={24}
              />
            </div>
            <div className="ml-4">
              <p className="text-base text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
            </div>
          </CardContent>
        </Card>

        <Card className=" bg-transparent border border-[#0F3D68] shadow-xl rounded-xl">
          <CardContent className="flex items-center p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
              <Image
                src="/images/Group2.svg"
                alt="Approved"
                width={24}
                height={24}
              />
            </div>
            <div className="ml-4">
              <p className="text-base text-gray-500">Approved Reviews</p>
              <p className="text-2xl font-bold text-gray-900">
                {approvedReviews}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-transparent border border-[#0F3D68] shadow-xl rounded-xl">
          <CardContent className="flex items-center p-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F3D68]">
              <Image
                src="/images/Group3.svg"
                alt="Pending"
                width={24}
                height={24}
              />
            </div>
            <div className="ml-4">
              <p className="text-base text-gray-500">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingReviews}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="border border-[#0F3D68] rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[#0F3D68]">
          <h2 className="text-lg font-semibold">Recent Reviews</h2>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search Reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F3D68]"
            />
          </div>
        </div>

        <div>
          {filteredItems.map((review) => (
            <div
              key={review._id}
              className="p-6 grid grid-cols-12 md:flex-row border-b border-[#0F3D68]"
            >
              <div className="grid col-span-3">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback>
                      {review.fullName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  Rating
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="text-yellow-400 w-5 h-5" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid col-span-9">
                <div className="flex-1 text-gray-700 py-6">
                  {review.description}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(review._id)}
                    className="px-2 py-1 w-full bg-[#0F3D68] text-white rounded-md cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(review._id)}
                    className="px-2 py-1 w-full rounded-md border border-[#0F3D68] text-[#0F3D68] cursor-pointer"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <p className="text-center py-6 text-gray-500">No reviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
