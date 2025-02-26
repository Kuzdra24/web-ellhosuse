import React from "react";
import Image from "next/image";
import banerImg from "@/assets/images/baner-img.jpg";
import ElaSrc from "@/assets/images/ela.png";
import Button from "./PrimaryButton";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  return (
      <section className="flex flex-col items-center justify-center w-full bg-background">
        <div className="relative flex flex-col items-center justify-end w-full h-[90vh] max-h-[800px]">
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

          <div className="relative w-full h-full max-w-[1200px] flex flex-col custom-lg:flex-row items-center justify-between px-4">
            <div className="w-full flex flex-col items-center custom-lg:items-start justify-center custom-lg:justify-end custom-lg:mb-36 custom-lg:ml-16 text-center custom-lg:text-left h-full pb-8 custom-lg:pb-12 lg:pb-16">
              <h1 className="font-light font-lora text-[32px] custom-lg:text-[56px] leading-[1]">
                EllHouse nieruchomości
              </h1>
              <hr className="w-[250px] border-t-2 border-primary my-4 mb-4 custom-lg:my-8 custom-lg:mb-8" />
              <p className="text-md custom-lg:text-lg font-montserrat max-w-[600px] custom-lg:mb-10 mb-6">
                Nasze podejście opiera się na zaufaniu i pełnym zaangażowaniu w każdą transakcję. Dążymy do tego, abyś czuł się komfortowo i pewnie na każdym etapie współpracy.
              </p>
              <Link href="/oferty">
                <Button>Zobacz nasze oferty</Button>
              </Link>
            </div>

            <div className="hidden custom-lg:flex w-full h-full items-end justify-center custom-lg:justify-end">
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
