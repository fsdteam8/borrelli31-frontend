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
      config.headers.Authorization = `${session.accessToken}`;
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
  } catch (error: any) {
    throw error.response?.data?.message || "OTP verification failed";
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
  } catch (error: any) {
    throw error.response?.data?.message || "OTP verification failed";
  }
}
