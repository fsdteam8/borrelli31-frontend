"use client";

import type React from "react";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { createReview, getApprovedReviews } from "@/lib/api";
import { toast } from "sonner";
import { Review } from "./reviews-display";

interface ReviewFormData {
  fullName: string;
  email: string;
  rating: number;
  description: string;
}

export function ReviewForm() {
  const [formData, setFormData] = useState<ReviewFormData>({
    fullName: "",
    email: "",
    rating: 0,
    description: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setFormData({ fullName: "", email: "", rating: 0, description: "" });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rating === 0) {
      toast.warning("Please select a rating");
      return;
    }
    mutation.mutate(formData);
  };

  const handleInputChange = (
    field: keyof ReviewFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getApprovedReviews,
  });

  if (isLoading) {
    return (
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load reviews at this time.</p>
      </div>
    );
  }

  const reviews = data?.data?.items || [];

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No reviews available yet.</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum: number, review: Review) => sum + review.rating, 0) /
    reviews.length;
  const ratingCounts = [1, 2, 3, 4, 5].map(
    (rating) =>
      reviews.filter((review: Review) => review.rating === rating).length
  );

  return (
    <section className="py-8 lg:py-20">
      <div className="container grid grid-cols-2 gap-8 items-center">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl">Reviews Form</CardTitle>
            <CardDescription className="text-center sr-only">
              We'd love to hear about your experience with our roofing services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    className="h-10"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    className="h-12"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => handleInputChange("rating", star)}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || formData.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Your Review</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your experience with our roofing services..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  required
                  className="h-52"
                />
              </div>

              <Button
                type="submit"
                className=""
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-3xl font-bold">Reviews</h3>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-600">Based on {reviews.length} reviews</p>
          </div>

          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="text-sm w-16 flex items-center gap-2">
                  {rating} <span>Stars</span>
                </span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${
                        reviews.length > 0
                          ? (ratingCounts[rating - 1] / reviews.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8 pl-2">
                  {ratingCounts[rating - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
