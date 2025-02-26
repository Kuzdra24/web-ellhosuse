import React from 'react';
import Title from './Title';
import {Handshake, User, ScanEye, FileCheck} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const sections = [
    {
      icon: <User size={52} className='text-primary'/>,
      title: "Indywidualne podejście",
      description: "z pełnym zaangażowaniem podchodzimy do każdego Klienta."
    },
    {
      icon: <ScanEye size={52} className='text-primary'/>,
      title: "Zdjęcia i filmy z drona",
      description: "prezentujemy nieruchomości w sposób nowoczesny i atrakcyjny."
    },
    {
      icon: <FileCheck size={52} className='text-primary'/>,
      title: "Kompleksowa obsługa",
      description: "zapewniamy wsparcie na każdym etapie transakcji."
    },
    {
      icon: <Handshake size={52} className='text-primary'/>,
      title: "Wsparcie w negocjacjach",
      description: "pomagamy w uzyskaniu jak najlepszych warunków transakcji."
    },
  ];

  return (
    <section className="mt-10 w-full flex flex-col items-center justify-center mb-16">
      <Title widthPercentage={49}>
        Dlaczego Ellhouse?
      </Title>
      <div className='w-full max-w-[1200px]'>
        <p className='m-4'>W Ellhouse Nieruchomości specjalizujemy się w indywidualnym podejściu do każdego Klienta,
          oferując usługi pośrednictwa nieruchomościami, które wyróżniają się najwyższą jakością i profesjonalizmem.
          Nasze biuro, zapewnia pełne zaangażowanie i dbałość o każdy szczegół.</p>
        <p className='m-4'>Dbamy o to, by nasze usługi były kompleksowe i dostosowane do indywidualnych potrzeb
          Klientów. Pomagamy na każdym etapie transakcji: od wyszukiwania nieruchomości, przez negocjacje, aż po
          finalizację umowy. Oferujemy również wsparcie prawne, notarialne, a także pomoc w uzyskaniu kredytu
          hipotecznego i aranżacji wnętrz.</p>
      </div>
      <div className="flex flex-wrap justify-center items-center md:p-6">
        {sections.map((section, index) => (
          <div key={index} className="flex flex-col text-center justify-center items-center p-6">
            {section.icon}
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className='max-w-[250px] text-sm text-text text-center'>{section.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
