"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PlayCircle, Speaker, ShieldCheck, Rocket } from "lucide-react";
import VideoLightbox from "@/components/videolightbox";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(225,29,46,0.30),transparent)]" />
        <div className="container-wrap section">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="badge">NOVO • Série K Pro</span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
                Potência e sonoridade<br />para qualquer evento
              </h1>
              <p className="text-white/70 mt-4 max-w-xl">
                Amplificadores com DSP integrado, proteção inteligente, eficiência elevada e design compacto. Projetados para performance extrema em som profissional.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn btn-primary" href="/produtos">
                  Ver produtos <ArrowRight size={18} />
                </Link>
                <button
                  className="btn btn-ghost"
                  onClick={() => setOpen(true)}
                >
                  Assistir vídeo <PlayCircle size={18} />
                </button>
              </div>

              {/* YouTube */}
              {/*
                <VideoLightbox
                  open={open}
                  onClose={() => setOpen(false)}
                  provider="youtube"
                  videoId="dQw4w9WgXcQ"   //ID
                  start={0}
                />
              */}

              {/* Instagram */}
              <VideoLightbox
                open={open}
                onClose={() => setOpen(false)}
                provider="instagram"
                videoId="DC2FnOzSFl4"   // shortcode do reel/post
              />

              <div className="mt-6 flex gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2"><Rocket size={16} /> ≈ +30% de potência</div>
                <div className="flex items-center gap-2"><ShieldCheck size={16} /> Proteções inteligentes</div>
                <div className="flex items-center gap-2"><Speaker size={16} /> DSP integrado
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-soft">
                <Image src="/images/kprohome2.png" alt="K Pro Home" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="container-wrap section">
        <p className="section-sub">Marcas e eventos onde nossos amplificadores já estiveram</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-6 opacity-80">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/5 rounded" />
          ))}
        </div>
      </section>

      {/* SÉRIES */}
      <section id="series" className="container-wrap section">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Nossas séries</h2>
            <p className="section-sub">Escolha a linha ideal para o seu projeto.</p>
          </div>
          <Link href="/produtos" className="btn btn-ghost">Ver catálogo</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { name: "Série K", desc: "Alta potência para o dia a dia", img: "/images/khome.png" },
            { name: "Série K Pro", desc: "Hi-end para audição crítica.", img: "/images/kpro-home.png" },
            { name: "Série BOB", desc: "4 canais com muita versatilidade.", img: "/images/bobhome.png" }
          ].map((s, i) => (
            <Link key={i} href="/produtos" className="card overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <Image src={s.img} alt={s.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
          {[
            { title: "+ Eficiência", desc: "Arquitetura de saída otimizada para máximo SPL com baixa distorção." },
            { title: "Proteções", desc: "Sobretensão, temperatura, curto e sobrecarga com recuperação automática." },
            { title: "Garantia & Suporte", desc: "Rede de assistência técnica e garantia oficial no Brasil." }
          ].map((f, i) => (
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
            <h3 className="text-2xl font-semibold">Precisa de ajuda para escolher?</h3>
            <p className="text-white/70 mt-2">Fale com nosso time técnico e receba uma indicação sob medida.</p>
          </div>
          <Link href="/contato" className="btn btn-primary">Fale conosco</Link>
        </div>
      </section>
    </>
  );
}
