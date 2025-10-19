import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import "./App.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const App = () => {
  const pinRef = useRef(null);
  const textRef = useRef(null);
 const boxRef = useRef(null);
  useEffect(() => {

   gsap.to(boxRef.current, {
      x: 1400,
      duration: 2,
      rotate: 360,
      backgroundColor: "#22c55e",
      repeat:-1,
      yoyo:true,
      
    });


    gsap.registerPlugin(ScrollTrigger);

    const textWidth = textRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = textWidth - viewportWidth;

    // Pin the section
    ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: () => `+=${scrollDistance + viewportWidth}`,
      pin: true,
      scrub: 1,
      markers: true,
    });

    // Animate text horizontally
    gsap.to(textRef.current, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: pinRef.current,
        start: "top top",
        end: () => `+=${scrollDistance + viewportWidth}`,
        scrub: 1,
      },
    });
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-amber-600 flex items-center">
        <div
        ref={boxRef}
          className="p-40 bg-blue-950 w-40"
        ></div>
      </div>

      {/* Pinned horizontal scroll text section */}
      <div ref={pinRef} className="min-h-screen bg-black flex items-center overflow-hidden">
        <h1
          ref={textRef}
          className="text-white whitespace-nowrap text-[30vw]"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        </h1>
      </div>

      <div className="min-h-screen bg-sky-500">
        <h1 className="text-8xl">hello</h1>
      </div>

      <div className="min-h-screen bg-amber-600">
        <h1 className="text-8xl">hello</h1>
      </div>
    </div>
  );
};

export default App;
