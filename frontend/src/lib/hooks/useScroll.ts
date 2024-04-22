import { useEffect, useState } from "react";

export const useScroll = (threshold: number, delay: number): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          const scrollPosition = window.scrollY;
          setIsScrolled(scrollPosition > threshold);
          timeoutId = null;
        }, delay);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [threshold, delay]);

  return isScrolled;
};
