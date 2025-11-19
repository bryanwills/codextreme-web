export const TWEAK_CATEGORIES = [
  "network",
  "memory",
  "gpu",
  "windows_features",
  "firewall_security",
  "nagle_algorithm",
  "network_throttling",
  "system_responsiveness",
  "latency_timers",
] as const;

export type TweakCategory = (typeof TWEAK_CATEGORIES)[number];

export const CATEGORY_ICONS: Record<TweakCategory, string> = {
  network: "🌐",
  memory: "🧠",
  gpu: "🎮",
  windows_features: "⚙️",
  firewall_security: "🛡️",
  nagle_algorithm: "🔧",
  network_throttling: "📊",
  system_responsiveness: "⚡",
  latency_timers: "⏱️",
};

export const CATEGORY_COLORS: Record<
  TweakCategory,
  { color: string; textColor: string }
> = {
  network: {
    color: "from-slate-600 to-slate-800",
    textColor: "from-slate-700 to-slate-900",
  },
  memory: {
    color: "from-purple-400 to-purple-600",
    textColor: "from-purple-500 to-purple-700",
  },
  gpu: {
    color: "from-green-400 to-green-600",
    textColor: "from-green-500 to-green-700",
  },
  windows_features: {
    color: "from-cyan-400 to-cyan-600",
    textColor: "from-cyan-500 to-cyan-700",
  },
  firewall_security: {
    color: "from-red-400 to-red-600",
    textColor: "from-red-500 to-red-700",
  },
  nagle_algorithm: {
    color: "from-orange-400 to-orange-600",
    textColor: "from-orange-500 to-orange-700",
  },
  network_throttling: {
    color: "from-pink-400 to-pink-600",
    textColor: "from-pink-500 to-pink-700",
  },
  system_responsiveness: {
    color: "from-indigo-400 to-indigo-600",
    textColor: "from-indigo-500 to-indigo-700",
  },
  latency_timers: {
    color: "from-yellow-400 to-yellow-600",
    textColor: "from-yellow-500 to-yellow-700",
  },
};
