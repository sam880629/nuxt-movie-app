'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TvShowType } from '@/types/tv'
import TvShowDetailCard from './TvShowDetailCard'

interface Props {
  show: TvShowType
  priority?: boolean
}

export default function TvShowCard({ show, priority = false }: Props) {
  const [open, setOpen] = useState(false)
  const voteNumber = Number(show.vote_average.toFixed(1))

  return (
    <>
      <div
        className="movie-card bg-[#353132] border-[#4e484a] border rounded-xl cursor-pointer h-full"
        onClick={() => setOpen(true)}
      >
        <div className="p-3 sm:p-4 flex flex-col relative">
          <div className="pr-2 text-[#efefef] flex gap-2 justify-between items-center">
            <p className="py-1.5 px-3 bg-[#272425] truncate text-[#efefef] rounded-3xl text-sm font-bold min-w-0">
              {show.name}
            </p>
            <p className="font-mono shrink-0 w-9 h-9 text-sm font-bold rounded-full bg-white text-[#272425] flex justify-center items-center">
              {voteNumber}
            </p>
          </div>
          <div className="mt-3 w-full relative overflow-hidden rounded-xl">
            <Image
              className="poster_img w-full h-auto"
              src={show.poster_path}
              alt={show.name}
              width={600}
              height={900}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              priority={priority}
            />
            <Image
              className="backdrop_img w-full h-auto"
              src={show.backdrop_path}
              alt=""
              width={600}
              height={900}
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setOpen(false)} />
          <TvShowDetailCard showData={show} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  )
}
