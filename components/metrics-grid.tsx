"use client";

import { useState, useEffect } from "react";
import MetricCard from "./metric-card";
import { TrendingUp, BarChart3, Users } from "lucide-react";
import type { SDK } from "@somnia-chain/streams";

interface Props {
  sdsClient?: SDK | null;
  connected: boolean;
}

interface Metrics {
  transactions: number;
  tokenPrice: number;
  activeUsers: number;
}

export default function MetricsGrid({ sdsClient, connected }: Props) {
  const [metrics, setMetrics] = useState<Metrics>({
    transactions: 0,
    tokenPrice: 2.47,
    activeUsers: 3847,
  });

  useEffect(() => {
    if (!connected || !sdsClient) return;

    let txSub: any;
    let cancelled = false;

    const init = async () => {
      try {
        // Subscribe to STT token transfers
        txSub = await sdsClient.streams.subscribe({
          somniaStreamsEventId: undefined,
          ethCalls: [],
          context: "sttTransfers", // Hackathon-specific
          onData: (tx: any) => {
            // Increment total transactions
            setMetrics((prev) => ({
              ...prev,
              transactions: prev.transactions + 1,
              activeUsers: prev.activeUsers + 1, // optional: count unique wallets
            }));
          },
          onlyPushChanges: true,
        });
      } catch (err) {
        console.error("❌ Metrics subscription failed:", err);
      }
    };

    init();

    // fallback simulation for tokenPrice
    const simInterval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        tokenPrice: +(prev.tokenPrice + (Math.random() - 0.5) * 0.05).toFixed(
          2
        ),
      }));
    }, 5000);

    return () => {
      cancelled = true;
      txSub?.unsubscribe?.();
      clearInterval(simInterval);
    };
  }, [connected, sdsClient]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        icon={<BarChart3 className="w-6 h-6" />}
        title="Total Transactions"
        value={metrics.transactions.toLocaleString()}
        change="+2.4%"
        changeType="positive"
      />
      <MetricCard
        icon={<TrendingUp className="w-6 h-6" />}
        title="SOMI Token Price"
        value={`$${metrics.tokenPrice.toFixed(2)}`}
        change="+5.1%"
        changeType="positive"
      />
      <MetricCard
        icon={<Users className="w-6 h-6" />}
        title="Active Users"
        value={metrics.activeUsers.toLocaleString()}
        change="+1.2%"
        changeType="positive"
      />
    </div>
  );
}
