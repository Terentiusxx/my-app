'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

interface NavItem {
  name: string;
  href: string;
  description?: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showX, setShowX] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // Prevent clicks during animation
  const [isDarkSection, setIsDarkSection] = useState(true); // Track if we're in dark (hero) or light (white) section
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const navItems: NavItem[] = [
    { 
      name: 'Home', 
      href: '/', 
      description: 'Back to homepage' 
    },
    { 
      name: 'About', 
      href: '/about', 
      description: 'Learn about our story' 
    },
    { 
      name: 'Media', 
      href: '/media', 
      description: 'View our media content' 
    },
    { 
      name: 'Publications', 
      href: '/publications', 
      description: 'Read our publications' 
    },
    { 
      name: 'Testimonials', 
      href: '/testimonials', 
      description: 'What people say about us' 
    },
    { 
      name: 'Contact', 
      href: '/contact', 
      description: 'Get in touch with us' 
    }
  ];

  // Hamburger menu button that transforms with delay
  const MenuButton = () => (
    <button
      onClick={() => {
        if (!isAnimating) { // Only allow click if not animating
          setIsOpen(!isOpen);
        }
      }}
      className={`fixed top-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
        isDarkSection 
          ? ' text-white' 
          : ' text-black'
      }`}
    >
      <div className="flex flex-col gap-1">
        <span className={`w-6 h-0.5 transition-all duration-300 ${
          (isDarkSection || showX) ? 'bg-white' : 'bg-black'
        } ${showX ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`w-6 h-0.5 transition-all duration-300 ${
          (isDarkSection || showX) ? 'bg-white' : 'bg-black'
        } ${showX ? 'opacity-0' : ''}`}></span>
        <span className={`w-6 h-0.5 transition-all duration-300 ${
          (isDarkSection || showX) ? 'bg-white' : 'bg-black'
        } ${showX ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </div>
    </button>
  );

  const handleClose = (): void => {
    if (!isAnimating) { 
      setIsOpen(false);
      setShowX(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowX(true);
      }, 800); // 0.8 seconds delay - change this number to adjust timing

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowX(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return;

    // Kill existing timeline
    if (tl.current) {
      tl.current.kill();
    }

    tl.current = gsap.timeline({ 
      paused: true,
      onStart: () => setIsAnimating(true), // Start animation lock
      onComplete: () => setIsAnimating(false) // Release animation lock
    });

    if (isOpen) {
      // Set initial states for opening
      gsap.set(menuRef.current, { display: 'flex' });
      gsap.set(overlayRef.current, { 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" // Start from bottom
      });
      gsap.set(itemsRef.current.filter(Boolean), { y: 100, opacity: 0 });
      gsap.set(headerRef.current, { y: -50, opacity: 0 });

      // Opening animation - swipes UP from bottom
      tl.current
        .to(overlayRef.current, {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Reveal upward
          ease: "power4.inOut",
        })
        .to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.inOut",
          delay: -0.75,
        })
        .to(itemsRef.current.filter(Boolean), {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });

      tl.current.play();

    } else {
      // Closing animation - exact reverse, swipes DOWN to bottom
      tl.current
        .to(itemsRef.current.filter(Boolean), {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: -0.1, // Reverse stagger
          ease: "power4.inOut"
        })
        .to(headerRef.current, {
          y: -50,
          opacity: 0,
          duration: 1,
          ease: "power4.inOut",
          delay: -0.75,
        })
        .to(overlayRef.current, {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", // Hide downward
          duration: 1.25,
          ease: "power4.inOut",
          delay: -0.75,
        })
        .set(menuRef.current, { display: 'none' });

      tl.current.play();
    }

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
    };
  }, [isOpen]);

  // Scroll detection to change hamburger color based on section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Change to dark when we reach WhatIDo section (after 2 viewport heights: Hero + Intro)
      if (scrollY > windowHeight * 2) {
        setIsDarkSection(false); // We're in the white WhatIDo section
      } else {
        setIsDarkSection(true); // We're in the dark hero/intro sections
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleItemHover = (index: number, isHovering: boolean): void => {
    const item = itemsRef.current[index];
    if (!item) return;

    const arrow = item.querySelector('.menu-arrow') as HTMLElement;
    const text = item.querySelector('.menu-text') as HTMLElement;
    const description = item.querySelector('.menu-description') as HTMLElement;
    
    if (isHovering) {
      gsap.to(text, { x: 20, duration: 0.4, ease: 'power3.out' });
      gsap.to(description, { x: 20, duration: 0.4, ease: 'power3.out' });
      if (arrow) {
        gsap.to(arrow, { x: 10, opacity: 1, scale: 1.2, duration: 0.4, ease: 'power3.out' });
      }
    } else {
      gsap.to([text, description], { x: 0, duration: 0.4, ease: 'power3.out' });
      if (arrow) {
        gsap.to(arrow, { x: 0, opacity: 0.6, scale: 1, duration: 0.4, ease: 'power3.out' });
      }
    }
  };

  return (
    <>
      <MenuButton />
      <div
        ref={menuRef}
        className="fixed inset-0 z-40"
        style={{ display: 'none' }}
      >
        {/* Full Screen Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black flex flex-col"
          style={{
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
          }}
        >
          {/* Header */}
          <header 
            ref={headerRef}
            className="relative z-10 flex justify-between items-center p-8 md:p-12"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Menu
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Navigate to your destination
              </p>
            </div>
          </header>

          {/* Menu Items */}
          <main className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-24">
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className={`menu-link-item-holder group block py-4 md:py-6 border-b border-white/10 ${
                    isAnimating ? 'pointer-events-none' : ''
                  }`} // Disable pointer events during animation
                  onMouseEnter={() => !isAnimating && handleItemHover(index, true)}
                  onMouseLeave={() => !isAnimating && handleItemHover(index, false)}
                  onClick={handleClose}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="menu-text text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-none">
                        {item.name}
                      </div>
                      <div className="menu-description text-white/60 text-sm md:text-base">
                        {item.description}
                      </div>
                    </div>
                    <svg 
                      className="menu-arrow w-6 h-6 md:w-8 md:h-8 text-white opacity-60 ml-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Navbar;