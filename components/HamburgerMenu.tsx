"use client";
import Image from "next/image";
import {Menu, X, ChevronDown} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {useState, useEffect} from "react";
import Link from "next/link";
import {navigation} from "@/data/menuData";
import logo from "@/assets/images/logo.png";

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
      <button
        className="fixed z-50 flex items-center justify-center w-10 h-10 p-0 right-4 top-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <motion.div animate={{rotate: isOpen ? 90 : 0}}>
          {isOpen ? <X size={40}/> : <Menu size={40}/>}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, translateX: 200}}
            animate={
              isOpen
                ? {translateX: -9, opacity: 1}
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
                <div key={key} className="relative w-full text-center">
                  {section.items ? (
                    <div
                      onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                      className="cursor-pointer flex justify-center items-center space-x-2 py-2 hover:text-primary"
                    >
                      <span>{section.name}</span>
                      <ChevronDown
                        className={`transition-transform ${
                          openDropdown === key ? "rotate-180" : "rotate-0"
                        }`}
                        size={16}
                      />
                    </div>
                  ) : (
                    <Link
                      href={section.href || "/"}
                      className="block py-2 hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {section.name}
                    </Link>
                  )}

                  <AnimatePresence>
                    {section.items && openDropdown === key && (
                      <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        className="flex flex-col items-center mt-2 space-y-2 overflow-hidden"
                      >
                        {section.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block py-1 text-gray-600 hover:text-primary"
                            onClick={() => {
                              setIsOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
