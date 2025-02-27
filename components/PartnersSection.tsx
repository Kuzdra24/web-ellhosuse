import {FC} from 'react';
import {HandCoins} from 'lucide-react';
import {ScrollText} from 'lucide-react';
import {Camera} from 'lucide-react';
import Title from './Title';
import {Button} from '@/components/UI/Button'
import Link from "next/link";

const partners = [
  {
    title: "Finansowanie",
    descriptions: "Znajdziemy dla Ciebie najlepsze rozwiązania kredytowe, aby zakup nieruchomości był prostszy niż myślisz.",
    icon: <HandCoins width={100} height={100}/>,
    href: '/uslugi/#finansowanie'
  }, {
    title: "Fotografia wnętrz",
    descriptions: "Profesjonalne zdjęcia, które wyróżnią Twoją ofertę i przyciągną więcej zainteresowanych.",
    icon: <Camera width={100} height={100}/>,
    href: '/uslugi/#fotografia'
  }, {
    title: "Charakterystyka energetyczna",
    descriptions: "Obowiązkowy dokument, który pomoże kupującym ocenić efektywność energetyczną Twojej nieruchomości.",
    icon: <ScrollText width={100} height={100}/>,
    href: 'uslugi/#sche'
  },
]

export const PartnersSection: FC = () => {
  return (
    <section className="mt-16 w-full flex flex-col text-text items-center">
      <Title widthPercentage={64}>Dodatkowe usługi</Title>
      <div className="flex w-[80%] flex-wrap items-stretch justify-center mt-12 mb-32 gap-6 ">
        {partners.map(({title, descriptions, icon, href}) => (
          <div
            key={title}
            className="relative group max-w-[320px] w-full custom-lg:mx-4"
          >
            <div
              className="relative z-10 bg-white p-6 text-text flex flex-col items-center rounded-xl shadow-md justify-between h-full min-h-[350px] transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              <div
                className="w-[80px] h-[80px] flex items-center justify-center text-primary transition-transform duration-300">
                {icon}
              </div>
              <h3 className="text-[24px] text-text text-center">{title}</h3>
              <p className="text-center text-[15px] text-gray-700">{descriptions}</p>
              <Link href={href}>
                <Button
                  variant="primary"
                  className="transition-transform duration-300"
                >
                  Więcej
                </Button>
              </Link>
            </div>

            <span
              className="absolute w-full h-full z-0 -bottom-2 -left-2 rounded-2xl bg-gradient-to-r from-purple-300 to-pink-300 opacity-50 blur-sm group-hover:blur-md transition-all duration-300">
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}