// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css"; // opcional; se preferir, pode deixar só no root

// Static export precisa disso pra saber que existem /pt e /en
export function generateStaticParams() {
  return [
    { locale: "pt" },
    { locale: "en" }
  ];
}

export const metadata: Metadata = {
  metadataBase: new URL("http://www.soundmax.ind.br"),
  title: {
    default: "SOUNDMAX AUDIOPARTS – Para quem leva o áudio a sério!",
    template: "%s • SOUNDMAX AUDIOPARTS"
  },
  description:
    "Amplificadores profissionais e automotivos com potência, eficiência e confiabilidade.",
  openGraph: {
    title: "SOUNDMAX AUDIOPARTS – Para quem leva o áudio a sério!",
    description:
      "Amplificadores profissionais e automotivos com potência, eficiência e confiabilidade.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <SiteHeader locale={locale} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  );
}
