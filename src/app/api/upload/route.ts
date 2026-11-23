import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Check for multiple files ('files') or fallback to single ('file')
        let files = formData.getAll("files") as File[];
        if (files.length === 0) {
            const singleFile = formData.get("file") as File | null;
            if (singleFile) {
                files = [singleFile];
            }
        }

        if (files.length === 0) {
            return NextResponse.json(
                { success: false, error: "No files provided for upload" },
                { status: 400 }
            );
        }

        // Upload all files concurrently
        const uploadPromises = files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "portfolio-projects",
                        resource_type: "image",
                    },
                    (error, result: any) => {
                        if (error || !result) {
                            reject(error || new Error("Cloudinary upload failed"));
                        } else {
                            resolve({
                                url: result.secure_url,
                                public_id: result.public_id,
                            });
                        }
                    }
                );
                uploadStream.end(buffer);
            });
        });

        const uploadResults = await Promise.all(uploadPromises);

        const imageUrls = uploadResults.map((item) => item.url);
        const imagePublicIds = uploadResults.map((item) => item.public_id);

        return NextResponse.json(
            {
                success: true,
                imageUrls,
                imagePublicIds,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Cloudinary upload error:", error);
        return NextResponse.json(
            { success: false, error: error.message || "Failed to upload files" },
            { status: 500 }
        );
    }
}