"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import mapPin from "@/assets/icons/mapPin.svg";
import houseUrl from "@/assets/images/offer-image.png";
import Button from "./PrimaryButton";

type OfferProps = {
  id: string;
  title: string;
  address: string;
  shortDescription: string;
  imageUrl: string;
  price: number;
  pricePerMeter: number;
};

export const Offer: FC<OfferProps> = ({
  id,
  title,
  address,
  shortDescription,
  imageUrl,
  price,
  pricePerMeter,
}) => {
  return (
    <div className="w-full max-w-[300px] max-h-[440px] h-full bg-white shadow-md m-8 rounded-[10px] overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={200}
        className="cursor-pointer w-full h-auto object-cover rounded-t-[10px] transition-transform duration-300 hover:scale-110"
      />
      <div className="p-4">
        <p className="text-l font-bold text-gray-600">{title}</p>

        <div className="flex items-center gap-2 mt-4">
          <Image src={mapPin} alt={"pin"} width={16} height={16} />
          <p>{address}</p>
        </div>
        <p>{shortDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p>{price}zł </p>
            <p>{pricePerMeter}zł/m²</p>
          </div>
          <Link href={`oferta/${id}`}><Button>Zobacz ofertę</Button></Link>
        </div>
      </div>
    </div>
  );
};
