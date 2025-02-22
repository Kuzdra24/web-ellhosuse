"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useState, useEffect } from "react";
import { useWidth } from "@/hooks/useWidth";
import HamburgerMenu from "./HamburgerMenu";
import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/UI/dropdown-menu";

export const navigation = {
  offers: {
    name: "Oferty",
    items: [
      { name: "Mieszkania", href: "/oferty/mieszkanie" },
      { name: "Domy", href: "/oferty/dom" },
      { name: "Działki", href: "/oferty/dzialka" },
    ],
  },
  submissions: {
    name: "Zgłoszenia",
    items: [
      { name: "Sprzedaj nieruchomość", href: "/zglos-nieruchomosc" },
      { name: "Zleć poszukiwanie", href: "/zlec-poszukiwanie" },
    ],
  },
  blog: { name: "Blog", href: "/blog" },
  services: { name: "Usługi", href: "/uslugi" },
  contact: { name: "Kontakt", href: "/kontakt" },
};

export const Navbar = () => {
  const width = useWidth() ?? 0;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed z-50 transition-all duration-300 shadow-md ${
        isScrolled
          ? "bg-white/60 backdrop-blur-lg shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                className="h-[45px] md:h-[60px] w-auto"
              />
            </Link>
          </div>

          <div className="flex space-x-8">
            {width < 768 ? (
              <HamburgerMenu />
            ) : (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="menu">{navigation.offers.name}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {navigation.offers.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href}>{item.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="menu">
                      {navigation.submissions.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {navigation.submissions.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href}>{item.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="menu" asChild>
                  <Link href={navigation.blog.href}>
                    {navigation.blog.name}
                  </Link>
                </Button>
                <Button variant="menu" asChild>
                  <Link href={navigation.services.href}>
                    {navigation.services.name}
                  </Link>
                </Button>
                <Button variant="menu" asChild>
                  <Link href={navigation.contact.href}>
                    {navigation.contact.name}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
