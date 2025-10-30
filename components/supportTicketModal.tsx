"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SupportTicketModal({ open, onClose }: Props) {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  // bloqueia scroll da página quando o modal está aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const arr: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const url = URL.createObjectURL(files[i]);
      arr.push(url);
    }
    setPreviews(arr);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nome = (formData.get("nome") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const whatsapp = (formData.get("whatsapp") || "").toString().trim();
    const mensagem = (formData.get("mensagem") || "").toString().trim();
    const consentimento = formData.get("consentimento") === "on";

    // validações básicas
    if (!nome || !mensagem) {
      setOk(false);
      setSending(false);
      return;
    }

    if (!email && !whatsapp) {
      // precisa ter pelo menos 1 contato
      setOk(false);
      setSending(false);
      return;
    }

    // monta mensagem para WhatsApp
    const textoWhatsapp =
      `Novo chamado de suporte (SITE):\n` +
      `Nome: ${nome}\n` +
      (whatsapp ? `WhatsApp do cliente: ${whatsapp}\n` : "") +
      (email ? `Email do cliente: ${email}\n` : "") +
      `Descrição do problema:\n${mensagem}\n\n` +
      `Consentimento LGPD: ${consentimento ? "Sim" : "Não"}\n\n` +
      `OBS: O cliente selecionou imagens no formulário. Pedir que ele envie as mesmas imagens agora no WhatsApp.`;

    const encoded = encodeURIComponent(textoWhatsapp);

    // Número comercial para suporte técnico.
    // IMPORTANTE: precisa estar só com dígitos + DDI.
    // Exemplo: (85) 3017-4611 vira "558530174611"
    const numeroEmpresaSuporte = "558530174611";

    // abre WhatsApp Web / Mobile já com a mensagem preenchida
    window.open(`https://wa.me/${numeroEmpresaSuporte}?text=${encoded}`, "_blank");

    setOk(true);
    setSending(false);
    form.reset();
    setPreviews([]);

    // você pode fechar o modal automaticamente se quiser:
    // onClose();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      {/* fundo escurecido, clicável pra fechar */}
      <button
        className="absolute inset-0 bg-black/70"
        aria-label="Fechar"
        onClick={onClose}
      />

      {/* modal em si */}
      <div className="relative w-[min(92vw,480px)] max-h-[90vh] overflow-y-auto rounded-2xl bg-bg-card border border-white/10 p-6 shadow-2xl">
        {/* botão X */}
        <button
          className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 shadow"
          aria-label="Fechar"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <h2 className="text-xl font-semibold text-white">
          Abrir chamado de suporte
        </h2>
        <p className="text-white/60 text-sm mt-1">
          Descreva o problema e anexe fotos. Vamos atender pelo WhatsApp.
        </p>

        <form onSubmit={onSubmit} className="space-y-4 mt-6" noValidate>
          {/* Nome */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-1">
              Nome *
            </label>
            <input
              name="nome"
              required
              className="bg-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="Seu nome"
            />
          </div>

          {/* Contatos */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-white mb-1">
                WhatsApp
              </label>
              <input
                name="whatsapp"
                className="bg-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="(85) 99999-0000"
              />
              <p className="text-[11px] text-white/50 mt-1">
                WhatsApp ou e-mail (pelo menos um).
              </p>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-white mb-1">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                className="bg-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                placeholder="voce@exemplo.com"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-1">
              Descreva o problema *
            </label>
            <textarea
              name="mensagem"
              required
              rows={4}
              className="bg-bg border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none"
              placeholder="Ex: Amplificador K9.0 desarmando com proteção após 3 minutos de uso..."
            />
          </div>

          {/* Upload imagens */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-1">
              Fotos / Vídeo da instalação ou problema para nos ajudar a identificar a causa (opcional)
            </label>
            <input
              name="fotos"
              type="file"
              multiple
              accept="image/*,video/*"
              className="text-white text-sm"
              onChange={onFilesSelected}
            />

            {previews.length > 0 && (
              <>
                <p className="text-[11px] text-white/50 mt-2">
                  Essas mídias NÃO são enviadas automaticamente.
                  Quando o WhatsApp abrir, anexe essas mesmas fotos/vídeos na conversa.
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {previews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-bg"
                    >
                      {/* pode ser imagem ou thumb de vídeo, aqui mostramos como imagem direta */}
                      <img
                        src={src}
                        alt={`preview ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Consentimento */}
          <div className="flex items-start gap-2 text-xs text-white/60">
            <input
              name="consentimento"
              type="checkbox"
              className="mt-1"
              required
            />
            <span>
              Autorizo o contato da SoundMax para suporte técnico.
            </span>
          </div>

          {/* Botão enviar */}
          <button
            type="submit"
            disabled={sending}
            className="btn btn-primary w-full"
          >
            {sending ? "Abrindo WhatsApp..." : "Enviar e abrir WhatsApp"}
          </button>

          {/* Feedback */}
          {ok === false && (
            <p className="text-red-400 text-sm mt-2">
              Preencha os campos obrigatórios. WhatsApp ou e-mail é obrigatório.
            </p>
          )}

          {ok === true && (
            <p className="text-green-400 text-sm mt-2">
              Pronto! Só anexar as fotos lá no WhatsApp 👍
            </p>
          )}
        </form>
      </div>
    </div>
  );
}