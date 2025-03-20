"use client";
import React from "react";
import { motion } from "framer-motion";
import {Steps} from "@/components/Steps";

type PropTypes = {
  currentStep: number;
  applyType: string;
  children: React.ReactNode;
};

export const MultistepFormLayout: React.FC<PropTypes> = ({ currentStep, applyType, children }) => {
  const formVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <section className="max-w-[1200px] mx-auto relative flex justify-center items-center">
      <div className="blur-shadow-bg w-[200px] h-[200px] top-0 left-[20%]"></div>
      <div className="blur-shadow-bg w-[220px] h-[200px] top-[70%] right-[25%]"></div>
      <div className="bg-white/60 backdrop-blur-2xl max-w-[360px] p-4 md:max-w-[400px] w-full mx-12 md:mx-auto flex flex-col items-center justify-center my-[100px] py-8 shadow-md rounded-md">
        <h1 className="font-lora text-[#525252] text-3xl text-center w-full">{applyType}</h1>
        <span className="text-gray-500 text-md text-center font-montserrat">
          ~W kilku krokach
        </span>
        <Steps currentStep={currentStep} />
        <motion.div
          variants={formVariants} // Warianty animacji
          initial="hidden" // Początkowy stan
          animate="visible" // Stan widoczny
          exit="exit"
          key={React.Children.toArray(children)[0]?.toString()}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};