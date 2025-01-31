
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import mockOfferData from "@/data/mockOfferData.json";

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

interface OfferPageProps {
  offer: Offer;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params;

  // Fetch offer data based on slug
  const offer = mockOfferData.find(el => el.id === slug);

  if (!offer) {
    return <div>Offer not found</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{offer.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{offer.location}</p>
      <img src={offer.imageUrl} width={650} height={500} alt={offer.title} className="w-full h-auto rounded-md mb-4" />
      <p className="text-lg mb-4">{offer.description}</p>
      <ul className="list-disc list-inside mb-4">
        {offer.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <p className="text-lg font-semibold">Cena: {offer.price} PLN</p>
      <p className="text-lg font-semibold">Powierzchnia: {offer.area} m²</p>
      <p className="text-lg font-semibold">Liczba pokoi: {offer.rooms}</p>
      <p className="text-lg font-semibold">Typ: {offer.type}</p>
    </div>
  );
};
