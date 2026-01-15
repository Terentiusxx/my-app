"use client";
import React from "react";

export default function GetInTouch() {
  return (
    <section className="bg-black w-full min-h-screen flex items-center justify-center px-8 md:px-16 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">CONTACT</p>
        
        <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-12 leading-tight">
          Let's create something great together
        </h2>

        <a 
          href="mailto:your@email.com"
          className="inline-flex items-center gap-4 text-2xl md:text-3xl text-white hover:text-red-500 transition-colors group"
        >
          Get in touch
          <span className="text-red-600 group-hover:translate-x-2 transition-transform">→</span>
        </a>
      </div>
    </section>
  );
}
