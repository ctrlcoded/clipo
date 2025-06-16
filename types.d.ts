import { Connection } from "mongoose";

// Declares a global variable `mongoose` to cache the connection and promise across hot reloads (useful in development)
declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };
}

export {}
