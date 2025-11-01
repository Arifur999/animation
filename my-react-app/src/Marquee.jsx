import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Marquee = () => {
  const marqueeRef = useRef(null);
  const direction = useRef(1); // 1 = left to right, -1 = right to left
  const speed = 40; // lower = faster
  const arrowsRef = useRef([]);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const inner = marquee.querySelector(".marquee-inner");

    // Clone inner for infinite loop
    const clone = inner.cloneNode(true);
    marquee.appendChild(clone);

    // GSAP marquee animation
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" },
    });

    tl.to(marquee.children, {
      xPercent: -100,
      duration: speed,
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });

    // Scroll direction control
    const handleScroll = (e) => {
      direction.current = e.deltaY > 0 ? 1 : -1;
      tl.timeScale(direction.current);

      // Rotate all arrow images
      gsap.to(arrowsRef.current, {
        rotationY: direction.current === 1 ? 0 : 180,
        duration: 2,
        ease: "power2.out",
        transformOrigin: "center",
      });
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-sky-900 flex flex-col justify-center items-center">
      <h1 className="text-white text-3xl mb-10">
        Scroll to Change Direction ⬆️⬇️
      </h1>

      {/*  Green box fixed, text moves */}
      <div
        ref={marqueeRef}
        className="relative w-full overflow-hidden bg-green-400 py-6 flex items-center"
      >
        <div className="marquee-inner flex items-center gap-20 whitespace-nowrap shrink-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 shrink-0 px-6"
            >
              <h1 className="text-[60px] text-black font-semibold whitespace-nowrap">
                Building Better Brands
              </h1>
              <img
                ref={(el) => (arrowsRef.current[i] = el)}
                className="w-20 h-20"
                src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
                alt="arrow"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
