'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

interface NavItem {
  name: string;
  href: string;
  description?: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
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
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Publications', href: '/publications' },
    // { name: 'Projects', href: '/projects' },
    { name: 'Media', href: '/media' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  // Hamburger menu button that transforms with delay
  const MenuButton = () => (
    <button
      onClick={() => {
        if (!isAnimating) { // Only allow click if not animating
          setIsOpen(!isOpen);
        }
      }}
      className="fixed top-6 right-6 z-101 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-black/80 backdrop-blur-md text-white hover:bg-black/90 ring-1 ring-white/20 shadow-lg"
    >
      <div className="flex flex-col gap-0.5">
        <span className={`w-4 h-0.5 bg-white transition-all duration-300 ${showX ? 'rotate-45 translate-y-1' : ''}`}></span>
        <span className={`w-4 h-0.5 bg-white transition-all duration-300 ${showX ? 'opacity-0' : ''}`}></span>
        <span className={`w-4 h-0.5 bg-white transition-all duration-300 ${
          (isDarkSection || showX) ? 'bg-white' : 'bg-black'
        } ${showX ? '-rotate-45 -translate-y-1' : ''}`}></span>
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
      // Only homepage has dark hero section
      if (pathname !== '/') {
        setIsDarkSection(false); // All other pages are light by default
        return;
      }
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Change earlier to account for WhatIDo's -mt-[50vh] rise effect
      // WhatIDo starts rising at Hero+Intro (2vh) but rises 50vh faster, so effective position is 1.5vh
      if (scrollY > windowHeight * 1.3) {
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
  }, [pathname]);

  const handleItemHover = (index: number, isHovering: boolean): void => {
    const item = itemsRef.current[index];
    if (!item) return;

    const arrow = item.querySelector('.menu-arrow') as HTMLElement | null;
    const text = item.querySelector('.menu-text') as HTMLElement | null;
    const description = item.querySelector('.menu-description') as HTMLElement | null;

    if (isHovering) {
      if (text) gsap.to(text, { x: 20, duration: 0.4, ease: 'power3.out' });
      if (description) gsap.to(description, { x: 20, duration: 0.4, ease: 'power3.out' });
      if (arrow) {
        gsap.to(arrow, { x: 10, opacity: 1, scale: 1.2, duration: 0.4, ease: 'power3.out' });
      }
    } else {
      const targets = [text, description].filter(Boolean) as HTMLElement[];
      if (targets.length) gsap.to(targets, { x: 0, duration: 0.4, ease: 'power3.out' });
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
        suppressHydrationWarning
        className="fixed inset-0 z-100"
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
          {/* Menu Items - center entire block vertically so header sits directly above links */}
          <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 max-h-screen overflow-auto">
            <header 
              ref={headerRef}
              className="relative z-20 flex justify-center items-center pb-2 mb-6 md:mb-8"
            >
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Menu
                </h1>
              </div>
            </header>

            <nav className={`flex flex-col items-center gap-2 w-full max-w-md mx-auto ${isAnimating ? 'pointer-events-none' : ''}`}>
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className={`menu-link-item-holder group w-full text-center py-0 md:py-0.5 text-lg md:text-xl lg:text-2xl font-medium text-white hover:text-gray-300 transition-colors`}
                  onMouseEnter={() => !isAnimating && handleItemHover(index, true)}
                  onMouseLeave={() => !isAnimating && handleItemHover(index, false)}
                  onClick={handleClose}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </main>
        </div>
      </div>
    </>
  );
};

export default Navbar;