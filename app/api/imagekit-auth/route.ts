// File: app/api/upload-auth/route.ts

import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server"; // ❗ Required for Response.json()

export async function GET() {
  try {
    // Generate ImageKit upload authentication parameters
    const authenticationParameters = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Only used on server
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string, // Can be exposed to client
    });

    // Return auth params + public key to the client
    return NextResponse.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });

  } catch (error) {
    console.error("ImageKit Auth Error:", error);

    // Handle error and return 500
    return NextResponse.json(
      {
        error: "Failed to get upload authentication parameters",
      },
      {
        status: 500,
      }
    );
  }
}
