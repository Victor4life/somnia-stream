"use client";

import { useEffect, useState } from "react";
import { SDK } from "@somnia-chain/streams";

export function useSDS() {
  const [client, setClient] = useState<SDK | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    try {
      // Create the Somnia Data Streams client
      const sds = new SDK({
        network: "testnet",
        apiKey: process.env.NEXT_PUBLIC_SOMNIA_API_KEY!,
      });

      setClient(sds);
      setConnected(true);
    } catch (err) {
      console.error("❌ Failed to initialize Somnia SDK:", err);
    }
  }, []);

  return { client, connected };
}
