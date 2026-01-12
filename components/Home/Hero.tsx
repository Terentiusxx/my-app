"use client";
import React, { useEffect } from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Introduction from "@/components/Home/Intro";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imageUrl = "/hero.jpg";
  const introcard = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis();
    
    lenis.on("scroll", ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Parallax effect for background
    gsap.to(bgRef.current, {
      y: "-30%",
      ease: "none",
      scrollTrigger: {
        trigger: "section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="relative">
      {/* Shared blurred background - spans entire section */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 bg-center bg-cover brightness-[.2] -z-10 will-change-transform"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          height: '140%',
          top: '-20%'
        }}
      />
      
      <div className="sticky-cards relative">
        {/* Card 1: Hero visual */}
        <div className="card relative h-screen">
          <div className="card-inner relative h-screen will-change-transform [transform-style:preserve-3d]">
            <div className="relative h-full overflow-hidden">
              {/* Sharp portrait */}
              <div
                aria-hidden
                className="absolute inset-0 bg-center bg-contain bg-no-repeat grayscale"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />

              {/* Socials */}
              <div className="relative z-10 px-4 mt-12 ml-[30px]">
                <div className="flex gap-8">
                  <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-white/70 hover:text-white hover:scale-110 transition-transform duration-200 text-2xl" />
                  </a>
                  <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-white/70 hover:text-white hover:scale-110 transition-transform duration-200 text-2xl" />
                  </a>
                </div>
              </div>

              {/* Headings + quote */}
              <div className="relative z-10 px-4 mb-12 ml-[24px]">
                <p className="mt-4 text-white/90 w-[400px] ml-auto">
                  If you are looking for boring, I am definitely not your girl. If you want excellence with energy, let us connect. Book me and let us get it done while having a good time doing it!
                </p>
                <h3 className="uppercase text-xl mb-3 font-normal tracking-[.5rem] text-gray-400">Dr.</h3>
                <h1 className="text-white max-w-4xl text-5xl md:text-6xl lg:text-7xl 2xl:text-[150px] font-bold my-2 md:my-5">Jason Anquandah</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Introduction */}
        <div ref={introcard} className="card relative h-screen z-10">
          <div className="card-inner relative h-screen will-change-transform [transform-style:preserve-3d]">
            <div className="h-full flex items-start justify-center px-8 md:px-16 pt-20">
              <Introduction />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
