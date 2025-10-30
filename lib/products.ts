export type SeriesId = "kseries" | "kproseries";
export type Product = {
  slug: string;
  series: SeriesId;
  name: string;
  hero: string;
  power: string;
  impedance: string;
  // ... (demais campos que você já usa: channels, supply, specs, manual, etc.)
};

export const PRODUCTS: Record<string, Product> = {
  "k6-0": { slug: "k6-0", series: "kseries",   name: "K6.0", hero: "/images/products/k6.webp", power: "6000W RMS", impedance: "1Ω / 2Ω" },
  "k9-0": { slug: "k9-0", series: "kseries",   name: "K9.0", hero: "/images/products/k9.webp", power: "9000W RMS", impedance: "1Ω / 2Ω" },
  "k25":  { slug: "k25",  series: "kseries",   name: "K25",  hero: "/images/products/k25.webp", power: "25000W RMS", impedance: "1Ω / 2Ω" },
  "k50":  { slug: "k50",  series: "kseries",   name: "K50",  hero: "/images/products/k50.webp", power: "50000W RMS", impedance: "1Ω / 2Ω" },
  "k5-pro-hd": { slug: "k5-pro-hd", series: "kproseries", name: "K5 Pro HD", hero: "/images/products/k5-pro-hd.webp", power: "—", impedance: "—" },
  "k9-pro-hd": { slug: "k9-pro-hd", series: "kproseries", name: "K9 Pro HD", hero: "/images/products/k9-pro-hd.webp", power: "—", impedance: "—" },
  "k18-pro-hd": { slug: "k18-pro-hd", series: "kproseries", name: "K18 Pro HD", hero: "/images/products/k18-pro-hd.webp", power: "—", impedance: "—" },
  "k25-pro-hd": { slug: "k25-pro-hd", series: "kproseries", name: "K25 Pro HD", hero: "/images/products/k25-pro-hd.webp", power: "—", impedance: "—" },
};

export function getProduct(series: SeriesId, slug: string) {
  const p = PRODUCTS[slug];
  return p && p.series === series ? p : null;
}

export function allStaticParams() {
  return Object.values(PRODUCTS).map(p => ({ series: p.series, slug: p.slug }));
}
