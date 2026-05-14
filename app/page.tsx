'use client'

import { useEffect, useState } from 'react'
import { usePopularMovies } from '@/hooks/useMovies'
import MovieList from '@/components/MovieList'
import SelectorWrap from '@/components/MovieStyle/SelectorWrap'

export default function HomePage() {
  const [option, setOption] = useState<'day' | 'week'>('day')
  const { movies, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularMovies(option)

  useEffect(() => {
    fetchNextPage()

    const handleScroll = () => {
      if (
        hasNextPage &&
        !isFetchingNextPage &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <>
      <SelectorWrap onOptionSelected={(opt) => setOption(opt as 'day' | 'week')} />
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <div className="bg-[#211c1e] h-130" />
      )}
    </>
  )
}
