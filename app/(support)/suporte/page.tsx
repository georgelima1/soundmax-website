export default function SuportePage() {
  return (
    <section className="container-wrap section">
      <h1 className="section-title">Suporte & Assistência</h1>
      <p className="section-sub">Baixe manuais, abra um ticket ou localize a assistência técnica.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Manuais</h3>
          <p className="text-white/70 mt-2">PDFs oficiais por série e modelo.</p>
          <button className="btn btn-ghost mt-4">Ver arquivos</button>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Abrir chamado</h3>
          <p className="text-white/70 mt-2">Descreva o problema e anexe fotos/vídeos.</p>
          <button className="btn btn-ghost mt-4">Abrir ticket</button>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Assistência técnica</h3>
          <p className="text-white/70 mt-2">Rede autorizada com garantia.</p>
          <button className="btn btn-ghost mt-4">Localizar</button>
        </div>
      </div>
    </section>
  );
}
