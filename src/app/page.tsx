import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WeeklyMenu } from "@/components/sections/WeeklyMenu";
import { Benefits } from "@/components/sections/Benefits";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// El menú se lee de la BD en cada petición para reflejar lo que publique el admin.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <WeeklyMenu />
      <HowItWorks />
      <Benefits />
      <Faq />
      <FinalCta />
    </>
  );
}
