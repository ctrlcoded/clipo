import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Handle GET request: Fetch all videos
export async function GET() {
  try {
    await connectToDatabase();

    // Fetch videos sorted by creation time (newest first)
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json([], { status: 200 }); // Return empty array if no videos
    }

    return NextResponse.json(videos); // Return found videos
  } catch (error) {
    console.error("GET /api/videos error:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

// Handle POST request: Create a new video entry
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Parse JSON body
    const body: IVideo = await request.json();

    // Validate required fields
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare video data for saving
    const videoData = {
      ...body,
      controls: body?.controls ?? true, // Default to true if not provided
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
    };

    // Save to database
    const newVideo = await Video.create(videoData);

    return NextResponse.json(newVideo); // Return newly created video
  } catch (error) {
    console.error("POST /api/videos error:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
