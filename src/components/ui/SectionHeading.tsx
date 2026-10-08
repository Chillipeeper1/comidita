import { Badge } from "./Badge";

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-ink-700">{intro}</p>}
    </div>
  );
}
