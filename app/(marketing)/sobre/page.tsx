export default function SobrePage() {
  return (
    <section className="container-wrap section">
      <h1 className="section-title">Sobre a SOUNDMAX Audio Parts</h1>
      <p className="section-sub">Tecnologia brasileira em amplificação de alta performance desde 2013.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Missão</h3>
          <p className="text-white/70 mt-2">Proporcionar potência, controle e confiabilidade para sonorizar qualquer projeto – do carro ao palco.</p>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Valores</h3>
          <p className="text-white/70 mt-2">Inovação, respeito ao cliente, engenharia responsável e comunidade.</p>
        </div>
      </div>
    </section>
  );
}
