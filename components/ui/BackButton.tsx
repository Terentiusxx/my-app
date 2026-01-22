import React from "react";
import Link from "next/link";

const BackButton: React.FC<{ className?: string }> = ({ className }) => (
  <Link href="/" aria-label="Back to homepage" className={className ?? ""}>
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/80 text-white hover:bg-black/90 transition-colors shadow-md">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </span>
  </Link>
);

export default BackButton;
