import { Testimonial } from "@/lib/types";

interface Props {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: Props) {
  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col h-full group">
      {/* Quote mark */}
      <svg
        className="w-6 h-6 text-red-300 mb-3 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <blockquote className="flex-1 mb-4">
        <p className="text-gray-700 leading-relaxed text-[14px] italic">
          &ldquo;{testimonial.message}&rdquo;
        </p>
      </blockquote>

      <footer className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {/* Avatar initials */}
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-bold text-red-700 uppercase">
            {testimonial.authorLabel?.slice(0, 2) ?? "??"}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-gray-900 truncate">{testimonial.authorLabel}</p>
          {testimonial.institution && (
            <p className="text-[11px] text-gray-500 uppercase tracking-wide truncate">
              {testimonial.institution}
            </p>
          )}
        </div>
      </footer>
    </article>
  );
}
