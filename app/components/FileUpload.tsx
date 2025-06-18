"use client"; // This component must be a client component

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void; // Callback when upload succeeds
  onProgress?: (progress: number) => void; // Optional progress tracker
  fileType?: "image" | "video"; // Accepted file type
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Optional validation for file type and size
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }
    return true; // ⚠️ Always returns true even if error is set
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null); // Reset any previous error

    try {
      const authRes = await fetch("/api/auth/imagekit-auth"); // Get upload auth from backend
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!, // Must be defined in .env
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100; // Calculate percent uploaded
            onProgress(Math.round(percent)); // Notify parent
          }
        },
      });

      onSuccess(res); // Trigger callback with upload result
    } catch (error) {
      console.error("Upload failed", error); // Handle upload failure
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"} // Set file input type based on prop
        onChange={handleFileChange}
      />
      {uploading && <span>Loading....</span>} {/* Show while uploading */}
    </>
  );
};

export default FileUpload;
