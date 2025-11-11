"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onConnect: () => void;
}

export default function CTASection({ onConnect }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Background accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Explore <span className="text-cyan-400">Somnia</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Start monitoring real-time blockchain metrics and gain insights into
            the Somnia network today.
          </p>

          <Button
            onClick={onConnect}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-gray-950 font-bold px-10 py-6 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto text-lg shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60"
          >
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>

          <p className="text-sm text-gray-500 mt-6">
            • No credit card required. Start exploring instantly •
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 pt-8">
          © 2025 Somnia Stream — Built with 💙 for Somnia Datastreams Hackathon
        </p>
      </div>
    </section>
  );
}
