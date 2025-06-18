import { ImageKitProvider } from "@imagekit/next"; 
import { SessionProvider } from "next-auth/react"; // NextAuth session context provider

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT!; // ImageKit public endpoint (must be defined in .env)

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Provides session context to the entire app (auto-refetches every 5 mins)
    <SessionProvider refetchInterval={5 * 60}>
      {/* Provides ImageKit upload/transformation context to child components */}
      <ImageKitProvider urlEndpoint={urlEndPoint}>
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
