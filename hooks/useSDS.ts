"use client";

import { useEffect, useState } from "react";
import { SDK } from "@somnia-chain/streams";
import { createPublicClient, webSocket, defineChain } from "viem";

export function useSDS() {
  const [client, setClient] = useState<SDK | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        // Somnia Testnet config
        const somniaTestnet = defineChain({
          id: 50312,
          name: "Somnia Testnet",
          network: "somnia-testnet",
          nativeCurrency: { name: "STT", symbol: "STT", decimals: 18 },
          rpcUrls: {
            default: {
              http: ["https://dream-rpc.somnia.network"],
              webSocket: ["wss://dream-rpc.somnia.network/ws"], // <-- WebSocket URL
            },
          },
        });

        // Create WebSocket client
        const wsPublicClient = createPublicClient({
          chain: somniaTestnet,
          transport: webSocket(somniaTestnet.rpcUrls.default.webSocket[0]),
        });

        // Initialize SDK
        const sdk = new SDK({
          public: wsPublicClient, // <- this accepts the WS transport
        });

        if (!mounted) return;
        setClient(sdk);
        setConnected(true);

        console.log("✅ Connected to Somnia Testnet via WebSocket");
      } catch (err) {
        console.error("❌ SDS init error:", err);
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, []);

  return { client, connected };
}
