"use client";

import Hr from "../layout/Hr";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Fatima Khoury",
    username: "dilatory_curtains_98",
    avatar: "/me1.jpg",
    text: (
      <>
        The progress tracker is fantastic. It’s motivating to see how much I’ve improved over time. The app has a great mix of common and <span className="text-orange-600 font-semibold">challenging</span> words.
      </>
    ),
  },
  {
    name: "Hassan Ali",
    username: "turbulent_unicorn_29",
    avatar: "/me2.jpg",
    text: (
      <>
        The progress tracker is fantastic. It’s motivating to see how much I’ve improved over time. The app has a great mix of common and <span className="text-orange-600 font-semibold">challenging</span> words.
      </>
    ),
  },
  {
    name: "Jorge Martínez",
    username: "nefarious_jellybeans_91",
    avatar: "/me3.jpg",
    text: (
      <>
        The progress tracker is fantastic. It’s motivating to see how much I’ve improved over time. The app has a great mix of common and <span className="text-orange-600 font-semibold">challenging</span> words.
      </>
    ),
  },
];


export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 28 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-[#f7fafd] w-full px-6 md:px-9 lg:px-12 py-14 md:py-18">
      <div className="mb-10 md:mb-14">
        <div ref={headerRef} className="pl-9">
          <Hr title="Testimonials" />
          <div className="flex items-end justify-between mt-6">
            <div>
              <p className="text-gray-600 text-sm max-w-xs">Real stories from real people showcasing authentic experiences</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-3 text-sm font-medium text-gray-900 hover:text-orange-400 hover:cursor-pointer transition-colors"
            >
              view all testimonials
              <span className="text-xl text-orange-400 hover:text-orange-500 transition-colors">
                →
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-8 flex flex-col h-full">
              <svg width="32" height="32" fill="none" className="mb-4 opacity-20"><rect width="32" height="32" rx="16" fill="#F7FAFD"/><text x="8" y="24" fontSize="28" fill="#000" opacity=".2">“</text></svg>
              <p className="text-gray-700 text-base mb-6">{t.text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.username}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
