import "./globals.css";
import {Outfit}  from "next/font/google"
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const outfit=Outfit({
  subsets: ['latin'],
})

export const metadata = {
  title: "SmartDocs.ai",
  description: "Instantly get answers from your PDFs with AI-powered insights.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
      >
        <Provider>
        {children}
        </Provider>
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
    
  );
}
