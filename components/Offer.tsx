"use client";
import { FC } from "react";
import Image from "next/image";

type OfferProps = {
  title: string;
  address: string;
  shortDescription: string;
  imageUrl: string;
  price: number;
  pricePerMeter: number;
};

export const Offer: FC<OfferProps> = ({
  title,
  address,
  shortDescription,
  imageUrl,
  price,
  pricePerMeter,
}) => {
  return (
    <div className="w-full max-w-[400px] h-[500px] bg-red-500 rounded-[10px] overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-auto object-cover rounded-t-[10px]"
      />
      
    </div>
  );
};
