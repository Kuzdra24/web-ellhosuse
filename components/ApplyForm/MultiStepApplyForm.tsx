"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Handshake } from "lucide-react";
import iconImage from "@/assets/images/apply-image.svg";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Image from "next/image";

export const MultiStepApplyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    homeType: "",
    offerType: "",
    region: "",
    city: "",
    priceRange: [0, 500000],
    areaRange: [0, 200],
    searchDate: undefined,
    terms: false,
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const getStepInfo = () => {
    switch (currentStep) {
      case 1:
        return { icon: <User size={32} />, title: "Krok 1: Dane osobowe" };
      case 2:
        return { icon: <Home size={32} />, title: "Krok 2: Szczegóły nieruchomości" };
      case 3:
        return { icon: <Handshake size={32} />, title: "Krok 3: Podsumowanie" };
      default:
        return { icon: <Home size={32} />, title: "Krok" };
    }
  };

  const { icon, title } = getStepInfo();

  return (
    <div className="w-full md-max-w-[1000px] max-w-[350px] md:max-w-[1000px]  bg-white rounded-md min-h-[60vh] shadow-xl flex flex-col md:flex-row">
      <motion.div
        className="bg-primary w-full md:w-[40%] pb-10 rounded-tl-md rounded-bl-md text-white space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 p-6">
          {icon}
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <p className="text-sm text-gray-200 pl-6 pr-6">
          Krok {currentStep} z 3. Wypełnij formularz, aby sprzedać swoją nieruchomość.
        </p>
        <Image src={iconImage} alt="icon" className="w-full hidden md:flex" />
      </motion.div>

      <div className="p-6 mx-auto flex flex-col justify-center space-y-4 w-full md:w-[60%]">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          {currentStep === 1 && (
            <StepOne formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
          )}
          {currentStep === 2 && (
            <StepTwo
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {currentStep === 3 && (
            <StepThree
              formData={formData}
              updateFormData={updateFormData}
              prevStep={prevStep}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
