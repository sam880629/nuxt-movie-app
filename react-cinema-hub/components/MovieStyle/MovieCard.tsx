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
        className="movie-card w-auto bg-[#353132] border-[#4e484a] border rounded-xl cursor-pointer h-full"
        onClick={() => setOpen(true)}
      >
        <div className="py-4 pl-8 flex flex-col lg:pl-6 relative">
          <div className="pr-4 text-[#efefef] flex gap-2 justify-between items-center">
            <p className="py-2 px-4 bg-[#272425] truncate text-[#efefef] rounded-3xl max-w-fit text-xl lg:text-base font-bold">
              {movie.title}
            </p>
            <p className="font-mono p-4 w-10 h-10 font-bold rounded-[50%] bg-white text-[#272425] flex justify-center items-center">
              {voteNumber}
            </p>
          </div>
          <div className="mt-4 mb-20 sm:mb-10 lg:mb-6 sm:w-70 md:w-70 lg:w-90 w-5/6 relative">
            <img className="poster_img rounded-xl" src={movie.poster_path} alt="poster" />
            <img className="backdrop_img rounded-xl" src={movie.backdrop_path} alt="backdrop" />
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
