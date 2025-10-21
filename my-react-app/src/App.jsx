import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const App = () => {
  // 🟢 Default straight line path
  const defaultPath = `M 80 100 Q 700 100 1400 100`;

  const pinRef = useRef(null);
  const textRef = useRef(null);
  const boxRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Box animation
    gsap.to(boxRef.current, {
      x: 1400,
      duration: 2,
      rotate: 360,
      backgroundColor: "#22c55e",
      repeat: -1,
      yoyo: true,
    });

    // ScrollTrigger section
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

    // 🟢 Mouse-follow curve effect
    const svg = document.querySelector("svg");
    const path = pathRef.current;

    const handleMouseMove = (e) => {
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Control point follows cursor position
      const newPath = `M 80 100 Q ${x} ${y} 1400 100`;

      gsap.to(path, {
        attr: { d: newPath },
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Return to straight line
      gsap.to(path, {
        attr: { d: defaultPath },
        duration: 1.2,
        // ease:"bounce.out"
        ease: "elastic.out(1, 0.2)",
      });
    };

    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener("resize", createScrollAnimation);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-amber-600 flex items-center">
        <div ref={boxRef} className="p-40 bg-blue-950 w-40"></div>
      </div>

      {/* Scroll Section */}
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

      {/* 🟢 SVG Mouse-Follow Section */}
      <div className="min-h-screen bg-sky-500 flex justify-center items-center">
        <svg width="1500" height="200" className="cursor-pointer">
          <path
            ref={pathRef}
            d={defaultPath}
            stroke="white"
            strokeWidth="4"
            fill="transparent"
          />
        </svg>
      </div>

      <div className="min-h-screen bg-amber-600">
        <h1 className="text-8xl text-center">hello</h1>
      </div>
    </div>
  );
};

export default App;
