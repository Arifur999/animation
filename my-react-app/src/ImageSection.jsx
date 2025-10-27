import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ImageSection = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const words = textElement.textContent.split("");
    textElement.innerHTML = words
      .map((word) => `<span class="word inline-block opacity-0">${word}</span>`)
      .join("");

    const wordSpans = textElement.querySelectorAll(".word");

    // Timeline for "word rising up" animation (loop)
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Each word rises up from bottom
    tl.fromTo(
      wordSpans,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.15,
      }
    ).to(
      wordSpans,
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: "back.in(1.7)",
        stagger: 0.15,
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
