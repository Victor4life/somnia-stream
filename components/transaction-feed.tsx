"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import type { SDK } from "@somnia-chain/streams";

interface Transaction {
  id: string;
  wallet: string;
  hash: string;
  value: string;
  timestamp: string;
  status: "pending" | "completed";
}

interface Props {
  sdsClient?: SDK | null;
  connected: boolean;
}

export default function TransactionFeed({ sdsClient, connected }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!connected || !sdsClient) return;

    let sub: any;

    const init = async () => {
      try {
        // Subscribe to STT token transfers
        sub = await sdsClient.streams.subscribe({
          somniaStreamsEventId: undefined,
          ethCalls: [],
          context: "sttTransfers", // Hackathon-specific
          onData: (txData: any) => {
            const hash =
              txData?.transactionHash ?? `${Date.now().toString(16)}`;
            const wallet = txData?.from ?? "0xunknown";
            const amount = txData?.amount ?? txData?.value ?? "0";

            const newTx: Transaction = {
              id: hash,
              wallet,
              hash,
              value: `${amount} STT`,
              timestamp: new Date().toLocaleTimeString(),
              status: "completed",
            };

            setTransactions((prev) => [newTx, ...prev.slice(0, 7)]);
          },
          onlyPushChanges: true,
        });
      } catch (err) {
        console.error("❌ Transaction subscription failed:", err);
      }
    };

    init();

    return () => {
      sub?.unsubscribe?.();
    };
  }, [connected, sdsClient]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
        <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-950/50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Wallet
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Transaction Hash
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  Loading transactions...
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-gray-800/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm text-cyan-400 font-mono">
                      {tx.wallet}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`View tx: ${tx.hash}`);
                      }}
                    >
                      {tx.hash} <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-white">
                      {tx.value}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-400">
                      {tx.timestamp}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        tx.status === "completed"
                          ? "bg-cyan-400/20 text-cyan-400"
                          : "bg-yellow-400/20 text-yellow-400"
                      }`}
                    >
                      {tx.status === "completed" ? "✓ Completed" : "⏱ Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
