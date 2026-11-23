import { apiClient } from "@/lib/axios";

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const contactService = {
  /**
   * Sends a contact form payload to the backend API route.
   */
  async sendMessage(payload: ContactPayload): Promise<ContactResponse> {
    try {
      const { data } = await apiClient.post<ContactResponse>("/api/contact", payload);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to send your message. Please try again later.";
      
      throw new Error(errorMessage);
    }
  },
};