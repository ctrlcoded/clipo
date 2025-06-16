import mongoose from 'mongoose';

// Get MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

// Use global variable to cache the DB connection across hot reloads (especially for development)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    // Return cached connection if it already exists
    if (cached.conn) {
        return cached.conn;
    }

    // If no existing promise, start a new connection
    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10, // Maintain up to 10 socket connections
        };

        // Connect to MongoDB and assign promise
        cached.promise = mongoose.connect(MONGO_URI, opts).then(() => mongoose.connection);
    }

    try {
        // Await the promise and cache the connection
        cached.conn = await cached.promise;
    } catch (error) {
        // Reset the promise on failure
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}
