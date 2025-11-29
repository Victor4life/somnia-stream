"use client";

import { useEffect, useState } from "react";

export function useSomniaEvents() {
  const [ready, setReady] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [tokenPrices, setTokenPrices] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    console.log("⚡ Fake Somnia event simulator started");

    setReady(true);

    const interval = setInterval(() => {
      const fakeTx = {
        id: crypto.randomUUID(),
        user: "0x" + Math.random().toString(16).slice(2, 10),
        token: ["SOM", "ETH", "USDT"][Math.floor(Math.random() * 3)],
        amount: (Math.random() * 5).toFixed(3),
        timestamp: Date.now(),
      };

      const fakePrice = {
        token: fakeTx.token,
        newPrice: (0.5 + Math.random() * 5).toFixed(2),
        timestamp: Date.now(),
      };

      const fakeActive = {
        userCount: Math.floor(20 + Math.random() * 100),
        timestamp: Date.now(),
      };

      // --- MOST IMPORTANT PART ---
      setTransactions((prev) => [fakeTx, ...prev.slice(0, 20)]);
      setTokenPrices((prev) => [fakePrice, ...prev.slice(0, 20)]);
      setActiveUsers((prev) => [fakeActive, ...prev.slice(0, 20)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { ready, transactions, tokenPrices, activeUsers };
}
