"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Horizontal: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    const textElement = textRef.current;
    const topLineElement = topLineRef.current;
    const bottomLineElement = bottomLineRef.current;
    
    if (!wrapperElement || !textElement || !topLineElement || !bottomLineElement) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapperElement,
      start: "top bottom",
      end: "bottom top", // Creates scroll space
      scrub: 1,
      pin: false,
      onUpdate: (self) => {
        // Calculate starting position (left edge of container)
        const containerWidth = wrapperElement.offsetWidth;
        
        // Start from left edge, move to center-ish, then exit further left
        const startX = containerWidth * 0.5; // Start off-screen left
        const endX = -800; // End further off-screen to the left
        
        gsap.set(textElement, {
          x: startX + (endX - startX) * self.progress,
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="w-full relative mx-auto mb-32 min-h-[60vh] flex items-center bg-white">
      
      <section ref={wrapperRef} className="relative w-full flex items-center overflow-hidden z-10">
        {/* Top moving line */}
        <div 
          ref={topLineRef}
          className="absolute top-0 left-0 w-full h-[2px] bg-black will-change-transform"
        ></div>
        
        <h1 ref={textRef} className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-bold text-black whitespace-nowrap will-change-transform">
          In the Spotlight
        </h1>
        
        {/* Bottom moving line */}
        <div 
          ref={bottomLineRef}
          className="absolute bottom-0 left-0 w-full h-[2px] bg-black will-change-transform"
        ></div>
      </section>
    </div>
  );
};

export default Horizontal;