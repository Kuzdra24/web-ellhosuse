import React from "react";
import Image from "next/image";
import banerImg from "@/assets/images/baner-img.jpg";
import ElaSrc from "@/assets/images/ela.png";
import Button from "./Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen w-full bg-background">
      <div className="relative w-full h-[90vh] ">
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
            <div className="absolute inset-0 backdrop-blur-[15px] bg-white/60" />
          </div>
        </div>
        <div className="relative w-full h-full px-4 flex flex-col md:flex-row items-center justify-center">
          <div className="max-w-full md:max-w-[50vw] w-full flex flex-col items-center md:items-start justify-center md:pl-[8%] text-center md:text-left">
            <h1 className="font-light font-lora text-[32px] md:text-[56px] leading-[1]">
              EllHouse nieruchomości
            </h1>
            <hr className="w-[250px] border-t-2 border-primary my-4 mb-8" />
            <p className="text-lg md:text-xl font-montserrat max-w-[600px] mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            <Button>Zobacz nasze oferty</Button>
          </div>
          <div className="hidden md:flex max-w-[50vw] w-[50vw] h-full flex-col items-center justify-end">
            <Image 
              src={ElaSrc} 
              alt="Ela"
              width={400}
              height={600} 
              className="w-auto h-full object-contain "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
