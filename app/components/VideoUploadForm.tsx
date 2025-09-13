"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

function VideoUploadForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!session) {
    return <div className="text-center text-error">You must be logged in to upload videos.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl, thumbnailUrl }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to upload video");
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Video File</label>
        <FileUpload
          fileType="video"
          onSuccess={res => setVideoUrl(res.url || res.filePath || res.fileUrl)}
        />
        {videoUrl && <div className="text-success text-xs mt-1">Video uploaded!</div>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Thumbnail Image</label>
        <FileUpload
          fileType="image"
          onSuccess={res => setThumbnailUrl(res.url || res.filePath || res.fileUrl)}
        />
        {thumbnailUrl && <div className="text-success text-xs mt-1">Thumbnail uploaded!</div>}
      </div>
      {error && <div className="text-error text-sm">{error}</div>}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading || !videoUrl || !thumbnailUrl}
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}

export default VideoUploadForm;
