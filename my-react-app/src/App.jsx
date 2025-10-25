import React from "react";
import NavBar from "./navBar";
import BoxSection from "./BoxSection";
import ScrollSection from "./ScrollSection";
import SvgSection from "./SvgSection";
import HoverSection from "./HoverSection";
import HeroSection from "./heroSection";
import ImageSection from "./imageSection";


const App = () => {
  return (
    <>
      <NavBar />
   <HeroSection/>
      <BoxSection />

      <ScrollSection />

      <SvgSection />

      <HoverSection />

      <ImageSection></ImageSection>
   
    </>
  );
};

export default App;
