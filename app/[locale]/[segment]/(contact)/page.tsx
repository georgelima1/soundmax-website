"use client";

import { useState } from "react";

import pt from "@/messages/pt.json";
import en from "@/messages/en.json";
const dict: Record<string, any> = { pt, en };

export default function ContatoPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const messages = dict[locale] ?? dict["pt"];
  const t = messages.contact;

  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const nome = (data.nome || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const whatsapp = (data.whatsapp || "").toString().trim();
    const mensagem = (data.mensagem || "").toString().trim();
    const consentimento = data.consentimento === "on";

    // validações básicas
    if (!nome || !mensagem) {
      setOk(false);
      setSending(false);
      return;
    }

    // precisa ter OU email OU whatsapp
    if (!email && !whatsapp) {
      setOk(false);
      setSending(false);
      return;
    }

    // texto enviado ao WhatsApp da empresa
    const textoWhatsapp =
      `${t.whatsappMessageTitle}:\n` +
      `${t.name}: ${nome}\n` +
      (whatsapp ? `${t.customerWhatsapp}: ${whatsapp}\n` : "") +
      (email ? `${t.customerEmail}: ${email}\n` : "") +
      `${t.message}:\n${mensagem}\n` +
      `${t.consent}: ${consentimento ? t.yes : t.no}`;

    const encoded = encodeURIComponent(textoWhatsapp);

    const numeroEmpresa = "558530174611";
    window.open(`https://wa.me/${numeroEmpresa}?text=${encoded}`, "_blank");

    setSending(false);
    setOk(true);
    form.reset();
  }

  return (
    <section className="container-wrap section max-w-2xl">
      <h1 className="section-title">{t.title}</h1>
      <p className="section-sub">{t.subtitle}</p>

      <form onSubmit={onSubmit} className="card p-6 mt-6 space-y-4" noValidate>
        <input
          name="nome"
          placeholder={t.fieldName}
          className="w-full bg-white/5 rounded-xl px-4 py-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder={t.fieldEmail}
          className="w-full bg-white/5 rounded-xl px-4 py-3"
        />

        <input
          name="whatsapp"
          className="w-full bg-white/5 rounded-xl px-4 py-3"
          placeholder={t.fieldWhatsapp}
        />
        <p className="text-[11px] text-white/50 mt-1">
          {t.infoAtLeastOneContact}
        </p>

        <textarea
          name="mensagem"
          placeholder={t.fieldMessage}
          className="w-full bg-white/5 rounded-xl px-4 py-3 h-36"
          required
        />

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consentimento" className="mt-1" required />
          {t.privacyConsent}
        </label>

        <button disabled={sending} className="btn btn-primary">
          {sending ? t.sending : t.sendMessage}
        </button>

        {ok === true && <p className="text-green-500">{t.success}</p>}
        {ok === false && <p className="text-red-400">{t.error}</p>}

        {!ok && ok !== null && (
          <p className="text-red-400 text-sm mt-2">{t.errorMissingContact}</p>
        )}
      </form>
    </section>
  );
}
