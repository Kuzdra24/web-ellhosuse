"use client";
import Image from "next/image";
import {Menu, X, ChevronDown} from "lucide-react";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import Link from "next/link";
import {navigation} from "@/data/menuData";
import logo from "@/assets/images/logo.png";
import {Button} from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/UI/dropdown-menu";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
      <Button
        variant="ghost"
        size="icon"
        className="fixed z-50 right-4 top-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div animate={{rotate: isOpen ? 90 : 0}}>
          {isOpen ? <X size={32}/> : <Menu size={32}/>}
        </motion.div>
      </Button>

      <motion.div
        initial={{opacity: 0, translateX: 200}}
        animate={
          isOpen
            ? {translateX: 0, opacity: 1}
            : {translateX: 200, opacity: 0}
        }
        transition={{duration: 0.4, ease: "easeInOut"}}
        className="fixed h-screen z-40 inset-0 bg-white flex flex-col items-center justify-center w-screen p-6 space-y-6"
      >
        <div className="mb-6">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image src={logo} alt="logo" className="h-[45px] md:h-[60px] w-auto"/>
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-4 text-lg">
          {Object.entries(navigation).map(([key, section]) => (
            <div key={key} className="w-full text-center">
              {section.items ? (
                <DropdownMenu
                  open={openDropdown === key}
                  onOpenChange={(open) => setOpenDropdown(open ? key : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="menu" className="flex items-center space-x-2">
                      {section.name}
                      <ChevronDown className="transition-transform duration-300" size={16}/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="mt-2">
                    {section.items.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} onClick={() => setIsOpen(false)}>
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="menu" asChild>
                  <Link href={section.href || "#"} onClick={() => setIsOpen(false)}>
                    {section.name}
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default HamburgerMenu;
