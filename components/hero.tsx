"use client";

import { ArrowRight, Zap, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onConnect: () => void;
}

export default function Hero({ onConnect }: HeroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Background gradient accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-2xl shadow-cyan-500/50">
            <Zap className="w-10 h-10 text-gray-950" />
          </div>
        </div>

        {/* Main Heading - Web3 Font Aesthetic */}
        <div className="space-y-4">
          <h1 className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Somnia<span className="text-cyan-400"> Stream</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 font-light tracking-wide">
            Real-time Web3 Intelligence
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
          Monitor live blockchain metrics, track transactions in real-time, and
          gain insights into the Somnia network with cutting-edge analytics.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-cyan-500/30 backdrop-blur">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Live Metrics</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-cyan-500/30 backdrop-blur">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Real-Time Data</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-cyan-500/30 backdrop-blur">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Secure & Fast</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button
            onClick={onConnect}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-gray-950 font-bold px-8 py-6 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto text-lg shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60"
          >
            Connect Wallet & Enter Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Floating Live Badge */}
      <div className="absolute bottom-6 right-10 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900 text-white px-3 py-2 rounded-full shadow-md text-sm font-semibold animate-pulse">
        Live • 24h
      </div>
    </div>
  );
}
