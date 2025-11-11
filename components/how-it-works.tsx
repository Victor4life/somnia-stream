"use client";

import { Wallet, Zap, BarChart3, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Wallet,
      title: "Connect Your Wallet",
      description:
        "Simply connect your Web3 wallet to get started. We support all major wallet providers on the Somnia network.",
    },
    {
      number: 2,
      icon: Zap,
      title: "Access Dashboard",
      description:
        "Instantly gain access to your personalized dashboard with live metrics and real-time blockchain data.",
    },
    {
      number: 3,
      icon: BarChart3,
      title: "Monitor & Analyze",
      description:
        "Watch transactions, track token prices, and analyze network activity with advanced visualization tools.",
    },
    {
      number: 4,
      icon: Rocket,
      title: "Make Informed Decisions",
      description:
        "Use data-driven insights to optimize your Web3 strategies and stay ahead of market trends.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            How It <span className="text-cyan-400">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get up and running in just 4 simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line - hidden on mobile and last item */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
                )}

                {/* Step Card */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/50">
                    <Icon className="w-8 h-8 text-gray-950 font-bold" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-cyan-400">{step.number}.</span>{" "}
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
