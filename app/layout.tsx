import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.exemplo.com"),
  title: {
    default: "SOUNDMAX AUDIOPARTS – Para quem leva o áudio a sério!",
    template: "%s • SOUNDMAX AUDIOPARTS"
  },
  description: "Amplificadores profissionais e automotivos com potência, eficiência e confiabilidade.",
  openGraph: {
    title: "SOUNDMAX AUDIOPARTS – Para quem leva o áudio a sério!",
    description: "Amplificadores profissionais e automotivos com potência, eficiência e confiabilidade.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <div className="min-h-dvh flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
