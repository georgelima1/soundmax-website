import Image from "next/image";

const products = [
  { name: "KX 12000", power: "12.000W RMS", ohms: "1Ω/2Ω", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" },
  { name: "KX 8000", power: "8.000W RMS", ohms: "1Ω/2Ω", img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop" },
  { name: "SX 3000", power: "3.000W RMS", ohms: "2Ω/4Ω", img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop" },
  { name: "HX 120", power: "120W RMS x2", ohms: "4Ω", img: "https://images.unsplash.com/photo-1510829331676-c8c6c4d4245a?q=80&w=1200&auto=format&fit=crop" }
];

export default function ProdutosPage() {
  return (
    <section className="container-wrap section">
      <h1 className="section-title">Catálogo de produtos</h1>
      <p className="section-sub">Selecione um modelo para ver detalhes, manuais e curvas de resposta.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {products.map((p, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="relative aspect-video">
              <Image src={p.img} alt={p.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-white/70">{p.power} • {p.ohms}</p>
              <div className="mt-4 flex gap-3">
                <button className="btn btn-primary">Ver detalhes</button>
                <button className="btn btn-ghost">Manual (PDF)</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
