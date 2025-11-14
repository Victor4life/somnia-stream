import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { WalletProvider } from "@/providers/wallet-provider";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Somnia Pulse - Web3 Dashboard",
  description: "Real-time crypto metrics and transaction monitoring",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/somnia-stream.png", media: "(prefers-color-scheme: light)" },
      { url: "/somnia-stream.png", media: "(prefers-color-scheme: dark)" },
      { url: "/somnia-stream.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <WalletProvider>{children}</WalletProvider>
        <Analytics />
      </body>
    </html>
  );
}
