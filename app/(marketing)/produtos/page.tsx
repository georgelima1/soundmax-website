import Image from "next/image";
import Link from "next/link";

type Product = {
  name: string;
  slug: string;
  series: "kseries" | "kproseries";
  img: string;
  power?: string;
  channels?: string;
  ohms?: string;
  manual?: string; // /manuals/arquivo.pdf
};

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="card overflow-hidden">
      <Link
        href={`/produtos/${p.series.toLowerCase()}/${p.slug.toLowerCase()}`}
        className="block relative aspect-[4/3]"
        aria-label={`Ver detalhes de ${p.name}`}
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
          <Link href={`/produtos/${p.series}/${p.slug}`} className="btn btn-primary">
            Ver detalhes
          </Link>

          {p.manual ? (
            <a
              href={p.manual}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Manual (PDF)
            </a>
          ) : (
            <button
              className="btn btn-ghost opacity-60 cursor-not-allowed"
              title="Manual em breve"
            >
              Manual (em breve)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** ====== DADOS ====== */
// Coloque as imagens em /public/images/products e os PDFs em /public/manuals

const serieK: Product[] = [
  { name: "K6.0", slug: "k6-0", series: "kseries", power: "6000W RMS", ohms: "1Ω/2Ω/4Ω", channels: "1 CH", img: "/images/produtos/k/k6.jpg", manual: "https://drive.google.com/file/d/1E8gMP5dHkwlllq-CTxoHNoHv0VH9GO9Y/view?usp=drivesdk" },
  { name: "K9.0", slug: "k9-0", series: "kseries", power: "9000W RMS", ohms: "1Ω/2Ω", channels: "1 CH", img: "/images/produtos/k/k9.jpg", manual: "https://drive.google.com/file/d/1E8gMP5dHkwlllq-CTxoHNoHv0VH9GO9Y/view?usp=drivesdk" },
  { name: "K25", slug: "k25-0", series: "kseries", power: "25000W RMS", ohms: "1Ω", channels: "1 CH", img: "/images/produtos/k/k25.jpg", manual: "https://drive.google.com/file/d/1E8gMP5dHkwlllq-CTxoHNoHv0VH9GO9Y/view?usp=drivesdk" },
  { name: "K50", slug: "k50-0", series: "kseries", power: "50000W RMS", ohms: "0.5Ω", channels: "1 CH", img: "/images/produtos/k/k50.jpg", manual: "https://drive.google.com/file/d/1E8gMP5dHkwlllq-CTxoHNoHv0VH9GO9Y/view?usp=drivesdk" },
];

const serieKPro: Product[] = [
  { name: "K5 Pro HD", slug: "k5-0pro", series: "kproseries", power: "5000W RMS", ohms: "2Ω", channels: "2 CH", img: "/images/produtos/kpro/k5pro.jpg", manual: "/manuals/k5-pro-hd.pdf" },
  { name: "K9 Pro HD", slug: "k9-0pro", series: "kproseries", power: "9000W RMS", ohms: "2Ω", channels: "2 CH", img: "/images/produtos/kpro/k9pro.jpg", manual: "/manuals/k9-pro-hd.pdf" },
  { name: "K18 Pro", slug: "k18-0pro", series: "kproseries", power: "18000W RMS", ohms: "2Ω", channels: "2 CH", img: "/images/produtos/kpro/k18pro.jpg", manual: "/manuals/k18-pro-hd.pdf" },
  { name: "K25 Pro", slug: "k25-0pro", series: "kproseries", power: "25000W RMS", ohms: "2Ω", channels: "2 CH", img: "/images/produtos/kpro/k25pro.jpg", manual: "/manuals/k25-pro-hd.pdf" },
];

export default function ProdutosPage() {
  return (
    <section className="container-wrap section space-y-12">
      <header>
        <h1 className="section-title">Catálogo de produtos</h1>
        <p className="section-sub">
          Explore os modelos por série e baixe os manuais técnicos.
        </p>
      </header>

      {/* ===== SÉRIE K ===== */}
      <section id="serie-k">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">Série K</h2>
          <Link href="#serie-k-pro" className="btn btn-ghost">
            Ir para Série K Pro
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {serieK.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </section>

      {/* ===== SÉRIE K PRO ===== */}
      <section id="serie-k-pro" className="pt-2">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">Série K Pro</h2>
          <Link href="#serie-k" className="btn btn-ghost">
            Voltar à Série K
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {serieKPro.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </section>
    </section>
  );
}
