import mockOfferData from '@/data/mockOfferData.json'
import {Offer} from '@/components/Offer'

export default async function Page() {
  return (<section className='w-full max-w-[1200px] mx-auto flex flex-wrap items-center justify-center'>
    {
      mockOfferData.map(offer => (
        <Offer
          id={offer.id}
          key={offer.id}
          title={offer.title}
          address={offer.location}
          shortDescription={`${offer.area}m2 | pokoi: ${offer.rooms} | ${offer.type}`}
          imageUrl={offer.imageUrl}
          price={offer.price}
          pricePerMeter={Math.round(offer.price / offer.area)}
        />
      ))
    }</section>)
}