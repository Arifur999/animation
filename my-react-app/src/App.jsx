import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const App = () => {
  const defaultPath = `M 80 100 Q 700 100 1400 100`;

  const pinRef = useRef(null);
  const textRef = useRef(null);
  const boxRef = useRef(null);
  const pathRef = useRef(null);
  const hoverRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    //  Box animation
    gsap.to(boxRef.current, {
      x: 1400,
      duration: 2,
      rotate: 360,
      backgroundColor: "#22c55e",
      repeat: -1,
      yoyo: true,
    });

    //  ScrollTrigger horizontal scroll
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

    //  SVG mouse-follow curve
    const svg = document.querySelector("svg");
    const path = pathRef.current;

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

    //  Hover Section Cursor Follow
    const hoverDiv = hoverRef.current;
    const cursor = hoverDiv.querySelector("#cursor");

    // Make sure circle center aligns with mouse
    cursor.style.position = "fixed";
    cursor.style.left = "0";
    cursor.style.top = "0";
    cursor.style.transform = "translate(-50%, -50%)"; // ✅ centers it exactly under cursor
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

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("resize", createScrollAnimation);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseleave", handleMouseLeave);
      hoverDiv.removeEventListener("mousemove", move);
      hoverDiv.removeEventListener("mouseenter", enter);
      hoverDiv.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div>
      {/* First Section */}
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

      {/*  SVG Mouse-Follow Section */}
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

      {/*  Hover Section with Cursor Glow */}
      <div
        ref={hoverRef}
        className="min-h-screen bg-amber-600 flex justify-center items-center relative overflow-hidden"
      >
        <div
          id="cursor"
          className="absolute w-6 h-6 bg-white/20 rounded-full opacity-0 scale-0"
        ></div>
        <h1 className="text-8xl text-center text-white z-10">Mouse hover </h1>
      </div>
      <div
        
        className="min-h-screen bg-sky-500 flex justify-center items-center relative overflow-hidden"
      >
        <div
          
          className="absolute w-6 h-6 bg-white/20 rounded-full opacity-0 scale-0"
        ></div>
        <h1 className="text-8xl text-center text-white z-10">coming soon......</h1>
      </div>
    </div>
  );
};

export default App;
