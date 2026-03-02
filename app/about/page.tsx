'use client'

import React, { useEffect, useRef } from "react";
import Copy from "@/components/Home/textanimate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import GetInTouch from "@/components/Home/GetInTouch";

import BackButton from "@/components/ui/BackButton";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const storyImageRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const experiencePinRef = useRef<HTMLDivElement>(null);
  const experienceTitleRef = useRef<HTMLDivElement>(null);
  const additionalExperienceRef = useRef<HTMLDivElement>(null);
  const additionalStoryRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [showAllExperience, setShowAllExperience] = React.useState(false);
  const [showAllStory, setShowAllStory] = React.useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    
    lenis.on("scroll", ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Hero parallax
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    // Story image parallax
    if (storyImageRef.current) {
      gsap.to(storyImageRef.current, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: storyImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    // Experience section rise up effect
    if (experienceRef.current) {
      gsap.fromTo(experienceRef.current,
        { y: '50vh' },
        {
          y: '0vh',
          ease: 'none',
          scrollTrigger: {
            trigger: experienceRef.current,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          }
        }
      );
    }

    // Pin the experience title on the left while content scrolls
    if (experiencePinRef.current && experienceTitleRef.current) {
      ScrollTrigger.create({
        trigger: experiencePinRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: experienceTitleRef.current,
        pinSpacing: false,
      });
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Animate additional experience items when they become visible and refresh ScrollTrigger
  useEffect(() => {
    if (showAllExperience && additionalExperienceRef.current) {
      let refreshInterval: NodeJS.Timeout;
      
      gsap.fromTo(additionalExperienceRef.current,
        { y: '30vh', opacity: 0 },
        {
          y: '0vh',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          onStart: () => {
            // Gradually refresh during animation for smooth transition
            refreshInterval = setInterval(() => {
              ScrollTrigger.refresh();
            }, 100);
          },
          onComplete: () => {
            // Clear interval and do final refresh
            clearInterval(refreshInterval);
            gsap.delayedCall(0.2, () => {
              ScrollTrigger.refresh();
            });
          }
        }
      );
    } else if (!showAllExperience) {
      // Smoothly refresh when content collapses
      gsap.delayedCall(0.3, () => {
        ScrollTrigger.refresh();
      });
    }
  }, [showAllExperience]);

  // Animate additional story paragraphs when they become visible and refresh ScrollTrigger
  useEffect(() => {
    if (showAllStory && additionalStoryRef.current) {
      let refreshInterval: NodeJS.Timeout;
      
      gsap.fromTo(additionalStoryRef.current,
        { y: '30vh', opacity: 0 },
        {
          y: '0vh',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          onStart: () => {
            // Gradually refresh during animation for smooth transition
            refreshInterval = setInterval(() => {
              ScrollTrigger.refresh();
            }, 100);
          },
          onComplete: () => {
            // Clear interval and do final refresh
            clearInterval(refreshInterval);
            gsap.delayedCall(0.2, () => {
              ScrollTrigger.refresh();
            });
          }
        }
      );
    } else if (!showAllStory) {
      // Smoothly refresh when content collapses
      gsap.delayedCall(0.3, () => {
        ScrollTrigger.refresh();
      });
    }
  }, [showAllStory]);

  return (
    <>
      {/* Back Button and Logo (top left, only on non-home pages) */}
      <div className="fixed top-6 left-6 z-50">
        <BackButton  />
      </div>
      {/* Hero Section - Half Page */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Image with Parallax - Blurred */}
        <div 
          ref={heroImageRef}
          className="absolute inset-0 will-change-transform"
          style={{ height: '120%', top: '-10%' }}
        >
          <Image
            src="/aboutme.jpeg"
            alt="Dr. Jason Anquandah"
            fill
            className="object-cover brightness-[.2] grayscale"
            priority
          />
        </div>
        
        {/* Sharp portrait overlay - center */}
        <div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(/aboutme.jpeg)` }}
        />
        
        {/* Content Overlay */}
        <div className="relative h-full px-8 md:px-16 lg:px-24 py-8 md:py-12">
          <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-start pt-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/70">
                About
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Title on left */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                  Jason Anquandah
                </h1>
              </motion.div>

              {/* Description on right */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:text-right"
              >
                <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl lg:ml-auto">
                  Lecturer, research consultant, statistician, machine learning and AI expert, and mentor. I believe nothing about me is self made. I owe God everything. My journey has been shaped by curiosity, resilience, and a deep love for numbers, people, and meaningful impact.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 right-8 md:right-12"
        >
          <div className="text-white/60 text-sm">↓</div>
        </motion.div>
      </section>

      {/* Opening Statement - Quote Style */}
      <section className="relative w-full flex items-start justify-center bg-white py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center px-8 md:px-16 max-w-6xl mx-auto"
        >
          <div className="relative w-full">
            {/* Opening quote mark */}
            <div className="absolute -top-8 -left-4 text-red-600 text-8xl font-serif leading-none opacity-20">
              "
            </div>
            
            {/* Quote text */}
            <Copy>
              <blockquote className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed">
                I have always loved simplifying complex ideas and helping others see what they once thought was difficult.
              </blockquote>
            </Copy>
          </div>
        </motion.div>
      </section>

      {/* Personal Story - Clean Layout */}
      <section className="relative w-full bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Image - Left Side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/aboutme.jpeg"
                  alt="Dr. Jason Anquandah"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Text Content - Right Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                My story.
              </h2>
              
              <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
                <p>
                  From a very young age, I had a natural love for numbers. One story that stands out from my childhood is that I never attended preschool, so my older sister would come home and teach me what she had learned in school. Between the ages of two and three, she taught me the times tables, and to everyone's surprise, I picked them up remarkably quickly. One memorable evening, eager to show off my new skills, I decided to write out the 2 times table using a nail on the side of my father's grey Toyota Carina. I will leave the rest to your imagination.
                </p>
                
                <p>
                 My family supported my love for mathematics, and I always had a natural ability to break down big concepts and simplify them. When I eventually started school, I was promoted and made the assistant class teacher because of my strength in mathematics. Words were not my favourite thing to play with. That is a story for another time. 
                </p>
                
                {/* Additional story paragraphs - conditionally rendered */}
                {showAllStory && (
                  <div ref={additionalStoryRef} className="space-y-6">
                    <p>
                      In Ghana, there is a gap year between junior high school and senior high school. During this time, I ran my first business tutoring children in mathematics. It was both a lucrative and meaningful experience. I had several students, some of whom came to my home, while for others I provided home tutoring services.
                    </p>
                    
                    <p>
                      I went on to attend some of the most prestigious schools in Ghana. At Wesley Girls’ High School I studied business, and later pursued Actuarial Science at Kwame Nkrumah University of Science and Technology. I served as class representative for four consecutive years and received the Best Class Representative award three times. After completing my degree, I became a teaching assistant and was honoured with the Best Statistics Teaching Assistant award.
                    </p>
                    
                    <p>
                      My journey then took me across Africa and beyond, from the African Institute for Mathematical Sciences in Tanzania to a PhD in Statistics at the University of Leeds. Each stage shaped who I am today. It built my voice, my empathy, my leadership, and my commitment to excellence.
                    </p>
                  </div>
                )}

                {/* View More Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex justify-center pt-4"
                >
                  <button
                    onClick={() => setShowAllStory(!showAllStory)}
                    className="flex items-center gap-3 text-gray-900 hover:text-red-500 transition-colors duration-300 text-sm"
                  >
                    {showAllStory ? 'show less' : 'view more'}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${showAllStory ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-Width Quote Banner */}
      <section className="relative w-full py-20 md:py-24 flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/aboutme.jpeg"
            alt="Workspace"
            fill
            className="object-cover opacity-30"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 text-center"
        >
          <div className="relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-red-600/20 text-9xl font-serif leading-none">
              "
            </div>
            <Copy>
              <blockquote className="relative text-3xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed">
                Knowledge, when shared well, becomes a tool for transformation.
              </blockquote>
            </Copy>
          </div>
        </motion.div>
      </section>

      {/* Education Section - Timeline */}
      <section ref={experienceRef} className="relative py-20 md:py-32 px-6 md:px-8 bg-white -mt-[50vh] z-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Education
            </h2>
            <p className="text-xl text-gray-600">
              Academic foundation and qualifications
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative w-full">
            {/* Vertical Line - centered on desktop, left on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-linear-to-b from-black via-gray-400 to-transparent h-full" />
            <div className="md:hidden absolute left-0 w-1 bg-linear-to-b from-black via-gray-400 to-transparent h-full" />

            {/* Education Items */}
            <div className="space-y-12 md:space-y-16 relative">
              {/* PhD */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex ps-10 md:ps-0 md:justify-center md:translate-x-24 justify-center mb-4"
                >
                  <div className="bg-white text-gray-900 px-8 py-3 rounded-xl shadow-lg border-2 border-gray-400">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold">Jan 2017</div>
                        <div className="text-xs text-gray-500">Start</div>
                      </div>
                      <div className="w-px h-6 bg-gray-400" />
                      <div className="text-center">
                        <div className="font-bold">Jun 2020</div>
                        <div className="text-xs text-gray-500">End</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute w-6 h-6 bg-white rounded-full border-4 border-gray-400 shadow-lg z-30 md:left-1/2 md:-translate-x-1/2 md:top-4 left-0 -translate-x-1/2 top-5" />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="md:ml-auto md:pl-12 md:w-1/2"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all duration-300 ml-12 md:ml-0 overflow-hidden">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src="/aboutme.jpeg"
                          alt="University of Leeds"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-black mb-1">PhD in Statistics</h3>
                        <h4 className="font-medium text-lg text-gray-700 mb-3">
                          University of Leeds, United Kingdom
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm mb-2">
                          Doctoral research focused on actuarial science, optimal stopping theory, and unemployment insurance modelling.
                        </p>
                        <p className="text-gray-500 text-xs italic">
                          PhD Thesis: Optimal Stopping for Actuarial Use: A Study on Unemployment Insurance Schemes
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Masters */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex ps-10 md:ps-0 md:justify-center md:-translate-x-24 justify-center mb-4"
                >
                  <div className="bg-white text-gray-900 px-8 py-3 rounded-xl shadow-lg border-2 border-gray-400">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold">2014</div>
                        <div className="text-xs text-gray-500">Start</div>
                      </div>
                      <div className="w-px h-6 bg-gray-400" />
                      <div className="text-center">
                        <div className="font-bold">2016</div>
                        <div className="text-xs text-gray-500">End</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute w-6 h-6 bg-white rounded-full border-4 border-gray-400 shadow-lg z-30 md:left-1/2 md:-translate-x-1/2 md:top-4 left-0 -translate-x-1/2 top-5" />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="md:mr-auto md:pr-12 md:w-1/2"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all duration-300 ml-12 md:ml-0 overflow-hidden">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src="/aboutme.jpeg"
                          alt="University of Ghana"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-black mb-1">MSc in Mathematical Modelling</h3>
                        <h4 className="font-medium text-lg text-gray-700 mb-3">
                          University of Dar es Salaam, Tanzania
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          Research Master's with advanced training in mathematical modelling and applied research. Combined academic research with professional experience in editorial and communication roles.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* MSc Mathematical Sciences - AIMS */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex ps-10 md:ps-0 md:justify-center md:translate-x-24 justify-center mb-4"
                >
                  <div className="bg-white text-gray-900 px-8 py-3 rounded-xl shadow-lg border-2 border-gray-400">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold">2013</div>
                        <div className="text-xs text-gray-500">Start</div>
                      </div>
                      <div className="w-px h-6 bg-gray-400" />
                      <div className="text-center">
                        <div className="font-bold">2014</div>
                        <div className="text-xs text-gray-500">End</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute w-6 h-6 bg-white rounded-full border-4 border-gray-400 shadow-lg z-30 md:left-1/2 md:-translate-x-1/2 md:top-4 left-0 -translate-x-1/2 top-5" />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="md:ml-auto md:pl-12 md:w-1/2"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all duration-300 ml-12 md:ml-0 overflow-hidden">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src="/aboutme.jpeg"
                          alt="AIMS Tanzania"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-black mb-1">MSc in Mathematical Sciences</h3>
                        <h4 className="font-medium text-lg text-gray-700 mb-3">
                          African Institute for Mathematical Sciences, Tanzania
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm mb-2">
                          Intensive postgraduate training in mathematical sciences, programming, and applied problem solving. Completed multiple computational and statistical projects.
                        </p>
                        <p className="text-gray-500 text-xs italic">
                          Final project published as book: Modelling and Analysis of Graduate Unemployment • Fully Funded Scholarship
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* BSc Actuarial Science */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex ps-10 md:ps-0 md:justify-center md:-translate-x-24 justify-center mb-4"
                >
                  <div className="bg-white text-gray-900 px-8 py-3 rounded-xl shadow-lg border-2 border-gray-400">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold">2009</div>
                        <div className="text-xs text-gray-500">Start</div>
                      </div>
                      <div className="w-px h-6 bg-gray-400" />
                      <div className="text-center">
                        <div className="font-bold">2013</div>
                        <div className="text-xs text-gray-500">End</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="absolute w-6 h-6 bg-white rounded-full border-4 border-gray-400 shadow-lg z-30 md:left-1/2 md:-translate-x-1/2 md:top-4 left-0 -translate-x-1/2 top-5" />

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="md:mr-auto md:pr-12 md:w-1/2"
                >
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-gray-400 transition-all duration-300 ml-12 md:ml-0 overflow-hidden">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src="/aboutme.jpeg"
                          alt="KNUST Ghana"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-black mb-1">BSc in Actuarial Science</h3>
                        <h4 className="font-medium text-lg text-gray-700 mb-3">
                          Kwame Nkrumah University of Science and Technology, Ghana
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm mb-2">
                          Served as Class Representative for four consecutive years. Awarded Best Class Representative three times.
                        </p>
                        <p className="text-gray-500 text-xs italic">
                          Recognised as Best Statistics Teaching Assistant after graduation
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience - List Format with Scroll Pin */}
      <section ref={experiencePinRef} className="py-20 md:py-32 px-6 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Sticky Title */}
            <div ref={experienceTitleRef} className="lg:sticky lg:top-32 lg:self-start">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Experience
                </h2>
                <p className="text-xl text-gray-600">
                  A journey through teaching, research, and impact
                </p>
              </motion.div>
            </div>

            {/* Right Side - Scrolling Content */}
            <div className="space-y-8">
            {/* Position 1 - UWE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="border-b border-gray-200 pb-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">University of the West of England (UWE)</h3>
                  <h4 className="text-lg text-gray-700 font-medium mb-3">Lecturer in Data Science and Statistics</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Deliver high-quality teaching across undergraduate and postgraduate levels using innovative, research-informed approaches. 
                    Design and develop teaching content aligned with industry and academic best practice.
                  </p>
                </div>
                <div className="text-gray-500 text-sm md:text-right shrink-0">
                  <div>Sept 2022 - Present</div>
                </div>
              </div>
            </motion.div>

            {/* Position 2 - Research Consultant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="border-b border-gray-200 pb-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Research Consultant</h3>
                  <h4 className="text-lg text-gray-700 font-medium mb-3">Multiple Institutions, United Kingdom</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Active member of research groups contributing advanced data analysis expertise. Collaborate on projects involving telemedicine, 
                    Roblox-based interventions, and Sustainable Development Goals in Africa.
                  </p>
                </div>
                <div className="text-gray-500 text-sm md:text-right shrink-0">
                  <div>Sept 2023 - Present</div>
                </div>
              </div>
            </motion.div>

            {/* Position 3 - Cardiff University */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="border-b border-gray-200 pb-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Study Group - Cardiff University</h3>
                  <h4 className="text-lg text-gray-700 font-medium mb-3">Module Leader and Tutor</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Lead and develop modules in information analysis, statistics, information technology, and marketing management. 
                    Teach international Year 1 and pre-master's students.
                  </p>
                </div>
                <div className="text-gray-500 text-sm md:text-right shrink-0">
                  <div>Dec 2022 - Present</div>
                </div>
              </div>
            </motion.div>

            {/* Additional positions - conditionally rendered */}
            {showAllExperience && (
              <div ref={additionalExperienceRef}>
                {/* Position 4 - LSE */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-200 pb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">London School of Economics & University of London</h3>
                      <h4 className="text-lg text-gray-700 font-medium mb-3">Associate Lecturer (2U Company Ltd)</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Teach Statistical Methods for Marketing Research and Machine Learning. Facilitate group discussions and asynchronous learning activities.
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm md:text-right shrink-0">
                      <div>May 2023 - Present</div>
                    </div>
                  </div>
                </motion.div>

                {/* Position 5 - Open University */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-200 pb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">The Open University</h3>
                      <h4 className="text-lg text-gray-700 font-medium mb-3">Associate Lecturer</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Taught Mathematical Statistics and Applied Statistical Modelling. Provided detailed marking and assessment feedback. 
                        Supported students through one-on-one academic guidance and forum engagement.
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm md:text-right shrink-0">
                      <div>Aug 2022 - Aug 2024</div>
                    </div>
                  </div>
                </motion.div>

                {/* Position 6 - Leeds Teaching */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-200 pb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">University of Leeds</h3>
                      <h4 className="text-lg text-gray-700 font-medium mb-3">Teaching Assistant</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Delivered and designed undergraduate and postgraduate statistics modules. Served as tutor and assistant module convenor. 
                        Supervised MSc students in Statistics and Mathematics.
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm md:text-right shrink-0">
                      <div>Jan 2021 - Jan 2022</div>
                    </div>
                  </div>
                </motion.div>

                {/* Position 7 - Oxford */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-200 pb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">University of Oxford</h3>
                      <h4 className="text-lg text-gray-700 font-medium mb-3">Postdoctoral Research Officer</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Conducted advanced statistical analysis using structural equation modelling, mixed models, and latent class analysis. 
                        Built and managed complex quantitative datasets. Produced policy briefs and peer-reviewed publications.
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm md:text-right shrink-0">
                      <div>Jan 2020 - Jan 2021</div>
                    </div>
                  </div>
                </motion.div>

                {/* Position 8 - Leeds PhD */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="border-b border-gray-200 pb-8"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">University of Leeds</h3>
                      <h4 className="text-lg text-gray-700 font-medium mb-3">Teaching Assistant & PhD Candidate</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Taught Computational Mathematics, Statistical Computing, Financial Mathematics, Probability and Statistics, and Survival Analysis. 
                        Supported exam design, assessment moderation, and student mentoring.
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm md:text-right shrink-0">
                      <div>Jan 2017 - Jun 2020</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* View More Button - Always at the bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center pt-4"
            >
              <button
                onClick={() => setShowAllExperience(!showAllExperience)}
                className="flex items-center gap-3 text-gray-900 hover:text-red-500 transition-colors duration-300 text-sm"
              >
                {showAllExperience ? 'show less experience' : 'view more experience'}
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${showAllExperience ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy - Full-Width Split Screen */}
      <section className="relative min-h-screen w-full bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[50vh] lg:h-screen"
          >
            <Image
              src="/taught.jpg"
              alt="Dr. Jason Anquandah with students"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center px-8 md:px-16 lg:px-20"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 block">
                Teaching Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-tight">
                How I<br />Teach
              </h2>
              <Copy>
                <div className="space-y-8 text-base md:text-lg leading-relaxed text-gray-300">
                  <p className="text-white">
                    I believe learning happens best when students feel seen, challenged, and supported. 
                    My approach is rooted in clarity, patience, and a genuine respect for where each learner is starting from.
                  </p>
                  
                  <div className="pt-10">
                    <Link href="/testimonials">
                      <Button size="lg" className="group">
                        Read Student Testimonials
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </Copy>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects - Carousel Style */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-24 bg-linear-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 block">
              Projects
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              Applied Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mb-12">
              Building tools and platforms that extend learning beyond traditional settings.
            </p>
          </motion.div>

          {/* Horizontal Scrolling Projects */}
          <div className="relative mb-12">
            <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
              {/* PrivateLearn Project Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="group min-w-100 bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl snap-start"
              >
                {/* Project Logo/Image */}
                <div className="relative h-64 bg-linear-to-br from-red-50 to-gray-50 flex items-center justify-center p-12">
                  <Image 
                    src="/privatelearn.png" 
                    alt="PrivateLearn" 
                    width={300}
                    height={200}
                    className="object-contain" 
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-900 transition-colors mb-4">
                    PrivateLearn
                  </h3>
                  <Copy>
                    <p className="text-gray-700 leading-relaxed mb-6 text-base">
                      A digital learning platform providing structured academic support, skills development, 
                      and flexible learning tools for students, professionals, and lifelong learners across Ghana and beyond.
                    </p>
                  </Copy>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">Education</span>
                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">Platform</span>
                    <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">2022</span>
                  </div>
                </div>
              </motion.div>

              {/* Coming Soon Project Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="min-w-100px bg-white border-2 border-gray-200 border-dashed rounded-2xl overflow-hidden snap-start"
              >
                <div className="relative h-64 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-12">
                  <div className="text-gray-300 text-6xl">+</div>
                </div>
                <div className="p-8">
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-xl font-medium">More Projects</p>
                    <p className="text-gray-500 text-sm mt-2">Coming Soon</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="min-w-100 bg-white border-2 border-gray-200 border-dashed rounded-2xl overflow-hidden snap-start"
              >
                <div className="relative h-64 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-12">
                  <div className="text-gray-300 text-6xl">+</div>
                </div>
                <div className="p-8">
                  <div className="text-center py-12">
                    <p className="text-gray-400 text-xl font-medium">More Projects</p>
                    <p className="text-gray-500 text-sm mt-2">Coming Soon</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full border-2 border-gray-900 text-gray-900 hover:border-red-600 hover:text-red-600 hover:bg-transparent group"
              onClick={() => window.location.href = '/projects'}
            >
              View All Projects
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Beyond Work - Image Gallery Style */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-8 block">
              Life Beyond
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Beyond the Work
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Copy>
                <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-300">
                  <p className="text-white text-xl">
                    Outside of teaching and research, I find balance through movement, creativity, and connection.
                  </p>
                  <p>
                    I love <span className="text-red-600 font-semibold">salsa dancing</span>—there's something about the rhythm, the improvisation, the partnership 
                    that mirrors what I value in good collaboration.
                  </p>
                  <p>
                    I also spend time in the kitchen, experimenting with recipes, and in the garden, where patience 
                    and care yield their own kind of growth. Travel has shaped how I see the world, and I'm grateful 
                    for the communities I've been part of across continents.
                  </p>
                  <p className="text-white italic pt-4">
                    These aren't distractions from the work—they're reminders that balance, joy, and care are 
                    essential to doing meaningful work sustainably.
                  </p>
                </div>
              </Copy>
            </motion.div>

            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative h-50 rounded-lg overflow-hidden group">
                  <Image
                    src="/aboutme.jpeg"
                    alt="Salsa dancing"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-70 rounded-lg overflow-hidden group">
                  <Image
                    src="/aboutme.jpeg"
                    alt="Cooking"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="relative h-70 rounded-lg overflow-hidden group">
                  <Image
                    src="/aboutme.jpeg"
                    alt="Travel"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative h-70 rounded-lg overflow-hidden group">
                  <Image
                    src="/aboutme.jpeg"
                    alt="Gardening"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing Reflection - Grand Finale */}
      <section>
        <GetInTouch />
      </section>
    </>
  );
}
