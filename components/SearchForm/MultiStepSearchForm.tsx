"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Handshake } from "lucide-react";
import iconImage from '@/assets/images/600x500.svg';
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Image from "next/image";

export const MultiStepSearchForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        homeType: "",
        offerType: "",
        region: "",
        city: "",
        priceRange: [0, 500000], // Domyślna wartość
        areaRange: [0, 200],
        searchDate: undefined,
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
        <div className="w-full max-w-[1000px] flex bg-white rounded-md min-h-[60vh] shadow-xl">
            <motion.div
                className="bg-primary w-[40%] rounded-tl-md rounded-bl-md text-white space-y-4"
                initial={{ opacity: 0}} // Początkowa pozycja: ukryte i przesunięte w lewo
                animate={{ opacity: 1}}   // Końcowa pozycja: pełna widoczność i na środku
                exit={{ opacity: 0 }}     // Po zakończeniu animacji: ukryte i przesunięte w prawo
                transition={{ duration: 0.5 }}    // Czas trwania animacji
            >
                <div className="flex items-center space-x-4 p-6">
                    {icon}
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
                <p className="text-sm text-gray-200 pl-6 pr-6">
                    Krok {currentStep} z 3. Wypełnij formularz, aby znaleźć odpowiednią nieruchomość.
                </p>
                {/* Dodatkowe informacje o formularzu */}
                <Image src={iconImage} alt="icon" className="w-full pl-6"/>
            </motion.div>

            <div className="p-6 mx-auto flex flex-col justify-center space-y-4 w-[60%]">
                {/* Animacje przejścia między krokami */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }} // Początkowa pozycja: ukryte i przesunięte w prawo
                    animate={{ opacity: 1, x: 0 }}   // Końcowa pozycja: pełna widoczność i na środku
                    exit={{ opacity: 0, x: -50 }}     // Po zakończeniu animacji: ukryte i przesunięte w lewo
                    transition={{ duration: 0.5 }}    // Czas trwania animacji
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
