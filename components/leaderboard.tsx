"use client";

export default function Leaderboard({ transactions }) {
  const counts = {};

  transactions.forEach((tx) => {
    counts[tx.user] = (counts[tx.user] || 0) + 1;
  });

  const leaders = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Top Active Wallets</h2>

      {leaders.length === 0 && <p className="text-gray-500">No activity yet</p>}

      <ul className="space-y-3">
        {leaders.map(([wallet, count], i) => (
          <li
            key={i}
            className="flex justify-between text-gray-300 bg-gray-800/40 p-3 rounded-lg"
          >
            <span>{wallet.slice(0, 8)}...</span>
            <span className="font-bold text-cyan-400">{count} tx</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
