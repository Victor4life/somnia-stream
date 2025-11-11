"use client";

import {
  TrendingUp,
  Zap,
  Shield,
  Layers,
  Activity,
  BarChart3,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: TrendingUp,
      title: "Real-Time Metrics",
      description:
        "Monitor live transaction volumes, token prices, and active users as they happen on the blockchain.",
    },
    {
      icon: Zap,
      title: "Instant Alerts",
      description:
        "Get notified instantly about significant network activities and transaction milestones.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data is encrypted and protected. We never store your private keys or sensitive information.",
    },
    {
      icon: Layers,
      title: "Multi-Layer Analytics",
      description:
        "Deep dive into transaction flows, wallet interactions, and network patterns.",
    },
    {
      icon: Activity,
      title: "Live Transaction Feed",
      description:
        "See every transaction on the Somnia network with detailed metadata and status.",
    },
    {
      icon: BarChart3,
      title: "Advanced Charts",
      description:
        "Visualize trends with professional-grade charts and historical data analysis.",
    },
  ];

  return (
    <section className="py-20 bg-gray-950 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Powerful <span className="text-cyan-400">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to monitor, analyze, and understand the Somnia
            network in real-time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
