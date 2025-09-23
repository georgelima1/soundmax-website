import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container-wrap py-10 grid md:grid-cols-4 gap-8 text-sm text-white/70">
        <div>
          <div className="font-bold text-white">SOUNDMAX</div>
          <p className="mt-2">Pra quem leva o áudio a sério!</p>
        </div>
        <div>
          <div className="text-white font-medium">Institucional</div>
          <ul className="mt-2 space-y-2">
            <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
            <li><Link href="/onde-comprar" className="hover:text-white">Onde comprar</Link></li>
            <li><Link href="/suporte" className="hover:text-white">Suporte</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-medium">Legal</div>
          <ul className="mt-2 space-y-2">
            <li><Link href="/politica-de-privacidade" className="hover:text-white">Política de Privacidade</Link></li>
            <li><Link href="#" className="hover:text-white">Termos</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-medium">Contato</div>
          <ul className="mt-2 space-y-2">
            <li>WhatsApp: (85) 3017-4611</li>
            <li>Email: comercial@soundmax.ind.br</li>
            <li className="flex flex-wrap items-center gap-2 text-white/80">
              <Link
                href="https://instagram.com/soundmaxamplificadores"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Instagram
              </Link>
              <span className="opacity-50" aria-hidden>•</span>
              <Link
                href="https://youtube.com/soundmaxamplificadores"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline underline-offset-4"
              >
                YouTube
              </Link>
              <span className="opacity-50" aria-hidden>•</span>
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
      <div className="border-t border-white/10 text-center py-6 text-xs text-white/50">© {new Date().getFullYear()} SOUNDMAX Audio Parts. Todos os direitos reservados.</div>
    </footer>
  );
}
