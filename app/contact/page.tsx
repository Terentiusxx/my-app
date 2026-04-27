"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Copy from "@/components/Home/textanimate";
import SectionTitle from "@/components/layout/SectionTitle";
import INFO from "@/src/data/user";
import SEO from "@/src/data/seo";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const currentSEO = SEO.find((item) => item.page === "contact");
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const fd = new FormData(e.currentTarget)

    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      organisation: fd.get('organisation'),
      reason: fd.get('reason'),
      message: fd.get('message'),
      consent: fd.get('consent'),
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setLoading(false)

    if (res.ok) {
      setSuccess(true)
      e.currentTarget.reset()
    }
  }
  return (
    <>
      <Head>
        <title>{`Contact | ${INFO.main.title}`}</title>
        <meta name="description" content={currentSEO?.description} />
        <meta name="keywords" content={currentSEO?.keywords.join(", ")} />
      </Head>

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col justify-start">
              <Copy animateOnScroll={false} delay={0.2}>
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black inline-block uppercase tracking-wide">
                    GET IN TOUCH {" "}
                  </h1>
                  <SectionTitle text="with me" color="black" />
                </div>
              </Copy>

              <motion.div 
                className="relative w-full aspect-4/3 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <Image
                  src="/contact.jpeg"
                  alt="Contact"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <div>
              <Copy animateOnScroll={false} delay={0.6}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm tracking-widest mb-3">
                      FULL NAME: <span className="text-gray-400 text-xs">(REQUIRED)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full border-0 border-b border-gray-300 pb-3 focus:border-gray-900 focus:outline-none text-gray-400 placeholder-gray-300 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm tracking-widest mb-3">
                      EMAIL ADDRESS: <span className="text-gray-400 text-xs">(REQUIRED)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full border-0 border-b border-gray-300 pb-3 focus:border-gray-900 focus:outline-none text-gray-400 placeholder-gray-300 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Organisation Field */}
                  <div>
                    <label htmlFor="organisation" className="block text-sm tracking-widest mb-3">
                      ORGANISATION OR INSTITUTION: <span className="text-gray-400 text-xs">(OPTIONAL)</span>
                    </label>
                    <input
                      type="text"
                      id="organisation"
                      name="organisation"
                      className="w-full border-0 border-b border-gray-300 pb-3 focus:border-gray-900 focus:outline-none text-gray-400 placeholder-gray-300 transition-colors"
                      placeholder="e.g., Cardiff University"
                    />
                  </div>

                  {/* Reason Field */}
                  <div>
                    <label htmlFor="reason" className="block text-sm tracking-widest mb-3">
                      REASON FOR CONTACTING: <span className="text-gray-400 text-xs">(REQUIRED)</span>
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      required
                      className="w-full border-0 border-b border-gray-300 pb-3 focus:border-gray-900 focus:outline-none text-gray-400 appearance-none bg-white cursor-pointer transition-colors"
                    >
                      <option value="">Please select</option>
                      <option value="teaching">Teaching or academic support</option>
                      <option value="research">Research collaboration</option>
                      <option value="consulting">Consultancy or data analysis</option>
                      <option value="speaking">Speaking or events</option>
                      <option value="mentorship">Mentorship or supervision</option>
                      <option value="general">General enquiry</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm tracking-widest mb-3">
                      MESSAGE: <span className="text-gray-400 text-xs">(REQUIRED)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full border border-gray-300 rounded-sm p-3 focus:border-gray-900 focus:outline-none text-gray-400 placeholder-gray-300 transition-colors resize-none"
                      placeholder="Please include relevant context or timelines where helpful."
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      className="mt-1 mr-3 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                      I understand that responses may take a few working days. <span className="text-gray-400 text-xs">(REQUIRED)</span>
                    </label>
                  </div>

                  {/* Success Message */}
                  {success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-8">
                    <Button
                      type="submit"
                      variant="outline"
                      size="lg"
                      disabled={loading}
                      className="px-12 py-4 rounded-full border-2 border-gray-900 text-gray-900 hover:border-red-600 hover:text-red-600 hover:bg-transparent text-sm tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'SENDING...' : 'SEND MESSAGE'}
                    </Button>
                  </div>
                </form>
              </Copy>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
