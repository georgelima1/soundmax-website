// app/[locale]/(marketing)/sobre/page.tsx
import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";

type Locale = "pt" | "en";

export default function SobrePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale: Locale = params.locale === "en" ? "en" : "pt";
  const messages = locale === "en" ? enMessages : ptMessages;
  const t = messages.aboutPage;

  return (
    <section className="container-wrap section space-y-12">
      {/* HERO / INTRO */}
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-brand font-medium">
          {t.heroKicker}
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
          {t.heroTitle}
        </h1>

        <p className="text-white/70 text-base md:text-lg mt-4 leading-relaxed">
          {t.heroText}
        </p>
      </header>

      {/* BLOCO SOBRE A EMPRESA */}
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <div className="card p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white">
              {t.whoWeAreTitle}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mt-3">
              {t.whoWeAreP1}
            </p>
            <p className="text-white/70 text-sm leading-relaxed mt-4">
              {t.whoWeAreP2}
            </p>
          </div>

          <div className="card p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white">
              {t.missionTitle}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mt-3">
              {t.missionP1}
            </p>
          </div>
        </div>

        {/* VALORES / DIFERENCIAIS */}
        <div className="card p-6 border border-white/10 space-y-6">
          <h2 className="text-xl font-semibold text-white">
            {t.valuesTitle}
          </h2>

          <ul className="space-y-4 text-sm">
            {/* Qualidade */}
            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  {t.values.qualityTitle}
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  {t.values.qualityText}
                </p>
              </div>
            </li>

            {/* Inovação */}
            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  {t.values.innovationTitle}
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  {t.values.innovationText}
                </p>
              </div>
            </li>

            {/* Compromisso com o cliente */}
            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  {t.values.commitmentTitle}
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  {t.values.commitmentText}
                </p>
              </div>
            </li>

            {/* Responsabilidade local */}
            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  {t.values.localTitle}
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  {t.values.localText}
                </p>
              </div>
            </li>

            {/* Segurança e conformidade */}
            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  {t.values.safetyTitle}
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  {t.values.safetyText}
                </p>
              </div>
            </li>

            {/* Ética e transparência */}
            <li className="flex gap-3">
              <div className="shrink-0 w-2 h-2 rounded-full bg-brand translate-y-2" />
              <div>
                <p className="text-white font-medium leading-none">
                  {t.values.ethicsTitle}
                </p>
                <p className="text-white/70 leading-relaxed mt-1">
                  {t.values.ethicsText}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
