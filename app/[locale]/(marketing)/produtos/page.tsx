import Image from "next/image";
import Link from "next/link";

import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

type Product = {
  name: string;
  slug: string;
  series: "kseries" | "kproseries";
  img: string;
  power?: string;
  channels?: string;
  ohms?: string;
  manual?: string; // /manuals/arquivo.pdf ou URL externa
};

type Locale = "pt" | "en";

/** ====== DADOS POR IDIOMA ====== */

const PRODUCTS_BY_LOCALE: Record<
  Locale,
  { serieK: Product[]; serieKPro: Product[] }
> = {
  pt: {
    serieK: [
      {
        name: "K6.0",
        slug: "k6-0",
        series: "kseries",
        power: "6000W RMS",
        ohms: "1Ω/2Ω/4Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k6.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      },
      {
        name: "K9.0",
        slug: "k9-0",
        series: "kseries",
        power: "9000W RMS",
        ohms: "1Ω/2Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k9.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      },
      {
        name: "K25",
        slug: "k25-0",
        series: "kseries",
        power: "25000W RMS",
        ohms: "1Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k25.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      },
      {
        name: "K50",
        slug: "k50-0",
        series: "kseries",
        power: "50000W RMS",
        ohms: "0.5Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k50.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      }
    ],
    serieKPro: [
      {
        name: "K5 Pro HD",
        slug: "k5-0pro",
        series: "kproseries",
        power: "5000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k5pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      },
      {
        name: "K9 Pro HD",
        slug: "k9-0pro",
        series: "kproseries",
        power: "9000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k9pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      },
      {
        name: "K18 Pro",
        slug: "k18-0pro",
        series: "kproseries",
        power: "18000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k18pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      },
      {
        name: "K25 Pro",
        slug: "k25-0pro",
        series: "kproseries",
        power: "25000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k25pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      }
    ]
  },
  en: {
    serieK: [
      {
        name: "K6.0",
        slug: "k6-0",
        series: "kseries",
        power: "6000W RMS",
        ohms: "1Ω/2Ω/4Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k6.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      },
      {
        name: "K9.0",
        slug: "k9-0",
        series: "kseries",
        power: "9000W RMS",
        ohms: "1Ω/2Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k9.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      },
      {
        name: "K25",
        slug: "k25-0",
        series: "kseries",
        power: "25000W RMS",
        ohms: "1Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k25.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      },
      {
        name: "K50",
        slug: "k50-0",
        series: "kseries",
        power: "50000W RMS",
        ohms: "0.5Ω",
        channels: "1 CH",
        img: "/images/produtos/k/k50.webp",
        manual:
          "/manuals/manual_linha_k_final.pdf"
      }
    ],
    serieKPro: [
      {
        name: "K5 Pro HD",
        slug: "k5-0pro",
        series: "kproseries",
        power: "5000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k5pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      },
      {
        name: "K9 Pro HD",
        slug: "k9-0pro",
        series: "kproseries",
        power: "9000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k9pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      },
      {
        name: "K18 Pro",
        slug: "k18-0pro",
        series: "kproseries",
        power: "18000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k18pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      },
      {
        name: "K25 Pro",
        slug: "k25-0pro",
        series: "kproseries",
        power: "25000W RMS",
        ohms: "2Ω",
        channels: "2 CH",
        img: "/images/produtos/kpro/k25pro.webp",
        manual: "/manuals/manual_linha_kpro_final.pdf"
      }
    ]
  }
};

/** ====== CARD ====== */

function ProductCard({
  p,
  locale,
  t
}: {
  p: Product;
  locale: Locale | string;
  t: any;
}) {
  return (
    <div className="card overflow-hidden">
      <Link
        href={`/${locale}/produtos/${p.series.toLowerCase()}/${p.slug.toLowerCase()}`}
        className="block relative aspect-[4/3]"
        aria-label={`${t.details} ${p.name}`}
      >
        <Image src={p.img} alt={p.name} fill className="object-cover" />
      </Link>
      <div className="p-6">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        {(p.power || p.channels || p.ohms) && (
          <p className="text-white/70">
            {[p.power, p.channels, p.ohms].filter(Boolean).join(" • ")}
          </p>
        )}

        <div className="mt-4 flex gap-3">
          <Link
            href={`/${locale}/produtos/${p.series}/${p.slug}`}
            className="btn btn-primary"
          >
            {t.details}
          </Link>

          {p.manual ? (
            <a
              href={p.manual}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              {t.manualPdf}
            </a>
          ) : (
            <button
              className="btn btn-ghost opacity-60 cursor-not-allowed"
              title={t.manualSoon}
            >
              {t.manualSoon}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** ====== PAGE ====== */

export default function ProdutosPage({
  params
}: {
  params: { locale: Locale };
}) {
  const locale = params.locale ?? "pt";
  const messages = locale === "en" ? en : pt;
  const t = messages.productsPage;

  const localeProducts =
    PRODUCTS_BY_LOCALE[locale] ?? PRODUCTS_BY_LOCALE.pt;

  return (
    <section className="container-wrap section space-y-12">
      <header>
        <h1 className="section-title">{t.title}</h1>
        <p className="section-sub">{t.subtitle}</p>
      </header>

      {/* ===== SÉRIE K ===== */}
      <section id="serie-k">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            {t.seriesK}
          </h2>
          <Link href="#serie-k-pro" className="btn btn-ghost">
            {t.gotoKPro}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {localeProducts.serieK.map((p) => (
            <ProductCard key={p.name} p={p} locale={locale} t={t} />
          ))}
        </div>
      </section>

      {/* ===== SÉRIE K PRO ===== */}
      <section id="serie-k-pro" className="pt-2">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            {t.seriesKPro}
          </h2>
          <Link href="#serie-k" className="btn btn-ghost">
            {t.backToK}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {localeProducts.serieKPro.map((p) => (
            <ProductCard key={p.name} p={p} locale={locale} t={t} />
          ))}
        </div>
      </section>
    </section>
  );
}
