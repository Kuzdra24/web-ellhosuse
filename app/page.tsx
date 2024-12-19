import { HeroSection } from "@/components/HeroSection";
import { OfferSection } from "@/components/OfferSection";
import { Footer } from "@/components/Footer";
import { PartnersSection } from "@/components/PartnersSection";
import ApplyPropertySection from "@/components/ApplyPropertySection";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-background">
      <HeroSection />
      <OfferSection />
      <ApplyPropertySection />
      <PartnersSection />
      <Footer />
    </main>
  );
}
