import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SvgSection = () => {
  const defaultPath = `M 80 100 Q 700 100 1400 100`;
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;

    if (!svg || !path) return; // safety check

    const handleMouseMove = (e) => {
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newPath = `M 80 100 Q ${x} ${y} 1400 100`;

      gsap.to(path, {
        attr: { d: newPath },
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: defaultPath },
        duration: 1.2,
        ease: "elastic.out(1, 0.2)",
      });
    };

    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-sky-500 flex justify-center items-center">
      <svg
        ref={svgRef}
        width="1500"
        height="200"
        className="cursor-pointer"
      >
        <path
          ref={pathRef}
          d={defaultPath}
          stroke="white"
          strokeWidth="4"
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default SvgSection;
