"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Copy from "@/components/Home/textanimate";

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

export default function CallToAction({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  className = "" 
}: CallToActionProps) {
  return (
    <section className={`py-12 px-8 md:px-16 lg:px-24 border-t border-gray-200 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <Copy>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {title}
            </h2>
            <p className="text-base text-gray-600 mb-6">
              {description}
            </p>
          </div>
        </Copy>
        <Button
          className="rounded-full bg-red-600 text-white hover:bg-red-700 px-8 py-5 text-base"
          onClick={() => (window.location.href = buttonLink)}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
