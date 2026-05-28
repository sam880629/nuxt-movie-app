import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { fetchProviders, fetchDiscoverMovies, fetchDiscoverTvShows } from '@/services/providerService'
import { STALE_TIME, GC_TIME } from '@/lib/queryConfig'
import { useMemo } from 'react'

const MAX_PAGES = 5

export function useProviders(type: 'movie' | 'tv') {
  return useQuery({
    queryKey: ['providers', type],
    queryFn: () => fetchProviders(type),
    staleTime: STALE_TIME.static,
    gcTime: GC_TIME.static,
  })
}

export function useDiscoverMovies(providerId: number) {
  const query = useInfiniteQuery({
    queryKey: ['discoverMovies', providerId],
    queryFn: ({ pageParam }) => fetchDiscoverMovies(providerId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) =>
      (lastPageParam as number) >= MAX_PAGES ? undefined : (lastPageParam as number) + 1,
    staleTime: STALE_TIME.trending,
    gcTime: GC_TIME.default,
  })

  const movies = useMemo(() => {
    if (!query.data) return []
    const all = query.data.pages.flat()
    const seen = new Set<number>()
    return all.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)))
  }, [query.data])

  return { ...query, movies }
}

export function useDiscoverTvShows(providerId: number) {
  const query = useInfiniteQuery({
    queryKey: ['discoverTv', providerId],
    queryFn: ({ pageParam }) => fetchDiscoverTvShows(providerId, pageParam as number),
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
