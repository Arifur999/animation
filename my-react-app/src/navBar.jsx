import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import "./App.css";

const NavBar = () => {
  const navRef = useRef(null);
  const tl = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // Drawer timeline
    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(navRef.current, {
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      })
      .fromTo(
        navRef.current.querySelectorAll("h4"),
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      );
  }, []);

  // open drawer
  const openMenu = () => {
    tl.current.play();
    gsap.to(menuBtnRef.current, { opacity: 0, pointerEvents: "none" });
    gsap.to(closeBtnRef.current, { opacity: 1, pointerEvents: "auto" });
  };

  // close drawer
  const closeMenu = () => {
    tl.current.reverse();
    gsap.to(menuBtnRef.current, { opacity: 1, pointerEvents: "auto", delay: 0.4 });
    gsap.to(closeBtnRef.current, { opacity: 0, pointerEvents: "none" });
  };

  return (
    <>
      {/* Menu Icon */}
      <div
        ref={menuBtnRef}
        className="fixed top-6 right-6 z-[60] cursor-pointer"
        onClick={openMenu}
      >
        <CiMenuFries
          size={40}
          color="white"
          className="hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Close Icon (on top but hidden initially) */}
      <div
        ref={closeBtnRef}
        onClick={closeMenu}
        className="fixed top-6 right-6 z-[70] cursor-pointer opacity-0 pointer-events-none"
      >
        <IoMdClose
          size={40}
          className="text-red-400 hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Drawer Menu */}
      <div
        ref={navRef}
        className="fixed top-0 right-0 h-full w-[30%] bg-[#ffffff53] text-black font-bold text-3xl flex flex-col justify-center items-start px-16 translate-x-full z-[50]"
      >
        <h4 className="mb-4 cursor-pointer hover:text-amber-400">Home</h4>
        <h4 className="mb-4 cursor-pointer hover:text-amber-400">About</h4>
        <h4 className="mb-4 cursor-pointer hover:text-amber-400">Contact</h4>
        <h4 className="mb-4 cursor-pointer hover:text-amber-400">Menu</h4>
      </div>
    </>
  );
};

export default NavBar;
