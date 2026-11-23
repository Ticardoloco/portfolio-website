// src/lib/projects-server.ts
import "server-only";
import { adminDb } from "@/lib/firebaseAdmin"; // match your actual export name
import type { Project } from "@/service/projectService";

function serializeFirestoreValue(value: unknown): unknown {
  if (value && typeof value === "object" && "toDate" in value && typeof (value as { toDate: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  if (Array.isArray(value)) {
    return value.map(serializeFirestoreValue);
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(([k, v]) => [
      k,
      serializeFirestoreValue(v),
    ]);
    return Object.fromEntries(entries);
  }
  return value;
}

export async function getProjectsFromServer(): Promise<Project[]> {
  try {
    const snapshot = await adminDb.collection("projects").get();
    return snapshot.docs.map((doc) => {
      const data = serializeFirestoreValue(doc.data()) as Omit<Project, "id">;
      return {
        id: doc.id,
        ...data,
      };
    });
  } catch (err) {
    console.error("Server Firestore getProjects error:", err);
    return [];
  }
}