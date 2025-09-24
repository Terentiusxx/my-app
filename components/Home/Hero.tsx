// components/home/Hero.tsx
"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { useRef } from "react";
import Introduction from "@/components/Home/Intro";
import Content from "@/components/Home/Content";
import Horizontal from "@/components/Home/Horizontal";
import Publications from "@/components/Home/Publications";
import Testimonials from "@/components/Home/Testimonials";
import MediaSlider from "./mediaslider";

export default function Hero() {
  const imageUrl = "/hero.jpg";
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // 0 at top of section, 1 at bottom reaching top
  });

  // Parallax (bg moves more, portrait less, tiny drift on text)
  const bgY   = prefersReduced ? 0 : useTransform(scrollYProgress, [0, 1], [0, -60]); // px
  const fgY   = prefersReduced ? 0 : useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY = prefersReduced ? 0 : useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Fades
  const heroOpacity   = prefersReduced ? 1 : useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 1, 0.3, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      {/* HERO (pinned frame) */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="relative h-full flex flex-col justify-between overflow-hidden">
          {/* Blurred bg */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-center bg-cover  scale-110 grayscale brightness-[.2] will-change-transform"
            style={{ backgroundImage: `url(${imageUrl})`, y: bgY, opacity: heroOpacity }}
          />
          {/* Sharp portrait */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-center bg-contain bg-no-repeat grayscale will-change-transform"
            style={{ backgroundImage: `url(${imageUrl})`, y: fgY, opacity: heroOpacity }}
          />

          {/* Socials */}
          <div className="relative z-10 px-4 mt-12 ml-[30px]">
            <motion.div className="flex gap-8" style={{ y: fgY, opacity: heroOpacity }}>
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-white/70 hover:text-white transition-colors text-2xl" />
              </a>
              <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-white/70 hover:text-white transition-colors text-2xl" />
              </a>
            </motion.div>
          </div>

          {/* Headings + quote */}
          <motion.div style={{ opacity: heroOpacity, y: textY }} className="relative z-10 px-4 mb-12 ml-[24px]">
            <p className="mt-4 text-white/90 w-[400px] ml-auto">
              If you are looking for boring, I am definitely not your girl. If you want excellence with energy, let us connect. Book me and let us get it done while having a good time doing it!
            </p>
            <motion.h3
              className="uppercase text-xl mb-3 font-normal tracking-[.5rem] text-gray-400"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              Dr.
            </motion.h3>

            <motion.h1
              className="text-white max-w-4xl text-5xl md:text-6xl lg:text-7xl 2xl:text-[150px] font-bold my-2 md:my-5"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              Jason Anquandah
            </motion.h1>

          </motion.div>
        </div>
      </div>

      {/* WHITE PANEL (no translate; just fades in) */}
      <div className="relative z-20 bg-white rounded-9xl">
        <Introduction />
      </div>
      <MediaSlider />
      <Publications />
    </section>
  );
}
