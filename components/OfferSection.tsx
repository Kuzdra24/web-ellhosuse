"use client";
import Title from "./Title";
import { FC, useMemo } from "react";
import { Offer } from "./Offer";
import mockOfferData from "@/data/mockOfferData.json";
import Button from "@/components/PrimaryButton";
import Link from "next/link";

export const OfferSection: FC = () => {
  const processedOffers = useMemo(() => {
    return mockOfferData.map((offer) => ({
      ...offer,
      pricePerMeter: Math.round(offer.price / offer.area),
    }));
  }, []);

  return (
    <section className="mt-10 w-full flex flex-col items-center justify-center mb-16">
      <Title widthPercentage={34}>Najnowsze oferty nieruchomości</Title>
      <div className="flex flex-wrap justify-center max-w-[1200px] mx-auto m-8">
        {processedOffers.map((offer) => (
          <Offer
            id={offer.id}
            key={offer.id}
            title={offer.title}
            address={offer.location}
            shortDescription={`${offer.area}m2 | ${offer.rooms} pokoi | ${offer.type}`}
            imageUrl={offer.imageUrl}
            price={offer.price}
            pricePerMeter={offer.pricePerMeter}
          />
        ))}
      </div>
      <Link href={"/oferty"}>
        <Button>Więcej ofert</Button>
      </Link>
    </section>
  );
};
