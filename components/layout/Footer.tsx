"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200/60">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Dr. Jason Anquandah. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="hover:text-black" href="#">Privacy</a>
          <a className="hover:text-black" href="#">Terms</a>
          <a className="hover:text-black" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}