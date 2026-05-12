"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-center gap-1 mt-8 ${className}`}
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 text-xs text-gray-500 hover:text-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 transition"
      >
        ← Prev
      </button>

      <div className="flex gap-1 mx-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-7 h-7 rounded-full text-xs font-medium transition ${
              currentPage === page
                ? "bg-gray-900 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-xs text-gray-500 hover:text-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 transition"
      >
        Next →
      </button>
    </nav>
  );
}