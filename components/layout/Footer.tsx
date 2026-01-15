"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black py-12 px-8 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-center">
          {/* Column 1 - Brand */}
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">Professor</p>
            <h3 className="text-2xl font-bold text-white mb-4">Jason Anquandah</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
              Transforming data into meaning, mentoring with purpose.
            </p>
          </div>

          {/* Column 2 - Pages */}
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Pages</p>
            <div className="flex flex-col gap-2 items-center">
              <a href="/" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Home
              </a>
              <a href="/about" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                About
              </a>
              <a href="/media" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Media
              </a>
              <a href="/testimonials" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Testimonials
              </a>
              <a href="/contact" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>

          {/* Column 3 - Location */}
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Location</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bristol & London<br />
              United Kingdom<br />
              Working globally
            </p>
          </div>

          {/* Column 4 - Connect */}
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Connect</p>
            <div className="flex flex-col gap-2 items-center">
              <a href="https://www.linkedin.com/in/jason-anquandah-phd-aba45a60/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/dr_jason_susanna/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Jason Anquandah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}