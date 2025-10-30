"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  const has = images.length > 1;

  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);

  return (
    <div className="space-y-3">
      {/* Slide principal */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
        <Image src={images[i]} alt={`Foto ${i + 1}`} fill className="object-cover" priority />
        {has && (
          <>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2">
              <ChevronLeft />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2">
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Thumbs */}
      {has && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, idx) => (
            <button
              key={src}
              onClick={() => setI(idx)}
              className={`relative h-16 w-24 rounded overflow-hidden border ${idx === i ? "border-brand" : "border-white/10"}`}
            >
              <Image src={src} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}