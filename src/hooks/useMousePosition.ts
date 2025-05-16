import { useState, useEffect } from "react";

const useMousePosition = (elementRef: React.RefObject<HTMLElement>) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: { clientX: number; clientY: number }) => {
      const { clientX, clientY } = e;
      setMousePosition({
        x: window.innerWidth / 2 - clientX,
        y: window.innerHeight / 2 - clientY,
      });
    };

    const element = elementRef.current;

    if (element) {
      element.addEventListener("mousemove", updateMousePosition);

      return () => {
        element.removeEventListener("mousemove", updateMousePosition);
      };
    }
  }, [elementRef]);

  return mousePosition;
};

export default useMousePosition;
