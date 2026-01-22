'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Copy from './textanimate'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

type Service = {
  title: string
  category: string
  description: string
  image: string
}

const services: Service[] = [
  {
    title: 'University Lecturing',
    category: 'Education',
    description:
      'I teach statistics, data science, and computational methods at undergraduate and postgraduate levels, focusing on clarity, critical thinking, and long-term understanding.',
    image: '/teaching.png',
  },
  {
    title: 'Statistical & Data Analysis',
    category: 'Analytics',
    description:
      'I conduct rigorous statistical analysis for research and real-world datasets, using robust modelling and clear reporting to support evidence-based decisions.',
    image: '/analysis.png',
  },
  {
    title: 'Machine Learning & AI',
    category: 'Technology',
    description:
      'I develop and apply machine learning methods to explore patterns, build predictive models, and evaluate interventions, translating complex outputs into practical insight.',
    image: '/ai.jpeg',
  },
  {
    title: 'Research & Evaluation',
    category: 'Methodology',
    description:
      'I support research teams with study design, data management, and programme evaluation, producing analyses, reports, and evidence that measure impact and effectiveness.',
    image: '/research.png',
  },
  {
    title: 'Consulting',
    category: 'Consultancy',
    description:
      'I work with universities, organisations, and research teams to provide data analysis, methodological support, and evaluation across applied research projects.',
    image: '/mentoring.jpg',
  },
  {
    title: 'Mentorship & Supervision',
    category: 'Development',
    description:
      'I mentor students and early-career professionals, providing academic supervision, career guidance, and support through research and professional development journeys.',
    image: '/consulting.png',
  },
];

type Props = {
  className?: string
}

const WhatIDo: React.FC<Props> = ({ className = '' }) => {
    const logoRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgTransitionRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollPosition = () => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition)
      checkScrollPosition()
      return () => slider.removeEventListener('scroll', checkScrollPosition)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Slide up the section
      gsap.fromTo(sectionRef.current,
        { y: '50vh' },
        {
          y: '0vh',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Infinite logo slider animation
  useEffect(() => {
    gsap.fromTo(
      '.service-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className={`relative w-full min-h-screen pb-0 overflow-hidden -mt-[50vh] z-20 bg-white ${className}`}>
      
      {/* SVG brush stroke definitions */}
      <svg height="0" width="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="brush-rect-whatido">
            <rect x="0" y="0" width="0" height="1">
              <animate
                id="brush-anim-whatido"
                attributeName="width" 
                dur="0.8s" 
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.5,0,0.5,1"
                values="0;1"
                begin="indefinite"
              />
            </rect>
          </clipPath>
          
          <clipPath id="brush-clip-whatido" clipPathUnits="objectBoundingBox">
            <use href="#brush-shape-whatido" clipPath="url(#brush-rect-whatido)" />
          </clipPath>
          
          <path id="brush-shape-whatido" d="M.261.995A.07.07 0 0 0 .257.978V.975C.258.97.255.972.257.967.259.963.255.96.257.959V.95C.256.943.259.948.257.943.256.934.255.956.255.944.255.937.254.943.253.94.252.939.253.938.254.937.257.934.257.931.26.926.267.907.277.916.284.899.293.885.287.897.29.879.295.874.308.872.312.862.288.866.246.848.22.864.207.871.2.872.188.891.175.892.176.901.161.91.156.928.143.92.138.928c0-.005-.025-.012-.022.01-.007.013.01-.01.011-.003-.001.004.006 0 .004.003L.13.942C.13.947.113.951.111.945.103.948.059.92.089.918.069.889.048.9.029.904.028.901.002.922.008.898.012.884.032.892.029.873.026.872.031.869.029.867c0-.004.002-.012.005-.014A.055.055 0 0 0 .017.85C.021.826.042.831.045.818.044.818.038.815.041.811.042.804.053.795.046.793.041.79.032.788.029.791.026.792.019.799.024.783V.782C.024.784.022.778.022.781.021.786.019.782.022.778.024.774.023.773.02.77.011.75.041.756.045.75.037.732.04.727.048.717.051.714.045.713.046.704.04.698.026.726.019.716L.02.713C.02.711.049.696.036.696.031.688.013.697.011.7.009.699.012.689.015.686c.004-.01-.008 0-.009 0A.083.083 0 0 0 .01.671C-.015.656.013.64.022.638.065.619.022.624.05.602.076.574.047.581.061.565.065.559.049.563.054.556.056.549.035.568.036.554.034.55.047.529.046.527.045.52.061.504.058.495c0-.008.021-.016.024-.022C.09.469.095.459.101.455.102.454.101.453.1.453.093.454.093.447.09.446.087.446.094.439.095.443c.003.002.008 0 .012.005.004.008.001-.003 0-.006C.1.427.133.438.124.42c0-.006.005-.003.002-.009C.12.412.106.413.104.406.104.395.105.393.098.392.088.392.105.381.108.38.117.373.133.38.141.371.143.369.143.369.143.362V.348C.142.342.143.341.151.342.164.342.166.334.179.329.161.323.132.331.118.344v.002c-.001 0 0 .006-.002.001C.113.338.115.354.112.347.107.338.107.36.1.34.098.344.1.32.101.324L.102.32C.106.32.109.307.111.316H.11L.108.32v.002c0 .006.004.01.002.005C.109.324.115.328.115.325.116.32.117.33.118.324.118.317.119.319.12.315.121.311.125.309.125.304c0-.011.001.007.002-.001.002-.008 0 .008.002.001S.122.289.131.283C.133.283.135.281.135.277.136.271.143.276.144.27.14.26.126.277.123.262.121.254.124.257.122.252S.124.252.124.25C.121.245.128.243.128.247c0 .002 0 .002 0 0A.017.017 0 0 0 .135.244C.137.244.138.239.136.239.129.233.144.217.147.217.155.202.113.217.11.212.107.209.11.217.108.216.104.212.101.22.106.206c0 0-.004.003-.002 0C.106.198.112.215.113.205.112.202.121.202.12.205.122.199.131.198.134.195.139.19.14.192.144.188.151.183.13.188.131.187.123.185.055.231.084.194.128.159.184.15.23.132.26.119.281.094.313.079.321.079.338.05.341.074c0 .004.001.001.002.002C.345.074.342.09.344.084.339.11.33.106.375.088.4.081.424.072.449.069.461.086.479.065.497.067c.07-.01.145.008.213.021a.525.525 0 0 1 .129.034C.844.128.854.123.855.13c0 .003.001.004.001.001 0-.004.002.001.003 0C.861.13.861.145.859.136.832.14.793.123.76.123c.021.019.057.01.076.03C.833.158.826.15.821.149.814.149.802.15.793.142.789.15.775.143.77.146.772.151.768.154.762.151.727.147.687.119.652.139c.037.02.079.016.115.035.043.029.096.022.135.042C.887.223.852.214.835.215.826.213.824.214.829.217c.004.001.004.005 0 .008-.005.007.02.007.025.009.009.001.01.002.01.005-.003.007.027.007.029.012C.905.263.867.262.889.269c.024.003.053.029.075.04 0 .004-.005.002-.006.004 0 .003.006.005.003.01-.002.003.001.007.006.01S.975.34.973.34c-.001.002.01.009.013.013C.996.36.983.358.981.365.977.371.964.355.965.375c.002.002.021.013.01.014-.006 0-.004.003-.01.003-.014.004.012.011.014.015C.986.411.954.416.975.425c.006.006.009.001.013.007C.989.437.984.446.985.44.987.435.984.437.984.44S.983.443.977.442C.97.441.968.442.97.448c.002.018.019.014.022.027C.988.486.961.462.958.476.962.503 1 .488.997.509.997.516.99.514.992.527.994.536.99.539.995.541.998.56.982.538.982.547c-.004.017.002.022 0 .024v.002c.003.004-.011 0-.01.009C.972.584.971.585.97.585.96.586.978.604.98.608c.008-.002.015.013.005.02C.985.637.937.619.957.635.98.649.955.642.973.668.974.674.974.68.972.679.97.696.966.692.96.693.952.691.953.703.945.698.942.699.935.701.94.71c.002.006.022.018.015.026C.955.743.952.751.951.75.95.755.936.753.94.764c.003.01.007.005.005.022.001.009-.001 0-.002.002L.939.796C.948.8.939.808.935.813.931.818.934.825.926.816.922.812.921.812.919.819S.903.814.904.82c0 .003.013.008.01.011C.91.837.926.846.93.849.929.859.927.861.93.87.926.877.906.852.903.859c-.004.009.01.012.012.023C.916.887.906.881.906.884.91.894.899.882.898.881S.888.87.887.877c-.004.014.02.018.027.028C.93.914.907.914.905.915c0 .001.008.008.004.011C.908.931.9.921.901.926.914.945.868.935.866.939.807.926.75.894.69.896.674.894.679.901.673.897.668.896.661.885.657.89.656.892.653.89.653.887.62.879.637.881.59.88.563.878.561.88.536.882.532.882.527.891.529.895.526.915.52.903.513.904.485.903.45.918.424.927.418.921.398.928.392.932c.001.009.005.002.005.011 0 .004-.001.004-.002 0C.394.937.394.945.393.943.373.954.352.952.329.962.303.968.298.993.278.992.273.994.265.996.261 1V.995z" />
        </defs>
      </svg>
      
      {/* Content Section */}
      <div className="relative z-10 px-8 md:px-16 pt-16 pb-0">
        {/* Header */}
        <div className="mb-16">
            <div className='flex justify-between items-start mb-12'>
                <motion.p 
                  className="text-xs uppercase tracking-[0.3em] text-gray-500"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  WHAT I DO
                </motion.p>
                <div className="flex-1 max-w-2xl ml-auto">
                <motion.h1 
                  className="text-xl md:text-3xl lg:text-5xl font-serif mb-8 leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  onViewportEnter={() => {
                    const anim = document.getElementById('brush-anim-whatido') as any;
                    if (anim) anim.beginElement();
                  }}
                  viewport={{ once: true }}
                >
                    Transforming Today's Challenges into Tomorrow's{' '}
                    <span className="relative inline-block">
                      Success Stories
                      {/* Brush stroke underline */}
                      <span className="absolute left-0 right-0 top-1/2 h-8 -mx-4">
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                          <rect width="100%" height="100%" fill="#DC2626" opacity="0.4" clipPath="url(#brush-clip-whatido)" />
                        </svg>
                      </span>
                    </span>
                </motion.h1>
                </div>
            </div>
            <div className="border-l-4 border-red-600 pl-6 max-w-md">
                <Copy delay={0.4}>
                  <p className="text-gray-700 text-base leading-relaxed">
                    I bring innovation through expertise, authentic energy, and a passion for excellence. Whether it's inspiring audiences, advising organizations, or creating impactful content, I deliver results that matter.
                  </p>
                </Copy>
            </div>
        </div>

        {/* Services Section */}
        <div className="mt-20">
          <motion.div 
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500">MY SERVICES</h2>
            <div className="flex items-center gap-6">
              {/* Navigation Arrows */}
              <div className="flex gap-2">
                {canScrollLeft && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={scrollLeft}
                    className="rounded-full"
                  >
                    <span className="text-sm">←</span>
                  </Button>
                )}
                {canScrollRight && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={scrollRight}
                    className="rounded-full"
                  >
                    <span className="text-sm">→</span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Service Cards - Horizontal Scroll */}
          <div 
            ref={sliderRef} 
            className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="relative min-w-[300px] md:min-w-[350px] lg:min-w-[400px] h-[500px] rounded-2xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl snap-start"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    style={
                    index === 0
                        ? { objectPosition: '30% center' }
                        : index === 1
                        ? { objectPosition: '70% center' }
                        : undefined
                    }

                  />
                </div>

                {/* Minimal Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-black">
                      {service.category}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-3">{service.title}</h3>
                    
                    {/* Description - shows on hover */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      hoveredIndex === index 
                        ? 'max-h-48 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-white/95 mb-4 leading-relaxed text-sm">
                        {service.description}
                      </p>
                      <Button variant="link" size="sm" className="text-white hover:text-white p-0 gap-2 hover:gap-3">
                        View Details
                        <span>→</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Slider */}
        <div className="mt-20 mb-0 overflow-hidden relative group [mask-image:_linear-gradient(to_right,_transparent_0,_white_128px,white_calc(100%-128px),_transparent_100%)]">
          <div className="animate-slide-left-infinite group-hover:animation-pause flex w-max">
            <div className="flex items-center">
              <Image 
                src={"/oxford.png"}
                alt="Oxford University"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/leeds.png"}
                alt="University of Leeds" 
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/uwe.png"}
                alt="University of the West of England" 
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/openuni.png"}
                alt="Open University"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/aims.png"}
                alt="AIMS Ghana"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/lse.png"}
                alt="London School of Economics"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/mei.png"}
                alt="MEI"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
            </div>
            
            <div className="flex items-center">
              <Image 
                src={"/oxford.png"}
                alt="Oxford University"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/leeds.png"}
                alt="University of Leeds" 
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/uwe.png"}
                alt="University of the West of England" 
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/openuni.png"}
                alt="Open University"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/aims.png"}
                alt="AIMS Ghana"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/lse.png"}
                alt="London School of Economics"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/mei.png"}
                alt="MEI"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
            </div>
            
            <div className="flex items-center">
              <Image 
                src={"/oxford.png"}
                alt="Oxford University"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/leeds.png"}
                alt="University of Leeds" 
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/uwe.png"}
                alt="University of the West of England" 
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/openuni.png"}
                alt="Open University"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/aims.png"}
                alt="AIMS Ghana"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/lse.png"}
                alt="London School of Economics"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
              <Image 
                src={"/mei.png"}
                alt="MEI"
                width={120}
                height={80}
                className="object-contain inline-block mx-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatIDo
