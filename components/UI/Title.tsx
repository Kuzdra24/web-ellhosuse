"use client";
import { useEffect, useRef, useState } from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative" ref={elementRef}>
      <h2 className="text-[40px] font-lora font-light text-text inline-block relative z-20">
        {children}
      </h2>
      <span className={`absolute bottom-0 left-0 w-1/3 h-[80%] bg-accent z-10 ${
        isVisible ? "animate-[slideFromRight_0.5s_ease-out]" : "opacity-0"
      }`}></span>
    </div>
  );
};

export default Title;
