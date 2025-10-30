"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

type Provider = "youtube" | "instagram";

type Props = {
  open: boolean;
  onClose: () => void;
  provider: Provider;
  videoId: string;     // p/ YouTube: ID do vídeo; p/ Instagram: shortcode (ex: Cxyz123)
  start?: number;      // segundos (YouTube)
};

export function CornerPlayer({ open, onClose, provider, videoId, start = 0 }: Props) {
  // Fechar com Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const src =
    provider === "youtube"
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&start=${start}`
      : `https://www.instagram.com/reel/${videoId}/embed`; // para posts: /p/{shortcode}/embed

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <div className="relative w-[min(92vw,480px)] aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
        <button
          onClick={onClose}
          aria-label="Fechar vídeo"
          className="absolute -top-3 -right-3 z-10 rounded-full bg-white/80 hover:bg-white text-black p-2 shadow"
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
