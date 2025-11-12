"use client";

import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import MetricsGrid from "@/components/metrics-grid";
import TransactionFeed from "@/components/transaction-feed";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import CTASection from "@/components/cta-section";
import StatsSection from "@/components/stats-section";
import { useSDS } from "@/hooks/useSDS";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // ✅ Initialize Somnia Data Streams (SDS)
  const { client: sdsClient, connected: isSDSConnected } = useSDS();

  const handleWalletConnect = () => setIsWalletConnected(true);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header isConnected={isWalletConnected} onConnect={handleWalletConnect} />

      {!isWalletConnected ? (
        <>
          <Hero onConnect={handleWalletConnect} />
          <StatsSection />
          <Features />
          <HowItWorks />
          <CTASection onConnect={handleWalletConnect} />
        </>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* ✅ SDS Connection Status */}
          {!isSDSConnected ? (
            <p className="text-cyan-400 text-sm">
              Connecting to Somnia Data Streams...
            </p>
          ) : (
            <p className="text-cyan-400 text-sm">
              Connected to Somnia Data Streams
            </p>
          )}

          {/* ✅ Live Metrics & Transaction Feed */}
          <MetricsGrid sdsClient={sdsClient} connected={isSDSConnected} />
          <TransactionFeed sdsClient={sdsClient} connected={isSDSConnected} />
        </main>
      )}
    </div>
  );
}
