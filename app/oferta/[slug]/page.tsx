import { DollarSign, Home, Bed, Grid2X2 } from 'lucide-react';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import mockOfferData from "@/data/mockOfferData.json";
import { Button } from '@/components/UI/Button';

interface Offer {
  id: string;
  title: string;
  location: string;
  price: number;
  area: number;
  rooms: number;
  type: string;
  imageUrl: string;
  description: string;
  features: string[];
}

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function Page({params,}: PageProps) {
  const { slug } = await params;

  const offer = mockOfferData.find(el => el.id === slug);

  if (!offer) {
    return <div>Offer not found</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{offer.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{offer.location}</p>
      <div className="flex items-center">

      <Image src={offer.imageUrl} width={650} height={500} alt={offer.title} className="w-full max-w-[50%] h-auto rounded-md mb-4" />
      <div className="flex w-[50%] flex-col items-center justify-center">
      <table className="w-full lg:w-auto border-collapse mb-[20px]">
          <tbody className='flex flex-col'>
            <tr className="border-b flex">
              <td className="p-2 font-semibold flex items-center justify-center">
                <DollarSign className="w-4 h-4 mr-1" /> Cena:
              </td>
              <td className="p-2">{offer.price} PLN</td>
            </tr>
            <tr className="border-b flex">
              <td className="p-2 font-semibold flex items-center justify-center">
                <Grid2X2 className="w-4 h-4 mr-1" /> Powierzchnia:
              </td>
              <td className="p-2">{offer.area} m²</td>
            </tr>
            <tr className="border-b flex">
              <td className="p-2 font-semibold flex items-center justify-center">
                <Home className="w-4 h-4 mr-1" /> Typ oferty:
              </td>
              <td className="p-2">{offer.type}</td>
            </tr>
            <tr className="border-b flex">
              <td className="p-2 font-semibold flex items-center justify-center">
                <Bed className="w-4 h-4 mr-1" /> Pokoje:
              </td>
              <td className="p-2">{offer.rooms}</td>
            </tr>
          </tbody>
        </table>
        <Button variant={"primary"}>Zapytaj o ofertę</Button>
      </div>
      </div>
      <p className="text-lg mb-4 max-w-[70%]">{offer.description}</p>
      <ul className="list-disc list-inside mb-4">
        {offer.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    
    </div>
  );
};
