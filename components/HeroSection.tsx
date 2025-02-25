import React from "react";
import Image from "next/image";
import banerImg from "@/assets/images/baner-img.jpg";
import ElaSrc from "@/assets/images/ela.png";
import Button from "./PrimaryButton";

export const HeroSection: React.FC = () => {
  return (
      <section className="flex flex-col items-center justify-center w-full bg-background">
        <div className="relative flex flex-col items-center justify-end w-full h-[90vh] max-h-[800px]">
          {/* Tło z rozmyciem */}
          <div className="absolute inset-0 w-full">
            <div className="relative h-full w-full">
              <Image
                  src={banerImg}
                  alt="Background banner"
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
              />
              <div className="absolute inset-0 backdrop-blur-[6px] bg-white/60" />
            </div>
          </div>

          {/* Zawartość sekcji */}
          <div className="relative w-full h-[1000px] max-w-[1200px] flex flex-col md:flex-row items-center justify-between px-4">
            {/* Tekst */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center md:justify-end md:mb-32 md:ml-16 text-center md:text-left h-full pb-8 md:pb-12 lg:pb-16">
              <h1 className="font-light font-lora text-[32px] md:text-[56px] leading-[1]">
                EllHouse nieruchomości
              </h1>
              <hr className="w-[250px] border-t-2 border-primary my-4 mb-8" />
              <p className="text-lg font-montserrat max-w-[600px] mb-10">
                Nasze podejście opiera się na zaufaniu i pełnym zaangażowaniu w każdą transakcję. Dążymy do tego, abyś czuł się komfortowo i pewnie na każdym etapie współpracy.
              </p>
              <Button>Zobacz nasze oferty</Button>
            </div>

            {/* Zdjęcie Eli */}
            <div className="hidden md:flex w-full md:w-1/2 h-full items-end justify-center md:justify-end">
              <Image
                  src={ElaSrc}
                  alt="Ela"
                  width={500}
                  height={750}
                  className="w-auto max-h-full object-contain"
                  priority
              />
            </div>
          </div>
        </div>
      </section>
  );
};
