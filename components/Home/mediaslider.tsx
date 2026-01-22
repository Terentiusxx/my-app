'use client'

import React, { useEffect, useRef } from 'react'
import MuxPlayer from '@mux/mux-player-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'

gsap.registerPlugin(ScrollTrigger)

type MediaItem = {
  muxPlaybackId?: string
  imageSrc?: string
  title?: string
  views?: string
  platform?: string
}

type Props = {
  items?: MediaItem[]
  className?: string
}

const defaultItems: MediaItem[] = [
  // Row 1 - 3 items
  { muxPlaybackId: 'ocsdUVPID4I15NPIBKhQDTLCSbZEZUha58J2pPnNv5c', title: 'Video 1', views: '1:00', platform: 'LinkedIn' },
  { muxPlaybackId: 'N14jtGvn5ll6g8C011IaH01Lie598aDe5ln00GozifDlOI', title: 'Video 2', views: '0:45', platform: 'LinkedIn' },
  { muxPlaybackId: '019suLWfXs02fyoXK83a54cSZ1kLHNx5Q8SUM9djwql01g', title: 'Video 3', views: '1:20', platform: 'LinkedIn' },
  // Row 2 - 3 items  
  { muxPlaybackId: 'VndGErsM3QK1xXMroEhfLeFfDWt201JM9t6rXwTURfrc', title: 'Video 4', views: '0:50', platform: 'LinkedIn' },
  { muxPlaybackId: 'yHw2hFubBPWVVguxZqJKmLBY01DV02bMIffu1rSxMOM2A', title: 'Video 5', views: '1:15', platform: 'LinkedIn' },
  { muxPlaybackId: 'rOfhTc8aEUJuR01Fyemjsd101m85IsDHGX0136TFmKeQnY', title: 'Video 6', views: '0:55', platform: 'LinkedIn' },
  // Row 3 - 4 items
  { muxPlaybackId: '3DiuqKvw8qQ1hZ1gatEI3MJDJNA98gTctBY7OyYLCN4', title: 'Video 7', views: '1:10', platform: 'LinkedIn' },
  { muxPlaybackId: 'XfffetRXKDX85zjnJAaCtZPCG3k44xl3D02NIVzFMB4Q', title: 'Video 8', views: '0:40', platform: 'LinkedIn' },
  { muxPlaybackId: 'THcyz02Sha9WUns1ZfkSxXnUcN5WLylF73jKl8XKTuqo', title: 'Video 9', views: '1:05', platform: 'LinkedIn' },
  { muxPlaybackId: 'UCX011D02kR01MWSz5GMvtLnb5MvSaYJl3ZIEmAVLvMVF8', title: 'Video 10', views: '0:58', platform: 'LinkedIn' },
]

const MediaSlider: React.FC<Props> = ({ items = defaultItems, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgTransitionRef = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !row2Ref.current || !row3Ref.current) return

    const ctx = gsap.context(() => {
      // Slide up the section faster - rise effect
      gsap.fromTo(sectionRef.current,
        { y: '50vh' },
        {
          y: '0vh',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          }
        }
      )

      // Row 2 moves left
      gsap.to(row2Ref.current, {
        x: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // Row 3 moves right
      gsap.to(row3Ref.current, {
        x: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`relative w-full min-h-screen pb-0 overflow-hidden -mt-[50vh] z-20 bg-black ${className}`}>
      
      {/* Video Grid Background */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 p-4 md:p-8">
        {/* Top row - 3 items (static) */}
        <div className="flex gap-3 justify-end overflow-hidden">
          {items.slice(0, 3).map((item, i) => (
            <div key={i} className="relative w-64 md:w-72 lg:w-80 aspect-video rounded-lg overflow-hidden flex-shrink-0">
              {/* Blur background */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(https://image.mux.com/${item.muxPlaybackId}/thumbnail.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)',
                }}
              />
              
              {/* Video layer */}
              <div className="relative z-10 w-full h-full">
                <MuxPlayer
                  playbackId={item.muxPlaybackId}
                  playsInline
                  muted
                  metadata={{
                    video_id: `video-${i}`,
                    video_title: item.title || `Video ${i + 1}`,
                    viewer_user_id: "user-id-007",
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    '--media-object-fit': 'contain',
                    '--media-background-color': 'transparent',
                    '--controls-background-color': 'transparent',
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Middle row - 3 items (moves left) */}
        <div ref={row2Ref} className="flex gap-3 justify-end overflow-hidden">
          {items.slice(3, 6).map((item, i) => (
            <div key={i + 3} className="relative w-64 md:w-72 lg:w-80 aspect-video rounded-lg overflow-hidden flex-shrink-0">
              {/* Blur background */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(https://image.mux.com/${item.muxPlaybackId}/thumbnail.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)',
                }}
              />
              
              {/* Video layer */}
              <div className="relative z-10 w-full h-full">
                <MuxPlayer
                  playbackId={item.muxPlaybackId}
                  playsInline
                  muted
                  metadata={{
                    video_id: `video-${i + 4}`,
                    video_title: item.title || `Video ${i + 5}`,
                    viewer_user_id: "user-id-007",
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    '--media-object-fit': 'contain',
                    '--media-background-color': 'transparent',
                    '--controls-background-color': 'transparent',
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom row - 4 items (moves right) */}
        <div ref={row3Ref} className="flex gap-3 justify-end overflow-hidden">
          {items.slice(6, 10).map((item, i) => (
            <div key={i + 6} className="relative w-64 md:w-72 lg:w-80 aspect-video rounded-lg overflow-hidden flex-shrink-0">
              {/* Blur background */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(https://image.mux.com/${item.muxPlaybackId}/thumbnail.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)',
                }}
              />
              
              {/* Video layer */}
              <div className="relative z-10 w-full h-full">
                <MuxPlayer
                  playbackId={item.muxPlaybackId}
                  playsInline
                  muted
                  metadata={{
                    video_id: `video-${i + 7}`,
                    video_title: item.title || `Video ${i + 8}`,
                    viewer_user_id: "user-id-007",
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    '--media-object-fit': 'contain',
                    '--media-background-color': 'transparent',
                    '--controls-background-color': 'transparent',
                  } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Gradient Overlay with SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="mediaGradient" cx="0" cy="50%" r="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#000000" stopOpacity="0.5" />
              <stop offset="65%" stopColor="#000000" stopOpacity="0.4" />
              <stop offset="85%" stopColor="#000000" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#mediaGradient)" />
        </svg>
      </div>

      {/* Content Section - Overlays the grid */}
      <div className="relative z-10 px-8 md:px-16 min-h-screen flex items-start pt-20">
        <div className="max-w-xs pt-15">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight">
            Media & Content
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-6 leading-snug">
            Explore my latest LinkedIn video creations, keynotes, and insights. Combining expertise with authentic enthusiasm to deliver impactful content.
          </p>
          
          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full border-2 border-white text-white bg-transparent hover:bg-transparent hover:border-red-600 hover:text-red-600"
            onClick={() => window.location.href = '/media'}
          >
            View All Media
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MediaSlider
