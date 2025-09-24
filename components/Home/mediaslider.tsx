'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hr from '@/components/layout/Hr'
import MuxPlayer from '@mux/mux-player-react'

type MediaItem = {
  // Prefer playbackId; or provide a full HLS src like https://stream.mux.com/xxxx.m3u8
  muxPlaybackId?: string
  src?: string
  poster?: string
  name?: string
  location?: string
}

type Props = {
  items?: MediaItem[]
  className?: string
}

const defaultItems: MediaItem[] = [
  { muxPlaybackId: 'PLAYBACK_ID_1', poster: 'https://image.mux.com/PLAYBACK_ID_1/thumbnail.jpg', name: 'Emily R.', location: 'Chicago' },
  { muxPlaybackId: 'PLAYBACK_ID_2', poster: 'https://image.mux.com/PLAYBACK_ID_2/thumbnail.jpg', name: 'Laura K.', location: 'New York' },
  { muxPlaybackId: 'PLAYBACK_ID_3', poster: 'https://image.mux.com/PLAYBACK_ID_3/thumbnail.jpg', name: 'John M', location: 'Austin' },
  { muxPlaybackId: 'PLAYBACK_ID_4', poster: 'https://image.mux.com/PLAYBACK_ID_4/thumbnail.jpg', name: 'Jade P.', location: 'Seattle' },
  { muxPlaybackId: 'PLAYBACK_ID_5', poster: 'https://image.mux.com/PLAYBACK_ID_5/thumbnail.jpg', name: 'Sam W.', location: 'Miami' },
  { muxPlaybackId: 'PLAYBACK_ID_6', poster: 'https://image.mux.com/PLAYBACK_ID_6/thumbnail.jpg', name: 'Bunny', location: 'Portland' },
]

const MediaSlider: React.FC<Props> = ({ items = defaultItems, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !viewportRef.current || !trackRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const viewport = viewportRef.current!
      const track = trackRef.current!
      const getScrollLength = () => Math.max(0, track.scrollWidth - viewport.clientWidth)

      gsap.set(track, { x: 0 })

      gsap.to(track, {
        x: () => -getScrollLength(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top top',
          end: () => `+=${getScrollLength()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Refresh ScrollTrigger when Mux players load/resize
  useEffect(() => {
    if (!trackRef.current) return
    const players = Array.from(trackRef.current.querySelectorAll('mux-player'))
    const refresh = () => ScrollTrigger.refresh()
    players.forEach((p) => {
      // @ts-ignore custom element events
      p.addEventListener('loadedmetadata', refresh)
      // @ts-ignore
      p.addEventListener('loadeddata', refresh)
    })
    return () =>
      players.forEach((p) => {
        // @ts-ignore
        p.removeEventListener('loadedmetadata', refresh)
        // @ts-ignore
        p.removeEventListener('loadeddata', refresh)
      })
  }, [items])

  return (
    <section ref={sectionRef} className={`w-full bg-white px-6 md:px-10 lg:px-14 py-10 md:py-14 ${className}`}>
      {/* Header row */}
      <div className="mb-8 md:mb-10 flex items-start justify-between gap-6">
        <Hr variant="long" />
        <h2 className="text-5xl md:text-7xl font-semibold leading-[0.9] tracking-tight">
          Content
          <br />
          creation
        </h2>
        <button
          type="button"
          className="hidden md:flex items-center gap-3 text-sm font-medium text-gray-900 hover:opacity-80 transition"
        >
          view all user stories
          <span className="inline-grid place-items-center h-10 w-10 rounded-full bg-gray-100">
            <span className="text-xl">→</span>
          </span>
        </button>
      </div>

      {/* Pinned, horizontally-animated track */}
      <div ref={viewportRef} className="relative overflow-hidden">
        <div ref={trackRef} className="flex gap-8 will-change-transform p-1">
          {items.map((item, i) => (
            <div key={i} className="shrink-0 basis-[88%] sm:basis-[70%] md:basis-[48%] lg:basis-[31%]">
              <figure className="relative">
                {/* Card */}
                <div className="w-full aspect-[4/3] bg-black rounded-[28px] md:rounded-[36px] overflow-hidden shadow-sm">
                  <MuxPlayer
                    className="w-full h-full"
                    // Use playbackId if provided; otherwise pass the full URL via src
                    playbackId={item.muxPlaybackId}
                    src={item.src}
                    poster={item.poster ?? (item.muxPlaybackId ? `https://image.mux.com/${item.muxPlaybackId}/thumbnail.jpg` : undefined)}
                    streamType="on-demand"
                    preload="metadata"
                    playsInline
                    // Make the video behave like object-cover inside the rounded card
                    style={{ '--media-object-fit': 'cover' } as React.CSSProperties}
                  />

                  {/* Rotated location label with dot */}
                  <div className="pointer-events-none absolute right-[-34px] md:right-[-44px] top-1/2 -translate-y-1/2 rotate-90 origin-right">
                    <div className="flex items-center gap-2 text-gray-800">
                      <span className="h-2 w-2 rounded-full bg-black" />
                      <span className="uppercase tracking-[0.25em] text-[10px] md:text-xs">
                        {item.location ?? 'City'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <figcaption className="mt-3 md:mt-4 text-base md:text-lg font-medium text-gray-900">
                  {item.name ?? `Video ${i + 1}`}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MediaSlider