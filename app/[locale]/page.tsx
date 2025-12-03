"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle, Speaker, ShieldCheck, Rocket } from "lucide-react";
import VideoLightbox from "@/components/videolightbox";

import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

const dict: Record<string, any> = { pt, en };

export default function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const [open, setOpen] = useState(false);

  const messages = dict[locale] ?? dict["pt"];
  const t = messages.home;

  const series = [
    {
      name: t.series.k.name,
      desc: t.series.k.desc,
      img: "/images/khome.png"
    },
    {
      name: t.series.kpro.name,
      desc: t.series.kpro.desc,
      img: "/images/kpro-home.png"
    },
    
  ];

  const features = [
    {
      title: t.features.efficiency.title,
      desc: t.features.efficiency.desc
    },
    {
      title: t.features.protection.title,
      desc: t.features.protection.desc
    },
    {
      title: t.features.support.title,
      desc: t.features.support.desc
    }
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(225,29,46,0.30),transparent)]" />
        <div className="container-wrap section">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge">{t.hero.badge}</span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                {t.hero.title.line1}
                <br />
                {t.hero.title.line2}
              </h1>
              <p className="text-white/70 mt-4 max-w-xl">{t.hero.subtitle}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href={`/${locale}/produtos`}>
                  {t.hero.cta.products} <ArrowRight size={18} />
                </Link>
                <button
                  className="btn btn-ghost"
                  onClick={() => setOpen(true)}
                >
                  {t.hero.cta.video} <PlayCircle size={18} />
                </button>
              </div>

              <VideoLightbox
                open={open}
                onClose={() => setOpen(false)}
                provider="instagram"
                videoId="DC2FnOzSFl4"
              />

              <div className="mt-6 flex gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Rocket size={16} /> {t.hero.bullets.power}
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} /> {t.hero.bullets.protection}
                </div>
                <div className="flex items-center gap-2">
                  <Speaker size={16} /> {t.hero.bullets.dsp}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-soft">
                <Image
                  src="/images/kprohome2.png"
                  alt="K Pro Home"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="container-wrap section">
        <p className="section-sub">{t.logos.subtitle}</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-6 opacity-80">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/5 rounded" />
          ))}
        </div>
      </section>

      {/* SÉRIES */}
      <section id="series" className="container-wrap section">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title">{t.series.title}</h2>
            <p className="section-sub">{t.series.subtitle}</p>
          </div>
        </div>
        <div className="grid gap-6 mt-8 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {series.map((s, i) => (
            <Link
              key={i}
              href={`/${locale}/produtos`}
              className="card overflow-hidden group"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{s.name}</h3>
                <p className="text-white/70 mt-1">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VANTAGENS */}
      <section className="container-wrap section">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card p-6">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="text-white/70 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-wrap section">
        <div className="card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">{t.cta.title}</h3>
            <p className="text-white/70 mt-2">{t.cta.subtitle}</p>
          </div>
          <Link href={`/${locale}/contato`} className="btn btn-primary">
            {t.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
