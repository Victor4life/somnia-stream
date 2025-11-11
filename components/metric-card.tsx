"use client"

import type { ReactNode } from "react"

interface MetricCardProps {
  icon: ReactNode
  title: string
  value: string | number
  change: string
  changeType: "positive" | "negative"
}

export default function MetricCard({ icon, title, value, change, changeType }: MetricCardProps) {
  const changeColor = changeType === "positive" ? "text-cyan-400" : "text-red-400"

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
      {/* Icon and Title */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className="text-cyan-400">{icon}</div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>

      {/* Change Indicator */}
      <div className={`text-sm font-semibold ${changeColor}`}>{change}</div>
    </div>
  )
}
