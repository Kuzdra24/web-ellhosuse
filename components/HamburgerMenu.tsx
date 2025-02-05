"use client";
import Image from "next/image";
import burgerIcon from "@/assets/icons/burger.svg";
import { useState } from "react";
import Link from "next/link";
import { navigation } from "@/components/Navbar";

type NavigationItem = {
  name: string;
  href: string;
};

type NavigationSection = {
  name: string;
  items?: NavigationItem[];
  href?: string;
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="h-16 inline-flex items-center px-1 pt-1 text-sm font-medium z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={burgerIcon}
          alt="Hamburger Menu"
          width={24}
          height={24}
          className={`transition-all duration-300 ${isOpen
              ? "[&_.top]:origin-center [&_.top]:rotate-45 [&_.top]:translate-y-[6.5px] [&_.middle]:opacity-0 [&_.bottom]:origin-center [&_.bottom]:-rotate-45 [&_.bottom]:-translate-y-[6.5px] [&_path]:!transition-all [&_path]:!duration-300"
              : "hover:text-primary [&_path]:!transition-all [&_path]:!duration-300"
            }`}
        />
      </button>
      <div
        className={`fixed z-10 inset-0 bg-white transition-all duration-300 ${isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          {Object.values(navigation).map((section: NavigationSection) => (
            <div key={section.name} className="text-center">
              {section.items &&
                <div className="px-4 py-2 text-xl font-medium">{section.name}</div>}
              {section.items?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {section.href && (
                <Link
                  href={section.href}
                  className="block px-4 py-2 text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {section.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
