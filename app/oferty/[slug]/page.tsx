import mockOfferData from '@/data/mockOfferData.json'
import { Offer } from '@/components/Offer'

type PagePropTypes = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PagePropTypes) {
  const slug = (await params).slug
  const properties = mockOfferData.filter(offer => offer.type.toLowerCase() === slug)

  console.log(mockOfferData)
  return (<section className='w-full flex flex-wrap items-center justify-center'>
    {
      properties.map(offer => (
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
      ))
    }</section>)
}