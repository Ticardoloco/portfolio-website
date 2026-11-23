import axios from "axios";

// Helper to guarantee valid absolute URLs on Node.js server during SSR
const getBaseUrl = () => {
  // Browser context (Client-side): relative paths work directly
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }

  // Server context (SSR / Next.js Server Components): absolute URL required
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development server fallback
  return "http://localhost:3000";
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customMessage =
      error.response?.data?.error || error.message || "An unexpected error occurred.";
    return Promise.reject(new Error(customMessage));
  }
);