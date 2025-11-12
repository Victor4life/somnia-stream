"use client";

import { useState, useEffect } from "react";
import MetricCard from "./metric-card";
import { TrendingUp, BarChart3, Users } from "lucide-react";
import { useSDS } from "@/hooks/useSDS";

export default function MetricsGrid() {
  const { client: sdsClient, connected } = useSDS();

  const [metrics, setMetrics] = useState({
    transactions: 0,
    tokenPrice: 2.47, // dummy initial value
    activeUsers: 3847, // dummy initial value
  });

  useEffect(() => {
    if (!connected || !sdsClient) return;

    let txSubscription: { unsubscribe: () => void } | undefined;
    let priceSubscription: { unsubscribe: () => void } | undefined;
    let usersSubscription: { unsubscribe: () => void } | undefined;

    const initSubscriptions = async () => {
      try {
        // Subscribe to transaction stream
        txSubscription = await sdsClient.streams.subscribe({
          somniaStreamsEventId: undefined, // or specific event ID
          ethCalls: [],
          context: "transactions",
          onData: () =>
            setMetrics((prev) => ({
              ...prev,
              transactions: prev.transactions + 1,
            })),
          onlyPushChanges: true,
        });

        // Subscribe to token price stream
        priceSubscription = await sdsClient.streams.subscribe({
          somniaStreamsEventId: undefined,
          ethCalls: [],
          context: "tokenPrice",
          onData: (data: any) =>
            setMetrics((prev) => ({
              ...prev,
              tokenPrice: data.price ?? prev.tokenPrice,
            })),
          onlyPushChanges: true,
        });

        // Subscribe to active users stream
        usersSubscription = await sdsClient.streams.subscribe({
          somniaStreamsEventId: undefined,
          ethCalls: [],
          context: "activeUsers",
          onData: (data: any) =>
            setMetrics((prev) => ({
              ...prev,
              activeUsers: data.count ?? prev.activeUsers,
            })),
          onlyPushChanges: true,
        });
      } catch (err) {
        console.error("❌ Failed to initialize metrics subscriptions:", err);
      }
    };

    initSubscriptions();

    return () => {
      txSubscription?.unsubscribe();
      priceSubscription?.unsubscribe();
      usersSubscription?.unsubscribe();
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
