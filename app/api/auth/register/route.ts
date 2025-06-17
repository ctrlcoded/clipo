import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

// API route to handle user registration
export async function POST(request: NextRequest) {
    try {
        // Extract email and password from the request body
        const { email, password } = await request.json(); 

        // Validate input fields
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDatabase();

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists." },
                { status: 400 }
            );
        }

        // Create and save the new user
        await User.create({
            email,
            password
        });

        // Return success response
        return NextResponse.json(
            { message: "User registered successfully." },
            { status: 201 }
        );
    } 
    catch (error) {
        // Handle any server or database errors
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        );
    }
}
