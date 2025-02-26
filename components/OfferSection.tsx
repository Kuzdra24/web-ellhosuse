"use client";
import Title from "./Title";
import {FC} from "react";
import {Offer} from "./Offer";
import mockOfferData from "@/data/mockOfferData.json";
import Button from "@/components/PrimaryButton";
import Link from "next/link";

export const OfferSection: FC = () => {
  return (
    <section className="mt-10 w-full flex flex-col items-center justify-center mb-16">
      <Title>Najnowsze oferty nieruchomości</Title>
      <div className="flex flex-wrap justify-center max-w-[1200px] mx-auto m-8">
        {mockOfferData.map((offer) => (
          <Offer
            id={offer.id}
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
      <Link href={"/oferty"}>
        <Button>Więcej ofert</Button>
      </Link>
    </section>
  );
};
