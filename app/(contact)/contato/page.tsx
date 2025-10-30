"use client";
import { useState } from "react";

export default function ContatoPage() {
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

    // monta texto que vai pro WhatsApp da empresa
    const textoWhatsapp =
      `Novo contato pelo site SoundMax:\n` +
      `Nome: ${nome}\n` +
      (whatsapp ? `WhatsApp do cliente: ${whatsapp}\n` : "") +
      (email ? `Email do cliente: ${email}\n` : "") +
      `Mensagem:\n${mensagem}\n` +
      `Consentimento LGPD: ${consentimento ? "Sim" : "Não"}`;

    // encode pro link
    const encoded = encodeURIComponent(textoWhatsapp);

    // número comercial no formato internacional, só dígitos
    const numeroEmpresa = "558530174611";

    // abre o WhatsApp com a mensagem pronta
    window.open(`https://wa.me/${numeroEmpresa}?text=${encoded}`, "_blank");

    setSending(false);
    setOk(true);
    form.reset();
  }

  return (
    <section className="container-wrap section max-w-2xl">
      <h1 className="section-title">Fale conosco</h1>
      <p className="section-sub">Responderemos o quanto antes.</p>
      <form onSubmit={onSubmit} className="card p-6 mt-6 space-y-4" noValidate>
        <input name="nome" placeholder="Seu nome *" className="w-full bg-white/5 rounded-xl px-4 py-3" required />
        <input type="email" name="email" placeholder="Seu e-mail" className="w-full bg-white/5 rounded-xl px-4 py-3" />
        <input name="whatsapp" className="w-full bg-white/5 rounded-xl px-4 py-3" placeholder="Seu WhatsApp" />
        <p className="text-[11px] text-white/50 mt-1">Informe WhatsApp ou e-mail. Pelo menos um é obrigatório.</p>
        <textarea name="mensagem" placeholder="Como podemos ajudar? *" className="w-full bg-white/5 rounded-xl px-4 py-3 h-36" required />
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consentimento" className="mt-1" required />
          Li e concordo com a Política de Privacidade.
        </label>
        <button disabled={sending} className="btn btn-primary">
          {sending ? "Enviando..." : "Enviar mensagem"}
        </button>
        {ok === true && <p className="text-green-500">Mensagem enviada. Obrigado!</p>}
        {ok === false && <p className="text-red-400">Não foi possível enviar. Tente novamente.</p>}
        {!ok && ok !== null && (
          <p className="text-red-400 text-sm mt-2">Preencha um contato WhatsApp ou e-mail.</p>
        )}
      </form>
    </section>
  );
}
