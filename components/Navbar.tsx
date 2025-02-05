"use client";
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/images/logo.png'
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import { useWidth } from "@/hooks/useWidth";

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
      { name: "Zgłoś nieruchomość", href: "/zglos-nieruchomosc" },
      { name: "Zleć poszukiwanie", href: "/zlec-poszukiwanie" },
    ],
  },
  blog: {
    name: "Blog",
    href: "/blog",
  },
  contact: {
    name: "Kontakt",
    href: "/kontakt",
  },
};

export const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const width = useWidth();

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="w-full bg-white shadow-md font-montserrat">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
            <Image src={logo} alt='logo' className="h-[60px] w-auto"/>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {width < 768 ? (
              <HamburgerMenu />
            ) : (
              <>
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("offers")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="h-16 inline-flex items-center px-1 pt-1 text-sm font-medium">
                    {navigation.offers.name}
                  </button>
                  {activeDropdown === "offers" && (
                    <div className="absolute z-10 -ml-4 mt-0 w-48 rounded-md bg-white py-1 shadow-lg">
                      {navigation.offers.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submissions Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("submissions")}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="h-16 inline-flex items-center px-1 pt-1 text-sm font-medium">
                    {navigation.submissions.name}
                  </button>
                  {activeDropdown === "submissions" && (
                    <div className="absolute z-10 -ml-4 mt-0 w-48 rounded-md bg-white py-1 shadow-lg">
                      {navigation.submissions.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href={navigation.blog.href}
                  className="h-16 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  {navigation.blog.name}
                </Link>

                <Link
                  href={navigation.contact.href}
                  className="h-16 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  {navigation.contact.name}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
