
import React from "react";
import NavBar from "./navBar";
import BoxSection from "./BoxSection";
import ScrollSection from "./ScrollSection";
import SvgSection from "./SvgSection";
import HoverSection from "./HoverSection";

const App = () => {
  return (
    <>
      <NavBar />

      <BoxSection />

      <ScrollSection />

      <SvgSection />

      <HoverSection />

      <div className="animate min-h-screen">
        <h1 className="text-8xl text-center text-white z-10">
          coming soon......
        </h1>
      </div>
    </>
  );
};

export default App;
