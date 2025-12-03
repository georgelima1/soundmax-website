"use client";

import { useState } from "react";
import SupportTicketModal from "@/components/supportTicketModal";
import ManualsModal from "@/components/manualModal";

import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";

type Locale = "pt" | "en";

export default function SuportePage({
  params,
}: {
  params: { locale: Locale };
}) {
  const locale: Locale = params.locale === "en" ? "en" : "pt";
  const messages = locale === "en" ? enMessages : ptMessages;
  const t = messages.supportPage;

  const [openTicket, setOpenTicket] = useState(false);
  const [openManuals, setOpenManuals] = useState(false);

  // mensagem pré-preenchida do WhatsApp, conforme idioma
  const waMessage =
    locale === "en"
      ? "I need SoundMax technical support"
      : "Preciso de suporte técnico SoundMax";

  const waHref = `https://wa.me/5583988727964?text=${encodeURIComponent(
    waMessage
  )}`;

  return (
    <section className="container-wrap section">
      <h1 className="section-title">{t.title}</h1>
      <p className="section-sub">{t.subtitle}</p>

      <div className="grid md:grid-cols-4 gap-6 mt-8 items-stretch">
        {/* MANUAIS */}
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">{t.manuals.title}</h3>
          <p className="text-white/70 mt-2 text-sm">
            {t.manuals.text}
          </p>
          <button
            className="btn btn-primary mt-auto inline-flex justify-center"
            onClick={() => setOpenManuals(true)}
          >
            {t.manuals.button}
          </button>
        </div>

        {/* ATENDIMENTO IMEDIATO / WHATSAPP */}
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">{t.immediate.title}</h3>
          <p className="text-white/70 mt-2 text-sm">
            {t.immediate.line1}
            <br />
            {t.immediate.line2}
          </p>
          <a
            className="btn btn-primary mt-auto inline-flex justify-center"
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.immediate.button}
          </a>
        </div>

        {/* ABRIR CHAMADO */}
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">
            {t.ticket.title}
          </h3>
          <p className="text-white/70 mt-2 text-sm mb-4">
            {t.ticket.text}
          </p>
          <button
            className="btn btn-primary mt-auto inline-flex justify-center"
            onClick={() => setOpenTicket(true)}
          >
            {t.ticket.button}
          </button>
        </div>

        {/* ASSISTÊNCIA TÉCNICA */}
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">
            {t.assistance.title}
          </h3>
          <p className="text-white/70 mt-2 text-sm">
            {t.assistance.text}
          </p>
          <button className="btn btn-primary mt-auto inline-flex justify-center">
            {t.assistance.button}
          </button>
        </div>
      </div>

      {/* Modal de abertura de chamado */}
      <SupportTicketModal
        open={openTicket}
        onClose={() => setOpenTicket(false)}
        locale={locale}
      />

      {/* Modal: Ver manuais */}
      <ManualsModal
        open={openManuals}
        onClose={() => setOpenManuals(false)}
        locale={locale}
      />
    </section>
  );
}
