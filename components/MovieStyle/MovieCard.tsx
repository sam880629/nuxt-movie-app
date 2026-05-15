'use client'

import { useState } from 'react'
import { MovieType } from '@/types/movie'
import ShowCard from './ShowCard'

export default function MovieCard({ movie }: { movie: MovieType }) {
  const [open, setOpen] = useState(false)
  const voteNumber = Number(movie.vote_average.toFixed(1))

  return (
    <>
      <div
        className="movie-card   bg-[#353132] border-[#4e484a] border rounded-xl cursor-pointer h-full"
        onClick={() => setOpen(true)}
      >
        <div className="p-3 sm:p-4 flex flex-col relative">
          <div className="pr-2 text-[#efefef] flex gap-2 justify-between items-center">
            <p className="py-1.5 px-3 bg-[#272425] truncate text-[#efefef] rounded-3xl text-sm font-bold min-w-0">
              {movie.title}
            </p>
            <p className="font-mono shrink-0 w-9 h-9 text-sm font-bold rounded-full bg-white text-[#272425] flex justify-center items-center">
              {voteNumber}
            </p>
          </div>
          <div className="p-5 mt-3 w-full relative overflow-hidden rounded-xl">
            <img className="poster_img rounded-xl w-full h-auto" src={movie.poster_path} alt="poster" />
            <img className="backdrop_img rounded-xl w-full h-auto" src={movie.backdrop_path} alt="backdrop" />
          </div>
        </div>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-60 z-40" onClick={() => setOpen(false)} />
          <ShowCard movieData={movie} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  )
}
