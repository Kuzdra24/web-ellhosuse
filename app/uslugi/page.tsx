"use client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/Title";
import logo from "@/assets/notus/NOTUS_logo_RGB.svg";
import {Button} from "@/components/UI/Button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/accordion";
import {
  adventages,
  adventages2,
  stepsToGetCredit,
  faq,
  supportDescription,
  scheDescription,
  karolinaDescription,
} from "@/data/servicesData";
import karolina from "@/assets/images/Karolina.jpg"
import {motion} from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kredyt Hipoteczny - Najlepsze Warunki</title>
        <meta
          name="description"
          content="Zyskaj kredyt hipoteczny na najlepszych warunkach z pomocą ekspertów NOTUS FINANSE S.A."
        />
      </Head>
      <div className="container mx-auto p-6 flex flex-col items-center">
        <Title widthPercentage={48}>Finansowanie nieruchomości</Title>
        <section className="my-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">
            Zyskaj kredyt hipoteczny na najlepszych warunkach
          </h2>
          <div className="w-full max-w-[1000px] text-center">
            <p className="mt-4 mb-8">{supportDescription}</p>
            <ul className="mt-8 pl-6 space-y-2 list-none">
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
                <Image src={advantage.icon.source} alt={advantage.icon.alt} width={80} height={80}/>
                <p className="text-center mt-2">{advantage.name}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="my-12">
          <h2 className="text-2xl mb-4 text-center">Najczęściej zadawane pytania</h2>
          <Accordion type="single" collapsible className="max-w-[800px] w-full mx-auto">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="my-12">
          <h2 className="text-2xl text-center mb-6">Proces uzyskania kredytu</h2>
          <div className="max-w-3xl mx-auto">
            {stepsToGetCredit.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-4 border-b last:border-b-0"
                variants={{
                  hidden: {opacity: 0, y: 20},
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
                viewport={{once: true}}
                custom={index}
              >
                <Image
                  src={step.icon.source}
                  alt={step.icon.alt}
                  width={60}
                  height={60}
                  className="flex-shrink-0"
                />
                <p className="text-lg">{step.name}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center flex-col">
            <Image src={logo} alt="logo" width={200} height={200} className="mt-8"/>
            <Link
              target="_blank"
              href="https://lp.notus.pl/v2/kredyt-mieszkaniowy-na-start/?param_hash=afd48420"
            >
              <Button variant="primary" size="lg" className="mt-8 p-[20px]">
                Skontaktuj się z Ekspertem
              </Button>
            </Link>
          </div>
        </section>

        <section
          id={"sche"}
          className="my-12 w-screen relative flex flex-col min-h-[500px] justify-center items-center backdrop-blur-xl p-10 overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute top-20 md:top-20 -left-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 "></div>
            <div
              className="absolute top-96 md:top-32 right-10 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 "></div>
          </div>


          <Title widthPercentage={29}>
            Świadectwo Charakterystyki Energetycznej
          </Title>
          <p className="mt-4 text-lg text-center relative z-10 max-w-2xl mx-auto">
            {scheDescription}
          </p>

          <div className="mt-6 max-w-[1200px] flex flex-col md:flex-row items-center justify-between relative z-10">
            {/* Obrazek na mobile na górze, na desktopie po prawej */}
            <Image
              src={karolina}
              alt="Karolina"
              className="order-1 md:order-2 w-[200px] aspect-square object-cover object-top rounded-full shadow-xl md:ml-10"
              width={200}
              height={200}
            />

            <div className="order-2 md:order-1 mt-6 md:mt-0 md:ml-8 w-full mx-auto">
              <h3 className="text-xl font-medium">Jak otrzymać certyfikat?</h3>
              <p className="mt-2 text-gray-700 mb-4 drop-shadow-lg">
                {karolinaDescription[0]}
              </p>
              <p className="mt-2 text-gray-700 mb-4 drop-shadow-md">
                {karolinaDescription[1]}
              </p>
              <p>{karolinaDescription[2]}</p>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
