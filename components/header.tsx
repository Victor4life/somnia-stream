"use client";

import { Zap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isConnected: boolean;
  onConnect: () => void;
}

export default function Header({ isConnected, onConnect }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-gray-950" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Somnia</h1>
              <p className="text-xs text-gray-400">Web3 Dashboard</p>
            </div>
          </div>

          {/* Wallet Button - Dynamic based on connection state */}
          {isConnected ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 border border-cyan-500/30 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-sm text-gray-300">0x1234...5678</span>
              </div>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                onClick={() => window.location.reload()}
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              className="bg-cyan-500 hover:bg-cyan-600 text-gray-950 font-semibold px-6 py-2 rounded-lg transition-colors"
              onClick={onConnect}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
