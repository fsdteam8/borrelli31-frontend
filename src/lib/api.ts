import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Forgot Password > just email send to backend API
export async function forgotPassword(email: string) {
  try {
    const response = await api.post(
      "/auth/forget-password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch {
    throw "forget-password failed";
  }
}

// Verify OTP Code
export async function verifyOtpCode(email: string, otp: string) {
  try {
    const response = await api.post(
      "/auth/verify-code",
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch {
    throw "OTP verification failed";
  }
}

// reset password
export async function resetPassword(email: string, newPassword: string) {
  try {
    const response = await api.post(
      "/auth/reset-password",
      { email, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch {
    throw "OTP verification failed";
  }
}

// get assessments
export async function getAssessments() {
  try {
    const response = await api.get("/assessments", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch {
    throw "Failed to fetch assessments";
  }
}

// Get assessments with pagination
export async function getAssessmentsPagination(
  page: number = 1,
  limit: number = 10
) {
  try {
    const response = await api.get(`/assessments?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch {
    throw "Failed to fetch assessments";
  }
}

// get messages pagination
export async function getMessages({ page = 1, limit = 10 }) {
  try {
    const response = await api.get(`/messages?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch {
    throw "Failed to fetch messages";
  }
}

// Password change
export async function changePassword(data: {
  // userId: string;
  oldPassword: string;
  newPassword: string;
}) {
  try {
    const res = await api.post(`/auth/change-password`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

// // Get user profile
export async function getUserProfile() {
  const res = await api.get(`/user/my-profile`);
  return res.data;
}

// TypeScript type for the API response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

// Payload type (strongly typed version, optional fields)
interface UserProfileUpdatePayload {
  name?: string;
  username?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: string;
}

// Update user profile function
export async function userProfileUpdate(
  userId: string,
  payload: UserProfileUpdatePayload
): Promise<ApiResponse<UserProfileUpdatePayload>> {
  try {
    const res = await api.put<ApiResponse<UserProfileUpdatePayload>>(
      `/user/${userId}`,
      payload
    );
    return res.data;
  } catch {
    throw new Error("Failed to update profile");
  }
}

// ✅ Reviews fetch with pagination
export async function getReviewsStats(page: number = 1, limit: number = 10) {
  try {
    const res = await api.get(`/reviews?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch {
    throw "Failed to fetch reviews";
  }
}

// ✅ Update review status (Approved)
export async function updateReviewStatus(reviewId: string, status: "Approved") {
  try {
    const res = await api.patch(
      `/reviews/${reviewId}/status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(res.data);
    return res.data;
  } catch {
    throw "Failed to update review status";
  }
}

// Delete reviews
export async function deleteReview(reviewId: string) {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch {
    throw new Error("Failed to delete review");
  }
}
// Create review api
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createReview(data: any) {
  try {
    const response = await api.post("/reviews", data);
    return response.data;
  } catch {
    throw "Failed reviews";
  }
}

// Get all approved reviews
export async function getApprovedReviews() {
  try {
    const response = await api.get("/reviews/approved");
    return response.data;
  } catch {
    throw "Failed reviews approved";
  }
}

// get Assessments stats
export async function getAssessmentsstats() {
  try {
    const response = await api.get("/assessments/stats");
    return response.data;
  } catch {
    throw "Failed reviews approved";
  }
}
// get Assessments stats
export async function getAssessmentsStatsAdmin(period: string = "30d") {
  try {
    const response = await api.get(
      `/assessments/stats/timeline?period=${period}`
    );
    return response.data;
  } catch {
    throw new Error("Failed to fetch assessment stats");
  }
}
// types.ts
export interface MessagePayload {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

// CREATE Massage
export async function createMessages(payload: MessagePayload) {
  try {
    const response = await api.post("/messages", payload);
    return response.data;
  } catch {
    throw new Error("Failed to create message");
  }
}

// Get All Our Roofing Services
export async function getRoofingServices() {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch {
    throw "Failed reviews approved";
  }
}

interface AssessmentData {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  service: string;
}

// create assessments
export async function createAssessment(data: AssessmentData) {
  try {
    const res = await api.post("/assessments", data);
    return res.data;
  } catch {
    throw "Faild assessments Data"
  }
}

// Update Assessment Status
export const updateAssessmentStatus = async (
  assessmentId: string,
  status: "PENDING" | "COMPLETED"
) => {
  try {
    const res = await api.patch(`/assessments/${assessmentId}/status`, {
      status,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to update status:", error);
    throw error;
  }
};