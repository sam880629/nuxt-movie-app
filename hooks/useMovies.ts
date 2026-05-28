import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { movieQueryOptions } from '@/lib/movieQueries'
import { useMemo } from 'react'

export function useMovieList(category: string, option: string) {
  const query = useInfiniteQuery(movieQueryOptions.list(category, option))

  const movies = useMemo(() => {
    if (!query.data) return []
    const all = query.data.pages.flat()
    const seen = new Set<number>()
    return all.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
  }, [query.data])

  return { ...query, movies }
}

export function usePopularMovies(option: string) {
  const query = useInfiniteQuery(movieQueryOptions.trending(option))

  const movies = useMemo(() => {
    if (!query.data) return []
    const all = query.data.pages.flat()
    const seen = new Set<number>()
    return all.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
  }, [query.data])

  return { ...query, movies }
}

export function useSearchMovies(query: string) {
  return useQuery(movieQueryOptions.search(query))
}

export function useMovieDetails(id: number) {
  return useQuery(movieQueryOptions.detail(id))
}

export function useMovieTrailer(id: number) {
  return useQuery(movieQueryOptions.trailer(id))
}

export function useMovieCredits(id: number) {
  return useQuery(movieQueryOptions.credits(id))
}
