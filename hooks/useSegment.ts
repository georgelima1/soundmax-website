"use client";

import { usePathname } from "next/navigation";
import { getSegmentTheme, Segment } from "@/lib/segments";

export function useSegment(locale?: string) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const isSegmentChooser = segments.length === 1;

  const currentSegment: Segment =
    segments[1] === "pro-audio"
      ? "pro-audio"
      : "automotivo";

  const segmentBase = locale
    ? `/${locale}/${currentSegment}`
    : `/${currentSegment}`;

  const segmentTheme = getSegmentTheme(currentSegment);

  function segmentUrl(path = "") {
    return `${segmentBase}${path ? `/${path}` : ""}`;
  }

  return {
    pathname,
    segments,

    isSegmentChooser,

    currentSegment,
    segmentBase,

    segmentTheme,

    segmentUrl,
  };
}