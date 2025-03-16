type NavigationItem = {
  name: string;
  href: string;
};

type NavigationSection = {
  name: string;
  href?: string;
  items?: NavigationItem[];
};

export const navigation: Record<string, NavigationSection> = {
  offers: {
    name: "Oferty",
    href: "/oferty",
    items: [
      { name: "Mieszkania", href: "/oferty/mieszkanie" },
      { name: "Domy", href: "/oferty/dom" },
      { name: "Działki", href: "/oferty/dzialka" },
    ],
  },
  submissions: {
    name: "Zgłoszenia",
    items: [
      { name: "Sprzedaj nieruchomość", href: "/sprzedaj-nieruchomosc/dane-nieruchomosci" },
      { name: "Zleć poszukiwanie", href: "/zlec-poszukiwanie" },
    ],
  },
  services: {
    name: "Usługi",
    href: "/uslugi",
    items: [
      { name: "Finansowanie", href: "/uslugi/#finansowanie" },
      { name: "Charakterystyka energetyczna", href: "/uslugi/#sche" },
      { name: "Fotografia", href: "/uslugi/#fotografia" },
    ],
  },
  blog: { name: "Blog", href: "/blog" },
  contact: { name: "Kontakt", href: "/kontakt" },
};
