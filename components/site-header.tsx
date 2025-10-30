"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/suporte", label: "Suporte" },
  { href: "/onde-comprar", label: "Onde comprar" },
  { href: "/contato", label: "Contato" }
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? "sticky" : ""}`}>
      <div className="container-wrap flex items-center justify-between h-16">
      <Link href="/" className="inline-flex items-center" aria-label="Voltar para a Home">
      <div className="relative w-56 h-8"> {/* define tamanho do logo */}
        <Image
          src="/logos/logo-transp-preto.png"
          alt="Soundmax"
          fill
          className="object-contain"   // logo não distorce
          priority
          sizes="128px"
        />
      </div>
    </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm text-white/80 hover:text-white">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/contato" className="btn btn-primary hidden md:inline-flex">Fale conosco</Link>
      </div>
    </header>
  );
}
