"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface WalletContextType {
  walletAddress: string | null;
  isWalletConnected: boolean;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        alert("Please install a web3 wallet (e.g., MetaMask) to continue.");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      alert("Wallet connection failed.");
    }
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, isWalletConnected, connectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
