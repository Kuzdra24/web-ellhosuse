"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/Title";
import oneSvg from "@/assets/notus/1-bez_kosztow.svg";
import twoSvg from "@/assets/notus/2-szybko.svg";
import threeSvg from "@/assets/notus/3-pewnie.svg";
import logo from "@/assets/notus/NOTUS_logo_RGB.svg";
import imgOne from "@/assets/notus/proces-kredytowy-1.png";
import imgTwo from "@/assets/notus/proces-kredytowy-2.png";
import imgThree from "@/assets/notus/proces-kredytowy-3.png";
import imgFour from "@/assets/notus/proces-kredytowy-4.png";
import imgFive from "@/assets/notus/proces-kredytowy-5.png";
import { Button } from "@/components/UI/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";
import { motion } from "framer-motion";

export default function Home() {
  const adventages = [
    "Wkład własny już od 10% - w programie Rodzinny Kredyt Mieszkaniowy 0% wkładu własnego",
    "Niskie raty kredytu",
    "Dogodny okres kredytowania",
    "Małe koszty kredytu",
  ];
  const adventages2 = [
    {
      name: "Bez dodatkowych kosztów, nasze usługi są bezpłatne",
      icon: (
        <Image
          src={oneSvg}
          className="text-primary"
          alt="Bez dodatkowych kosztów nasze usługi są bezpłatne"
          width={70}
          height={70}
        />
      ),
    },
    {
      name: "Porównaj oferty z ponad 15 banków szybko i obiektywnie",
      icon: (
        <Image
          src={twoSvg}
          className="text-primary"
          alt="Porównaj oferty z ponad 15 banków szybko i obiektywnie"
          width={70}
          height={70}
        />
      ),
    },
    {
      name: "Pomożemy skompletować dokumenty oraz przygotować wnioski kredytowe",
      icon: (
        <Image
          src={threeSvg}
          className="text-primary"
          alt="Pomożemy skompletować dokumenty oraz przygotować wnioski kredytowe"
          width={70}
          height={70}
        />
      ),
    },
  ];

  const stepsToGetCredit = [
    {
      name: "Spotkanie z ekspertem, zbadanie zdolności kredytowej",
      icon: (
        <Image
          src={imgOne}
          alt="Spotkanie z ekspertem, zbadanie zdolności kredytowej"
          width={100}
          height={100}
        />
      ),
    },
    {
      name: "Przedstawienie najlepszych ofert wielu banków",
      icon: (
        <Image
          src={imgTwo}
          alt="Przedstawienie najlepszych ofert wielu banków"
          width={100}
          height={100}
        />
      ),
    },
    {
      name: "Kompletowanie dokumentów i złożenie wniosków",
      icon: (
        <Image
          src={imgThree}
          alt="Kompletowanie dokumentów i złożenie wniosków"
          width={100}
          height={100}
        />
      ),
    },
    {
      name: "Uzyskanie pozytywnych decyzji kredytowych i podpisanie umowy",
      icon: (
        <Image
          src={imgFour}
          alt="Uzyskanie pozytywnych decyzji kredytowych i podpisanie umowy"
          width={100}
          height={100}
        />
      ),
    },
    {
      name: "Wypłata kredytu i zakup nieruchomości",
      icon: (
        <Image
          src={imgFive}
          alt="Wypłata kredytu i zakup nieruchomości"
          width={100}
          height={100}
        />
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>Kredyt Hipoteczny - Najlepsze Warunki</title>
        <meta
          name="description"
          content="Zyskaj kredyt hipoteczny na najlepszych warunkach z pomocą ekspertów NOTUS FINANSE S.A."
        />
      </Head>
      <div className="container mx-auto p-6 flex flex-col items-center">
        <Title>Finansowanie nieruchomości</Title>
        <section className="my-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">
            Zyskaj kredyt hipoteczny na najlepszych warunkach
          </h2>
          <div className="w-full">
            {" "}
            <p className="max-w-[1000px] text-center mt-4 mb-8">
              Specjalnie dla naszych Klientów ubiegających się o kredyt
              hipoteczny oferujemy bezpłatne wsparcie ekspertów finansowych
              NOTUS FINANSE S.A. Nasi eksperci posiadają wieloletnie
              doświadczenie i współpracują z największymi bankami. Bezpłatnie i
              bez żadnych zobowiązań przedstawią oferty kredytowe ponad 15
              banków. Pomogą przygotować niezbędną dokumentację, złożą wnioski
              do wybranych banków oraz wyjaśnią zawiłości umowy kredytowej.
            </p>
            <ul className="mt-8 pl-6 space-y-2 list-none ">
              {adventages.map((advantage, index) => (
                <li key={index}>✔️ {advantage}</li>
              ))}
            </ul>
          </div>
          <ul className="mt-8 pl-6 space-y-2 w-full list-none flex flex-wrap items-center justify-center">
            {adventages2.map((advantage, index) => (
              <li
                key={index}
                className="flex flex-col items-center justify-center m-6 max-w-[300px]"
              >
                {advantage.icon}{" "}
                <p className="text-center">{advantage.name} </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="my-12">
          <h2 className="text-2xl mb-4 text-center">
            Najczęściej zadawane pytania
          </h2>
          <Accordion type="single" collapsible className="w-[800px]">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Dlaczego warto wziąć kredyt właśnie z nami?
              </AccordionTrigger>
              <AccordionContent>
                Mamy do wyboru oferty kredytowe praktycznie wszystkich banków.
                Będziesz mógł dowolnie je porównać i to bez żadnych zobowiązań.
                Jeżeli zdecydujesz się zaciągnąć kredyt z pomocą naszych
                profesjonalnych ekspertów kredytowych, cały proces będzie
                przyjemny i szybki, Możesz liczyć też na pełne wsparcie i pomoc
                na każdym etapie ubiegania się o kredyt.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Czy zapłacisz więcej niż w banku?
              </AccordionTrigger>
              <AccordionContent>
                Nie pobieramy żadnych opłat czy prowizji, To banki płacą nam za
                pomoc w obsłudze Klienta. Ponadto kredyt w Twoim banku wcale nie
                musi być najtańszy. Dzięki pomocy naszego eksperta bezpłatnie
                sprawdzisz najlepsze kredyty hipoteczne.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="my-12">
          <h2 className="text-2xl text-center mb-6">
            Proces uzyskania kredytu
          </h2>
          <div className="max-w-3xl mx-auto">
            {stepsToGetCredit.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-4 border-b last:border-b-0"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.2,
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }),
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
              >
                <div className="flex-shrink-0">{step.icon}</div>
                <p className="text-lg">{step.name}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center flex-col">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={200}
              className="mt-8"
            />
            <Link
              target="blank"
              href="https://lp.notus.pl/v2/kredyt-mieszkaniowy-na-start/?param_hash=afd48420"
            >
              <Button variant="primary" size={"lg"} className="mt-8 p-[20px]">
                Skontaktuj się z Ekspertem
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
