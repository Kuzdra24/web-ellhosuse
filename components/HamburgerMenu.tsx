"use client";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { navigation } from "@/data/menuData";
import logo from "@/assets/images/logo.png";

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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="fixed z-20 flex items-center justify-center w-10 h-10 p-0 right-4 top-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
          {isOpen ? <X size={40} /> : <Menu size={40} />}
        </motion.div>
      </button>

      <motion.div
        initial={{ opacity: 0, translateX: 200 }}
        animate={
          isOpen
            ? { translateX: -7, opacity: 1 }
            : { translateX: 200, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed h-screen z-10 inset-0 bg-white flex justify-center items-center w-screen`}
      >
        <div className="flex flex-col items-center justify-center h-full w-full space-y-6">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src={logo}
                alt="logo"
                className="h-[45px] md:h-[60px] w-auto"
              />
            </Link>
          </div>
          {Object.values(navigation).map((section: NavigationSection) => (
            <div key={section.name} className="text-center">
              {section.items && (
                <div className="px-4 py-2 text-xl font-medium">
                  {section.name}
                </div>
              )}
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
      </motion.div>
    </>
  );
};

export default HamburgerMenu;
