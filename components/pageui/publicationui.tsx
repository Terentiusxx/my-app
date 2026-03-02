'use client'

import React, { useState, useMemo } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/layout/PageHero";
import INFO from "@/src/data/user";
import SEO from "@/src/data/seo";

type Publication = {
  title: string;
  authors: string[];
  year: number;
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
  link: string;
  abstract: string;
  researchArea: string[];
  method: string[];
  keywords: string[];
  openAccess?: boolean;
};

interface PublicationUIProps {
  initialPublications: Publication[];
}

export default function PublicationUI({ initialPublications }: PublicationUIProps) {
  const currentSEO = SEO.find((item) => item.page === "publications");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedYear, setSelectedYear] = useState<string | number>("All");

  // Extract unique values from publications
  const researchAreas = useMemo(() => {
    const areas = new Set<string>();
    initialPublications.forEach(pub => pub.researchArea.forEach(area => areas.add(area)));
    return ["All", ...Array.from(areas).sort()];
  }, [initialPublications]);

  const methods = useMemo(() => {
    const methodSet = new Set<string>();
    initialPublications.forEach(pub => pub.method.forEach(method => methodSet.add(method)));
    return ["All", ...Array.from(methodSet).sort()];
  }, [initialPublications]);

  const years = useMemo(() => {
    const yearSet = new Set(initialPublications.map(p => p.year));
    return ["All", ...Array.from(yearSet).sort((a, b) => b - a)];
  }, [initialPublications]);

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return initialPublications.filter((pub) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pub.abstract.toLowerCase().includes(searchQuery.toLowerCase());

      // Area filter
      const matchesArea = selectedArea === "All" || pub.researchArea.includes(selectedArea);

      // Method filter
      const matchesMethod = selectedMethod === "All" || pub.method.includes(selectedMethod);

      // Year filter
      const matchesYear = selectedYear === "All" || pub.year === selectedYear;

      return matchesSearch && matchesArea && matchesMethod && matchesYear;
    });
  }, [initialPublications, searchQuery, selectedArea, selectedMethod, selectedYear]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedArea("All");
    setSelectedMethod("All");
    setSelectedYear("All");
  };

  return (
    <>
      <Head>
        <title>{`Publications | ${INFO.main.title}`}</title>
        <meta name="description" content={currentSEO?.description} />
        <meta name="keywords" content={currentSEO?.keywords.join(", ")} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <PageHero
          label="Research Output"
          title="Publications"
          description="Peer-reviewed research spanning health psychology, body image, telemedicine, youth development, and actuarial science. Browse by research area, methodology, or year."
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  {(searchQuery || selectedArea !== "All" || selectedMethod !== "All" || selectedYear !== "All") && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                      Clear
                    </Button>
                  )}
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Title or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Research Area */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Research Area
                  </label>
                  <div className="flex flex-col gap-2">
                    {researchAreas.map((area) => (
                      <button
                        key={area}
                        onClick={() => setSelectedArea(area)}
                        className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedArea === area
                            ? "bg-red-50 text-red-700 font-medium border border-red-200"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Method
                  </label>
                  <div className="flex flex-col gap-2">
                    {methods.map((method) => (
                      <button
                        key={method}
                        onClick={() => setSelectedMethod(method)}
                        className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedMethod === method
                            ? "bg-red-50 text-red-700 font-medium border border-red-200"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Year
                  </label>
                  <div className="flex flex-col gap-2">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedYear === year
                            ? "bg-red-50 text-red-700 font-medium border border-red-200"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Count */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{filteredPublications.length}</span> {filteredPublications.length === 1 ? 'publication' : 'publications'}
                  </p>
                </div>
              </div>
            </aside>

            {/* Right Content - Publications Grid */}
            <div className="flex-1 min-w-0">
              {filteredPublications.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <p className="text-gray-500 text-lg mb-4">No publications found matching your criteria.</p>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Publications Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {filteredPublications.map((pub, index) => (
                      <article
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:border-red-200 hover:shadow-md transition-all duration-300 flex flex-col"
                      >
                        {/* Header */}
                        <div className="mb-4">
                          {pub.openAccess && (
                            <span className="inline-block mb-3 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                              Open Access
                            </span>
                          )}
                          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-3">
                            {pub.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {pub.authors.join(", ")}
                          </p>
                        </div>

                        {/* Publication Details */}
                        <div className="text-xs text-gray-600 mb-3">
                          <span className="font-medium">{pub.journal}</span>
                          {` (${pub.year})`}
                        </div>

                        {/* Abstract */}
                        <p className="text-sm text-gray-700 leading-relaxed mb-4 flex-grow line-clamp-4">
                          {pub.abstract}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pub.researchArea.slice(0, 2).map((area, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                            >
                              {area}
                            </span>
                          ))}
                          {pub.method.slice(0, 1).map((method, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                            >
                              {method}
                            </span>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="pt-4 border-t border-gray-100">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                          >
                            Read paper
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
