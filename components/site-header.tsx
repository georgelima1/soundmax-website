"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

// importa traduções
import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

const dict: Record<string, any> = { pt, en };

export function SiteHeader({ locale }: { locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const messages = dict[locale] ?? dict["pt"];
  const m = messages.menu; // assume que seu JSON tem "menu": { home, products, ... }

  const nav = [
    { href: "", label: m.home },
    { href: "produtos", label: m.products },
    { href: "sobre", label: m.about },
    { href: "suporte", label: m.support },
    { href: "onde-comprar", label: m.where },
    { href: "contato", label: m.contact }
  ];

  // Caminho atual, ex: "/pt/contato", "/en/produtos/xyz"
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // ["pt","contato"]

  const buildLangUrl = (lang: "pt" | "en") => {
    // se não tiver segmento (teoricamente só "/"), vai pra home do lang
    if (segments.length === 0) return `/${lang}`;
    const rest = segments.slice(1); // tira o locale atual, deixa só o resto
    return "/" + [lang, ...rest].join("/");
  };

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
        <Link href={`/${locale}`} className="inline-flex items-center" aria-label="Voltar para a Home">
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
              href={`/${locale}/${n.href}`}
              className="text-sm text-white/80 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}

          {/* PT | EN */}
          <div className="ml-6 flex gap-2 text-white text-sm font-semibold">
            <Link
              href={buildLangUrl("pt")}
              className={locale === "pt" ? "text-white" : "text-white/60 hover:text-white"}
            >
              PT
            </Link>
            <span>|</span>
            <Link
              href={buildLangUrl("en")}
              className={locale === "en" ? "text-white" : "text-white/60 hover:text-white"}
            >
              EN
            </Link>
          </div>
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
              href={`/${locale}/${n.href}`}
              className="text-lg hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}

          {/* PT | EN no mobile */}
          <div className="flex gap-3 text-lg mt-4">
            <Link
              href={buildLangUrl("pt")}
              className={locale === "pt" ? "text-white" : "text-white/60"}
              onClick={() => setMenuOpen(false)}
            >
              PT
            </Link>
            <span>|</span>
            <Link
              href={buildLangUrl("en")}
              className={locale === "en" ? "text-white" : "text-white/60"}
              onClick={() => setMenuOpen(false)}
            >
              EN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
