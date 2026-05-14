'use client'

import { useState } from 'react'
import { MovieType } from '@/types/movie'
import { useMovieDetails, useMovieTrailer, useCredits } from '@/hooks/useMovies'
import ActorsCard from './ActorsCard'

interface Props {
  movieData: MovieType
  onClose: () => void
}

export default function ShowCard({ movieData, onClose: _onClose }: Props) {
  const [showActors, setShowActors] = useState(false)

  const { data: details } = useMovieDetails(movieData.id)
  const { data: trailerKey } = useMovieTrailer(movieData.id)
  const { data: credits } = useCredits(movieData.id)

  const actors = credits?.actors ?? []
  const director = credits?.director ?? null

  const pageBtn = showActors ? '/image/left-arrow.png' : '/image/right-arrow.png'

  return (
    <div
      className="show-card max-w-full flex gap-10 lg:gap-5 z-50 flex-col lg:flex-row items-center justify-start lg:justify-center overflow-auto w-9/12 min-h-127.5 h-4/6 md:h-5/6 lg:p-8 lg:pr-0 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {showActors && (
        <div className="text-white hidden lg:flex w-9.5 cursor-pointer" onClick={() => setShowActors(false)}>
          <img src={pageBtn} alt="back" />
        </div>
      )}

      <div className="w-8/12 lg:w-6/12 max-w-80 flex lg:flex-col mt-10 lg:mt-0">
        <img className="rounded-xl" src={movieData.poster_path} alt={movieData.title} />
      </div>

      <div className={`flex flex-col w-9/12 items-start lg:h-full ${showActors ? 'lg:hidden' : ''}`}>
        <div className="flex gap-10">
          <div className="flex-1">
            <p className="card-title text-[#efefef] font-bold text-2xl mb-1">{movieData.title}</p>
            <p className="card-original_title text-[#efefef] mb-2 text-sm">{movieData.original_title}</p>
            <div className="flex flex-wrap">
              {details?.genres?.map((genre) => (
                <p key={genre.id} className="mr-2 p-0.5 bg-white border rounded-xl font-bold mb-2 text-sm">
                  {genre.name}
                </p>
              ))}
            </div>
            <p className="card-release_date text-[#efefef] mb-2">上映日期：{movieData.release_date}</p>
            <p className="card-overview text-[#efefef] mt-4 mb-2">{movieData.overview}</p>
          </div>

          {director && (
            <div className="text-[#efefef] card-director w-fit flex justify-center flex-col items-center">
              <p className="text-[#efefef] font-bold text-2xl">Director</p>
              <img className="circle" src={director.profile_path ?? '/image/nullActor.jpg'} alt={director.name} />
              <p className="bg-black rounded-xl p-1 font-bold">{director.name}</p>
            </div>
          )}
        </div>

        <div className="w-full h-75 lg:h-full mb-3">
          {trailerKey ? (
            <iframe
              className="video"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>

      {!showActors && (
        <div className="text-white hidden lg:flex lg:mr-2 cursor-pointer" onClick={() => setShowActors(true)}>
          <img src={pageBtn} alt="actors" className="w-9" />
        </div>
      )}

      <div className={`flex flex-col items-center w-full h-full lg:justify-start ${!showActors ? 'lg:hidden' : ''}`}>
        <p className="text-[#efefef] text-2xl font-bold m-5 text-center">主要演員</p>
        <div className="ActorsCard text-[#efefef] grid grid-cols-2 xl:grid-cols-3 gap-2 justify-center items-center lg:items-start w-9/12">
          {actors.map((actor) => (
            <ActorsCard key={actor.id} actor={actor} />
          ))}
        </div>
      </div>
    </div>
  )
}
