"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Introduction from "@/components/Home/Intro";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imageUrl = "/hero.jpg";
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const triggers: ScrollTrigger[] = [];
    const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".card"));

    cards.forEach((card, index) => {
      if (index >= cards.length - 1) return;
      const nextCard = cards[index + 1];
      const inner = card.querySelector<HTMLElement>(`.card-inner`);
      if (!inner || !nextCard) return;

      const tween = gsap.fromTo(
        inner,
        { y: "0%", z: 0, rotationX: 0 },
        {
          y: "-50%",
          z: -250,
          rotationX: 45,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 85%",
            end: "top -75%",
            scrub: true,
            pin: card,
            pinSpacing: false,
            anticipatePin: 1,
            pinReparent: true,
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="relative bg-[#f7fafd]">
      <div className="sticky-cards relative">
        {/* Card 1: Hero visual */}
        <div className="card relative min-h-screen">
          <div className="card-inner relative h-screen will-change-transform [transform-style:preserve-3d]">
            <div className="relative h-full overflow-hidden bg-black">
              {/* Blurred bg */}
              <div
                aria-hidden
                className="absolute inset-0 bg-center bg-cover scale-110 grayscale brightness-[.2]"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
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
        <div className="card relative min-h-screen z-10">
          <div className="card-inner relative h-screen will-change-transform [transform-style:preserve-3d]">
            <div className="h-full flex items-center bg-[#f7fafd]">
              <Introduction />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
