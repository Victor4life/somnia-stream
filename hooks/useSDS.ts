"use client";

import { useState, useEffect } from "react";
import { SDK } from "@somnia-chain/streams";
import { createPublicClient, http, defineChain } from "viem";

export function useSDS() {
  const [client, setClient] = useState<SDK | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const chain = defineChain({
          id: 1337, // Replace with actual Somnia Testnet chain ID
          name: "Somnia Testnet",
          network: "somnia-testnet",
          nativeCurrency: { name: "SOMI", symbol: "SOMI", decimals: 18 },
          rpcUrls: { default: { http: ["https://rpc.somnia.network"] } },
        });

        const publicClient = createPublicClient({
          chain,
          transport: http(),
        });

        const sdk = new SDK({ public: publicClient });
        setClient(sdk);
        setConnected(true);
        console.log("✅ Connected to Somnia Data Streams");
      } catch (err) {
        console.error("❌ SDS initialization failed:", err);
      }
    }

    init();
  }, []);

  return { client, connected };
}
