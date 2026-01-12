"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#e4e4e4] py-5 px-2 text-center font-sans">
      <div className="max-w-[800px] mx-auto">
        <p className="text-[14px] uppercase tracking-[1.2px] m-0">Professor</p>
        <h1 className="text-[44px] font-bold m-0">Jason Anquandah</h1>

        <div className="flex justify-center w-full">
          <p className="text-[16px] text-[#444] my-3 text-center max-w-full">
            Transforming data into meaning, mentoring with purpose.
          </p>
        </div>

        <div className="flex justify-center gap-[30px] my-2 font-semibold">
          <a href="/contact" className="no-underline text-black transition-colors duration-300 hover:text-[#666]">Contact</a>
          <a href="https://www.instagram.com/dr_jason_susanna/" target="_blank" rel="noopener noreferrer" className="no-underline text-black transition-colors duration-300 hover:text-[#666]">Instagram</a>
          <a href="https://www.linkedin.com/in/jason-anquandah-phd-aba45a60/" target="_blank" rel="noopener noreferrer" className="no-underline text-black transition-colors duration-300 hover:text-[#666]">LinkedIn</a>
        </div>

        <p className="text-[14px] text-[#555] max-w-[600px] mx-auto m-0">
          The Data Science Goddess, based in Bristol & London, United Kingdom. Working globally.
        </p>
      </div>
    </footer>
  );
}