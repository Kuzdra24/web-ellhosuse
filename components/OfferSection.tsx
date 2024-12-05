"use client";
import Title from "./UI/Title";
import { FC } from "react";
import { Offer } from "./Offer";
import mockOfferData from "@/data/mockOfferData.json";
export const OfferSection: FC = () => {
  return (
    <section>
      <Title>Najnowsze oferty nieruchomości</Title>
      <div className="flex flex-wrap justify-center max-w-[1200px] mx-auto">
        {mockOfferData.map((offer) => (
          <Offer
            key={offer.id}
            title={offer.title}
            address={offer.location}
            shortDescription={`${offer.area}m2 | ${offer.rooms} pokoi | ${offer.type}`}
            imageUrl={offer.imageUrl}
            price={offer.price}
            pricePerMeter={Math.round(offer.price / offer.area)}
          />
        ))}
      </div>
    </section>
  );
};
