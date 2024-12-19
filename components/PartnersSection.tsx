import { FC } from 'react';
import { HandCoins } from 'lucide-react';
import { ScrollText } from 'lucide-react';
import { Camera } from 'lucide-react';
import Title from './Title';
import { Button } from '@/components/UI/Button'

const partners = [
    {
        title: "Finansowanie",
        descriptions: "lorem ipsum dolor sit amet qwe idyauyge qjnbasc b aiqwe",
        icon: <HandCoins width={100} height={100} />
    }, {
        title: "Fotografia wnętrz",
        descriptions: "lorem ipsum dolor sit amet qwe idyauyge qjnbasc b aiqwe",
        icon: <Camera width={100} height={100} />
    }, {
        title: "SCHE",
        descriptions: "lorem ipsum dolor sit amet qwe idyauyge qjnbasc b aiqwe",
        icon: <ScrollText width={100} height={100} />
    },
]

export const PartnersSection: FC = () => {
    return (
        <section className="mt-12 w-full flex flex-col items-center">
            <Title>Dodatkowe usługi</Title>
            <div className='flex w-[80%] mt-8 mb-32' >
                {partners.map(({ title, descriptions, icon }) => (
                    <div className="relative m-8 min-w-[250px]">
                        <div className="relative z-10 bg-white p-4 text-text flex flex-col flex-wrap items-center rounded-md shadow-xl justify-center">
                            <h2 className="text-[24px]">{title}</h2>
                            {icon}
                            <p className="text-center max-w-[80%] mb-6">{descriptions}</p>
                            <Button variant={"primary"}>Więcej</Button>
                        </div>
                        <span className="absolute w-[99%] h-[99%] z-0 -bottom-2 -left-2 bg-accent"></span>
                    </div>
                ))}
            </div>

        </section>
    )
}