"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { getApprovedReviews } from "@/lib/api"
import { useState } from "react"

export interface Review {
  _id: string
  fullName: string
  email: string
  rating: number
  description: string
  status: string
  createdAt: string
}

export function ReviewsDisplay() {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4 // Show 4 items per page (2x2 grid)

  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: getApprovedReviews,
  })

  if (isLoading) {
    return (
      <div className="container grid grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-16 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load reviews at this time.</p>
      </div>
    )
  }

  const reviews = data?.data?.items || []

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No reviews available yet.</p>
      </div>
    )
  }

  const totalPages = Math.ceil(reviews.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const currentReviews = reviews.slice(startIndex, startIndex + itemsPerPage)

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="py-8 lg:py-20 bg-[#E7E7E78F]">
      <div className="space-y-12 container">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="lg:text-4xl text-xl text-[#063668] font-bold">Trusted by Houston Homeowners</h2>
          <p>Houston homeowners trust Borrelli Roofing for quality, integrity, and exceptional service</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentReviews.map((review: Review) => (
              <Card key={review._id} className="bg-[#FEF7E5] shadow-[0px_2px_15px_0px_#00000026]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 text-pretty leading-relaxed">{review.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.fullName}</h4>
                      <p className="text-sm text-gray-600">Customer</p>
                    </div>
                    <Quote fill="#333333" className="text-[#333333] h-6 w-6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full bg-white hover:bg-gray-50 border-gray-300 cursor-pointer"
                disabled={reviews.length <= itemsPerPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full bg-white hover:bg-gray-50 border-gray-300 cursor-pointer"
                disabled={reviews.length <= itemsPerPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
