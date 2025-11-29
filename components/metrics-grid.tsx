"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

export default function MetricsGrid({ tokenPrices = [], activeUsers = [], connected }) {
  // Prepare price data safely
  const priceData = tokenPrices.slice(0, 20).map((p) => {
    const value = !isNaN(Number(p.newPrice)) ? Number(p.newPrice) : 0;
    return { value };
  });

  // Prepare user data safely
  const userData = activeUsers.slice(0, 20).map((u) => {
    const value = !isNaN(Number(u.userCount)) ? Number(u.userCount) : 0;
    return { value };
  });

  // Safely get first token price
  const firstPrice = !isNaN(Number(tokenPrices[0]?.newPrice))
    ? Number(tokenPrices[0].newPrice).toFixed(4)
    : "0.0000";

  // Safely get first active user count
  const firstUserCount = !isNaN(Number(activeUsers[0]?.userCount))
    ? Number(activeUsers[0].userCount)
    : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Total Transactions"
        value={connected ? tokenPrices.length : "0"}
        subtitle="+ realtime"
      />

      <MetricCard
        title="Token Price (STT)"
        value={firstPrice}
        subtitle="+ realtime"
        chartData={priceData}
      />

      <MetricCard
        title="Active Users"
        value={firstUserCount}
        subtitle="+ realtime"
        chartData={userData}
      />
    </div>
  );
}

function MetricCard({ title, value, subtitle, chartData }) {
  return (
    <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2 metric-update">{value}</p>
      <p className="text-cyan-400 text-xs mt-1">{subtitle}</p>

      {chartData && (
        <div className="h-12 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="value" stroke="#06b6d4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
