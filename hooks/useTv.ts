import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchTrendingTvShows, fetchTvList, fetchTvShowDetails, fetchTvTrailerKey, fetchTvCredits } from '@/services/tvService'
import { STALE_TIME, GC_TIME } from '@/lib/queryConfig'
import { useMemo } from 'react'

const MAX_PAGES = 5

// TV show hooks
export function useTrendingTvShows(option: string) {
  const query = useInfiniteQuery({
    queryKey: ['trendingTv', option],
    queryFn: ({ pageParam }) => fetchTrendingTvShows(option, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) =>
      (lastPageParam as number) >= MAX_PAGES ? undefined : (lastPageParam as number) + 1,
    staleTime: STALE_TIME.trending,
    gcTime: GC_TIME.default,
  })

  const shows = useMemo(() => {
    if (!query.data) return []
    const all = query.data.pages.flat()
    const seen = new Set<number>()
    return all.filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)))
  }, [query.data])

  return { ...query, shows }
}

export function useTvList(category: string, option: string) {
  const query = useInfiniteQuery({
    queryKey: ['tvList', category, option],
    queryFn: ({ pageParam }) => fetchTvList(category, option, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) =>
      (lastPageParam as number) >= MAX_PAGES ? undefined : (lastPageParam as number) + 1,
    staleTime: STALE_TIME.trending,
    gcTime: GC_TIME.default,
  })

  const shows = useMemo(() => {
    if (!query.data) return []
    const all = query.data.pages.flat()
    const seen = new Set<number>()
    return all.filter((s) => (seen.has(s.id) ? false : (seen.add(s.id), true)))
  }, [query.data])

  return { ...query, shows }
}

// TV show details, trailer, and credits hooks
export function useTvShowDetails(id: number) {
  return useQuery({
    queryKey: ['tvDetails', id],
    queryFn: () => fetchTvShowDetails(id),
    staleTime: STALE_TIME.movieDetail,
    gcTime: GC_TIME.movieDetail,
  })
}

// TMDB API returns a YouTube video key for trailers, so we can construct the full URL in the component
export function useTvTrailer(id: number) {
  return useQuery({
    queryKey: ['tvTrailer', id],
    queryFn: () => fetchTvTrailerKey(id),
    staleTime: STALE_TIME.static,
    gcTime: GC_TIME.static,
  })
}

// TV show credits hook
export function useTvCredits(id: number) {
  return useQuery({
    queryKey: ['tvCredits', id],
    queryFn: () => fetchTvCredits(id),
    staleTime: STALE_TIME.static,
    gcTime: GC_TIME.static,
  })
}
