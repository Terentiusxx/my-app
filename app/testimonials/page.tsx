'use client'

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Copy from "@/components/Home/Copy";
import { Button } from "@/components/ui/button";
import INFO from "@/src/data/user";
import SEO from "@/src/data/seo";

// Testimonial type definition
type Testimonial = {
  quote: string;
  author: string;
  institution: string;
  category: string;
  source: string;
  tags: string[];
};

// TODO: Move to API route - /api/testimonials
const allTestimonials: Testimonial[] = [
  {
    quote:
      "After finishing a long session, we all collectively agree that your teaching style is truly really helpful, and we all agree that we are lucky to have you as a teacher for this semester. Thank you for today and it feels so weird to say we are looking forward to our next math session.",
    author: "— Sarah, Cardiff University",
    institution: "Cardiff University",
    category: "Memorable Mentions",
    source: "End-of-session message",
    tags: ["teaching style", "helpful", "lucky", "looking forward"],
  },
  {
    quote:
      "Your guidance and wisdom have been the greatest gifts in my academic journey, and I am truly grateful for your dedication to our education. Thank you for being an inspiring and supportive teacher. Your passion for teaching has made a positive impact on my life.",
    author: "— Rishita, LSE Online",
    institution: "LSE Online",
    category: "Long-form Letters",
    source: "Personal email",
    tags: ["guidance", "wisdom", "grateful", "inspiring", "passion", "positive impact"],
  },
  {
    quote:
      "The class pace is great and I like how we go over past topics before starting new ones. It makes me feel like I’m actually improving week by week.",
    author: "— Student, Group L",
    institution: "Cardiff University",
    category: "Reflections",
    source: "Mid-term feedback survey",
    tags: ["class pace", "improvement", "review", "week by week"],
  },
  {
    quote: "You have made me believe I could understand statistics again. And I did.",
    author: "— Anonymous, MSc Student",
    institution: "Cardiff University",
    category: "Reflections",
    source: "End-of-year reflection",
    tags: ["belief", "understanding", "statistics", "confidence"],
  },
  {
    quote:
      "You’re the best maths teacher I’ve had. You make it feel like more than just numbers on a page, it actually connects.",
    author: "— Student, Group K",
    institution: "Cardiff University",
    category: "Survey Responses",
    source: "Anonymous feedback form",
    tags: ["best teacher", "connection", "meaning", "maths"],
  },
];

const categories = ["All", "Reflections", "Survey Responses", "Memorable Mentions", "Long-form Letters"];

// Featured testimonials for Screen 1 (exactly 3)
const featuredTestimonials = allTestimonials.slice(0, 3);

const Testimonials = () => {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [featuredIndex, setFeaturedIndex] = React.useState(0);
  const [hasRevealedGrid, setHasRevealedGrid] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // TODO: Replace with API call
  // const [testimonials, setTestimonials] = useState([]);
  // useEffect(() => {
  //   fetch('/api/testimonials')
  //     .then(res => res.json())
  //     .then(data => setTestimonials(data));
  // }, []);

  const currentSEO = SEO.find((item) => item.page === "testimonials");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 rows x 2 columns

  const filteredTestimonials =
    selectedCategory === "All"
      ? allTestimonials
      : allTestimonials.filter(
          (item) => item.category === selectedCategory
        );

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  // Build evidence snapshot from filtered testimonials
  const buildEvidence = (items: Testimonial[]) => {
    const total = items.length;

    const institutions = new Set(items.map(t => t.institution).filter(Boolean));
    const categoriesSet = new Set(items.map(t => t.category).filter(Boolean));

    // Tag frequency
    const tagCounts = new Map<string, number>();
    items.forEach(t => {
      (t.tags || []).forEach((tag: string) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    const topTags = [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));

    // "Featured proof": pick the shortest strong one or first
    const featured =
      [...items].sort((a, b) => a.quote.length - b.quote.length)[0] || items[0];

    const avgLength =
      total === 0 ? 0 : Math.round(items.reduce((sum, t) => sum + t.quote.length, 0) / total);

    return {
      total,
      institutionsCount: institutions.size,
      categoriesCount: categoriesSet.size,
      avgLength,
      topTags,
      featured,
    };
  };

  const evidence = buildEvidence(filteredTestimonials);

  const handleNext = () => {
    if (featuredIndex < 2) {
      setFeaturedIndex(prev => prev + 1);
    } else {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => setHasRevealedGrid(true), prefersReducedMotion ? 0 : 300);
    }
  };

  const revealGrid = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(() => setHasRevealedGrid(true), prefersReducedMotion ? 0 : 300);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{INFO.main.title}</title>
        <meta
          name="description"
          content={currentSEO?.description || "Testimonials about Dr. Jason Anquandah"}
        />
        <meta
          name="keywords"
          content={
            currentSEO?.keywords?.join(", ") ||
            "Dr. Jason, testimonials, teaching, feedback"
          }
        />
      </Head>

      <div className="min-h-screen bg-gray-50 relative">
        {/* Screen 2: Full Testimonials Grid (Behind) */}
        <div className="min-h-screen">
          <div className="relative h-[50vh] flex items-center justify-center text-white text-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/students.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col justify-center items-center px-5">
              <Copy animateOnScroll={false} delay={0.3}>
                <h1 className="text-5xl font-bold mb-5 font-playfair">What Students Say</h1>
              </Copy>
              <Copy animateOnScroll={false} delay={0.5}>
                <p className="text-xl max-w-[700px] text-gray-100 leading-relaxed">
                  Real reflections from those she's taught, mentored, and inspired.
                </p>
              </Copy>
            </div>
          </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Filters & Testimonials */}
            <div className="flex-1 min-w-0">
              {/* Professional Filter Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Filter by Category
                  </h3>
                  <span className="text-sm text-gray-500">
                    {filteredTestimonials.length} {filteredTestimonials.length === 1 ? 'testimonial' : 'testimonials'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      size="sm"
                      className={selectedCategory === cat ? "bg-red-600 hover:bg-red-700" : ""}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentTestimonials.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-red-200 transition-all duration-300 group"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex-1 mb-4">
                        <svg
                          className="w-8 h-8 text-gray-200 mb-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-gray-700 leading-relaxed text-[15px]">
                          {item.quote}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.author} {item.institution && `• ${item.institution}`}
                        </p>
                        <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredTestimonials.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No testimonials found in this category.</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            {/* Right Sidebar - Evidence Snapshot */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2">Evidence Snapshot</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Based on the feedback shown on this page.
                </p>

                {/* At a glance */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="rounded-xl border border-gray-200 p-4 hover:border-red-200 hover:shadow-sm transition">
                    <div className="text-2xl font-bold text-gray-900">{evidence.total}</div>
                    <div className="text-xs text-gray-500 mt-1">Testimonials</div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 hover:border-red-200 hover:shadow-sm transition">
                    <div className="text-2xl font-bold text-gray-900">{evidence.institutionsCount}</div>
                    <div className="text-xs text-gray-500 mt-1">Institutions</div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 hover:border-red-200 hover:shadow-sm transition">
                    <div className="text-2xl font-bold text-gray-900">{evidence.categoriesCount}</div>
                    <div className="text-xs text-gray-500 mt-1">Categories</div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4 hover:border-red-200 hover:shadow-sm transition">
                    <div className="text-2xl font-bold text-gray-900">{evidence.avgLength}</div>
                    <div className="text-xs text-gray-500 mt-1">Avg. chars</div>
                  </div>
                </div>

                {/* Themes */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Common Themes
                    </h3>
                    <span className="text-xs text-gray-500">Top {Math.min(10, evidence.topTags.length)}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {evidence.topTags.map(({ tag, count }, index) => {
                      // Assign colors based on index for variety
                      const colors = [
                        { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', hoverBg: 'hover:bg-red-100', countBg: 'bg-white/70', countBorder: 'border-red-100', countText: 'text-red-700' },
                        { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', hoverBg: 'hover:bg-blue-100', countBg: 'bg-white/70', countBorder: 'border-blue-100', countText: 'text-blue-700' },
                        { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', hoverBg: 'hover:bg-green-100', countBg: 'bg-white/70', countBorder: 'border-green-100', countText: 'text-green-700' },
                        { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100', hoverBg: 'hover:bg-purple-100', countBg: 'bg-white/70', countBorder: 'border-purple-100', countText: 'text-purple-700' },
                        { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100', hoverBg: 'hover:bg-yellow-100', countBg: 'bg-white/70', countBorder: 'border-yellow-100', countText: 'text-yellow-700' },
                        { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', hoverBg: 'hover:bg-indigo-100', countBg: 'bg-white/70', countBorder: 'border-indigo-100', countText: 'text-indigo-700' },
                      ];
                      const colorScheme = colors[index % colors.length];
                      
                      return (
                        <span
                          key={tag}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} ${colorScheme.hoverBg} transition`}
                          title={`${count} mention${count === 1 ? "" : "s"}`}
                        >
                          {tag}
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${colorScheme.countBg} border ${colorScheme.countBorder} ${colorScheme.countText}`}>
                            {count}
                          </span>
                        </span>
                      );
                    })}
                    {evidence.topTags.length === 0 && (
                      <p className="text-sm text-gray-500">Add tags to testimonials to see themes.</p>
                    )}
                  </div>
                </div>

                {/* Featured proof */}
                <div className="rounded-xl border border-gray-200 p-5 hover:border-red-200 hover:shadow-sm transition">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">Featured Feedback</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                      {evidence.featured?.source || "Feedback"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-5">
                    "{evidence.featured?.quote}"
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">
                      — {evidence.featured?.author || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {evidence.featured?.institution || "—"} • {evidence.featured?.category || "—"}
                    </p>
                  </div>
                </div>

                {/* Transparency */}
                <details className="mt-6">
                  <summary className="text-sm font-medium text-gray-700 cursor-pointer select-none hover:text-gray-900">
                    How this is calculated
                  </summary>
                  <div className="mt-3 text-xs text-gray-500 leading-relaxed">
                    Counts and themes are computed from the testimonials currently visible after filtering.
                    Theme chips appear when testimonials include a <code className="px-1 py-0.5 bg-gray-100 rounded">tags</code> array.
                  </div>
                </details>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Evidence-led summary, not generic ratings.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
        </div>

        {/* Screen 1: Featured Card Stack Overlay */}
        <div 
          className={`fixed inset-0 bg-white/70 backdrop-blur-sm z-50 transition-opacity duration-700 ease-out ${
            hasRevealedGrid ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={revealGrid}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close and view all feedback"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="min-h-screen flex items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full">
              {/* Header */}
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                  SELECTED REFLECTIONS
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  A few voices from the classroom
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Three reflections to start. Explore the full library below.
                </p>
              </div>

              {/* Card Stack with Side Navigation */}
              <div className="relative w-full max-w-5xl mx-auto mb-8 flex items-center gap-8">
                {/* Previous Button */}
                <Button
                  onClick={() => setFeaturedIndex(prev => Math.max(0, prev - 1))}
                  disabled={featuredIndex === 0}
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 flex-shrink-0 disabled:opacity-30"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>

                {/* Cards Container */}
                <div className="relative flex-1" style={{ minHeight: '500px' }}>
                  {featuredTestimonials.map((testimonial, index) => {
                    const isCurrent = index === featuredIndex;
                    const isPast = index < featuredIndex;
                    const offset = (index - featuredIndex) * 16;
                    const scale = isCurrent ? 1 : 0.95 - (Math.abs(index - featuredIndex) * 0.05);
                    const opacity = isPast ? 0 : (isCurrent ? 1 : 0.5);

                    return (
                      <div
                        key={index}
                        className="absolute top-0 left-0 right-0 transition-all duration-500 ease-out"
                        style={{
                          transform: `translateY(${offset}px) scale(${scale})`,
                          opacity: opacity,
                          zIndex: 10 - Math.abs(index - featuredIndex),
                          pointerEvents: isCurrent ? 'auto' : 'none',
                        }}
                        role="article"
                        aria-label={`Featured testimonial ${index + 1} of 3`}
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
                            {testimonial.quote}
                          </blockquote>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">{testimonial.author}</p>
                              {testimonial.institution && (
                                <p className="text-sm text-gray-500">{testimonial.institution}</p>
                              )}
                            </div>
                            <span className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                              {testimonial.source}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Next Button */}
                <Button
                  onClick={handleNext}
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 flex-shrink-0 border-2 border-gray-900 hover:border-red-600 hover:text-red-600"
                  aria-label={featuredIndex < 2 ? 'Next testimonial' : 'View all feedback'}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>

              {/* Progress & Bottom Actions */}
              <div className="flex flex-col items-center gap-4">
                {/* Progress Dots */}
                <div className="flex gap-2" role="tablist" aria-label="Testimonial progress">
                  {featuredTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setFeaturedIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                        index === featuredIndex 
                          ? 'bg-red-600 w-8' 
                          : index < featuredIndex
                          ? 'bg-gray-300'
                          : 'bg-gray-200'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                      aria-current={index === featuredIndex ? 'true' : 'false'}
                      role="tab"
                    />
                  ))}
                </div>

                {/* Counter */}
                <p className="text-sm text-gray-500" aria-live="polite">
                  {featuredIndex + 1} of {featuredTestimonials.length}
                </p>

                {/* Skip Button */}
                <Button
                  onClick={revealGrid}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Skip to all feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Testimonials;
