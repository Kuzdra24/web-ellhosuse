import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { OfferSection } from "@/components/OfferSection";
import ApplyPropertySection from "@/components/ApplyPropertySection";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OfferSection />
      <ApplyPropertySection />
    </main>
  );
}
