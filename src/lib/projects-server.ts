// src/lib/projects-server.ts
import "server-only";
import { adminDb } from "@/lib/firebaseAdmin"; // adjust to your Firebase Admin export
import type { Project } from "@/service/projectService";

export async function getProjectsFromServer(): Promise<Project[]> {
  try {
    const snapshot = await adminDb.collection("projects").get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Project, "id">),
    }));
  } catch (err) {
    console.error("Server Firestore getProjects error:", err);
    return [];
  }
}