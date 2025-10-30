"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

type Provider = "youtube" | "instagram";

type Props = {
  open: boolean;
  onClose: () => void;
  provider: Provider;
  videoId: string;
  start?: number;
};

export default function VideoLightbox({
  open,
  onClose,
  provider,
  videoId,
  start = 0,
}: Props) {
  // Sempre roda o hook (regra dos hooks mantida)
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    // cleanup quando o modal fecha OU componente desmonta
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Se não estiver aberto, não renderiza nada
  if (!open) {
    return null;
  }

  const src =
    provider === "youtube"
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&start=${start}`
      : `https://www.instagram.com/reel/${videoId}/embed`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* fundo escurecido */}
      <button
        className="absolute inset-0 bg-black/70"
        aria-label="Fechar vídeo"
        onClick={onClose}
      />

      {/* caixa do player */}
      <div className="relative w-[min(92vw,960px)] aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
        <button
          onClick={onClose}
          aria-label="Fechar vídeo"
          className="absolute -top-4 -right-4 z-10 rounded-full bg-white/85 hover:bg-white text-black p-2 shadow"
        >
          <X size={16} />
        </button>

        <iframe
          title="Vídeo"
          src={src}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}