// src/lib/segments.ts

export type Segment = "automotivo" | "pro-audio";

export const SEGMENTS: Record<
  Segment,
  {
    key: Segment;
    href: string;
    accent: "blue" | "red";
    classes: {
      text: string;
      button: string;
      buttonSoft: string;
      border: string;
      glow: string;
    };
    glowColor: string;
    logo: string;
  }
> = {
  automotivo: {
    key: "automotivo",
    href: "automotivo",
    accent: "blue",
    classes: {
      text: "text-blue-500",
      button: "bg-blue-600 hover:bg-blue-500 text-white",
      buttonSoft: "bg-blue-600/15 hover:bg-blue-600/25 text-blue-200 border border-blue-500/30",
      border: "border-blue-500/30",
      glow: "shadow-[0_0_40px_rgba(37,99,235,0.35)]",
    },
    glowColor: "rgba(37,99,235,0.35)",
    logo: "/logos/logo-transp-azul.png"
  },

  "pro-audio": {
    key: "pro-audio",
    href: "pro-audio",
    accent: "red",
    classes: {
      text: "text-red-500",
      button: "bg-red-600 hover:bg-red-500 text-white",
      buttonSoft: "bg-red-600/15 hover:bg-red-600/25 text-red-200 border border-red-500/30",
      border: "border-red-500/30",
      glow: "shadow-[0_0_40px_rgba(225,29,46,0.35)]",
    },
    glowColor: "rgba(225,29,46,0.35)",
    logo: "/logos/logo-transp-preto.png"
  },
};

export function getSegmentTheme(segment: Segment) {
  return SEGMENTS[segment];
}

export function isValidSegment(segment: string): segment is Segment {
  return segment === "automotivo" || segment === "pro-audio";
}