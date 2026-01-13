"use client";
import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

export default function GetInTouch() {
  return (
    <section className="bg-black py-20 flex justify-center">
      <div className="flex items-start gap-8 max-w-2xl w-full px-4">
        {/* Red corner box */}
        <div className="relative min-w-[100px] min-h-[100px] flex-shrink-0">
          <div className="absolute top-0 left-0 w-[70px] h-[70px] border-t-4 border-l-4 border-red-600 rounded-tl-none rounded-br-none"></div>
        </div>
        <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">CONTACT</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Get In Touch</h2>
            <p className="text-gray-300 text-lg max-w-md">
                Feel free to contact me if you have any questions or just want to say hi!
            </p>
            <div className="flex gap-8">
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-white/70 hover:text-red-500 hover:scale-110 transition-all duration-200 text-2xl" />
                </a>
                <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-white/70 hover:text-red-500 hover:scale-110 transition-all duration-200 text-2xl" />
                </a>
            </div>
            <img src="/contact.jpg" alt="Contact" className="mt-6 w-full max-w-md rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
}
