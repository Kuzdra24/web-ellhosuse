"use client";
import React, {useEffect, useRef, useState} from "react";

const Title = ({
                 children,
                 widthPercentage = 40,
               }: {
  children: React.ReactNode;
  widthPercentage?: number;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative" ref={elementRef}>
      <h2 className="text-center text-[40px] font-lora font-light text-text inline-block relative z-20">
        {children}
      </h2>
      <span
        className={`absolute top-0 left-0 md:h-[90%] h-[50%] bg-accent z-10 transition-all duration-500 ${
          isVisible ? "opacity-100" : "w-0 opacity-0"
        }`}
        style={{
          width: isVisible ? `${widthPercentage}%` : "0%",
        }}
      />
    </div>
  );
};

export default Title;
