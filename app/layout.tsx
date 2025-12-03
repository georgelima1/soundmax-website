// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://www.soundmax.ind.br"),
  title: {
    default: "SOUNDMAX AUDIOPARTS – Para quem leva o áudio a sério!",
    template: "%s • SOUNDMAX AUDIOPARTS"
  },
  description:
    "Amplificadores profissionais e automotivos com potência, eficiência e confiabilidade.",
  openGraph: {
    title: "SOUNDMAX AUDIOPARTS – Para quem leva o áudio a sério!",
    description:
      "Amplificadores profissionais e automotivos com potência, eficiência e confiabilidade.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
