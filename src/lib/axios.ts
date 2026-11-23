import axios, { isAxiosError } from "axios";

const normalizeBaseUrl = (raw?: string): string => {
  const trimmed = raw?.trim();
  if (!trimmed) return "";
  return trimmed.replace(/\/+$/, "");
};

const getBaseUrl = (): string => {
  const configuredUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);

  // In the browser, default to same-origin ("") unless a non-localhost API URL is explicitly set
  if (typeof window !== "undefined") {
    if (configuredUrl && !configuredUrl.includes("localhost")) {
      return configuredUrl;
    }
    return "";
  }

  // On the server, use an explicit non-localhost API URL if provided
  if (configuredUrl && !configuredUrl.includes("localhost")) {
    return configuredUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }

  return "http://localhost:3000";
};

const extractErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data.trim();
    }

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;
      const candidate = record.error ?? record.message;

      if (typeof candidate === "string" && candidate.trim()) {
        return candidate.trim();
      }

      if (candidate && typeof candidate === "object") {
        const nested = candidate as Record<string, unknown>;
        if (typeof nested.message === "string" && nested.message.trim()) {
          return nested.message.trim();
        }
        try {
          return JSON.stringify(candidate);
        } catch {
          return "Request failed with structured error.";
        }
      }
    }

    if (typeof error.message === "string" && error.message.trim()) {
      return error.message.trim();
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  if (error && typeof error === "object") {
    try {
      return JSON.stringify(error);
    } catch {
      return "An unexpected error occurred.";
    }
  }

  return "An unexpected error occurred.";
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.baseURL = getBaseUrl();
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = extractErrorMessage(error);
    const wrappedError = new Error(message) as Error & { status?: number };

    if (isAxiosError(error) && error.response?.status) {
      wrappedError.status = error.response.status;
    }

    return Promise.reject(wrappedError);
  }
);