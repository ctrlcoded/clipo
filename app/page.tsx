import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { headers } from "next/headers";

async function getVideos(): Promise<IVideo[]> {
  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/video`;
  console.log("Fetching videos from:", url);
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();
  console.log("Response status:", res.status);
  console.log("Response text:", text);
  try {
    return JSON.parse(text);
  } catch {
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Video Feed</h1>
      <VideoFeed videos={videos} />
    </div>
  );
}
