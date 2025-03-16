"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import {useState, useEffect} from "react";
import {useWidth} from "@/hooks/useWidth";
import {ChevronDown} from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import {Button} from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/UI/dropdown-menu";
import {navigation} from "@/data/menuData";

export const Navbar = () => {
  const width = useWidth() ?? 0;
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
                className="h-[35px] custom-lg:h-[60px] w-auto"
              />
            </Link>
          </div>

          <div className="flex space-x-2">
            {width < 768 ? (
              <HamburgerMenu/>
            ) : (
              <>
                <div
                  onMouseEnter={() => setOpenDropdown("offers")}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="relative"
                >
                  <DropdownMenu open={openDropdown === "offers"}>
                    <DropdownMenuTrigger asChild>
                      <Link href={navigation.offers.href || ""} className="flex items-center space-x-1">
                        <Button variant="menu">{navigation.offers.name}
                          <ChevronDown
                            className={`transition-transform duration-300 ${
                              openDropdown === "offers" ? "rotate-180" : "rotate-0"
                            }`}
                            size={16}
                          />
                        </Button>
                      </Link>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="mt-[-4px]">
                      {navigation.offers.items &&
                        navigation.offers.items.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div
                  onMouseEnter={() => setOpenDropdown("submissions")}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="relative"
                >
                  <DropdownMenu open={openDropdown === "submissions"}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="menu" className="flex items-center space-x-1">
                        {navigation.submissions.name}
                        <ChevronDown
                          className={`transition-transform duration-300 ${
                            openDropdown === "submissions" ? "rotate-180" : "rotate-0"
                          }`}
                          size={16}
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="mt-[-4px]">
                      {
                        navigation.submissions.items &&
                        navigation.submissions.items.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div
                  onMouseEnter={() => setOpenDropdown("services")}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="relative"
                >
                  <DropdownMenu open={openDropdown === "services"}>
                    <DropdownMenuTrigger asChild>
                      <Link href={navigation.services.href || ""} className="flex items-center space-x-1">
                        <Button variant="menu">{navigation.services.name}
                          <ChevronDown
                            className={`transition-transform duration-300 ${
                              openDropdown === "services" ? "rotate-180" : "rotate-0"
                            }`}
                            size={16}
                          />
                        </Button>
                      </Link>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="mt-[-4px]">
                      {
                        navigation.services.items &&
                        navigation.services.items.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Button variant="menu" asChild>
                  <Link href={navigation.blog.href || ""}>
                    {navigation.blog.name}
                  </Link>
                </Button>
                <Button variant="menu" asChild>
                  <Link href={navigation.contact.href || ""}>
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
