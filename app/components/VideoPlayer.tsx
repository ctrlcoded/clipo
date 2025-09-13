"use client";
import { IKVideo } from "imagekitio-react";
import { IVideo } from "@/models/Video";

export default function VideoPlayer({ video }: { video: IVideo }) {
  return (
    <IKVideo
      path={video.videoUrl}
      transformation={[
        {
          height: "1920",
          width: "1080",
        },
      ]}
      controls={video.controls}
      className="w-full h-full object-cover"
    />
  );
}
