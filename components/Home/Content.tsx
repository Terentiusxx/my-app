"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

type RowRefs = { left: HTMLDivElement | null; right: HTMLDivElement | null };

export default function Home() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  // Image extensions mapping
  const imageExtensions = ['jpeg', 'jpeg', 'jpeg', 'jpg', 'jpeg', 'jpg']; 

  const lineRefs = useRef<HTMLParagraphElement[]>([]);
  const rowsRef = useRef<RowRefs[]>([
    { left: null, right: null },
    { left: null, right: null },
    { left: null, right: null },
  ]);

  // Magnetic effect for button
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    const magnetButton = event.currentTarget;
    const bounding = magnetButton.getBoundingClientRect();
    const strength = 75;

    gsap.to(magnetButton, {
      duration: 1,
      x: ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) * strength,
      y: ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) * strength,
      ease: "power4.out",
    });
  }, []);

  const handleMouseLeave = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(event.currentTarget, {
      duration: 1,
      x: 0,
      y: 0,
      ease: "power4.out",
    });
  }, []);

  const addLine = useCallback((el: HTMLParagraphElement | null) => {
    if (el) lineRefs.current.push(el);
  }, []);

  const setRowRef = useCallback(
    (index: number, side: "left" | "right") =>
      (el: HTMLDivElement | null) => {
        rowsRef.current[index][side] = el;
      },
    []
  );

  useEffect(() => {
    const triggerEl = mainRef.current;
    if (!triggerEl) return;

    const leftX = [-400, -450, -200];  // Reduced from [-800, -900, -400]
    const rightX = [400, 450, 200];   // Reduced from [800, 900, 400]
    const leftRot = [-15, -10, -18];  // Reduced from [-30, -20, -35]
    const rightRot = [15, 10, 18];    // Reduced from [30, 20, 35]
    const yVals = [50, -75, -200];    // Reduced from [100, -150, -400]

    rowsRef.current.forEach((row, index) => {
      const cardLeft = row.left;
      const cardRight = row.right;
      if (!cardLeft || !cardRight) return;

      gsap.to(cardLeft, {
        x: leftX[index],
        scrollTrigger: {
          trigger: triggerEl,
          start: "top bottom", // Changed from "top center"
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            cardLeft.style.transform = `translateX(${p * leftX[index]}px) translateY(${p * yVals[index]}px) rotate(${p * leftRot[index]}deg)`;
            cardRight.style.transform = `translateX(${p * rightX[index]}px) translateY(${p * yVals[index]}px) rotate(${p * rightRot[index]}deg)`;
          },
        },
      });
    });

    if (logoRef.current) {
      gsap.set(logoRef.current, { scale: 0 });
      gsap.to(logoRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top bottom",
          toggleActions: "play reverse play reverse",
        },
      });
    }

    if (lineRefs.current.length) {
      gsap.set(lineRefs.current, { y: 30 });
      gsap.to(lineRefs.current, {
        y: 0,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: triggerEl,
          start: "top bottom",
          toggleActions: "play reverse play reverse",
        },
      });
    }

    if (buttonRef.current) {
      gsap.set(buttonRef.current, { y: 30, opacity: 0 });
      gsap.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.25,
        scrollTrigger: {
          trigger: triggerEl,
          start: "top bottom",
          toggleActions: "play reverse play reverse",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="min-h-screen">

        {/* main */}
        <section
          ref={mainRef}
          className="relative w-full h-[150vh] flex flex-col justify-center items-center overflow-x-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50">
            <div className="my-8 flex flex-col items-center">
              <div className="relative my-2 w-max h-[auto] [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]">
                <p ref={addLine} className="relative text-[24px] font-bold">
                  This is where passion meets impact!
                </p>
              </div>  
              <div className="relative my-2 w-max h-[auto] [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)]">
                <p ref={addLine} className="relative text-[24px] font-bold">
                  See me in action, doing what I love most
                </p>
              </div>
            </div>

            <Link
              href="/media"
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="magnetic-area relative py-4 px-8 text-[18px] border-2 border-black rounded-full bg-transparent hover:bg-black hover:text-white transition-colors duration-300 ease-out cursor-pointer inline-block text-center no-underline group"
            >
              <span className="relative z-10">Explore Media</span>
              <div className="absolute inset-0 bg-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></div>
            </Link>
          </div>

          {/* animated rows */}
          <div className="w-full mt-4 space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative w-full my-4 flex justify-center gap-8">
                <div
                  ref={setRowRef(i, "left")}
                  className="relative w-1/2 h-[240px] lg:w-[40%] lg:h-[360px] rounded-xl overflow-hidden [will-change:transform] group cursor-pointer"
                >
                  {/* Blurred background */}
                  <img
                    src={`/media${2 * (i + 1) - 1}.${imageExtensions[2 * (i + 1) - 2]}`}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
                  />
                  {/* Sharp overlay image */}
                  <img
                    src={`/media${2 * (i + 1) - 1}.${imageExtensions[2 * (i + 1) - 2]}`}
                    alt=""
                    width={100}
                    height={100}
                    className="relative w-full h-full object-contain"
                  />
                  {/* Video play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:bg-black/90 transition-all duration-300 group-hover:scale-110">
                      <svg 
                        className="w-8 h-8 text-white ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  ref={setRowRef(i, "right")}
                  className="relative w-1/2 h-[240px] lg:w-[40%] lg:h-[360px] rounded-xl overflow-hidden [will-change:transform] group cursor-pointer"
                >
                  {/* Blurred background */}
                  <img
                    src={`/media${2 * (i + 1)}.${imageExtensions[2 * (i + 1) - 1]}`}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
                  />
                  {/* Sharp overlay image */}
                  <img
                    src={`/media${2 * (i + 1)}.${imageExtensions[2 * (i + 1) - 1]}`}
                    alt=""
                    width={100}
                    height={100}
                    className="relative w-full h-full object-contain"
                  />
                  {/* Video play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:bg-black/90 transition-all duration-300 group-hover:scale-110">
                      <svg 
                        className="w-8 h-8 text-white ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ReactLenis>
  );
}
