"use client";

import { useState } from "react";
import SupportTicketModal from "@/components/supportTicketModal";
import ManualsModal from "@/components/manualModal";

export default function SuportePage() {
  const [open, setOpen] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [openManuals, setOpenManuals] = useState(false);

  return (
    <section className="container-wrap section">
      <h1 className="section-title">Suporte & Assistência</h1>
      <p className="section-sub">Baixe manuais, abra um ticket ou localize a assistência técnica.</p>
      <div className="grid md:grid-cols-4 gap-6 mt-8 items-stretch">
        {/* MANUAIS */}
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">Manuais</h3>
          <p className="text-white/70 mt-2 text-sm">
            PDFs oficiais por série e modelo.
          </p>
          <button
            className="btn btn-primary mt-auto inline-flex justify-center"
            onClick={() => setOpenManuals(true)}
          >
            Ver arquivos
          </button>
        </div>
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">Atendimento imediato</h3>
          <p className="text-white/70 mt-2 text-sm">
            WhatsApp técnico: (83) 98872-7964
            <br />
            Segunda a Sexta • 9h às 18h
          </p>
          <a
            className="btn btn-primary mt-auto inline-flex justify-center"
            href="https://wa.me/5583988727964?text=Preciso%20de%20suporte%20t%C3%A9cnico%20SoundMax"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar agora no WhatsApp
          </a>
        </div>
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">Abrir chamado (Assistencia Técnica)</h3>
          <p className="text-white/70 mt-2 text-sm mb-4">
            Descreva o problema e anexe fotos/vídeos.
          </p>
          <button
            className="btn btn-primary mt-auto inline-flex justify-center"
            onClick={() => setOpen(true)}
          >
            Abrir ticket
          </button>
        </div>
        <div className="card p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold">Assistência técnica</h3>
          <p className="text-white/70 mt-2 text-sm">Rede autorizada com garantia.</p>
          <button className="btn btn-primary mt-auto inline-flex justify-center">Localizar</button>
        </div>
      </div>

      {/* Modal de abertura de chamado */}
      <SupportTicketModal
        open={open}
        onClose={() => setOpen(false)}
      />

      {/* Modal: Ver manuais */}
      <ManualsModal
        open={openManuals}
        onClose={() => setOpenManuals(false)}
      />
    </section>
  );
}
