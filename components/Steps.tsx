import React from "react";
import { motion } from "framer-motion";

type StepProps = {
  currentStep: number;
};

export const Steps: React.FC<StepProps> = ({ currentStep }) => {
  const steps: number[] = [1, 2, 3, 4];

  const circleVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "#ffffff00",
      borderColor: "#6B7280",
      color: "#6B7280",
    },
    active: {
      scale: 1.1,
      backgroundColor: "#9108AF",
      borderColor: "#9108AF",
      color: "#FFFFFF",
    },
    completed: {
      scale: 1,
      backgroundColor: "#ffffff00",
      borderColor: "#9108AF",
      color: "#6B7280",
    },
  };

  // Warianty animacji dla linii
  const lineVariants = {
    inactive: {
      backgroundColor: "#6B7280", // gray-500
    },
    completed: {
      backgroundColor: "#9108AF", // primary
    },
  };

  return (
    <div className="flex justify-between w-full py-6 px-2 md:px-10 items-center">
      {steps.map((step: number, index: number) => (
        <React.Fragment key={step}>
          <motion.div
            className="flex items-center justify-center w-[40px] h-[40px] rounded-full border-2"
            variants={circleVariants}
            initial="inactive"
            animate={
              currentStep === step
                ? "active"
                : currentStep > step
                  ? "completed"
                  : "inactive"
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <span className="text-xl font-bold text-center font-montserrat">{step}</span>
          </motion.div>
          {index < steps.length - 1 && (
            <motion.div
              className="flex-1 h-[2px] mx-2"
              variants={lineVariants}
              initial="inactive"
              animate={currentStep > step ? "completed" : "inactive"}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};