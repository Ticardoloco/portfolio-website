import axios from "axios";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Prefer same-origin relative path unless an explicit non-localhost API URL is configured
    const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
    if (envUrl && !envUrl.includes("localhost")) {
      return envUrl.replace(/\/+$/, "");
    }
    return "";
  }

  const serverEnvUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (serverEnvUrl && !serverEnvUrl.includes("localhost")) {
    return serverEnvUrl.replace(/\/+$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

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
      error.response?.data?.error ||
      error.message ||
      "An unexpected error occurred.";
    return Promise.reject(new Error(customMessage));
  }
);