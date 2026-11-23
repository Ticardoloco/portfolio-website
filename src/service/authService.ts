import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { apiClient } from "@/lib/axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface ActionResponse {
  success: boolean;
  message: string;
}

export interface LoginResponse extends ActionResponse {
  user?: AuthUser;
}

export const authService = {
  async login({ email, password }: LoginPayload): Promise<LoginResponse> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const idToken = await userCredential.user.getIdToken();

      const { data } = await apiClient.post<ActionResponse>("/api/auth/login", {
        idToken,
      });

      return {
        success: true,
        message: data.message || "Authenticated successfully.",
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
        },
      };
    } catch (error: any) {
      let errorMessage =
        error.response?.data?.error ||
        error.message ||
        "An error occurred during authentication.";

        if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
            errorMessage = "Invalid email address or password."
        } else if (error.code === "auth/user-not-found"){
            errorMessage = "No admin account associated with this email.";
        } else if (error.code === "auth/too-many-requests"){
            errorMessage = "Access temporarily blocked due to multiple failed attempts.";
        }
        throw new Error(errorMessage);
    }

  },

  async logout():Promise<ActionResponse>{
    try {
        await signOut(auth);
        const {data } = await apiClient.post<ActionResponse>("/api/auth/logout");

        return {
            success: true,
            message: data.message || "Logged out successfully.",
        }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to complete sign out.";
      throw new Error(errorMessage);  
    }
  }
};
