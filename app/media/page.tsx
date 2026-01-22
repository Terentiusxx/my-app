'use client';

import React, { useState, useMemo } from "react";
import Head from "next/head";
import MuxPlayer from '@mux/mux-player-react';
import { Button } from "@/components/ui/button";
import PageHero from "@/components/layout/PageHero";
import CallToAction from "@/components/layout/CallToAction";
import Pagination from "@/components/layout/Pagination";
import INFO from "@/src/data/user";
import SEO from "@/src/data/seo";

// Video type definition
type Video = {
  id: string;
  muxPlaybackId: string;
  title: string;
  description: string;
  duration: string;
  views?: string;
  date: string;
  platform: string;
  category: string[];
  tags: string[];
  featured?: boolean;
};

// Videos data - using the Mux playback IDs from the media slider
const allVideos: Video[] = [
  {
    id: "1",
    muxPlaybackId: "ocsdUVPID4I15NPIBKhQDTLCSbZEZUha58J2pPnNv5c",
    title: "Making Statistics Accessible",
    description: "How to break down complex statistical concepts into digestible, practical lessons that students actually remember.",
    duration: "1:00",
    date: "2024-12",
    platform: "LinkedIn",
    category: ["Teaching", "Statistics"],
    tags: ["Education", "Statistics", "Pedagogy"],
    featured: true,
  },
  {
    id: "2",
    muxPlaybackId: "N14jtGvn5ll6g8C011IaH01Lie598aDe5ln00GozifDlOI",
    title: "Data Visualization Best Practices",
    description: "Exploring effective techniques for communicating complex data through clear, compelling visualizations.",
    duration: "0:45",
    date: "2024-12",
    platform: "LinkedIn",
    category: ["Data Science", "Teaching"],
    tags: ["Visualization", "Data", "Communication"],
    featured: true,
  },
  {
    id: "3",
    muxPlaybackId: "019suLWfXs02fyoXK83a54cSZ1kLHNx5Q8SUM9djwql01g",
    title: "Research Methods in Practice",
    description: "Real-world applications of rigorous research methodology and how to design studies that produce meaningful results.",
    duration: "1:20",
    date: "2024-11",
    platform: "LinkedIn",
    category: ["Research", "Methods"],
    tags: ["Research", "Methodology", "Academic"],
    featured: true,
  },
  {
    id: "4",
    muxPlaybackId: "VndGErsM3QK1xXMroEhfLeFfDWt201JM9t6rXwTURfrc",
    title: "Building Student Confidence in Math",
    description: "Strategies for helping students overcome math anxiety and develop genuine confidence in quantitative reasoning.",
    duration: "0:50",
    date: "2024-11",
    platform: "LinkedIn",
    category: ["Teaching", "Psychology"],
    tags: ["Education", "Confidence", "Student Success"],
  },
  {
    id: "5",
    muxPlaybackId: "yHw2hFubBPWVVguxZqJKmLBY01DV02bMIffu1rSxMOM2A",
    title: "Understanding Statistical Significance",
    description: "Demystifying p-values, confidence intervals, and what statistical significance really means in research.",
    duration: "1:15",
    date: "2024-11",
    platform: "LinkedIn",
    category: ["Statistics", "Research"],
    tags: ["Statistics", "Research", "Analysis"],
  },
  {
    id: "6",
    muxPlaybackId: "rOfhTc8aEUJuR01Fyemjsd101m85IsDHGX0136TFmKeQnY",
    title: "Effective Feedback Strategies",
    description: "How to provide constructive feedback that actually improves student learning and builds skills over time.",
    duration: "0:55",
    date: "2024-10",
    platform: "LinkedIn",
    category: ["Teaching", "Education"],
    tags: ["Feedback", "Teaching", "Student Development"],
  },
  {
    id: "7",
    muxPlaybackId: "3DiuqKvw8qQ1hZ1gatEI3MJDJNA98gTctBY7OyYLCN4",
    title: "Data Ethics in Research",
    description: "Important considerations around privacy, consent, and responsible data handling in academic research.",
    duration: "1:10",
    date: "2024-10",
    platform: "LinkedIn",
    category: ["Research", "Ethics"],
    tags: ["Ethics", "Data", "Research"],
  },
  {
    id: "8",
    muxPlaybackId: "XfffetRXKDX85zjnJAaCtZPCG3k44xl3D02NIVzFMB4Q",
    title: "Teaching in the Digital Age",
    description: "Leveraging technology effectively in statistics education while maintaining personal connection and engagement.",
    duration: "0:40",
    date: "2024-10",
    platform: "LinkedIn",
    category: ["Teaching", "Technology"],
    tags: ["Education", "Technology", "Innovation"],
  },
  {
    id: "9",
    muxPlaybackId: "THcyz02Sha9WUns1ZfkSxXnUcN5WLylF73jKl8XKTuqo",
    title: "Communicating Complex Ideas Simply",
    description: "The art of translating technical statistical concepts into language that anyone can understand and apply.",
    duration: "1:05",
    date: "2024-09",
    platform: "LinkedIn",
    category: ["Communication", "Teaching"],
    tags: ["Communication", "Education", "Clarity"],
  },
  {
    id: "10",
    muxPlaybackId: "UCX011D02kR01MWSz5GMvtLnb5MvSaYJl3ZIEmAVLvMVF8",
    title: "The Future of Data Science Education",
    description: "Where statistics and data science education is heading, and how we can prepare students for tomorrow's challenges.",
    duration: "0:58",
    date: "2024-09",
    platform: "LinkedIn",
    category: ["Data Science", "Education"],
    tags: ["Future", "Education", "Data Science"],
  },
];

// Extract unique categories for filtering
const categories = ["All", ...Array.from(new Set(allVideos.flatMap((v) => v.category)))].sort();

export default function MediaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const videosPerPage = 6;

  const currentPageSEO = SEO.find(item => item.page === "media") || SEO[0];
  const currentPageTitle = `Media & Content | ${INFO.main.title}`;

  // Filter videos based on category and search
  const filteredVideos = useMemo(() => {
    const filtered = allVideos.filter((video) => {
      const matchesCategory =
        selectedCategory === "All" || video.category.includes(selectedCategory);
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
    // Reset to page 1 when filters change
    setCurrentPage(1);
    return filtered;
  }, [selectedCategory, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>{currentPageTitle}</title>
        <meta name="description" content={currentPageSEO.description} />
        <meta name="keywords" content={currentPageSEO.keywords.join(", ")} />
      </Head>

      <div className="min-h-screen bg-white">
        <PageHero
          label="Media Library"
          title="Videos & Content"
          description="Explore my collection of educational content, insights on statistics, teaching methodologies, and reflections on research. Combining expertise with authentic enthusiasm to make complex ideas accessible."
        />

        {/* All Videos Section */}
        <section className="py-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto">
            {filteredVideos.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">
                  No videos found. Try adjusting your filters or search query.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </section>

        <CallToAction
          title="Want to Collaborate?"
          description="Interested in creating educational content together or discussing ideas? Let's connect."
          buttonText="Get in Touch"
          buttonLink="/contact"
        />
      </div>
    </>
  );
}

// Video Card Component
function VideoCard({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div 
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-all duration-300"
    >
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        {/* Blur background thumbnail */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://image.mux.com/${video.muxPlaybackId}/thumbnail.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
        
        {/* Video Player */}
        <div className="relative z-10 w-full h-full">
          <MuxPlayer
            playbackId={video.muxPlaybackId}
            playsInline
            muted={!isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            metadata={{
              video_id: video.id,
              video_title: video.title,
              viewer_user_id: "media-library-viewer",
            }}
            style={{
              width: '100%',
              height: '100%',
              '--media-object-fit': 'contain',
              '--media-background-color': 'transparent',
            } as React.CSSProperties}
          />
        </div>

        {/* Duration Badge */}
        {!isPlaying && (
          <div className="absolute bottom-3 right-3 z-20">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black/70 text-white">
              {video.duration}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {video.category.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
          {video.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {video.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{video.platform}</span>
          <span>{video.date}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-100">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-500 hover:text-red-600 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
