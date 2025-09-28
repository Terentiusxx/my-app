'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hr from '@/components/layout/Hr'
import MuxPlayer from '@mux/mux-player-react'

type MediaItem = {
  muxPlaybackId?: string
  src?: string
  poster?: string
  name?: string
  location?: string
  description?: string
  role?: string
  size?: 'small' | 'medium' | 'large'
}

type Props = {
  items?: MediaItem[]
  className?: string
}

const defaultItems: MediaItem[] = [
  { muxPlaybackId: 'ocsdUVPID4I15NPIBKhQDTLCSbZEZUha58J2pPnNv5c', name: 'Emily R.', location: 'Chicago', description: 'Brand Ambassador', role: 'Lifestyle Content', size: 'large' },
  { muxPlaybackId: 'N14jtGvn5ll6g8C011IaH01Lie598aDe5ln00GozifDlOI', name: 'Laura K.', location: 'New York', description: 'Wellness Coach', role: 'Educational Content', size: 'medium' },
  { muxPlaybackId: '019suLWfXs02fyoXK83a54cSZ1kLHNx5Q8SUM9djwql01g', name: 'John M.', location: 'Austin', description: 'Fitness Expert', role: 'Training Videos', size: 'small' },
  { muxPlaybackId: 'VndGErsM3QK1xXMroEhfLeFfDWt201JM9t6rXwTURfrc', name: 'Jade P.', location: 'Seattle', description: 'Tech Reviewer', role: 'Product Reviews', size: 'medium' },
  { muxPlaybackId: 'yHw2hFubBPWVVguxZqJKmLBY01DV02bMIffu1rSxMOM2A', name: 'Sam W.', location: 'Miami', description: 'Travel Blogger', role: 'Destination Guide', size: 'large' },
  { muxPlaybackId: 'rOfhTc8aEUJuR01Fyemjsd101m85IsDHGX0136TFmKeQnY', name: 'Bunny', location: 'Portland', description: 'Food Creator', role: 'Recipe Content', size: 'small' },
]

const MediaSlider: React.FC<Props> = ({ items = defaultItems, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  // Another 5% smaller size configurations
  const getSizeStyles = (size: 'small' | 'medium' | 'large' = 'medium') => {
    const sizes = {
      small: { 
        width: 199, // 209 * 0.95
        height: 271, // 285 * 0.95
        totalWidth: 199 + 46 // (209 + 48) * 0.95
      },
      medium: { 
        width: 253, // 266 * 0.95
        height: 325, // 342 * 0.95
        totalWidth: 253 + 46
      },
      large: { 
        width: 307, // 323 * 0.95
        height: 397, // 418 * 0.95
        totalWidth: 307 + 46
      }
    }
    return sizes[size]
  }

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current || !trackRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const viewport = viewportRef.current!
      const track = trackRef.current!
      const getScrollLength = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

      // Initial state - hide videos and header
      gsap.set(track.children, { opacity: 0, y: 46 }) // 48 * 0.95
      gsap.set(headerRef.current, { opacity: 0, y: 28 }) // 29 * 0.95

      // Fade in header first
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })

      // Fade in videos with stagger
      gsap.to(track.children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      })

      // Horizontal scroll animation
      gsap.set(track, { x: 0 })
      gsap.to(track, {
        x: () => -getScrollLength(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'bottom-=150 bottom', // 143 * 0.95
          end: () => `+=${getScrollLength()}`,
          scrub: 0.3,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`w-full bg-white px-6 md:px-9 lg:px-12 py-14 md:py-18 ${className}`}>
      {/* Header row - another 5% smaller */}
      <div ref={headerRef} className="mb-10 md:mb-14">
        <div className='pl-9'>
          <Hr title="Content y\ncreation" />
          <div className="flex items-end justify-between mt-6">
            <div>
              <p className="text-gray-600 text-sm max-w-xs">Real stories from real people showcasing authentic experiences</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-3 text-sm font-medium text-gray-900 hover:text-orange-400 hover:cursor-pointer transition-colors"
            >
              view all content
              <span className="text-xl text-orange-400 hover:text-orange-500 transition-colors">
                →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Video track - another 5% smaller spacing */}
      <div ref={viewportRef} className="relative overflow-hidden">
        <div ref={trackRef} className="flex gap-7 will-change-transform items-center pb-14 pr-10">
          {items.map((item, i) => {
            const sizeConfig = getSizeStyles(item.size)
            return (
              <div 
                key={i} 
                className="shrink-0 relative group"
                style={{
                  width: `${sizeConfig.totalWidth}px`,
                  marginBottom: '36px' // 38 * 0.95
                }}
              >
                <figure className="relative">
                  {/* Video card - another 5% smaller */}
                  <div 
                    className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] border border-gray-200/20"
                    style={{
                      width: `${sizeConfig.width}px`,
                      height: `${sizeConfig.height}px`,
                    }}
                  >
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
                        metadata={{
                          video_id: `video-${i}`,
                          video_title: item.name || `Video ${i + 1}`,
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

                    {/* Corner accent - slightly smaller */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-black rounded-full opacity-60"></div>
                  </div>

                  {/* Text - another 5% smaller spacing */}
                  <figcaption 
                    className="absolute text-base font-bold text-gray-900 group-hover:text-black transition-colors"
                    style={{
                      top: `${sizeConfig.height + 10}px`, // 11 * 0.95
                      left: '0px',
                      width: `${sizeConfig.width}px`
                    }}
                  >
                    {item.name ?? `Video ${i + 1}`}
                  </figcaption>

                  {/* Side text - another 5% smaller positioning */}
                  <div 
                    className="pointer-events-none absolute opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{
                      right: `${-31}px`, // -33 * 0.95
                      top: '50%',
                      transform: 'translateY(-50%) rotate(90deg)',
                      transformOrigin: 'center'
                    }}
                  >
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <span className="h-1 w-1 rounded-full bg-gray-700" />
                      <span className="uppercase tracking-[0.3em] text-[8px] font-semibold whitespace-nowrap">
                        {item.location ?? 'City'}
                      </span>
                    </div>
                  </div>
                </figure>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MediaSlider