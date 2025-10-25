import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollSection = () => {
  const pinRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const createScrollAnimation = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const textWidth = textRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const scrollDistance = textWidth - viewportWidth;

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        markers: true,
      });

      gsap.to(textRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 1,
        },
      });

      ScrollTrigger.refresh();
    };

    createScrollAnimation();
    window.addEventListener("resize", createScrollAnimation);

    return () => {
      window.removeEventListener("resize", createScrollAnimation);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={pinRef}
      className="min-h-screen bg-black flex items-center overflow-hidden"
    >
      <h1
        ref={textRef}
        className="text-white whitespace-nowrap text-[30vw]"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </h1>
    </div>
  );
};

export default ScrollSection;
