'use client'

import { useSearchParams } from 'next/navigation'
import { useSearchMovies } from '@/hooks/useMovies'
import MovieList from '@/components/MovieList'

export default function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('name') ?? ''
  const { data: movies = [], isLoading } = useSearchMovies(query)

  if (isLoading) {
    return (
      <div className="h-130 bg-[#211c1e] text-white flex justify-center items-center flex-col">
        <div className="la-ball-clip-rotate" />
        <p>loading.....</p>
      </div>
    )
  }

  if (!query || movies.length === 0) {
    return (
      <div className="h-130 bg-[#211c1e] text-white flex justify-center items-center text-3xl">
        <p>很抱歉！查無相關資料</p>
      </div>
    )
  }

  return <MovieList movies={movies} />
}
