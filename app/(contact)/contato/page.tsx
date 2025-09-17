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
    const res = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        mensagem: data.mensagem,
        consentimento: data.consentimento === "on"
      })
    });
    setOk(res.ok);
    setSending(false);
    if (res.ok) form.reset();
  }

  return (
    <section className="container-wrap section max-w-2xl">
      <h1 className="section-title">Fale conosco</h1>
      <p className="section-sub">Responderemos o quanto antes.</p>
      <form onSubmit={onSubmit} className="card p-6 mt-6 space-y-4">
        <input name="nome" placeholder="Seu nome" className="w-full bg-white/5 rounded-xl px-4 py-3" required />
        <input type="email" name="email" placeholder="Seu e-mail" className="w-full bg-white/5 rounded-xl px-4 py-3" required />
        <textarea name="mensagem" placeholder="Como podemos ajudar?" className="w-full bg-white/5 rounded-xl px-4 py-3 h-36" required />
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consentimento" className="mt-1" required />
          Li e concordo com a Política de Privacidade.
        </label>
        <button disabled={sending} className="btn btn-primary">
          {sending ? "Enviando..." : "Enviar mensagem"}
        </button>
        {ok === true && <p className="text-green-500">Mensagem enviada. Obrigado!</p>}
        {ok === false && <p className="text-red-400">Não foi possível enviar. Tente novamente.</p>}
      </form>
    </section>
  );
}
