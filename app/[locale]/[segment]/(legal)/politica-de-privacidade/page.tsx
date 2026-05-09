"use client";

import pt from "@/messages/pt.json";
import en from "@/messages/en.json";
const dict: Record<string, any> = { pt, en };

export function generateStaticParams() {
  return [
    { locale: "pt", segment: "automotivo" },
    { locale: "pt", segment: "pro-audio" },
    { locale: "en", segment: "automotivo" },
    { locale: "en", segment: "pro-audio" },
  ];
}

export default function PoliticaPage({ params }: { params: { locale: Locale; segment: string } }) {
  const locale = params.locale;
  const messages = dict[locale] ?? dict["pt"];
  const t = messages.privacy;

  return (
    <section className="container-wrap section">
      <h1 className="section-title">{t.title}</h1>
      <p className="section-sub">{t.subtitle}</p>

      <div className="card p-6 mt-6 space-y-4 text-white/80">
        <p>{t.p1}</p>
        <p>{t.p2}</p>
      </div>
    </section>
  );
}
