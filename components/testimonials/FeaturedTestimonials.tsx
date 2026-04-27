"use client";

import { useState } from "react";
import { Testimonial } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  testimonials: Testimonial[]; // pre-filtered to isFeatured === true by the page
  onReveal: () => void;
}

export function FeaturedTestimonials({ testimonials, onReveal }: Props) {
  const items = testimonials.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex((i) => i + 1);
    } else {
      onReveal();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-4xl w-full">
        <div className="flex justify-end mb-6">
          <Button
            onClick={onReveal}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900 border"
          >
            Skip
          </Button>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
            SELECTED REFLECTIONS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            A few voices from the classroom
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {items.length} reflections to start. Explore the full library below.
          </p>
        </div>

        {/* Card stack with side navigation */}
        <div className="relative w-full max-w-5xl mx-auto mb-8 flex items-center gap-8">
          <Button
            onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
            disabled={activeIndex === 0}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 flex-shrink-0 disabled:opacity-30"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          <div className="relative flex-1" style={{ minHeight: "420px" }}>
            {items.map((testimonial, index) => {
              const isCurrent = index === activeIndex;
              const isPast = index < activeIndex;
              const offset = (index - activeIndex) * 16;
              const scale = isCurrent ? 1 : 0.95 - Math.abs(index - activeIndex) * 0.05;
              const opacity = isPast ? 0 : isCurrent ? 1 : 0.5;

              return (
                <div
                  key={testimonial.id}
                  className="absolute top-0 left-0 right-0 transition-all duration-500 ease-out"
                  style={{
                    transform: `translateY(${offset}px) scale(${scale})`,
                    opacity,
                    zIndex: 10 - Math.abs(index - activeIndex),
                    pointerEvents: isCurrent ? "auto" : "none",
                  }}
                  aria-hidden={!isCurrent}
                >
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 shadow-lg">
                    <svg
                      className="w-10 h-10 text-gray-200 mb-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <blockquote className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
                      {testimonial.message}
                    </blockquote>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.authorLabel}</p>
                        {testimonial.institution && (
                          <p className="text-sm text-gray-500">{testimonial.institution}</p>
                        )}
                      </div>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium whitespace-nowrap">
                        {testimonial.type === "COHORT" ? "Cohort" : "Individual"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 flex-shrink-0 border-2 border-gray-900 hover:border-red-600 hover:text-red-600"
            aria-label={activeIndex < items.length - 1 ? "Next testimonial" : "View all feedback"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Progress dots + counter + skip */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Testimonial progress">
            {items.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-current={index === activeIndex ? "true" : "false"}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                  index === activeIndex
                    ? "bg-red-600 w-8"
                    : index < activeIndex
                    ? "bg-gray-300 w-2.5"
                    : "bg-gray-200 w-2.5"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500" aria-live="polite">
            {activeIndex + 1} of {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}
