"use client";

import { useState } from "react";
import { Testimonial } from "@/lib/types";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";

interface Props {
  testimonials: Testimonial[];
  itemsPerPage?: number;
}

const ITEMS_PER_PAGE = 6;

export function TestimonialsGrid({
  testimonials,
  itemsPerPage = ITEMS_PER_PAGE,
}: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const paginated = testimonials.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <section aria-label="Testimonials">
      {/* Top count */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-gray-400">
          {testimonials.length}{" "}
          {testimonials.length === 1
            ? "reflection"
            : "reflections"}
        </span>
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginated.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-gray-400">
            No testimonials found.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-1 mt-8"
          aria-label="Pagination"
        >
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-2 py-1 text-xs text-gray-500 hover:text-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Prev
        </button>

          <div className="flex gap-1 mx-2">
            {Array.from(
              { length: totalPages },
              (_, i) => i + 1
            ).map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setPage(num)}
                className={`w-7 h-7 rounded-full text-xs font-medium transition ${
                  page === num
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next →
          </button>
        </nav>
      )}
    </section>
  );
}