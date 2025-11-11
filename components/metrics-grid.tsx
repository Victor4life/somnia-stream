"use client";

import { useState, useEffect } from "react";
import MetricCard from "./metric-card";
import { TrendingUp, BarChart3, Users } from "lucide-react";
import { useSDS } from "@/hooks/useSDS";

export default function MetricsGrid() {
  const { client: sdsClient, connected } = useSDS();

  const [metrics, setMetrics] = useState({
    transactions: 0,
    tokenPrice: 2.47, // initial dummy value
    activeUsers: 3847, // initial dummy value
  });

  useEffect(() => {
    if (!connected || !sdsClient) return;

    // Subscribe to transaction stream
    const unsubscribeTx = sdsClient.subscribe({
      stream: "transactions",
      onData: (txData: any) => {
        setMetrics((prev) => ({
          ...prev,
          transactions: prev.transactions + 1, // increment with each transaction
        }));
      },
    });

    // Simulate token price & active users for demo
    const metricsInterval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        tokenPrice: +(prev.tokenPrice + (Math.random() - 0.5) * 0.1).toFixed(2),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3 - 1),
      }));
    }, 5000);

    return () => {
      unsubscribeTx(); // cleanup subscription
      clearInterval(metricsInterval); // cleanup interval
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
