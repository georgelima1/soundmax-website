import { getSegmentTheme } from "@/lib/segments";

export default function SegmentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    segment: string;
  };
}) {
  const theme = getSegmentTheme(params.segment);

  return (
    <div className={theme.classes.background}>
      {children}
    </div>
  );
}