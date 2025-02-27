import { useState, useEffect } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isClient ? width : undefined;
};
