import AutomotiveHome from "@/components/segments/AutomotiveHome";
import ProAudioHome from "@/components/segments/ProAudioHome";
import type { Segment } from "@/lib/segments";

type Locale = "pt" | "en";

function isValidSegment(segment: string): segment is Segment {
  return segment === "automotivo" || segment === "pro-audio";
}

export function generateStaticParams() {
    return [
      { locale: "pt", segment: "automotivo" },
      { locale: "pt", segment: "pro-audio" },
      { locale: "en", segment: "automotivo" },
      { locale: "en", segment: "pro-audio" },
    ];
  }

export default function SegmentPage({
  params,
}: {
  params: { locale: Locale; segment: string };
}) {
  const locale = params.locale === "en" ? "en" : "pt";

  if (!isValidSegment(params.segment)) {
    return null; // ou notFound()
  }

  if (params.segment === "pro-audio") {
    return <ProAudioHome locale={locale} segment="pro-audio" />;
  }

  return <AutomotiveHome locale={locale} segment="automotivo" />;
}