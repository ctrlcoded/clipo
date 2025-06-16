import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Default dimensions for video (used in transformations)
export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920,
} as const;

// Video interface defining structure and types
export interface IVideo {
    _id?: mongoose.Types.ObjectId; // Optional MongoDB-generated ID
    title: string;                // Video title
    description: string;          // Video description
    videoUrl: string;             // Hosted video URL
    thumbnailUrl: string;         // Thumbnail image URL
    controls?: boolean;           // Show player controls or not
    transformations?: {           // Optional video transformation settings
        height: number;
        width: number;
        quality?: number;         // Optional quality (1–100)
    };
}

// Mongoose schema to define how video data is stored in MongoDB
const VideoSchema: Schema = new Schema<IVideo>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        thumbnailUrl: { type: String, required: true },
        videoUrl: { type: String, required: true },
        controls: { type: Boolean, default: true }, // Defaults to true (show controls)
        transformations: {
            height: { type: Number, default: VIDEO_DIMENSIONS.height },
            width: { type: Number, default: VIDEO_DIMENSIONS.width },
            quality: { type: Number, min: 1, max: 100 }, // Optional range-bound quality
        }
    },
    {
        timestamps: true, // Adds `createdAt` and `updatedAt` automatically
    }
);

// Exporting Video model (reuse if already exists to avoid recompile errors)
const Video = models?.Video || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;
