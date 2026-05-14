import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Subsection {
  title: string;
  content?: string;
  command?: string;
  language?: string;
  type?: "warning" | "note" | "info";
}

interface TweakInput {
  id: string;
  name: string;
  description: string;
  benefit: string;
  impact?: "low" | "medium" | "high";
  impactLevel?: "low" | "medium" | "high";
  subsections: Subsection[];
}

interface TweakOutput {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  benefit: { en: string; es: string };
  impact: "low" | "medium" | "high";
  commands: string[];
  warnings: { en: string[]; es: string[] };
}

interface CategoryOutput {
  id: string;
  icon: string;
  name: { en: string; es: string };
  tweaks: TweakOutput[];
}

const CATEGORY_ICONS: Record<string, string> = {
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

function getImpact(tweak: TweakInput): "low" | "medium" | "high" {
  return (tweak.impact || tweak.impactLevel || "low") as "low" | "medium" | "high";
}

function extractCommands(subsections: Subsection[]): string[] {
  return subsections
    .filter((s) => s.command)
    .map((s) => s.command!)
    .flatMap((cmd) => cmd.split("\n").filter((line) => line.trim()));
}

function extractWarnings(subsections: Subsection[]): string[] {
  return subsections
    .filter((s) => s.type === "warning" && s.content)
    .map((s) => s.content!);
}

function normalizeTweak(en: TweakInput, es: TweakInput): TweakOutput {
  return {
    id: en.id,
    name: { en: en.name, es: es.name },
    description: { en: en.description, es: es.description },
    benefit: { en: en.benefit, es: es.benefit },
    impact: getImpact(en),
    commands: extractCommands(en.subsections),
    warnings: {
      en: extractWarnings(en.subsections),
      es: extractWarnings(es.subsections),
    },
  };
}

const CATEGORY_MAP: Record<string, { importPath: string; exportName: string; name_es: string; name_en: string }> = {
  network: {
    importPath: "../src/data/networkTweaks",
    exportName: "networkTweaks",
    name_en: "Network",
    name_es: "Red",
  },
  memory: {
    importPath: "../src/data/memoryTweaks",
    exportName: "memoryTweaks",
    name_en: "Memory & CPU",
    name_es: "Memoria y CPU",
  },
  gpu: {
    importPath: "../src/data/gpuTweaks",
    exportName: "gpuTweaks",
    name_en: "GPU",
    name_es: "GPU",
  },
  windows_features: {
    importPath: "../src/data/windowsFeaturesTweaks",
    exportName: "windowsFeaturesTweaks",
    name_en: "Windows Features",
    name_es: "Características de Windows",
  },
  firewall_security: {
    importPath: "../src/data/firewallSecurityTweaks",
    exportName: "firewallSecurityTweaks",
    name_en: "Firewall & Security",
    name_es: "Firewall y Seguridad",
  },
  nagle_algorithm: {
    importPath: "../src/data/nagleAlgorithmTweaks",
    exportName: "nagleAlgorithmTweaks",
    name_en: "Nagle Algorithm",
    name_es: "Algoritmo de Nagle",
  },
  network_throttling: {
    importPath: "../src/data/networkThrottlingTweaks",
    exportName: "networkThrottlingTweaks",
    name_en: "Network Throttling",
    name_es: "Limitación de Red",
  },
  system_responsiveness: {
    importPath: "../src/data/systemResponsivenessTweaks",
    exportName: "systemResponsivenessTweaks",
    name_en: "System Responsiveness",
    name_es: "Capacidad de Respuesta",
  },
  latency_timers: {
    importPath: "../src/data/latencyAndTimersTweaks",
    exportName: "latencyAndTimersTweaks",
    name_en: "Latency & Timers",
    name_es: "Latencia y Temporizadores",
  },
};

async function main() {
  const categories: CategoryOutput[] = [];

  for (const [id, info] of Object.entries(CATEGORY_MAP)) {
    console.log(`Loading ${info.exportName} from ${info.importPath}...`);
    const module = await import(info.importPath);
    const data = module[info.exportName];
    if (!data || !data.en || !data.es) {
      console.error(`  Could not find ${info.exportName} in module, keys:`, Object.keys(module));
      continue;
    }

    const tweaks: TweakOutput[] = [];
    for (let i = 0; i < Math.max(data.en.length, data.es.length); i++) {
      const enTweak = data.en[i] as TweakInput;
      const esTweak = data.es[i] as TweakInput;
      if (enTweak && esTweak) {
        tweaks.push(normalizeTweak(enTweak, esTweak));
      }
    }

    categories.push({
      id,
      icon: CATEGORY_ICONS[id],
      name: { en: info.name_en, es: info.name_es },
      tweaks,
    });

    console.log(`  ${tweaks.length} tweaks, ${tweaks.reduce((s, t) => s + t.commands.length, 0)} commands`);
  }

  const outputPath = path.resolve(__dirname, "..", "public", "tweaks.json");
  fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2), "utf-8");
  console.log(`\nExported ${categories.length} categories to ${outputPath}`);
  console.log(`Total tweaks: ${categories.reduce((sum, c) => sum + c.tweaks.length, 0)}`);
}

main().catch((e) => {
  console.error("Export failed:", e);
  process.exit(1);
});
