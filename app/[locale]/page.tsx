"use client";

import Link from "next/link";
import { useEffect } from "react";

import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";

type Locale = "pt" | "en";

export default function SegmentHomePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale: Locale = params.locale === "en" ? "en" : "pt";
  const messages = locale === "en" ? enMessages : ptMessages;
  const t = messages.segmentHome;

  useEffect(() => {
    const saved = localStorage.getItem("soundmax.segment");
  
    if (saved === "automotivo") {
      window.location.href = `/${locale}/automotivo`;
    }
  
    if (saved === "pro-audio") {
      window.location.href = `/${locale}/pro-audio`;
    }
  }, [locale]);

  function saveSegment(segment: "automotivo" | "pro-audio") {
    localStorage.setItem("soundmax.segment", segment);
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[url('/images/segmentos/bg-soundmax.jpg')] bg-cover bg-center opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

      <section className="relative z-10 min-h-screen container-wrap flex flex-col items-center justify-center text-center px-4">
        <img
          src="/logos/logo-transp-preto.png"
          alt="Soundmax"
          className="w-[260px] md:w-[380px] mb-14"
        />

        <p className="text-white/70 text-sm uppercase tracking-[0.25em] mb-4">
          {t.chooseSegment}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          <Link
            href={`/${locale}/automotivo`}
            onClick={() => saveSegment("automotivo")}
            className="group rounded-2xl bg-blue-600 hover:bg-blue-500 transition p-6 text-left flex items-center justify-between"
          >
            <div>
              <div className="text-xl font-bold">{t.automotive.title}</div>
              <div className="text-white/75 text-sm mt-1">
                {t.automotive.subtitle}
              </div>
            </div>
            <span className="text-3xl group-hover:translate-x-1 transition">›</span>
          </Link>

          <Link
            href={`/${locale}/pro-audio`}
            onClick={() => saveSegment("pro-audio")}
            className="group rounded-2xl bg-red-600 hover:bg-red-500 transition p-6 text-left flex items-center justify-between"
          >
            <div>
              <div className="text-xl font-bold">{t.proAudio.title}</div>
              <div className="text-white/75 text-sm mt-1">
                {t.proAudio.subtitle}
              </div>
            </div>
            <span className="text-3xl group-hover:translate-x-1 transition">›</span>
          </Link>
        </div>

        <Link
          href={`/${locale}/produtos`}
          className="mt-8 text-sm text-white/60 hover:text-white underline underline-offset-4"
        >
          {t.viewAllProducts}
        </Link>
      </section>
    </main>
  );
}