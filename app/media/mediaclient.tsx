'use client';

import React, { useState, useMemo } from "react";
import Head from "next/head";
import MuxPlayer from '@mux/mux-player-react';
import PageHero from "@/components/layout/PageHero";
import CallToAction from "@/components/layout/CallToAction";
import Pagination from "@/components/layout/Pagination";
import INFO from "@/src/data/user";
import SEO from "@/src/data/seo";

type Video = {
  title: string;
  playbackId: string;
  platform: "LINKEDIN" | "YOUTUBE" | "PRIVATELEARN" | "INSTAGRAM";
  description: string;
  duration: string;
  tags: string[];
};

interface MediaClientProps {
  initialVideos: Video[];
}

export default function MediaClient({ initialVideos }: MediaClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const videosPerPage = 6;

  const currentPageSEO = SEO.find(item => item.page === "media") || SEO[0];
  const currentPageTitle = `Media & Content | ${INFO.main.title}`;

  // Suppress MuxPlayer HLS errors in console
  React.useEffect(() => {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      // Suppress MuxPlayer and HLS errors
      if (
        args[0]?.includes?.('mux-player') ||
        args[0]?.includes?.('MediaError') ||
        args[0]?.includes?.('HLS') ||
        args[0]?.includes?.('getErrorFromHlsErrorData')
      ) {
        return;
      }
      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  // Filter videos based on search
  const filteredVideos = useMemo(() => {
    return initialVideos.filter((video) => {
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [initialVideos, searchQuery]);

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

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
            {initialVideos.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">
                  No videos available at the moment. Check back soon!
                </p>
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600">
                  No videos found. Try adjusting your search query.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentVideos.map((video) => (
                    <VideoCard key={video.playbackId} video={video} />
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

// Platform Badge Component
function PlatformBadge({ platform }: { platform: Video["platform"] }) {
  const platformConfig = {
    LINKEDIN: {
      name: "LinkedIn",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      bgColor: "bg-[#0A66C2]",
      textColor: "text-white",
    },
    YOUTUBE: {
      name: "YouTube",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      bgColor: "bg-[#FF0000]",
      textColor: "text-white",
    },
    INSTAGRAM: {
      name: "Instagram",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
      textColor: "text-white",
    },
    PRIVATELEARN: {
      name: "PrivateLearn",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      bgColor: "bg-gray-800",
      textColor: "text-white",
    },
  };

  const config = platformConfig[platform];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      {config.icon}
      <span>{config.name}</span>
    </span>
  );
}

// Video Card Component
function VideoCard({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Validate video data
  if (!video.playbackId || video.playbackId.trim() === '') {
    return (
      <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
          <div className="text-center p-4">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-gray-400">Video unavailable</p>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-3">
            <PlatformBadge platform={video.platform} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{video.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-all duration-300"
    >
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center p-4">
              <svg className="w-12 h-12 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-400">Video unavailable</p>
            </div>
          </div>
        ) : (
          <>
            {/* Blur background thumbnail */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url(https://image.mux.com/${video.playbackId}/thumbnail.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
              }}
            />
            
            {/* Video Player */}
            <div className="relative z-10 w-full h-full">
              <MuxPlayer
                playbackId={video.playbackId}
                playsInline
                muted={!isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={() => setHasError(true)}
                metadata={{
                  video_id: video.playbackId,
                  video_title: video.title,
                  viewer_user_id: "media-library-viewer",
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  '--media-object-fit': 'contain',
                  '--media-background-color': 'transparent',
                }}
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
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Platform Badge */}
        <div className="mb-3">
          <PlatformBadge platform={video.platform} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
          {video.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {video.description}
        </p>

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
