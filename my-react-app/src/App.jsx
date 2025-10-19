import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const boxRef = useRef(null);

 useEffect(() => {
    gsap.to(boxRef.current, {
      x: 1400,
      duration: 2,
      rotate: 360,
      backgroundColor: "#22c55e",
      
    });
  }, []); 


  return (
    <div>
      <div className="min-h-screen bg-amber-600 flex items-center">
        <div
          ref={boxRef}
      
          className="p-40 bg-blue-950 w-40 "
        ></div>
      </div>

      <div className="min-h-screen bg-cyan-200">
        <h1 className="text-8xl">hello</h1>
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
