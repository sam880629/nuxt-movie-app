import { TvShowType, TvShowDetailsType, TvCreditsType } from '@/types/tv'

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`)
  return res.json()
}

export const fetchTrendingTvShows = (option: string, page: number): Promise<TvShowType[]> =>
  apiFetch(`/api/tv/trending?option=${option}&page=${page}`)

export const fetchTvList = (category: string, option: string, page: number): Promise<TvShowType[]> =>
  apiFetch(`/api/tv/list?category=${category}&option=${option}&page=${page}`)

export const fetchTvShowDetails = (id: number): Promise<TvShowDetailsType> =>
  apiFetch(`/api/tv/${id}`)

export const fetchTvTrailerKey = async (id: number): Promise<string | null> => {
  const data = await apiFetch<{ key: string | null }>(`/api/tv/${id}/trailer`)
  return data.key
}

export const fetchTvCredits = (id: number): Promise<TvCreditsType> =>
  apiFetch(`/api/tv/${id}/credits`)
