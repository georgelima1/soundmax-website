"use client";
import Link from "next/link";
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
        <Link href="/" className="font-extrabold tracking-tight text-white">
          <span className="text-brand">▲</span> SOUNDMAX
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
