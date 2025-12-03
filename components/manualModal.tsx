"use client";

import { useEffect } from "react";
import { X, FileDown } from "lucide-react";

import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";

type Locale = "pt" | "en";

type ManualsModalProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
};

// Só lista de modelos + arquivos (nomes de modelos não mudam)
const manuals = {
  kseries: {
    items: [
      { label: "K6.0", file: "/manuals/manual_linha_k_final.pdf" },
      { label: "K9.0", file: "/manuals/manual_linha_k_final.pdf" },
      { label: "K25",  file: "/manuals/manual_linha_k_final.pdf" },
      { label: "K50",  file: "/manuals/manual_linha_k_final.pdf" },
    ],
  },
  kproseries: {
    items: [
      { label: "K5 Pro HD",  file: "/manuals/manual_linha_kpro_final.pdf" },
      { label: "K9 Pro HD",  file: "/manuals/manual_linha_kpro_final.pdf" },
      { label: "K18 Pro",    file: "/manuals/manual_linha_kpro_final.pdf" },
      { label: "K25 Pro",    file: "/manuals/manual_linha_kpro_final.pdf" },
    ],
  },
  bobseries: {
    items: [
      { label: "BOB1500.4", file: "https://drive.google.com/file/d/1-ANQ2ep4ICxHM9UoszRqTAWqzrl14Xe4/view" },
      { label: "BOB3000.4", file: "https://drive.google.com/file/d/1-ANQ2ep4ICxHM9UoszRqTAWqzrl14Xe4/view" },
    ],
  },
};

export default function ManualsModal({ open, onClose, locale }: ManualsModalProps) {
  const messages = locale === "en" ? enMessages : ptMessages;
  const t = messages.manualsModal;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* fundo escurecido */}
      <button
        className="absolute inset-0 bg-black/70"
        aria-label={t.ariaBackgroundClose}
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-[min(92vw,700px)] max-h-[90vh] overflow-y-auto rounded-2xl bg-bg-card border border-white/10 p-6 shadow-2xl">
        {/* Fechar */}
        <button
          className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow"
          aria-label={t.ariaClose}
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <h2 className="text-xl font-semibold text-white">
          {t.title}
        </h2>
        <p className="text-white/60 text-sm mt-1">
          {t.subtitle}
        </p>

        <div className="mt-6 space-y-8">
          {/* Série K */}
          <div>
            <h3 className="text-lg font-semibold text-white flex items-baseline gap-2">
              <span>{t.series.kseries.title}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {t.series.kseries.tagline}
              </span>
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              {manuals.kseries.items.map((m) => (
                <li
                  key={m.label}
                  className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/10"
                >
                  <span className="text-white">{m.label}</span>
                  {m.file ? (
                    <a
                      href={m.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost text-xs flex items-center gap-2"
                    >
                      <FileDown size={16} />
                      <span>{t.buttons.download}</span>
                    </a>
                  ) : (
                    <button
                      className="btn btn-ghost text-xs opacity-50 cursor-not-allowed"
                      title={t.buttons.comingSoonTitle}
                    >
                      <FileDown size={16} />
                      <span>{t.buttons.comingSoon}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Série K PRO */}
          <div>
            <h3 className="text-lg font-semibold text-white flex items-baseline gap-2">
              <span>{t.series.kproseries.title}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {t.series.kproseries.tagline}
              </span>
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              {manuals.kproseries.items.map((m) => (
                <li
                  key={m.label}
                  className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/10"
                >
                  <span className="text-white">{m.label}</span>
                  {m.file ? (
                    <a
                      href={m.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost text-xs flex items-center gap-2"
                    >
                      <FileDown size={16} />
                      <span>{t.buttons.download}</span>
                    </a>
                  ) : (
                    <button
                      className="btn btn-ghost text-xs opacity-50 cursor-not-allowed"
                      title={t.buttons.comingSoonTitle}
                    >
                      <FileDown size={16} />
                      <span>{t.buttons.comingSoon}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Série BOB */}
          <div>
            <h3 className="text-lg font-semibold text-white flex items-baseline gap-2">
              <span>{t.series.bobseries.title}</span>
              <span className="text-xs text-white/40 uppercase tracking-wider">
                {t.series.bobseries.tagline}
              </span>
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              {manuals.bobseries.items.map((m) => (
                <li
                  key={m.label}
                  className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 border border-white/10"
                >
                  <span className="text-white">{m.label}</span>
                  {m.file ? (
                    <a
                      href={m.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost text-xs flex items-center gap-2"
                    >
                      <FileDown size={16} />
                      <span>{t.buttons.download}</span>
                    </a>
                  ) : (
                    <button
                      className="btn btn-ghost text-xs opacity-50 cursor-not-allowed"
                      title={t.buttons.comingSoonTitle}
                    >
                      <FileDown size={16} />
                      <span>{t.buttons.comingSoon}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[11px] text-white/40 text-center mt-8 leading-relaxed">
          {t.footer}
        </p>
      </div>
    </div>
  );
}
