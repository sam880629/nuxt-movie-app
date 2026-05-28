import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieList,
  fetchMovieTrailerKey,
  fetchSearchMovies,
  fetchTrendingMovies,
} from '@/services/movieService'
import { GC_TIME, STALE_TIME } from '@/lib/queryConfig'

const MAX_PAGES = 5

export const movieQueryKeys = {
  all: ['movies'] as const,
  trending: (option: string) => [...movieQueryKeys.all, 'trending', option] as const,
  list: (category: string, option: string) => [...movieQueryKeys.all, 'list', category, option] as const,
  search: (query: string) => [...movieQueryKeys.all, 'search', query] as const,
  detail: (id: number) => [...movieQueryKeys.all, 'detail', id] as const,
  trailer: (id: number) => [...movieQueryKeys.all, 'trailer', id] as const,
  credits: (id: number) => [...movieQueryKeys.all, 'credits', id] as const,
}

function normalizeSearchQuery(query: string) {
  return query.trim().toLowerCase()
}

export const movieQueryOptions = {
  trending: (option: string) =>
    infiniteQueryOptions({
      queryKey: movieQueryKeys.trending(option),
      queryFn: ({ pageParam }) => fetchTrendingMovies(option, pageParam as number),
      initialPageParam: 1,
      getNextPageParam: (_, __, lastPageParam) =>
        (lastPageParam as number) >= MAX_PAGES ? undefined : (lastPageParam as number) + 1,
      staleTime: STALE_TIME.trending,
      gcTime: GC_TIME.default,
    }),

  list: (category: string, option: string) =>
    infiniteQueryOptions({
      queryKey: movieQueryKeys.list(category, option),
      queryFn: ({ pageParam }) => fetchMovieList(category, option, pageParam as number),
      initialPageParam: 1,
      getNextPageParam: (_, __, lastPageParam) =>
        (lastPageParam as number) >= MAX_PAGES ? undefined : (lastPageParam as number) + 1,
      staleTime: STALE_TIME.trending,
      gcTime: GC_TIME.default,
    }),

  search: (query: string) => {
    const normalizedQuery = normalizeSearchQuery(query)

    return queryOptions({
      queryKey: movieQueryKeys.search(normalizedQuery),
      queryFn: () => fetchSearchMovies(normalizedQuery),
      enabled: normalizedQuery.length > 0,
      staleTime: STALE_TIME.search,
      gcTime: GC_TIME.default,
    })
  },

  detail: (id: number) =>
    queryOptions({
      queryKey: movieQueryKeys.detail(id),
      queryFn: () => fetchMovieDetails(id),
      enabled: id > 0,
      staleTime: STALE_TIME.movieDetail,
      gcTime: GC_TIME.movieDetail,
    }),

  trailer: (id: number) =>
    queryOptions({
      queryKey: movieQueryKeys.trailer(id),
      queryFn: () => fetchMovieTrailerKey(id),
      enabled: id > 0,
      staleTime: STALE_TIME.static,
      gcTime: GC_TIME.static,
    }),

  credits: (id: number) =>
    queryOptions({
      queryKey: movieQueryKeys.credits(id),
      queryFn: () => fetchMovieCredits(id),
      enabled: id > 0,
      staleTime: STALE_TIME.static,
      gcTime: GC_TIME.static,
    }),
}
