import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BoxSection = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      x: 1200,
      duration: 2,
      rotate: 360,
      backgroundColor: "#22c55e",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-amber-600 flex items-center">
      <div ref={boxRef} className="p-40 bg-blue-950 w-40"></div>
    </div>
  );
};

export default BoxSection;
