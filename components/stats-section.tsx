"use client";

export default function StatsSection() {
  const stats = [
    {
      value: "10M+",
      label: "Transactions Tracked",
    },
    {
      value: "500K+",
      label: "Active Users",
    },
    {
      value: "99.9%",
      label: "Uptime",
    },
    {
      value: "24/7",
      label: "Real-Time Monitoring",
    },
  ];

  return (
    <section className="py-16 bg-gray-950 text-white px-4 sm:px-6 lg:px-8 border-y border-cyan-500/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
