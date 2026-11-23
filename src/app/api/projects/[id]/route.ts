import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import cloudinary from "@/lib/cloudinary";
import { verifyAdminToken } from "@/lib/authAdmin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/projects/[id] — Fetch single project (Public)
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const docRef = adminDb.collection("projects").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { id: docSnap.id, ...docSnap.data() } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/[id] — Admin Only
export async function PATCH(request: Request, { params }: RouteParams) {
  const isAdmin = await verifyAdminToken(request);
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access: Admin token required" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const docRef = adminDb.collection("projects").doc(id);

    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const updatePayload = { ...body, updatedAt: FieldValue.serverTimestamp() };

    // Prevent overwriting protected fields
    delete updatePayload.id;
    delete updatePayload.createdAt;

    // Handle details paragraph array normalization if provided in payload
    if ("details" in body) {
      if (Array.isArray(body.details)) {
        updatePayload.details = body.details
          .filter((paragraph: unknown) => typeof paragraph === "string" && paragraph.trim().length > 0)
          .map((paragraph: string) => paragraph.trim());
      } else if (typeof body.details === "string" && body.details.trim()) {
        updatePayload.details = body.details
          .split("\n")
          .map((p: string) => p.trim())
          .filter(Boolean);
      } else {
        updatePayload.details = [];
      }
    }

    // Handle optional swaggerUrl field normalization
    if ("swaggerUrl" in body) {
      updatePayload.swaggerUrl = typeof body.swaggerUrl === "string" ? body.swaggerUrl.trim() : "";
    }

    // Handle imageUrls array normalization if provided in payload
    if ("imageUrls" in body || "imageUrl" in body) {
      if (Array.isArray(body.imageUrls)) {
        updatePayload.imageUrls = body.imageUrls;
      } else if (typeof body.imageUrl === "string" && body.imageUrl.trim()) {
        updatePayload.imageUrls = [body.imageUrl.trim()];
      }
      delete updatePayload.imageUrl;
    }

    // Handle imagePublicIds array normalization if provided in payload
    if ("imagePublicIds" in body || "imagePublicId" in body) {
      if (Array.isArray(body.imagePublicIds)) {
        updatePayload.imagePublicIds = body.imagePublicIds;
      } else if (typeof body.imagePublicId === "string" && body.imagePublicId.trim()) {
        updatePayload.imagePublicIds = [body.imagePublicId.trim()];
      }
      delete updatePayload.imagePublicId;
    }

    await docRef.update(updatePayload);

    return NextResponse.json(
      { success: true, message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] — Admin Only
export async function DELETE(request: Request, { params }: RouteParams) {
  const isAdmin = await verifyAdminToken(request);
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access: Admin token required" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const docRef = adminDb.collection("projects").doc(id);

    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const projectData = docSnap.data();

    // Collect public IDs from array or single fallback string
    const publicIdsToDelete: string[] = [];
    if (Array.isArray(projectData?.imagePublicIds)) {
      publicIdsToDelete.push(...projectData.imagePublicIds);
    } else if (projectData?.imagePublicId) {
      publicIdsToDelete.push(projectData.imagePublicId);
    }

    // Destroy all images on Cloudinary in parallel
    if (publicIdsToDelete.length > 0) {
      try {
        await Promise.all(
          publicIdsToDelete.map((publicId) => cloudinary.uploader.destroy(publicId))
        );
      } catch (cloudErr) {
        console.warn("Cloudinary removal warning:", cloudErr);
      }
    }

    await docRef.delete();

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}