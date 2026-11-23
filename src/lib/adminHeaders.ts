import { auth } from "@/lib/firebase";

export async function getAdminAuthHeaders(): Promise<HeadersInit> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("You must be signed in as an admin.");
  }

  const idToken = await currentUser.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${idToken}`,
  };
}