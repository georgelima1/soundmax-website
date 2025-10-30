"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // ícones simples

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? "bg-black/80 backdrop-blur-md" : ""}`}>
      <div className="container-wrap flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center" aria-label="Voltar para a Home">
          <div className="relative w-56 h-8">
            <Image
              src="/logos/logo-transp-preto.png"
              alt="Soundmax"
              fill
              className="object-contain"
              priority
              sizes="128px"
            />
          </div>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-white/80 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Ícone Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 text-white flex flex-col items-center gap-4 py-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-lg hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}