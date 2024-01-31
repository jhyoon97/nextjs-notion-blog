import { useState, useEffect } from "react";

interface OnScroll {
  (): void;
}

const useScroll = (onScroll: OnScroll | undefined, deps: any[]) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);

    if (onScroll) {
      onScroll();
    }
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, deps);

  return { scrollY };
};

export default useScroll;
