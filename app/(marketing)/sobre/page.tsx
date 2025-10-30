export default function SobrePage() {
  return (
    <section className="container-wrap section space-y-12">
      {/* HERO / INTRO */}
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-brand font-medium">
          SOUNDMAX AUDIO PARTS
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
          Potência real. Confiabilidade real.
        </h1>

        <p className="text-white/70 text-base md:text-lg mt-4 leading-relaxed">
          Tecnologia brasileira em amplificação de alta performance desde 2013.
          Projetos pensados para palco, competição e rua — com suporte direto de fábrica.
        </p>
      </header>

      {/* BLOCO SOBRE A EMPRESA */}
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <div className="card p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white">Quem somos</h2>
            <p className="text-white/70 text-sm leading-relaxed mt-3">
              A SOUNDMAX é especializada em amplificadores de alta potência e
              alta eficiência, desenvolvidos para entregar resultado consistente
              em pressão sonora, definição e estabilidade elétrica.
              Nossa engenharia atua com foco em confiabilidade, proteção e
              suporte pós-venda — porque potência sem controle não serve.
            </p>
            <p className="text-white/70 text-sm leading-relaxed mt-4">
              Atendemos tanto o público de som automotivo extremo quanto o
              profissional de áudio (palco, trio, eventos), com produtos
              projetados, montados e testados no Brasil.
            </p>
          </div>

          <div className="card p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white">Missão</h2>
            <p className="text-white/70 text-sm leading-relaxed mt-3">
              Fornecer equipamentos de áudio confiáveis, estáveis e
              tecnicamente superiores — para quem precisa de desempenho real,
              suporte rápido e durabilidade de verdade.
            </p>
          </div>
        </div>

        {/* VALORES / DIFERENCIAIS */}
        <div className="card p-6 border border-white/10 space-y-6">
          <h2 className="text-xl font-semibold text-white">Nossos valores</h2>

          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  Qualidade
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  Produtos confiáveis, alta entrega de potência, resistência mecânica
                  e elétrica, e longa vida útil.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  Inovação
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  Evolução contínua de topologia, proteção inteligente, gestão térmica
                  e eficiência energética. A gente não copia: a gente melhora.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  Compromisso com o cliente
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  Atendimento direto, suporte técnico sem enrolação e foco total
                  em fazer o sistema tocar do jeito certo.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  Responsabilidade local
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  Engenharia nacional, geração de empregos e desenvolvimento da
                  indústria de áudio no Ceará.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  Segurança e conformidade
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  Proteções eletrônicas, boas práticas de instalação, uso de
                  componentes selecionados e respeito a normas técnicas.
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  Ética e transparência
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  Trabalho sério, honesto e direto — com clientes, fornecedores
                  e parceiros.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </section>
  );
}