import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm", className)}
      {...props}
    />
  );
}
