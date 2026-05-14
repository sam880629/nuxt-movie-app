import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getPopularMovies, getMovies, getMoviesDetails, getMovieTrailerKey, getCredits } from '@/lib/tmdb'
import { useMemo } from 'react'

const MAX_PAGES = 5

export function usePopularMovies(option: string) {
  const query = useInfiniteQuery({
    queryKey: ['popularMovies', option],
    queryFn: ({ pageParam }) => getPopularMovies(option, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) =>
      (lastPageParam as number) >= MAX_PAGES ? undefined : (lastPageParam as number) + 1,
  })

  const movies = useMemo(() => {
    if (!query.data) return []
    const all = query.data.pages.flat()
    const seen = new Set<number>()
    return all.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
  }, [query.data])

  return { ...query, movies }
}

export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => getMovies(query),
    enabled: !!query,
  })
}

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => getMoviesDetails(id),
  })
}

export function useMovieTrailer(id: number) {
  return useQuery({
    queryKey: ['movieTrailer', id],
    queryFn: () => getMovieTrailerKey(id),
  })
}

export function useCredits(id: number) {
  return useQuery({
    queryKey: ['movieCredits', id],
    queryFn: () => getCredits(id),
  })
}
