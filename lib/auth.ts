// Import the credentials provider from NextAuth
import CredentialsProvider from "next-auth/providers/credentials";

// Import type definition for NextAuthOptions
import type { NextAuthOptions } from "next-auth";

// Import bcrypt for password hashing comparison
import bcrypt from "bcryptjs";

// Import DB connection utility and User model
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

// Export NextAuth configuration options
export const authOptions: NextAuthOptions = {
  // Registering providers
  providers: [
    CredentialsProvider({
      name: "Credentials", // Custom name for the provider
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Function to authorize user during login
      async authorize(credentials) {
        // Check for missing credentials
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }

        try {
          // Connect to MongoDB
          await connectToDatabase();

          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with the given email.");
          }

          // Compare entered password with hashed password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password.");
          }

          // Return session-safe user object if login is successful
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],

  // Callbacks to customize JWT and session behavior
  callbacks: {
    // Called when JWT token is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to token payload
      }
      return token;
    },

    // Called whenever a session is checked or created
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Attach token ID to session user
      }
      return session;
    },
  },

  // Define custom pages for sign-in and error redirects
  pages: {
    signIn: "/login", // Redirect to /login for sign-in
    error: "/login",  // Show error on the same login page
  },

  // Configure session settings
  session: {
    strategy: "jwt", // Use JWT-based session instead of database sessions
    maxAge: 30 * 24 * 60 * 60, // Session lasts for 30 days
  },

  // Secret for signing the tokens (required)
  secret: process.env.NEXTAUTH_SECRET,
};
