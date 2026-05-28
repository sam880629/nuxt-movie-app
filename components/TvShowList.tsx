'use client'

import { useEffect, useState } from 'react'
import { TvShowType } from '@/types/tv'
import TvShowCard from './TvShowStyle/TvShowCard'

export default function TvShowList({ shows }: { shows: TvShowType[] }) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-[#211c1e] h-full relative">
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {shows.map((show, index) => (
          <TvShowCard key={show.id} show={show} priority={index < 4} />
        ))}
      </div>
      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      )}
    </div>
  )
}
