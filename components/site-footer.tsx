"use client";

import Link from "next/link";

// importa traduções
import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

const dict: Record<string, any> = { pt, en };

export function SiteFooter({ locale }: { locale: string }) {
  const messages = dict[locale] ?? dict["pt"];
  const t = messages.footer;

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container-wrap py-10 grid md:grid-cols-4 gap-8 text-sm text-white/70">

        {/* Logo + Slogan */}
        <div>
          <div className="font-bold text-white">SOUNDMAX</div>
          <p className="mt-2">{t.slogan}</p>
        </div>

        {/* Institucional */}
        <div>
          <div className="text-white font-medium">{t.institutional.title}</div>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href={`/${locale}/sobre`} className="hover:text-white">
                {t.institutional.about}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/onde-comprar`} className="hover:text-white">
                {t.institutional.whereToBuy}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/suporte`} className="hover:text-white">
                {t.institutional.support}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <div className="text-white font-medium">{t.legal.title}</div>
          <ul className="mt-2 space-y-2">
            <li>
              <Link
                href={`/${locale}/politica-de-privacidade`}
                className="hover:text-white"
              >
                {t.legal.privacyPolicy}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                {t.legal.terms}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <div className="text-white font-medium">{t.contact.title}</div>
          <ul className="mt-2 space-y-2">
            <li>{t.contact.whatsapp}: (85) 3017-4611</li>
            <li>{t.contact.email}: comercial@soundmax.ind.br</li>

            {/* Social */}
            <li className="flex flex-wrap items-center gap-2 text-white/80">
              <Link
                href="https://instagram.com/soundmaxamplificadores"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Instagram
              </Link>

              <span className="opacity-50">•</span>

              <Link
                href="https://youtube.com/soundmaxamplificadores"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline underline-offset-4"
              >
                YouTube
              </Link>

              <span className="opacity-50">•</span>

              <Link
                href="https://facebook.com/soundmaxamplificadores"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Facebook
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-6 text-xs text-white/50">
        © {new Date().getFullYear()} SOUNDMAX Audio Parts. {t.rights}
      </div>
    </footer>
  );
}
