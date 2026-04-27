"use client";

import { useState } from "react";
import { Testimonial, SurveyEvidence } from "@/lib/types";
import { FeaturedTestimonials } from "./FeaturedTestimonials";
import { TestimonialsGrid } from "./TestimonialsGrid";
import { CohortEvidencePanel } from "./CohortEvidencePanel";

interface Props {
  testimonials: Testimonial[];
  featuredTestimonials: Testimonial[];
  surveyEvidence: SurveyEvidence[];
}

export function TestimonialsShell({
  testimonials,
  featuredTestimonials,
  surveyEvidence,
}: Props) {
  const [overlayDismissed, setOverlayDismissed] = useState(false);

  const handleReveal = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setTimeout(() => setOverlayDismissed(true), prefersReduced ? 0 : 300);
  };

  return (
    <>
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ISSUE WAS HERE:
            Sidebar + left content were inside flex,
            but sidebar width was too small and unstable.
            This now uses fixed sidebar width.
        */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* LEFT */}
          <div className="w-full lg:w-[68%]">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">
              Individual Reflections
            </h2>

            <TestimonialsGrid testimonials={testimonials} />
          </div>

          {/* RIGHT */}
          <aside
            className="w-full lg:w-[32%] lg:sticky lg:top-24 space-y-8"
            aria-label="Survey evidence"
          >
            <CohortEvidencePanel surveyEvidence={surveyEvidence} />

            <div className="bg-gray-900 rounded-xl p-5 text-white">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">
                Snapshot
              </p>

              <h3 className="text-lg font-semibold mb-3 font-playfair">
                Real feedback from real cohorts
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed mb-5">
                Survey summaries and student reflections collected across modules,
                showing impact, clarity, confidence, and engagement.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Modules</span>
                  <span>{surveyEvidence.length}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Responses</span>
                  <span>100+</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Focus</span>
                  <span>Student Growth</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* FEATURED OVERLAY */}
      {featuredTestimonials.length > 0 && !overlayDismissed && (
        <div
          className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50"
          aria-hidden={overlayDismissed}
        >
          <button
            onClick={handleReveal}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close and view all feedback"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <FeaturedTestimonials
            testimonials={featuredTestimonials}
            onReveal={handleReveal}
          />
        </div>
      )}
    </>
  );
}