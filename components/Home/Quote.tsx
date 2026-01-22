'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Copy from '@/components/Home/textanimate'

type Props = {
  className?: string
}

const Quote: React.FC<Props> = ({ className = '' }) => {
  return (
    <section className={`relative w-full min-h-screen flex items-center justify-center bg-white ${className}`}>
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2">
          {/* Quote side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center px-8 md:px-16 py-20"
          >
            <div className="relative">
              {/* Opening quote mark */}
              <div className="absolute -top-8 -left-4 text-red-600 text-8xl font-serif leading-none opacity-20">
                "
              </div>
              
              {/* Quote text */}
              <Copy>
                <blockquote className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed">
                  Data doesn't lie, but it doesn't speak for itself either. My job is to listen carefully, interpret honestly, and communicate clearly.
                </blockquote>
              </Copy>
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-screen"
          >
            <Image
              src="/quote.jpg"
              alt="Jason Anquandah"
              fill
              className="object-cover"
            />
          </motion.div>
      </div>
    </section>
  )
}

export default Quote
