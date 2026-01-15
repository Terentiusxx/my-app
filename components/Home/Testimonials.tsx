"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";


gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Sarah",
    username: "Cardiff University",
    avatar: "/me1.jpg",
    text: (
      <>
        After finishing a long session, we all collectively agree that your <span className="text-red-600 font-semibold"> teaching style is truly really helpful </span>, and we all agree that we are lucky to have you as a teacher for this semester. Thank you for today and it feels so weird to say we are looking forward to our next math session.
      </>
    ),
  },
  {
    name: "Rishita",
    username: "LSE Online",
    avatar: "/me2.jpg",
    text: (
      <>
        Your <span className="text-red-600 font-semibold">guidance and wisdom</span> have been the greatest gifts in my academic journey, and I am truly grateful for your dedication to our education. Thank you for being an inspiring and supportive teacher. Your passion for teaching has made a positive impact on my life.
      </>
    ),
  },
  {
    name: "Anonymous student",
    username: "Cardiff University",
    avatar: "/me3.jpg",
    text: (
      <>
        The <span className="text-red-600 font-semibold">class pace is great</span> and I like how we go over past topics before starting new ones. It makes me feel like I'm actually improving week by week.
      </>
    ),
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((index + 1) % testimonials.length);

  return (
    <section className="w-full px-6 md:px-9 lg:px-12 py-14 md:py-18 bg-black">
      <div className="mb-10 md:mb-14">
        <div className="pl-9">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">What Students are Saying</h2>
          <div className="flex items-end justify-between mt-6">
            <div>
              <p className="text-gray-400 text-sm max-w-xs">Real stories from real people showcasing authentic experiences</p>
            </div>
            <Button
              variant="link"
              size="sm"
              className="flex items-center gap-3 text-white hover:text-red-500 p-0"
              onClick={() => window.location.href = '/testimonials'}
            >
              view all testimonials
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <img
            src={'/class.jpg'}
            alt="Publications 3"
            className="w-full h-[400px] object-cover rounded-2xl"
          />
          <div className="grid grid-cols-[5%_90%_5%] gap-0">
            <Button variant="ghost" size="icon-sm" className="text-white hover:text-red-500 hover:bg-transparent" onClick={prev}>❮</Button> 
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-md p-8 flex flex-col h-full">
              <svg width="32" height="32" fill="none" className="mb-4 opacity-20"><rect width="32" height="32" rx="16"/><text x="8" y="24" fontSize="28" fill="#fff" opacity=".3">"</text></svg>
              <p className="text-gray-300 text-base mb-6">{testimonials[index].text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div>
                  <div className="font-semibold text-white text-sm">{testimonials[index].name}</div>
                  <div className="text-xs text-gray-500">{testimonials[index].username}</div>
                </div>
              </div>
            </div>
          <Button variant="ghost" size="icon-sm" className="text-white hover:text-red-500 hover:bg-transparent" onClick={next}>❯</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

