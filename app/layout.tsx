import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WagmiWrapper from "./wagmiWrapper";
import { Toaster } from "@/components/ui/sonner";
import '@coinbase/onchainkit/styles.css';
import { OnChainKitWrapper } from "./onChainKitWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Universal Recruiter",
  description: "Automates recruitment to AI and reduce hiring cost by upto 80%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WagmiWrapper>
          <OnChainKitWrapper>
            <Toaster />
            {children}
          </OnChainKitWrapper>
        </WagmiWrapper>
      </body>
    </html>
  );
}
