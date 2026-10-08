import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Tone = "brand" | "accent";

const tones: Record<Tone, string> = {
  brand: "bg-brand-100 text-brand-900",
  accent: "bg-accent-100 text-accent-600",
};

export function Badge({ tone = "brand", className, ...props }: { tone?: Tone } & ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", tones[tone], className)}
      {...props}
    />
  );
}
