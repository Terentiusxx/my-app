"use client";

import React from "react";
import Copy from "@/components/Home/textanimate";
import SectionTitle from "@/components/layout/SectionTitle";

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  className?: string;
}

export default function PageHero({ label, title, description, className = "" }: PageHeroProps) {
  return (
    <section className={`pt-12 pb-12 px-8 md:px-16 lg:px-24 border-b border-gray-200 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gray-500">
            {label}
          </span>
        </div>
        <SectionTitle text={title} color="black" />
        <Copy>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed">
            {description}
          </p>
        </Copy>
      </div>
    </section>
  );
}
