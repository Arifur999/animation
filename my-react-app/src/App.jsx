import React from "react";
import NavBar from "./navBar";
import BoxSection from "./BoxSection";
import ScrollSection from "./ScrollSection";
import SvgSection from "./SvgSection";
import HoverSection from "./HoverSection";
import HeroSection from "./heroSection";
import ImageSection from "./imageSection";
import Marquee from "./Marquee";
import Card from "./card";


const App = () => {
  return (
    <>
      <NavBar />
   <HeroSection/>
      <BoxSection />

      <ScrollSection />

      <SvgSection />
 <Marquee></Marquee>
      <HoverSection />

      <ImageSection></ImageSection>
     <Card></Card>
   
    </>
  );
};

export default App;
