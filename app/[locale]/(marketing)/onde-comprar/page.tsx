export default function OndeComprarPage() {
  const revendedoresPorEstado = {
    CE: [
      {
        cidade: "ArtSom: Fortaleza",
        telefone: "(85) 99912-2421",
        whatsappLink:
          "https://wa.me/5585999122421?text=Ol%C3%A1%2C+tenho+interesse+em+comprar+SoundMax+em+Fortaleza",
      },
      {
        cidade: "Dourados Som: Fortaleza",
        telefone: "(85) 99609-2098",
        whatsappLink:
          "https://wa.me/5585996092098?text=Ol%C3%A1%2C+tenho+interesse+em+comprar+SoundMax+em+Fortaleza",
      },
      {
        cidade: "KurtSom: Fortaleza",
        telefone: "(85) 98792-9628",
        whatsappLink:
          "https://wa.me/5585987929628?text=Ol%C3%A1%2C+tenho+interesse+em+comprar+SoundMax+em+Fortaleza",
      },
      {
        cidade: "M&S Som Automotivo",
        telefone: "(85) 98867-0935",
        whatsappLink:
          "https://wa.me/5585988670935?text=Ol%C3%A1%2C+tenho+interesse+em+comprar+SoundMax+em+Fortaleza",
      },
    ],

    PE: [
      {
        cidade: "Waltinho Equipadora: Recife",
        telefone: "(81) 98862-8070",
        whatsappLink:
          "https://wa.me/5581988628070?text=Quero+informa%C3%A7%C3%B5es+de+pre%C3%A7o+e+disponibilidade+SoundMax+no+Recife",
      },
    ],

    PB: [
      {
        cidade: "Gardel Som Automotivo: João Pessoa",
        telefone: "(83) 98650-1199",
        whatsappLink:
          "https://wa.me/5583986501199?text=Voc%C3%AAs+vendem+linha+K+Pro+em+Jo%C3%A3o+Pessoa%3F",
      },
      {
        cidade: "Lula Sound: Sapé",
        telefone: "(83) 99111-4668",
        whatsappLink:
          "https://wa.me/5583991114668?text=Voc%C3%AAs+vendem+linha+K+Pro+em+Jo%C3%A3o+Pessoa%3F",
      },
    ],

    BA: [
      {
        cidade: "AGN Representações: Feira de Santana",
        telefone: "(75) 98105-1220",
        whatsappLink:
          "https://wa.me/5575981051220?text=Procuro+revenda+SoundMax+na+Bahia",
      },
    ],
  } as const;

  const estados = Object.keys(revendedoresPorEstado) as Array<
    keyof typeof revendedoresPorEstado
  >;

  return (
    <section className="container-wrap section space-y-12">
      <header>
        <h1 className="section-title">Onde comprar</h1>
        <p className="section-sub max-w-2xl">
          Entre em contato com um revendedor autorizado SoundMax na sua região.
        </p>
      </header>

      {estados.map((uf) => (
        <section key={uf} id={uf.toLowerCase()} className="space-y-4">
          {/* título do estado */}
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h2 className="text-xl font-semibold text-white">
              {nomeEstado(uf)} <span className="text-white/40 text-base">({uf})</span>
            </h2>
          </div>

          {/* grid de cidades daquele estado */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {revendedoresPorEstado[uf].map((rev) => (
              <div
                key={rev.cidade + rev.telefone}
                className="card p-5 flex flex-col border border-white/10"
              >
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {rev.cidade} - {uf}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    Tel: {rev.telefone}
                  </p>
                </div>

                <a
                  href={rev.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-4 inline-flex justify-center"
                >
                  Falar no WhatsApp
                </a>
              </div>
            ))}
          </div>
        </section>
      ))}

      <p className="text-[11px] text-white/40 text-center">
        Revendedores sujeitos a disponibilidade de estoque. Confirme potência, impedância e modelo antes da compra.
      </p>
    </section>
  );
}

// helper pra deixar bonito o título do estado
function nomeEstado(uf: string) {
  switch (uf) {
    case "CE": return "Ceará";
    case "PE": return "Pernambuco";
    case "RN": return "Rio Grande do Norte";
    case "PB": return "Paraíba";
    case "AL": return "Alagoas";
    case "BA": return "Bahia";
    case "SP": return "São Paulo";
    default: return uf;
  }
}