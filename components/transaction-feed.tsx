"use client";

export default function TransactionFeed({ transactions = [], connected }) {
  if (!connected) {
    return (
      <p className="text-gray-400 text-sm">
        Waiting for Somnia Data Streams...
      </p>
    );
  }

  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions yet...</p>;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

      <div className="space-y-4">
        {transactions.map((t, i) => {
          // Safe values with fallbacks
          const user = t.user || "Unknown";
          const txHash = t.txHash || "N/A";
          const timestamp = t.timestamp ? new Date(t.timestamp).toLocaleTimeString() : "Unknown";
          const amount = !isNaN(Number(t.amount)) ? t.amount : 0;

          return (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-800/40 p-4 rounded-lg"
            >
              <div>
                <p className="text-sm text-gray-300">
                  Wallet:{" "}
                  <span className="text-cyan-400">
                    {user.slice(0, 6)}...{user.slice(-4)}
                  </span>
                </p>

                <a
                  href={`https://explorer.somnia.network/tx/${txHash}`}
                  className="text-xs text-cyan-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {txHash.slice(0, 10)}...
                </a>

                <p className="text-gray-400 text-xs mt-1">{timestamp}</p>
              </div>

              <span className="font-bold text-cyan-300">{amount} STT</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
