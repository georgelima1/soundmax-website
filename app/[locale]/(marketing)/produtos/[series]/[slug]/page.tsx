import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCarousel from "@/components/productcarousel";
import { Download, Gauge, Zap, Battery, Info } from "lucide-react";

import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";

type Locale = "pt" | "en";
type SeriesId = "kseries" | "kproseries";

type Prod = {
  slug: string;
  series: SeriesId;
  name: string;
  hero: string;
  gallery: string[];
  power: string;
  channels?: string;
  impedance: string;
  supply: string;
  description: string;
  specs: Record<string, string>;
  manual?: string;
};

const PRODUCTS_PT: Record<string, Prod> = {
  "k6-0": {
    slug: "k6-0",
    series: "kseries",
    name: "K6.0",
    hero: "/images/produtos/k/k6.jpg",
    gallery: [
      "/images/produtos/k/k6.jpg",
      "/images/produtos/k/k6-2.jpg",
      "/images/produtos/k/k6-3.jpg",
      "/images/produtos/k/k6-4.jpg"
    ],
    power: "6000W RMS",
    channels: "1 canal (mono)",
    impedance: "1Ω / 2Ω / 4Ω",
    supply: "165V – 250V AC",
    description: "Alta potência com eficiência e proteção inteligente.",
    specs: {
      "Potência RMS": "6000W",
      "Canais": "1",
      "Impedância nominal": "1Ω / 2Ω / 4Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "1Ω: 5 Hz – 18 kHz\n2Ω/4Ω: 5 Hz – 20 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": " 30A/17A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "3KVA/4.8KVA",
      "Fator de amortecimento": "350",
      "Sensibilidade de entrada balanceada/desbalanceada":
        "1.5V / 3V RMS",
      "Dimensões A x L x P(cm)": "26 x 27 x 6"
    },
    manual:
      "/manuals/manual_linha_k_final.pdf"
  },
  "k9-0": {
    slug: "k9-0",
    series: "kseries",
    name: "K9.0",
    hero: "/images/produtos/k/k9.jpg",
    gallery: [
      "/images/produtos/k/k9.jpg",
      "/images/produtos/k/k9-2.jpg",
      "/images/produtos/k/k9-3.jpg",
      "/images/produtos/k/k9-4.jpg"
    ],
    power: "9000W RMS",
    channels: "1 canal (mono)",
    impedance: "1Ω / 2Ω",
    supply: "165V – 250V AC",
    description: "Headroom extra e robustez para uso prolongado.",
    specs: {
      "Potência RMS": "9000W",
      "Canais": "1",
      "Impedância nominal": "1Ω / 2Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "1Ω: 5 Hz – 6 kHz\n2Ω: 5 Hz – 20 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": "45A/26A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "5KVA/7.2KVA",
      "Fator de amortecimento": "350",
      "Sensibilidade de entrada balanceada/desbalanceada":
        "1.5V / 3V RMS",
      "Dimensões A x L x P(cm)": "26 x 39 x 6"
    },
    manual:
      "/manuals/manual_linha_k_final.pdf"
  },
  "k25-0": {
    slug: "k25-0",
    series: "kseries",
    name: "K25",
    hero: "/images/produtos/k/k25.jpg",
    gallery: [
      "/images/produtos/k/k25.jpg",
      "/images/produtos/k/k25-2.jpg",
      "/images/produtos/k/k25-3.jpg",
      "/images/produtos/k/k25-4.jpg"
    ],
    power: "25000W RMS",
    channels: "1 canal (mono)",
    impedance: "1Ω",
    supply: "165V – 250V AC",
    description: "Entrega extrema de potência com controle.",
    specs: {
      "Potência RMS": "25000W",
      "Canais": "1",
      "Impedância nominal": "1Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "1Ω: 5 Hz – 1 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": "126A/73A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "12KVA/20KVA",
      "Fator de amortecimento": "350",
      "Sensibilidade de entrada balanceada/desbalanceada":
        "1.5V / 3V RMS",
      "Dimensões A x L x P(cm)": "26 x 44,5 x 6"
    },
    manual:
      "/manuals/manual_linha_k_final.pdf"
  },
  "k50-0": {
    slug: "k50-0",
    series: "kseries",
    name: "K50",
    hero: "/images/produtos/k/k50.jpg",
    gallery: [
      "/images/produtos/k/k50.jpg",
      "/images/produtos/k/k50-2.jpg",
      "/images/produtos/k/k50-3.jpg",
      "/images/produtos/k/k50-4.jpg"
    ],
    power: "50000W RMS",
    channels: "1 canal (mono)",
    impedance: "0.5Ω",
    supply: "165V – 250V AC",
    description: "Projeto focado em competições SPL.",
    specs: {
      "Potência RMS": "50000W",
      "Canais": "1",
      "Impedância nominal": "0.5Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "1Ω: 5 Hz – 15 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": " 250A/150A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "25KVA/40KVA",
      "Fator de amortecimento": "350",
      "Sensibilidade de entrada balanceada/desbalanceada":
        "1.5V / 3V RMS",
      "Dimensões A x L x P(cm)": "26 x 44,5 x 6"
    },
    manual:
      "/manuals/manual_linha_k_final.pdf"
  },
  "k5-0pro": {
    slug: "k5-0pro",
    series: "kproseries",
    name: "K5 Pro HD",
    hero: "/images/produtos/kpro/k5pro.jpg",
    gallery: [
      "/images/produtos/kpro/k5pro.jpg",
      "/images/produtos/kpro/k5pro-2.jpg"
    ],
    power: "5000W RMS",
    channels: "2",
    impedance: "2Ω",
    supply: "165V – 250V AC",
    description: "Modelo Pro para aplicações profissionais.",
    specs: {
      "Potência RMS": "2x2500W = 5000W",
      "Canais": "2",
      "Impedância nominal": "2Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "5 Hz – 35 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": " 24A/15A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "2.5KVA/4KVA",
      "Fator de amortecimento": "600",
      "Sensibilidade de entrada configurável":
        "40X (32db) / 20X (26db) / 0dbu (775mv)",
      "Dimensões A x L x P(cm)": "5 x 48,5 x 50",
      "Peso(kg)": "7,5"
    },
    manual: "/manuals/manual_linha_kpro_final.pdf"
  },
  "k9-0pro": {
    slug: "k9-0pro",
    series: "kproseries",
    name: "K9 Pro HD",
    hero: "/images/produtos/kpro/k9pro.jpg",
    gallery: [
      "/images/produtos/kpro/k9pro.jpg",
      "/images/produtos/kpro/k9pro-2.jpg"
    ],
    power: "9000W RMS",
    channels: "2",
    impedance: "2Ω",
    supply: "165V – 250V AC",
    description: "Modelo Pro para aplicações profissionais.",
    specs: {
      "Potência RMS": "2x4500W = 9000W",
      "Canais": "2",
      "Impedância nominal": "2Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "5 Hz – 35 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": "45A/26A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "5KVA/7.2KVA",
      "Fator de amortecimento": "600",
      "Sensibilidade de entrada configurável":
        "40X (32db) / 20X (26db) / 0dbu (775mv)",
      "Dimensões A x L x P(cm)": "5 x 48,5 x 50",
      "Peso(kg)": "7,5"
    },
    manual: "/manuals/manual_linha_kpro_final.pdf"
  },
  "k18-0pro": {
    slug: "k18-0pro",
    series: "kproseries",
    name: "K18 Pro",
    hero: "/images/produtos/kpro/k18pro.jpg",
    gallery: [
      "/images/produtos/kpro/k18pro.jpg",
      "/images/produtos/kpro/k18pro-2.jpg"
    ],
    power: "18000W RMS",
    channels: "2",
    impedance: "2Ω",
    supply: "165V – 250V AC",
    description: "Modelo Pro para aplicações profissionais.",
    specs: {
      "Potência RMS": "2x9000W = 18000W",
      "Canais": "2",
      "Impedância nominal": "2Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "5 Hz – 18 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": "90A/52A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "10KVA/14.4KVA",
      "Fator de amortecimento": "600",
      "Sensibilidade de entrada configurável":
        "40X (32db) / 20X (26db) / 0dbu (775mv)",
      "Dimensões A x L x P(cm)": "5 x 48,5 x 56",
      "Peso(kg)": "10"
    },
    manual: "/manuals/manual_linha_kpro_final.pdf"
  },
  "k25-0pro": {
    slug: "k25-0pro",
    series: "kproseries",
    name: "K25 Pro",
    hero: "/images/produtos/kpro/k25pro.jpg",
    gallery: [
      "/images/produtos/kpro/k25pro.jpg",
      "/images/produtos/kpro/k25pro-2.jpg"
    ],
    power: "25000W RMS",
    channels: "2",
    impedance: "2Ω",
    supply: "165V – 250V AC",
    description: "Modelo Pro para aplicações profissionais.",
    specs: {
      "Potência RMS": "2x12500W = 25000W",
      "Canais": "2",
      "Impedância nominal": "2Ω",
      "THD+N": "< 1%",
      "Resposta de frequência": "5 Hz – 1 kHz",
      "Tensão de alimentação": "165V – 250V AC",
      "Eficiência ": "94%",
      "Consumo máximo em sinal senoidal\nMONO/TRI": "126A/73A",
      "Potência em KVA recomendada\nMusical/Plena Potência": "12.5KVA/20KVA",
      "Fator de amortecimento": "600",
      "Sensibilidade de entrada configurável":
        "40X (32db) / 20X (26db) / 0dbu (775mv)",
      "Dimensões A x L x P(cm)": "5 x 48,5 x 56",
      "Peso(kg)": "10"
    },
    manual: "/manuals/manual_linha_kpro_final.pdf"
  }
};

/** ========= PRODUTOS EM EN =========
 * Onde não existir em EN, o código cai em fallback para PT.
 */

const PRODUCTS_EN: Record<string, Prod> = {
  "k6-0": {
    slug: "k6-0",
    series: "kseries",
    name: "K6.0",
    hero: "/images/produtos/k/k6.jpg",
    gallery: [
      "/images/produtos/k/k6.jpg",
      "/images/produtos/k/k6-2.jpg",
      "/images/produtos/k/k6-3.jpg",
      "/images/produtos/k/k6-4.jpg"
    ],
    power: "6000W RMS",
    channels: "1 channel (mono)",
    impedance: "1Ω / 2Ω / 4Ω",
    supply: "165V – 250V AC",
    description: "High power with efficiency and smart protection.",
    specs: {
      "RMS Power": "6000W",
      "Channels": "1",
      "Nominal impedance": "1Ω / 2Ω / 4Ω",
      "THD+N": "< 1%",
      "Frequency response":
        "1Ω: 5 Hz – 18 kHz\n2Ω/4Ω: 5 Hz – 20 kHz",
      "Mains voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Max consumption (sine signal)\nMONO/TRI": "30A/17A",
      "Recommended power (kVA)\nMusic/Full power": "3KVA/4.8KVA",
      "Damping factor": "350",
      "Balanced/unbalanced input sensitivity":
        "1.5V / 3V RMS",
      "Dimensions H x W x D (cm)": "26 x 27 x 6"
    },
    manual:
      "/manuals/manual_linha_k_final.pdf"
  },
  "k9-0": {
    "slug": "k9-0",
    "series": "kseries",
    "name": "K9.0",
    "hero": "/images/produtos/k/k9.jpg",
    "gallery": ["/images/produtos/k/k9.jpg", "/images/produtos/k/k9-2.jpg", "/images/produtos/k/k9-3.jpg", "/images/produtos/k/k9-4.jpg"],
    "power": "9000W RMS",
    "channels": "1 channel (mono)",
    "impedance": "1Ω / 2Ω",
    "supply": "165V – 250V AC",
    "description": "Extra headroom and robustness for extended use.",
    "specs": {
      "RMS Power": "9000W",
      "Channels": "1",
      "Nominal Impedance": "1Ω / 2Ω",
      "THD+N": "< 1%",
      "Frequency Response": "1Ω: 5 Hz – 6 kHz\n2Ω: 5 Hz – 20 kHz",
      "Supply Voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Maximum Current Draw (Sine) MONO/TRI": "45A/26A",
      "Recommended kVA (Musical/Full Power)": "5KVA/7.2KVA",
      "Damping Factor": "350",
      "Input Sensitivity (Bal/Unbal)": "1.5V / 3V RMS",
      "Dimensions H x W x D (cm)": "26 x 39 x 6"
    },
    "manual": "/manuals/manual_linha_k_final.pdf"
  },

  "k25-0": {
    "slug": "k25-0",
    "series": "kseries",
    "name": "K25",
    "hero": "/images/produtos/k/k25.jpg",
    "gallery": ["/images/produtos/k/k25.jpg", "/images/produtos/k/k25-2.jpg", "/images/produtos/k/k25-3.jpg", "/images/produtos/k/k25-4.jpg"],
    "power": "25000W RMS",
    "channels": "1 channel (mono)",
    "impedance": "1Ω",
    "supply": "165V – 250V AC",
    "description": "Extreme power delivery with control.",
    "specs": {
      "RMS Power": "25000W",
      "Channels": "1",
      "Nominal Impedance": "1Ω",
      "THD+N": "< 1%",
      "Frequency Response": "1Ω: 5 Hz – 1 kHz",
      "Supply Voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Maximum Current Draw (Sine) MONO/TRI": "126A/73A",
      "Recommended kVA (Musical/Full Power)": "12KVA/20KVA",
      "Damping Factor": "350",
      "Input Sensitivity (Bal/Unbal)": "1.5V / 3V RMS",
      "Dimensions H x W x D (cm)": "26 x 44.5 x 6"
    },
    "manual": "/manuals/manual_linha_k_final.pdf"
  },

  "k50-0": {
    "slug": "k50-0",
    "series": "kseries",
    "name": "K50",
    "hero": "/images/produtos/k/k50.jpg",
    "gallery": ["/images/produtos/k/k50.jpg", "/images/produtos/k/k50-2.jpg", "/images/produtos/k/k50-3.jpg", "/images/produtos/k/k50-4.jpg"],
    "power": "50000W RMS",
    "channels": "1 channel (mono)",
    "impedance": "0.5Ω",
    "supply": "165V – 250V AC",
    "description": "Design focused on SPL competition.",
    "specs": {
      "RMS Power": "50000W",
      "Channels": "1",
      "Nominal Impedance": "0.5Ω",
      "THD+N": "< 1%",
      "Frequency Response": "1Ω: 5 Hz – 15 kHz",
      "Supply Voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Maximum Current Draw (Sine) MONO/TRI": "250A/150A",
      "Recommended kVA (Musical/Full Power)": "25KVA/40KVA",
      "Damping Factor": "350",
      "Input Sensitivity (Bal/Unbal)": "1.5V / 3V RMS",
      "Dimensions H x W x D (cm)": "26 x 44.5 x 6"
    },
    "manual": "/manuals/manual_linha_k_final.pdf"
  },

  "k5-0pro": {
    "slug": "k5-0pro",
    "series": "kproseries",
    "name": "K5 Pro HD",
    "hero": "/images/produtos/kpro/k5pro.jpg",
    "gallery": ["/images/produtos/kpro/k5pro.jpg", "/images/produtos/kpro/k5pro-2.jpg"],
    "power": "5000W RMS",
    "channels": "2",
    "impedance": "2Ω",
    "supply": "165V – 250V AC",
    "description": "Professional model for pro applications.",
    "specs": {
      "RMS Power": "2x2500W = 5000W",
      "Channels": "2",
      "Nominal Impedance": "2Ω",
      "THD+N": "< 1%",
      "Frequency Response": "5 Hz – 35 kHz",
      "Supply Voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Maximum Current Draw (Sine) MONO/TRI": "24A/15A",
      "Recommended kVA (Musical/Full Power)": "2.5KVA/4KVA",
      "Damping Factor": "600",
      "Configurable Input Sensitivity": "40X (32dB) / 20X (26dB) / 0dBu (775mV)",
      "Dimensions H x W x D (cm)": "5 x 48.5 x 50",
      "Weight (kg)": "7.5"
    },
    "manual": "/manuals/manual_linha_kpro_final.pdf"
  },

  "k9-0pro": {
    "slug": "k9-0pro",
    "series": "kproseries",
    "name": "K9 Pro HD",
    "hero": "/images/produtos/kpro/k9pro.jpg",
    "gallery": ["/images/produtos/kpro/k9pro.jpg", "/images/produtos/kpro/k9pro-2.jpg"],
    "power": "9000W RMS",
    "channels": "2",
    "impedance": "2Ω",
    "supply": "165V – 250V AC",
    "description": "Professional model for pro applications.",
    "specs": {
      "RMS Power": "2x4500W = 9000W",
      "Channels": "2",
      "Nominal Impedance": "2Ω",
      "THD+N": "< 1%",
      "Frequency Response": "5 Hz – 35 kHz",
      "Supply Voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Maximum Current Draw (Sine) MONO/TRI": "45A/26A",
      "Recommended kVA (Musical/Full Power)": "5KVA/7.2KVA",
      "Damping Factor": "600",
      "Configurable Input Sensitivity": "40X (32dB) / 20X (26dB) / 0dBu (775mV)",
      "Dimensions H x W x D (cm)": "5 x 48.5 x 50",
      "Weight (kg)": "7.5"
    },
    "manual": "/manuals/manual_linha_kpro_final.pdf"
  },

  "k18-0pro": {
    "slug": "k18-0pro",
    "series": "kproseries",
    "name": "K18 Pro",
    "hero": "/images/produtos/kpro/k18pro.jpg",
    "gallery": ["/images/produtos/kpro/k18pro.jpg", "/images/produtos/kpro/k18pro-2.jpg"],
    "power": "18000W RMS",
    "channels": "2",
    "impedance": "2Ω",
    "supply": "165V – 250V AC",
    "description": "Professional model for pro applications.",
    "specs": {
      "RMS Power": "2x9000W = 18000W",
      "Channels": "2",
      "Nominal Impedance": "2Ω",
      "THD+N": "< 1%",
      "Frequency Response": "5 Hz – 18 kHz",
      "Supply Voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Maximum Current Draw (Sine) MONO/TRI": "90A/52A",
      "Recommended kVA (Musical/Full Power)": "10KVA/14.4KVA",
      "Damping Factor": "600",
      "Configurable Input Sensitivity": "40X (32dB) / 20X (26dB) / 0dDu (775mV)",
      "Dimensions H x W x D (cm)": "5 x 48.5 x 56",
      "Weight (kg)": "10"
    },
    "manual": "/manuals/manual_linha_kpro_final.pdf"
  },

  "k25-0pro": {
    "slug": "k25-0pro",
    "series": "kproseries",
    "name": "K25 Pro",
    "hero": "/images/produtos/kpro/k25pro.jpg",
    "gallery": ["/images/produtos/kpro/k25pro.jpg", "/images/produtos/kpro/k25pro-2.jpg"],
    "power": "25000W RMS",
    "channels": "2",
    "impedance": "2Ω",
    "supply": "165V – 250V AC",
    "description": "Professional model for pro applications.",
    "specs": {
      "RMS Power": "2x12500W = 25000W",
      "Channels": "2",
      "Nominal Impedance": "2Ω",
      "THD+N": "< 1%",
      "Frequency Response": "5 Hz – 1 kHz",
      "Supply Voltage": "165V – 250V AC",
      "Efficiency": "94%",
      "Maximum Current Draw (Sine) MONO/TRI": "126A/73A",
      "Recommended kVA (Musical/Full Power)": "12.5KVA/20KVA",
      "Damping Factor": "600",
      "Configurable Input Sensitivity": "40X (32dB) / 20X (26dB) / 0dBu (775mV)",
      "Dimensions H x W x D (cm)": "5 x 48.5 x 56",
      "Weight (kg)": "10"
    },
    "manual": "/manuals/manual_linha_kpro_final.pdf"
  }
};

const PRODUCTS_BY_LOCALE: Record<Locale, Record<string, Prod>> = {
  pt: PRODUCTS_PT,
  en: PRODUCTS_EN
};

function getProduct(locale: Locale, series: SeriesId, slug: string) {
  const byLocale = PRODUCTS_BY_LOCALE[locale] ?? PRODUCTS_PT;
  const p = byLocale[slug] ?? PRODUCTS_PT[slug]; // fallback pt se não tiver EN
  return p && p.series === series ? p : null;
}

export function generateStaticParams() {
  const locales: Locale[] = ["pt", "en"];
  // base nos produtos PT: assumimos que os slugs são os mesmos
  return locales.flatMap((locale) =>
    Object.values(PRODUCTS_PT).map((p) => ({
      locale,
      series: p.series,
      slug: p.slug
    }))
  );
}

export async function generateMetadata({
  params
}: {
  params: { locale: Locale; series: SeriesId; slug: string };
}): Promise<Metadata> {
  const { locale, series, slug } = params;
  const p = getProduct(locale, series, slug);
  if (!p) return {};
  return {
    title: `${p.name} • ${series}`,
    description: `${p.name} – ${p.power} • ${p.impedance}`,
    openGraph: {
      images: [{ url: p.hero, width: 1200, height: 630, alt: p.name }]
    }
  };
}

function Kpi({
  icon: Icon,
  label,
  value
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-brand" />
        <div className="text-sm text-white/70">{label}</div>
      </div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function SpecTable({ specs }: { specs: Record<string, string> }) {
  const entries = Object.entries(specs);
  return (
    <div className="card overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([k, v], i) => (
            <tr key={k} className={i % 2 ? "bg-white/5" : ""}>
              <td className="py-3 px-4 whitespace-pre-line text-white/70 w-[45%]">
                {k}
              </td>
              <td className="py-3 px-4 whitespace-pre-line">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// anchors para voltar às seções na página /produtos
const SERIES_ANCHORS: Record<SeriesId, string> = {
  kseries: "serie-k",
  kproseries: "serie-k-pro"
};

export default function ProductPage({
  params
}: {
  params: { locale: Locale; series: SeriesId; slug: string };
}) {
  const locale: Locale = params.locale === "en" ? "en" : "pt";
  const { series, slug } = params;

  const messages = locale === "en" ? enMessages : ptMessages;
  const t = messages.productPage;

  const product = getProduct(locale, series, slug);
  if (!product) return notFound();

  const seriesLabel =
    (t.series && t.series[series]) !== undefined
      ? t.series[series]
      : series;

  const anchor = SERIES_ANCHORS[series];

  return (
    <section className="container-wrap section space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-white/60">
        <Link
          href={`/${locale}/produtos`}
          className="hover:underline"
        >
          {t.breadcrumbProducts}
        </Link>
        <span className="opacity-40"> / </span>

        {/* Série linkável para a seção correspondente */}
        <Link
          href={`/${locale}/produtos#${anchor}`}
          className="hover:underline"
        >
          {seriesLabel}
        </Link>

        <span className="opacity-40"> / </span>
        <span className="text-white">{product.name}</span>
      </nav>

      {/* CARROSSEL NO TOPO */}
      <ProductCarousel
        images={product.gallery.length ? product.gallery : [product.hero]}
      />

      {/* DETALHES ABAIXO */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Conteúdo principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <span className="badge">{seriesLabel}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2">
              {product.name}
            </h1>
            <p className="text-white/70 mt-3">{product.description}</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Kpi icon={Zap} label={t.kpi.power} value={product.power} />
            <Kpi
              icon={Gauge}
              label={t.kpi.impedance}
              value={product.impedance}
            />
            <Kpi
              icon={Battery}
              label={t.kpi.supply}
              value={product.supply}
            />
            <Kpi
              icon={Info}
              label={t.kpi.channels}
              value={product.channels ?? "—"}
            />
          </div>

          {/* Especificações */}
          <h2 className="section-title">{t.specsTitle}</h2>
          <SpecTable specs={product.specs} />
        </div>

        {/* Lateral */}
        <aside className="space-y-4">
          <Link
            href={`/${locale}/onde-comprar`}
            className="btn btn-primary w-full text-center"
          >
            {t.buyButton}
          </Link>
          {product.manual ? (
            <a
              href={product.manual}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full text-center flex items-center justify-center gap-2"
            >
              <Download size={16} /> {t.manualButton}
            </a>
          ) : null}
        </aside>
      </div>
    </section>
  );
}