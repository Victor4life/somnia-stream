// lib/fake-somnia-events.js
"use client";

export function startFakeSomniaEvents(setTransactions) {
  console.log("⚡ Fake Somnia event simulator started");

  setInterval(() => {
    const fakeTx = {
      id: Math.random().toString(36).slice(2),
      user: "0x" + Math.random().toString(16).slice(2, 10),
      action: ["swap", "deposit", "withdraw"][Math.floor(Math.random() * 3)],
      amount: (Math.random() * 2).toFixed(3),
      timestamp: Date.now(),
    };

    setTransactions((prev) => [...prev, fakeTx]);
  }, 5000); // every 5 seconds
}
