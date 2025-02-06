import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/Title";
import oneSvg from "@/assets/notus/1-bez_kosztow.svg";
import twoSvg from "@/assets/notus/2-szybko.svg";
import threeSvg from "@/assets/notus/3-pewnie.svg";
import logo from "@/assets/notus/NOTUS_logo_RGB.svg";
import { Button } from "@/components/UI/Button";

export default function Home() {
  const adventages = [
    "Wkład własny już od 10% - w programie Rodzinny Kredyt Mieszkaniowy 0% wkładu własnego",
    "Niskie raty kredytu",
    "Dogodny okres kredytowania",
    "Małe koszty kredytu",
  ];
  const adventages2 = [
    {
      name: "Bez dodatkowych kosztów nasze usługi są bezpłatne",
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
        <Title>Kredyt hipoteczny</Title>
        <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="mt-8"
          />
        <section className="my-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-4">
            Zyskaj kredyt hipoteczny na najlepszych warunkach
          </h2>
          <div className="w-full">
            {" "}
            <p>
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
          <Link target="blank" href="https://lp.notus.pl/v2/kredyt-mieszkaniowy-na-start/?param_hash=afd48420">
            <Button variant="primary" className="mt-8 p-[20px]">
              Skontaktuj się z Ekspertem
            </Button>
          </Link>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-semibold mb-4">
            Korzyści naszych usług
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-2">Bezpłatne usługi</h3>
              <p>Bez dodatkowych kosztów nasze usługi są bezpłatne.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Szybkie porównanie</h3>
              <p>Porównaj oferty z ponad 15 banków szybko i obiektywnie.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Bezpieczeństwo</h3>
              <p>
                Pomożemy skompletować dokumenty oraz przygotować wnioski
                kredytowe.
              </p>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-semibold mb-4">
            Proces uzyskania kredytu
          </h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Spotkanie z ekspertem, zbadanie zdolności kredytowej</li>
            <li>Przedstawienie najlepszych ofert wielu banków</li>
            <li>Kompletowanie dokumentów i złożenie wniosków</li>
            <li>
              Uzyskanie pozytywnych decyzji kredytowych i podpisanie umowy
            </li>
            <li>Wypłata kredytu i zakup nieruchomości</li>
            <li>
              Wsparcie i pomoc eksperta również po zawarciu umowy kredytowej
            </li>
          </ol>
        </section>

        <section className="my-12 text-center"></section>
      </div>
    </div>
  );
}
