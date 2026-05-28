import { ProviderType } from '@/types/provider'
import { MovieType } from '@/types/movie'
import { TvShowType } from '@/types/tv'

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`)
  return res.json()
}

export const fetchProviders = (type: 'movie' | 'tv'): Promise<ProviderType[]> =>
  apiFetch(`/api/providers?type=${type}`)

export const fetchDiscoverMovies = (providerId: number, page: number): Promise<MovieType[]> =>
  apiFetch(`/api/movies/discover?provider=${providerId}&page=${page}`)

export const fetchDiscoverTvShows = (providerId: number, page: number): Promise<TvShowType[]> =>
  apiFetch(`/api/tv/discover?provider=${providerId}&page=${page}`)
