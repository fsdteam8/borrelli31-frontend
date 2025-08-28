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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response?.data || error.message;
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
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  try {
    const res = await api.post(`/auth/change-password`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

// // Get user profile
// export async function getUserProfile() {
//   const res = await api.get(`/user/profile`);
//   return res.data;
// }

// // Update user profile
// export async function updateUserProfile(
//   profileData: Partial<UserProfile>
// ): Promise<NextApiResponse<UserProfile>> {
//   try {
//     const res = await api.put(`/user/update-profile`, profileData);
//     return res.data;
//   } catch {
//     throw new Error("Failed to update profile");
//   }
// }

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

// /reviews/{{reviewId}}/status Approved or Pending
// {
//   "status": "Approved"
// }
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
    console.log(res.data);
    return res.data;
  } catch {
    throw "Failed to update review status";
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
