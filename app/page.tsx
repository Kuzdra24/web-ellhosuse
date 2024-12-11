import { HeroSection } from "@/components/HeroSection";
import { OfferSection } from "@/components/OfferSection";
import ApplyPropertySection from "@/components/ApplyPropertySection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-background">
      <HeroSection />
      <OfferSection />
      <ApplyPropertySection />
    </main>
  );
}
