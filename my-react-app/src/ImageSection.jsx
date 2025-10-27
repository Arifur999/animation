import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ImageSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const chars = textElement.textContent.split("");
    textElement.innerHTML = chars
      .map((ch) => `<span class="char inline-block opacity-0">${ch}</span>`)
      .join("");

    const charSpans = textElement.querySelectorAll(".char");

    const total = charSpans.length;
    const half = Math.floor(total / 2);

    const leftSide = Array.from(charSpans).slice(0, half);
    const rightSide = Array.from(charSpans).slice(half).reverse();

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.fromTo(
      leftSide,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      }
    );

    tl.fromTo(
      rightSide,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
      },
      "<" 
    );

    tl.to(
      charSpans,
      {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.in",
        stagger: {
          each: 0.05,
          from: "center", 
        },
      },
      "+=1"
    );
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-black text-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/space-travel-collage-design.jpg"
        alt="space"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Animated Text */}
      <h1
        ref={textRef}
        className="relative z-10 text-6xl font-bold tracking-wide text-center py-3 overflow-hidden"
      >
        Hello_Developer_World
      </h1>
    </div>
  );
};

export default ImageSection;
