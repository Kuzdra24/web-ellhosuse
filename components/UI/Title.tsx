"use client";
import { useEffect, useRef, useState } from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
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
        className={`absolute bottom-0 left-0 h-[80%] bg-accent z-10 transition-opacity duration-300 ${
          isVisible ? "animate-expandFromLeft opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  );
};

export default Title;
