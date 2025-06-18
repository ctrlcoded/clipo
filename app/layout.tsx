// Type for page metadata (used for SEO, etc.)
import type { Metadata } from "next";

// Import Google Fonts with CSS variable support
import { Inter } from "next/font/google";

// Global styles
import "./globals.css";

// Custom context providers (e.g. Auth, ImageKit)
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";

// Load fonts with CSS variable names
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Default metadata for the app
export const metadata: Metadata = {
  title: "Clipo - Modern File Sharing Platform",
  description: "Share your files securely and easily with Clipo",
  keywords: ["file sharing", "secure", "cloud storage", "upload"],
};

// Root layout for all routes
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} font-sans antialiased min-h-full bg-primary-50`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <footer className="bg-white border-t border-primary-100">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-primary-600">
                  © {new Date().getFullYear()} Clipo. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
