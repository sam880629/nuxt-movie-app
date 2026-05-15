'use client'

import { useEffect, useState } from 'react'
import { usePopularMovies } from '@/hooks/useMovies'
import MovieList from '@/components/MovieList'
import MovieCardSkeleton from '@/components/MovieStyle/MovieCardSkeleton'
import SelectorWrap from '@/components/MovieStyle/SelectorWrap'

const SKELETON_COUNT = 8

export default function HomePage() {
  const [option, setOption] = useState<'day' | 'week'>('day')
  const { movies, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularMovies(option)

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
      {isLoading ? (
        <div className="bg-[#211c1e] p-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  )
}
