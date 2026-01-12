 "use client"
import React from "react";
import Hr from "../layout/Hr";

interface LatestResearchProps {}

const LatestResearch: React.FC<LatestResearchProps> = () => {
  const researchPapers = [
    {
      id: "[1]",
      arxivId: "arXiv - 2234.1123",
      timeAgo: "1 day ago",
      title: "Crossing Rays: Evaluation of Bimanual Mid-air Selection Techniques in an Immersive Environment",
      authors: "Dong Hun kim, Donh hum Yang, Issac Cho",
      description: "Mid-air navigation offers a method of aerial travel that mitigates the constraints associated with continuous navigation. A mid-air selection technique is essential to enable such navigation. [Pdf, Html]",
      type: "Journal",
      category: "Machine Learning",
      pages: "14 pages",
      upvotes: 30,
      comments: 30,
      avatars: ["/me1.jpg", "/me2.jpg", "/me3.jpg"],
    },
    {
      id: "[2]",
      arxivId: "arXiv - 2242.1023",
      timeAgo: "1 day ago",
      title: "Enhancing Critical Thinking in Education by means of a Socratic Chatbot",
      authors: "Kaira Raven, Islam Matheir",
      description: "While large language models (LLMs) are increasingly playing a pivotal role in education by providing instantaneous, adaptive responses, their potential to promote critical thinking remains understudied. [Pdf, Html]",
      type: "Question",
      category: "",
      pages: "4 pages",
      upvotes: 8,
      comments: 5,
      avatars: ["/me1.jpg", "/me2.jpg"],
    },
    {
      id: "[3]",
      arxivId: "arXiv - 2454.1018",
      timeAgo: "2 days ago",
      title: "Citizen-Led Personalization of User Interfaces: Investigating How People Customize Interfaces for Themselves and Others",
      authors: "Chen lee, Herald V, Chirtra Vanesaa",
      description: "Mid-air navigation offers a method of aerial travel that mitigates the constraints associated with continuous navigation. A mid-air selection technique is essential to enable such navigation. [Pdf, Html]",
      type: "Journal",
      category: "Machine Learning",
      pages: "2 pages",
      upvotes: 3,
      comments: 2,
      avatars: ["/me1.jpg", "/me2.jpg", "/me3.jpg"],
    },
  ];

  return (
    <section className="w-full px-6 md:px-9 lg:px-12 py-14 md:py-18 z-50">
      {/* Header row */}
      <div className="mb-10 md:mb-14">
        <div className='pl-9'>
          <div className="flex items-end justify-between mt-6">
            <div>
              <p className="text-gray-600 text-sm max-w-xs">Recent publications and research papers from the academic community</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-3 text-sm font-medium text-gray-900 hover:text-orange-400 hover:cursor-pointer transition-colors"
            >
              view all research
              <span className="text-xl text-orange-400 hover:text-orange-500 transition-colors">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
        {researchPapers.map((paper, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
            {/* Header with arXiv ID and time */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium text-sm">{paper.arxivId}</span>
              </div>
              <span className="text-gray-500 text-sm">{paper.timeAgo}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-blue-600 cursor-pointer">
              {paper.title}
            </h2>

            {/* Authors */}
            <p className="text-gray-700 mb-3 text-sm">
              {paper.authors}
            </p>

            {/* Description */}
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              {paper.description}
            </p>

            {/* Badges and metadata */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Type badge */}
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg className="w-2 h-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600">{paper.type}</span>
                </div>

                {/* Category badge */}
                {paper.category && (
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                    {paper.category}
                  </span>
                )}

                {/* Pages */}
                <span className="text-xs text-gray-600">{paper.pages}</span>
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-4">
                {/* Author avatars */}
                <div className="flex items-center -space-x-2">
                  {paper.avatars.map((avatar, i) => (
                    <img
                      key={i}
                      src={avatar}
                      alt={`Author ${i + 1}`}
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>

                {/* Upvotes */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  <span className="text-sm text-gray-600">{paper.upvotes}</span>
                </div>

                {/* Comments */}
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm text-gray-600">{paper.comments}</span>
                </div>

                {/* Save button */}
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default LatestResearch;