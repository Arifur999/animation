import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HoverSection = () => {
  const hoverRef = useRef(null);

  useEffect(() => {
    const hoverDiv = hoverRef.current;
    const cursor = hoverDiv.querySelector("#cursor");

    cursor.style.position = "fixed";
    cursor.style.left = "0";
    cursor.style.top = "0";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.pointerEvents = "none";

    const move = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "none",
      });
    };

    const enter = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const leave = () => {
      gsap.to(cursor, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    hoverDiv.addEventListener("mousemove", move);
    hoverDiv.addEventListener("mouseenter", enter);
    hoverDiv.addEventListener("mouseleave", leave);

    return () => {
      hoverDiv.removeEventListener("mousemove", move);
      hoverDiv.removeEventListener("mouseenter", enter);
      hoverDiv.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={hoverRef}
      className="min-h-screen bg-amber-600 flex justify-center items-center relative overflow-hidden"
    >
      <div
        id="cursor"
        className="absolute w-6 h-6 bg-white/20 rounded-full opacity-0 scale-0"
      ></div>
      <h1 className="text-8xl text-center text-white z-10">Mouse hover</h1>
    </div>
  );
};

export default HoverSection;
