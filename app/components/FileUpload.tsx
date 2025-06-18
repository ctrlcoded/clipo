"use client"; // This component must be a client component

import { useState, useRef } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Reset states
    setError(null);
    setUploadedUrl(null);

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size should be less than 10MB");
      return;
    }

    // Create preview
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadedUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      // Trigger same validation as file input
      if (fileRef.current) {
        fileRef.current.files = e.dataTransfer.files;
        handleFileSelect({ target: fileRef.current } as any);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,video/*"
        />

        {preview ? (
          <div className="space-y-4">
            {file?.type.startsWith("image/") ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-[300px] mx-auto rounded-lg"
              />
            ) : (
              <video
                src={preview}
                controls
                className="max-h-[300px] mx-auto rounded-lg"
              />
            )}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setUploadedUrl(null);
                }}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center gap-4 p-6"
          >
            <FiUploadCloud className="w-12 h-12 text-gray-400" />
            <div className="text-gray-600">
              <p className="font-medium">Click to upload</p>
              <p className="text-sm">or drag and drop</p>
              <p className="text-xs mt-1 text-gray-500">
                Images and videos up to 10MB
              </p>
            </div>
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <FiX className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {uploadedUrl && (
        <div className="mt-4 p-4 bg-green-50 text-green-600 rounded-lg">
          <p className="font-medium">File uploaded successfully! 🎉</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline mt-2 block"
          >
            View uploaded file
          </a>
        </div>
      )}
    </div>
  );
}
