'use client'

import React, { useState, useMemo } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/layout/PageHero";
import INFO from "@/src/data/user";
import SEO from "@/src/data/seo";

// Publication type definition
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

// Publications data
const allPublications: Publication[] = [
  {
    title: "The Psychosocial Outcomes Following Cosmetic Surgery Are Largely Unknown: A Systematic Review",
    authors: ["Garbett, K.M.", "Anquandah, J.", "Krebs, G.", "Williamson, H.", "Rumsey, N.", "Harcourt, D."],
    year: 2025,
    journal: "Journal of Plastic, Reconstructive & Aesthetic Surgery",
    volume: "104",
    pages: "282-297",
    doi: "10.1016/j.bjps.2025.01.014",
    link: "https://www.jprasurg.com/article/S1748-6815(25)00181-0/fulltext",
    abstract: "A systematic review assessing the highest-quality evidence on how cosmetic surgery affects body image, self-esteem, and mental health. Findings show short-term gains in area-specific satisfaction but limited evidence for long-term mental health benefits.",
    researchArea: ["Health"],
    method: ["Statistical Modelling"],
    keywords: ["Cosmetic Surgery", "Mental Health", "Self-Esteem", "Psychosocial Outcomes", "Systematic Review"],
    openAccess: true,
  },
  {
    title: "My Body Is Amazing from the Bottom to the Top: An RCT Study Testing Two Positive Body Image Media Micro-Interventions for Young Children",
    authors: ["Anquandah, J.", "Slater, A.", "Hatton, R."],
    year: 2025,
    journal: "Body Image",
    volume: "52",
    pages: "101814",
    doi: "10.1016/j.bodyim.2025.101814",
    link: "https://www.sciencedirect.com/science/article/pii/S1740144525000026",
    abstract: "A randomized controlled trial exploring two short media-based interventions designed to foster positive body image in children aged 4–6. Results indicate significant improvements in body appreciation and functionality appreciation.",
    researchArea: ["Health", "Education"],
    method: ["RCT"],
    keywords: ["Body Image", "Children", "Media Intervention", "RCT", "Early Childhood"],
    openAccess: false,
  },
  {
    title: "Changes in Attitudes Towards Telemedicine in Acute Burn Care Following the Covid-19 Pandemic",
    authors: ["Anquandah, J.", "Davies, M.", "Roberts, A."],
    year: 2024,
    journal: "Burns",
    volume: "50",
    pages: "1842-1850",
    doi: "10.1016/j.burns.2024.06.008",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0305417924001505",
    abstract: "A comparative study of clinicians' perceptions of telemedicine barriers and enablers for burn care before and after the Covid-19 pandemic. Shows increased acceptance but persistent concerns about clinical assessment quality.",
    researchArea: ["Health"],
    method: ["Statistical Modelling"],
    keywords: ["Telemedicine", "Burn Care", "Covid-19", "Healthcare Technology", "Clinician Attitudes"],
    openAccess: false,
  },
  {
    title: "Achieving the Health and Well-being SDGs Among Adolescent Mothers and Their Children in South Africa",
    authors: ["Anquandah, J.", "Daniels, K.", "Otieno, P."],
    year: 2022,
    journal: "PLOS ONE",
    volume: "17",
    pages: "e0278163",
    doi: "10.1371/journal.pone.0278163",
    link: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0278163",
    abstract: "A cross-sectional analysis of SDG progress among adolescent mothers and their children in an HIV-endemic South African district. Identifies significant gaps in maternal education and child nutrition indicators.",
    researchArea: ["Health", "Youth"],
    method: ["Statistical Modelling"],
    keywords: ["SDGs", "Adolescent Health", "HIV", "South Africa", "Mother and Child", "Public Health"],
    openAccess: true,
  },
  {
    title: "Optimal Stopping for Actuarial Use: A Study on Unemployment Insurance Schemes",
    authors: ["Anquandah, J."],
    year: 2020,
    journal: "PhD Thesis, University of Leeds",
    link: "https://etheses.whiterose.ac.uk/id/eprint/28075/",
    abstract: "A doctoral thesis examining entry strategies into unemployment insurance using stochastic models and real labor force data from the UK. Develops optimal stopping frameworks for insurance timing decisions.",
    researchArea: ["Labour"],
    method: ["Statistical Modelling", "Machine Learning"],
    keywords: ["Optimal Stopping", "Unemployment", "Actuarial Science", "Labor Data", "Stochastic Modelling"],
    openAccess: true,
  },
  {
    title: "Optimal Stopping and Utility in a Simple Model of Unemployment Insurance",
    authors: ["Anquandah, J.", "Barrieu, P."],
    year: 2019,
    journal: "Risks",
    volume: "7",
    pages: "94",
    doi: "10.3390/risks7030094",
    link: "https://www.mdpi.com/2227-9091/7/3/94",
    abstract: "An academic paper analyzing the timing of claims in unemployment insurance through stochastic optimal stopping and utility modeling. Provides theoretical framework for insurance decision-making under uncertainty.",
    researchArea: ["Labour"],
    method: ["Statistical Modelling"],
    keywords: ["Unemployment Insurance", "Optimal Stopping", "Utility Theory", "Stochastic Processes"],
    openAccess: true,
  },
];

const researchAreas = ["All", "Health", "Education", "Labour", "Youth"];
const methods = ["All", "RCT", "Statistical Modelling", "Machine Learning"];
const years = ["All", ...Array.from(new Set(allPublications.map(p => p.year))).sort((a, b) => b - a)];

export default function PublicationsPage() {
  const currentSEO = SEO.find((item) => item.page === "publications");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [selectedYear, setSelectedYear] = useState<string | number>("All");

  // Filtered publications
  const filteredPublications = useMemo(() => {
    return allPublications.filter((pub) => {
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
  }, [searchQuery, selectedArea, selectedMethod, selectedYear]);

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
