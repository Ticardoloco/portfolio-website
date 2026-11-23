import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { publicIds, publicId } = body;

        // Collect target public IDs from array or fallback single string
        let idsToDelete: string[] = [];
        if (Array.isArray(publicIds)) {
            idsToDelete = publicIds.filter((id) => typeof id === "string" && id.trim());
        } else if (typeof publicId === "string" && publicId.trim()) {
            idsToDelete = [publicId.trim()];
        }

        if (idsToDelete.length === 0) {
            return NextResponse.json(
                { success: false, error: "At least one valid Public ID is required" },
                { status: 400 }
            );
        }

        // Destroy all specified images concurrently on Cloudinary
        const deletePromises = idsToDelete.map((id) =>
            cloudinary.uploader.destroy(id)
        );

        const results = await Promise.all(deletePromises);

        return NextResponse.json(
            {
                success: true,
                message: `Successfully processed deletion for ${idsToDelete.length} image(s)`,
                results,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Cloudinary delete error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to delete image(s)" },
            { status: 500 }
        );
    }
}