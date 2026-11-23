import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { verifyAdminToken } from "@/lib/authAdmin";

// GET /api/projects - Fetch all projects from Firestore (Public)
export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get();

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { success: true, count: projects.length, data: projects },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project (Admin Only)
export async function POST(request: Request) {
  const isAdmin = await verifyAdminToken(request);

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access: Admin token required" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      details,
      tags, 
      liveUrl, 
      githubUrl, 
      swaggerUrl, 
      imageUrls, 
      imageUrl, 
      imagePublicIds, 
      imagePublicId, 
      featured 
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Format details to guarantee an array of strings (paragraph array)
    let formattedDetails: string[] = [];
    if (Array.isArray(details)) {
      formattedDetails = details
        .filter((paragraph) => typeof paragraph === "string" && paragraph.trim().length > 0)
        .map((paragraph) => paragraph.trim());
    } else if (typeof details === "string" && details.trim()) {
      // Split by newlines if passed as block text
      formattedDetails = details
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);
    }

    // Format imageUrls to guarantee an array of strings
    let formattedImageUrls: string[] = [];
    if (Array.isArray(imageUrls)) {
      formattedImageUrls = imageUrls;
    } else if (typeof imageUrl === "string" && imageUrl.trim()) {
      formattedImageUrls = [imageUrl.trim()];
    }

    // Format imagePublicIds to guarantee an array of strings
    let formattedImagePublicIds: string[] = [];
    if (Array.isArray(imagePublicIds)) {
      formattedImagePublicIds = imagePublicIds;
    } else if (typeof imagePublicId === "string" && imagePublicId.trim()) {
      formattedImagePublicIds = [imagePublicId.trim()];
    }

    const docRef = await adminDb.collection("projects").add({
      title: title.trim(),
      description: description.trim(),
      details: formattedDetails,
      tags: Array.isArray(tags) ? tags : [],
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
      swaggerUrl: swaggerUrl || "",
      imageUrls: formattedImageUrls,
      imagePublicIds: formattedImagePublicIds,
      featured: Boolean(featured),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: "Project created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}