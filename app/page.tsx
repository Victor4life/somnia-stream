"use client";

import Header from "@/components/header";
import Hero from "@/components/hero";
import MetricsGrid from "@/components/metrics-grid";
import TransactionFeed from "@/components/transaction-feed";
import Features from "@/components/features";
import HowItWorks from "@/components/how-it-works";
import CTASection from "@/components/cta-section";
import StatsSection from "@/components/stats-section";
import { useWallet } from "@/providers/wallet-provider";
import { useSomniaEvents } from "@/hooks/useSomniaEvents";
import AIAssistant from "@/components/ai-assistant";
import Leaderboard from "@/components/leaderboard";

export default function Home() {
  const { walletAddress, isWalletConnected, connectWallet } = useWallet();
  const { ready, transactions, tokenPrices, activeUsers } = useSomniaEvents();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header 
        isConnected={isWalletConnected} 
        onConnect={connectWallet} 
        walletAddress={walletAddress} 
      />

      {!isWalletConnected ? (
        <>
          <Hero onConnect={connectWallet} />
          <StatsSection />
          <Features />
          <HowItWorks />
          <CTASection onConnect={connectWallet} />
          
        </>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {!ready ? (
            <p className="text-cyan-400 text-sm">Connecting to Somnia Data Streams...</p>
          ) : (
            <p className="text-cyan-400 text-sm">Connected to Somnia Data Streams</p>
          )}

          <MetricsGrid
            connected={ready}
            transactions={transactions}
            tokenPrices={tokenPrices}
            activeUsers={activeUsers}
          />

          <Leaderboard transactions={transactions} />

          <TransactionFeed 
            connected={ready} 
            transactions={transactions} 
          />

          <AIAssistant
            lastTx={transactions[0] || null}
            lastPrice={tokenPrices[0]?.newPrice || null}
            lastUsers={activeUsers[0]?.userCount || null}
          />

        </main>
      )}
    </div>
  );
}
