"use client"
import React from "react";
import Link from "next/link";
import { motion, useAnimation, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PublicationsProps {
  imageUrl?: string;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Publications: React.FC<PublicationsProps> = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Nested continuation (Hero→Intro style) for Publications
  const contRef = React.useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress: contProg } = useScroll({ target: contRef, offset: ["start start", "end start"] });
  const coverOpacity = prefersReduced ? 1 : useTransform(contProg, [0, 0.6, 1], [1, 0.2, 0]);

  const stickyRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const textSliderRef = useRef<HTMLDivElement>(null);

  const imagePanel1Ref = useRef<HTMLDivElement>(null);
  const imagePanel2Ref = useRef<HTMLDivElement>(null);
  const imagePanel3Ref = useRef<HTMLDivElement>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const publicationsData = [
    {
      id: "#1",
      title: "Psychosocial outcomes after cosmetic surgery",
      description:
        "Systematic review of prospective controlled studies summarizing the best available evidence on psychosocial outcomes after cosmetic surgery.",
      list: [
        "▶ JPRAS 104:282–297 (May 2025), Open access",
        "▶ Authors: Garbett et al. (incl. Jason Anquandah)",
        "▶ Findings: Short‑term gains in area‑specific satisfaction, self‑esteem, sexual/physical well‑being; limited/inconclusive for mental health, holistic body image, QoL",
        "▶ Gaps: Few >6‑month studies; overall quality low—need preregistration, larger samples, longer follow‑up, proper controls",
      ],
      image: "/pub1.jpg",
    },
    {
      id: "#2",
      title: "Random Words",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      list: [
        "▶ Alpha beta gamma",
        "▶ Delta epsilon zeta",
        "▶ Theta iota kappa",
        "▶ Lambda mu nu",
        "▶ Omicron pi rho",
        "▶ Sigma tau upsilon",
      ],
      image: "/pub2.jpg",
    },
    {
      id: "#3",
      title: "More Random",
      description:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      list: [
        "▶ Phi chi psi",
        "▶ Omega alpha beta",
        "▶ Gamma delta epsilon",
        "▶ Zeta eta theta",
        "▶ Iota kappa lambda",
        "▶ Mu nu xi",
      ],
      image: "/pub3.jpg",
    },
  ];

  React.useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  // Magnetic effect for CTA button (same design/behavior as Content.tsx)
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

  useEffect(() => {
    const stickySection = stickyRef.current;
    const textSlider = textSliderRef.current;
    const imagePanel1 = imagePanel1Ref.current;
    const imagePanel2 = imagePanel2Ref.current;
    const imagePanel3 = imagePanel3Ref.current;
    const card = cardRef.current;

    if (!stickySection || !textSlider || !imagePanel1 || !imagePanel2 || !imagePanel3 || !card) return;

    // image layers order and starting positions
    gsap.set(imagePanel1, { zIndex: 3, y: "0%" });
    gsap.set(imagePanel2, { zIndex: 2, y: "0%" });
    gsap.set(imagePanel3, { zIndex: 1, y: "0%" });
  // no floating CTA init

  const computeEnd = () => Math.max(0, (textSlider.scrollHeight || 0) - window.innerHeight);
  const extraEndPx = 60; // extend a bit later
  let endDistance = computeEnd();

    // pin the card for the entire text stack scroll distance
    const pinTrigger = ScrollTrigger.create({
      trigger: stickySection,
      start: "top top",
      end: `+=${endDistance + extraEndPx}`,
      pin: card,
      pinSpacing: true,
      pinReparent: true,
      scrub: false,
      markers: false,
    });

    // blinds animation over the same distance
  const blindsTl = gsap.timeline({
      scrollTrigger: {
        trigger: stickySection,
        start: "top top",
    end: `+=${endDistance + extraEndPx}`,
        scrub: 1,
        pin: false,
        markers: false,
      },
    });

    blindsTl
      .to(imagePanel1, { y: "-100%", ease: "none", duration: 0.5 }, 0)
      .to(imagePanel2, { y: "-100%", ease: "none", duration: 0.5 }, 0.5);

  // no floating CTA ScrollTrigger

    const onResize = () => {
      endDistance = computeEnd();
      pinTrigger.vars.end = `+=${endDistance + extraEndPx}`;
      pinTrigger.refresh();
  if (blindsTl.scrollTrigger) {
        blindsTl.scrollTrigger.vars.end = `+=${endDistance + extraEndPx}`;
        blindsTl.scrollTrigger.refresh();
      }
  // nothing for floating CTA
    };

    window.addEventListener("resize", onResize);
    // fonts can change layout after load
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(onResize).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", onResize);
      pinTrigger.kill();
      blindsTl.scrollTrigger && blindsTl.scrollTrigger.kill();
    };
  }, []);

  // Fade-in for CTA section (matches MediaSlider header pattern)
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 28 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  const renderSlide = (
    data: typeof publicationsData[0],
    slideRef: React.RefObject<HTMLDivElement | null>,
    isFirst = false
  ) => (
    <div
      ref={slideRef}
      className="w-full h-screen flex flex-col justify-center px-6 py-12 md:py-24"
    >
      <motion.span
        ref={isFirst ? ref : undefined}
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className="text-orange-600 font-bold tracking-widest uppercase mb-4 text-base"
      >
        {data.id}
      </motion.span>
      <motion.h1
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className="text-5xl md:text-7xl font-bold mb-8"
      >
        {data.title}
      </motion.h1>
      <motion.p
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className="text-gray-700 text-lg mb-6 max-w-xl"
      >
        {data.description}
      </motion.p>
      <motion.ul
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className="space-y-2 text-gray-800 text-base"
      >
        {data.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </motion.ul>
    </div>
  );

  return (
  <section ref={contRef} className="relative overflow-x-hidden">


      {/* Revealed Publications panel */}
  <div className="relative overflow-x-hidden">
        <section
          ref={stickyRef}
          className="relative min-h-screen overflow-x-hidden rounded-9xl"
          style={{
            width: "100%",
            maxWidth: "100%",
            minWidth: "0",
            left: 0,
            right: 0,
            marginLeft: 0,
            marginRight: 0,
            boxSizing: "border-box",
          }}
        >

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-transparent px-6 box-border md:items-stretch">
        {/* left text stack */}
        <div className="flex-[2] relative min-w-0">
          <div ref={textSliderRef} className="w-full">
            {renderSlide(publicationsData[0], slide1Ref, true)}
            {renderSlide(publicationsData[1], slide2Ref)}
            {renderSlide(publicationsData[2], slide3Ref)}
          </div>
        </div>

        {/* right image card pinned by GSAP */}
    <div className="flex-1 relative pl-6 min-w-0">
          <div
            ref={cardRef}
      className="relative z-[1] w-full max-w-sm h-[420px] md:max-w-md md:h-[520px] rounded-2xl shadow-2xl overflow-hidden mt-16 md:mt-24"
          >
            {/* layer one */}
            <div ref={imagePanel1Ref} className="absolute inset-0">
              <img
                src={publicationsData[0].image}
                alt="Publications 1"
                className="w-full h-full object-cover"
              />
            </div>
            {/* layer two */}
            <div ref={imagePanel2Ref} className="absolute inset-0">
              <img
                src={publicationsData[1].image}
                alt="Publications 2"
                className="w-full h-full object-cover"
              />
            </div>
            {/* layer three */}
            <div ref={imagePanel3Ref} className="absolute inset-0">
              <img
                src={publicationsData[2].image}
                alt="Publications 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

          {/* White panel after Publications with a large button */}
          <div className="relative w-full">
            <div ref={ctaRef} className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Want to see more?</h2>
              <Link
                href="/publications"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="magnetic-area inline-flex items-center gap-4 px-8 py-4 border border-orange-400 hover:bg-orange-100 text-black font-medium text-lg rounded-full transition-colors duration-300 cursor-pointer"
              >
                View publications
                <span className="inline-grid place-items-center h-8 w-8 rounded-full transition-colors">
                  <span className="text-orange-400">→</span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Publications;
